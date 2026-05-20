import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { RadioButton } from 'primeng/radiobutton';
import { ProgressBar } from 'primeng/progressbar';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { Divider } from 'primeng/divider';

interface QuizOption {
  value: string;
  label: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

@Component({
  selector: 'app-quiz',
  imports: [Card, Button, RadioButton, ProgressBar, Message, Tag, Divider, FormsModule],
  template: `
    <div class="quiz-container">
      <div class="page-hero">
        <h1>Квиз</h1>
        <p>
          Тест за препознавање кибер-вознемирување.
          {{ questions.length }} прашања — прочитај го сценариото и избери го вистинскиот одговор.
        </p>
      </div>

      @if (!quizFinished()) {
        <!-- Progress bar -->
        <div class="progress-wrap">
          <div class="progress-label">
            <span class="progress-count">{{ currentQuestionIndex() + 1 }} / {{ questions.length }}</span>
            <span class="progress-pts">{{ score() }} точни досега</span>
          </div>
          <p-progressbar [value]="progressPercent()" [style]="{ height: '10px', 'border-radius': '6px' }" />
        </div>

        <!-- Question card -->
        <p-card>
          <div class="q-body">
            @if (currentQuestion().scenario) {
              <div class="scenario-box">
                <i class="pi pi-comment"></i>
                <p>{{ currentQuestion().scenario }}</p>
              </div>
            }

            <h2 class="q-text">{{ currentQuestion().question }}</h2>

            <div class="options-list" role="radiogroup">
              @for (opt of currentQuestion().options; track opt.value) {
                <label
                  class="option-item"
                  [class.selected]="currentAnswer === opt.value && !showFeedback()"
                  [class.correct]="showFeedback() && opt.isCorrect"
                  [class.wrong]="showFeedback() && !opt.isCorrect && selectedAnswers()[currentQuestionIndex()] === opt.value"
                >
                  <p-radiobutton
                    [name]="'q' + currentQuestion().id"
                    [value]="opt.value"
                    [(ngModel)]="currentAnswer"
                    [disabled]="showFeedback()"
                  />
                  <span class="opt-label">{{ opt.label }}</span>
                  @if (showFeedback() && opt.isCorrect) {
                    <i class="pi pi-check-circle opt-check correct-icon"></i>
                  }
                  @if (showFeedback() && !opt.isCorrect && selectedAnswers()[currentQuestionIndex()] === opt.value) {
                    <i class="pi pi-times-circle opt-check wrong-icon"></i>
                  }
                </label>
              }
            </div>

            @if (showFeedback()) {
              <p-message [severity]="isCurrentAnswerCorrect() ? 'success' : 'error'" styleClass="feedback-msg">
                <span>
                  <strong>{{ isCurrentAnswerCorrect() ? '✓ Точно!' : '✗ Не точно.' }}</strong>
                  {{ currentQuestion().explanation }}
                </span>
              </p-message>
            }

            <div class="action-row">
              @if (!showFeedback()) {
                <p-button
                  label="Потврди одговор"
                  icon="pi pi-check"
                  [disabled]="!currentAnswer"
                  (onClick)="confirmAnswer()"
                />
              } @else {
                <p-button
                  [label]="isLastQuestion() ? 'Погледни резултат' : 'Следно прашање'"
                  [icon]="isLastQuestion() ? 'pi pi-trophy' : 'pi pi-arrow-right'"
                  iconPos="right"
                  (onClick)="nextQuestion()"
                />
              }
            </div>
          </div>
        </p-card>
      } @else {
        <!-- Result card -->
        <p-card>
          <div class="result-body">
            <div class="result-trophy">{{ resultEmoji() }}</div>
            <h2>Резултат</h2>
            <p class="score-big">{{ score() }} / {{ questions.length }} точни одговори</p>

            <p-progressbar
              [value]="scorePercent()"
              [style]="{ height: '1.25rem', 'border-radius': '0.625rem', width: '100%' }"
            />

            <p-message [severity]="resultSeverity()" styleClass="result-msg">
              <span>{{ resultMessage() }}</span>
            </p-message>

            <div class="result-actions">
              <p-button label="Играј повторно" icon="pi pi-refresh" (onClick)="restart()" />
              <p-button label="Совети" icon="pi pi-lightbulb" [outlined]="true" (onClick)="goToTips()" />
            </div>

            <!-- Review -->
            <div class="review-wrap">
              <h3>Преглед на одговори</h3>
              <p-divider />
              @for (q of questions; track q.id; let i = $index) {
                <div class="review-row">
                  <p-tag
                    [value]="isAnswerCorrect(i) ? 'Точно' : 'Не точно'"
                    [severity]="isAnswerCorrect(i) ? 'success' : 'danger'"
                  />
                  <div class="review-text">
                    <span class="review-q">{{ q.question }}</span>
                    <span class="review-exp">{{ q.explanation }}</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </p-card>
      }
    </div>
  `,
  styles: [`
    .quiz-container {
      max-width: 720px;
      margin: 0 auto;
    }

    .page-hero {
      text-align: center;
      padding: 2rem 1rem 1.25rem;

      h1 {
        font-size: 2rem;
        font-weight: 800;
        color: var(--p-primary-color);
        margin: 0 0 0.5rem;
      }

      p {
        color: var(--p-text-muted-color);
        font-size: 1rem;
        line-height: 1.6;
        margin: 0;
      }
    }

    /* Progress */
    .progress-wrap {
      margin-bottom: 1.25rem;
    }

    .progress-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .progress-count {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--p-primary-color);
    }

    .progress-pts {
      font-size: 0.85rem;
      color: var(--p-text-muted-color);
    }

    /* Question body */
    .q-body {
      display: flex;
      flex-direction: column;
      gap: 1.125rem;
    }

    .scenario-box {
      display: flex;
      gap: 0.875rem;
      align-items: flex-start;
      padding: 1rem 1.125rem;
      background: var(--p-surface-100, #f1f5f9);
      border-radius: 10px;
      border-left: 4px solid var(--p-primary-color);

      i {
        font-size: 1.3rem;
        color: var(--p-primary-color);
        flex-shrink: 0;
        margin-top: 2px;
      }

      p {
        margin: 0;
        font-style: italic;
        line-height: 1.65;
        color: var(--p-text-color);
        font-size: 0.97rem;
      }
    }

    .q-text {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0;
      color: var(--p-text-color);
      line-height: 1.5;
    }

    /* Options */
    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .option-item {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      padding: 0.875rem 1rem;
      border-radius: 10px;
      border: 2px solid var(--p-surface-200, #e2e8f0);
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      user-select: none;

      &.selected {
        border-color: var(--p-primary-color);
        background: var(--p-primary-50, #eff6ff);
      }

      &.correct {
        border-color: #16a34a !important;
        background: #dcfce7 !important;
      }

      &.wrong {
        border-color: #dc2626 !important;
        background: #fee2e2 !important;
      }

      &:not(.correct):not(.wrong):hover {
        border-color: var(--p-primary-300, #93c5fd);
        background: var(--p-surface-100, #f8fafc);
      }
    }

    .opt-label {
      flex: 1;
      font-size: 0.95rem;
      line-height: 1.4;
    }

    .opt-check {
      font-size: 1.15rem;
      flex-shrink: 0;
    }
    .correct-icon { color: #16a34a; }
    .wrong-icon   { color: #dc2626; }

    :host ::ng-deep .feedback-msg {
      width: 100%;
    }

    .action-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 0.25rem;
    }

    /* Results */
    .result-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.125rem;
      text-align: center;

      h2 {
        font-size: 1.6rem;
        font-weight: 800;
        margin: 0;
        color: var(--p-primary-color);
      }
    }

    .result-trophy {
      font-size: 4.5rem;
      line-height: 1;
    }

    .score-big {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--p-primary-color);
      margin: 0;
    }

    :host ::ng-deep .result-msg {
      width: 100%;
      text-align: left;
    }

    .result-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }

    /* Review */
    .review-wrap {
      width: 100%;
      text-align: left;

      h3 {
        font-size: 1.05rem;
        font-weight: 700;
        margin: 0 0 0.25rem;
      }
    }

    .review-row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--p-surface-200, #e2e8f0);

      &:last-child { border-bottom: none; }
    }

    .review-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
    }

    .review-q {
      font-weight: 600;
      font-size: 0.88rem;
      line-height: 1.4;
    }

    .review-exp {
      font-size: 0.82rem;
      color: var(--p-text-muted-color);
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      .option-item { padding: 0.75rem 0.75rem; gap: 0.625rem; }
      .q-text { font-size: 1rem; }
    }
  `]
})
export class QuizComponent {
  currentQuestionIndex = signal(0);
  selectedAnswers = signal<string[]>([]);
  showFeedback = signal(false);
  quizFinished = signal(false);
  currentAnswer = '';

  questions: QuizQuestion[] = [
    {
      id: 1,
      scenario: 'Марко секојдневно добива навредливи пораки од непознат профил — продолжува неколку недели.',
      question: 'Ова ситуација е пример на:',
      options: [
        { value: 'a', label: 'Кибер-вознемирување — намерно и повторувачко онлајн вознемирување', isCorrect: true },
        { value: 'b', label: 'Нормална комуникација меѓу врсниците', isCorrect: false },
        { value: 'c', label: 'Шега без последици', isCorrect: false },
        { value: 'd', label: 'Технички проблем на апликацијата', isCorrect: false }
      ],
      explanation: 'Кибер-вознемирувањето е намерно и повторувачко. Постојани навредливи пораки јасно спаѓаат во оваа категорија, без разлика дали испраќачот е познат или не.'
    },
    {
      id: 2,
      scenario: 'Ана и нејзиниот клика создале тајна онлајн група каде исмеваат Ема и објавуваат лажни работи за неа.',
      question: 'Ова е форма на кибер-вознемирување затоа што:',
      options: [
        { value: 'a', label: 'Не е — секој има право на своја приватна група', isCorrect: false },
        { value: 'b', label: 'Намерното исклучување и исмевање е онлајн вознемирување', isCorrect: true },
        { value: 'c', label: 'Само ако Ема дознае за групата', isCorrect: false },
        { value: 'd', label: 'Не е ако ништо не е испратено до Ема директно', isCorrect: false }
      ],
      explanation: 'Намерното исклучување и исмевање преку онлајн групи е кибер-вознемирување без разлика дали жртвата е директно контактирана — штетата е реална.'
    },
    {
      id: 3,
      scenario: 'Твојот другар сподели срамна фотографија на соученик без негова дозвола и луѓето почнале да коментираат и се смеат.',
      question: 'Правилното нешто да се направи е:',
      options: [
        { value: 'a', label: 'Да се смееш заедно — ако е смешно, нема проблем', isCorrect: false },
        { value: 'b', label: 'Да го игнорираш — не е твоја работа', isCorrect: false },
        { value: 'c', label: 'Да ја пријавиш фотографијата и да кажеш на возрасен', isCorrect: true },
        { value: 'd', label: 'Да ја сподели и ти за да покажеш солидарност', isCorrect: false }
      ],
      explanation: 'Делење слика без согласност е кибер-вознемирување. Пријавувањето и кажувањето на возрасен е акт на храброст — не предавство кон другарот.'
    },
    {
      id: 4,
      scenario: 'Некој ти испраќа заканувачки пораки и вели дека знае каде живееш.',
      question: 'Треба веднаш да:',
      options: [
        { value: 'a', label: 'Да одговориш и да кажеш да те остават на мир', isCorrect: false },
        { value: 'b', label: 'Да ги избришеш пораките за да не те нервираат', isCorrect: false },
        { value: 'c', label: 'Да снимиш скриншот, да го блокираш испраќачот и веднаш да кажеш на возрасен', isCorrect: true },
        { value: 'd', label: 'Да ги игнорираш — пораките се веројатно лажни', isCorrect: false }
      ],
      explanation: 'Закани се сериозни. Скриншотот е доказ — никогаш не бриши пред да пријавиш. Кажи на возрасен веднаш; не се справувај сам/а.'
    },
    {
      id: 5,
      scenario: 'Твој соученик е очигледно вознемирен — луѓето го задеваат онлајн и тој/таа изгледа тажно.',
      question: 'Како сведок, треба да:',
      options: [
        { value: 'a', label: 'Да не се вмешуваш — не е твоја работа', isCorrect: false },
        { value: 'b', label: 'Да лајкаш коментарите за да ти станат другарите', isCorrect: false },
        { value: 'c', label: 'Да го поддржиш приватно и да пријавиш на возрасен', isCorrect: true },
        { value: 'd', label: 'Да чекаш — ќе се реши само', isCorrect: false }
      ],
      explanation: 'Сведоците имаат сила да го сменат исходот. Приватна поддршка + пријавување на возрасен се клучните чекори. Не лајкај или шери вознемирувачка содржина.'
    },
    {
      id: 6,
      scenario: 'Некој ти пишува онлајн и ти нуди подароци, бара слики и ти вели „тоа е наша тајна".',
      question: 'Ова однесување е:',
      options: [
        { value: 'a', label: 'Нормално — само е мила личност', isCorrect: false },
        { value: 'b', label: 'Знак на онлајн манипулација / гроуминг — веднаш кажи на возрасен', isCorrect: true },
        { value: 'c', label: 'Ок ако личноста изгледа пријатна во профилот', isCorrect: false },
        { value: 'd', label: 'Проблем само ако не го познаваш лично', isCorrect: false }
      ],
      explanation: 'Непознати кои нудат подароци, бараат слики и бараат тајност — тоа се знаци на гроуминг (онлајн манипулација). Кажи на возрасен веднаш, без исклучок.'
    },
    {
      id: 7,
      scenario: 'Некој создал лажен профил со твоето ime и фотографии и праќа непристојни пораки во твое ime.',
      question: 'Ова се нарекува:',
      options: [
        { value: 'a', label: 'Нема ништо лошо — профилот е лажен', isCorrect: false },
        { value: 'b', label: 'Само шега — ќе ги замолат да го избришат', isCorrect: false },
        { value: 'c', label: 'Кражба на идентитет и кибер-вознемирување — пријави на платформата и полицијата', isCorrect: true },
        { value: 'd', label: 'Нормална работа на интернет', isCorrect: false }
      ],
      explanation: 'Создавањето лажен профил со нечии лични податоци е кражба на идентитет — и кривично дело. Пријави на платформата и на возрасен/полиција веднаш.'
    },
    {
      id: 8,
      scenario: 'Твојот drugар те снима тајно со телефон во фискултурна сала и вели дека ќе ја сподели сликата ако не му направиш услуга.',
      question: 'Ова е форма на:',
      options: [
        { value: 'a', label: 'Нормална шега меѓу другари', isCorrect: false },
        { value: 'b', label: 'Секстортион / ucена — веднаш кажи на возрасен', isCorrect: true },
        { value: 'c', label: 'Нема проблем ако сликата не се шири', isCorrect: false },
        { value: 'd', label: 'Твоја вина — требало да внимаваш', isCorrect: false }
      ],
      explanation: 'Тајно снимање + закана со споделување за да се извлече услуга е ucена (сексторција). Тоа е кривично дело. Не е твоја вина — кажи на возрасен веднаш.'
    },
    {
      id: 9,
      scenario: 'Виде натпис онлајн: „Ако примаш вознемирувачки пораки, само блокирај ги и забрави — нема потреба да им кажеш на родителите."',
      question: 'Овој совет е:',
      options: [
        { value: 'a', label: 'Точен — блокирањето е доволно', isCorrect: false },
        { value: 'b', label: 'Делумно точен — блокирај, но задолжително кажи на возрасен', isCorrect: true },
        { value: 'c', label: 'Точен — родителите само ќе го влошат', isCorrect: false },
        { value: 'd', label: 'Точен — сам/а можеш да се справиш', isCorrect: false }
      ],
      explanation: 'Блокирањето е добар прв чекор, но не е доволно. Возрасните можат да помогнат да се реши проблемот целосно — не го криј, дури и ако мислиш дека не е „доволно сериозно".'
    },
    {
      id: 10,
      scenario: 'Твој пријател ти кажува дека добива грди коментари онлајн и го боли — но те моли да не кажеш никому.',
      question: 'Треба да:',
      options: [
        { value: 'a', label: 'Го исполниш ветувањето — тајната е тајна', isCorrect: false },
        { value: 'b', label: 'Му/и кажеш дека сам/а ќе пријавиш бидејќи безбедноста е поважна од тајната', isCorrect: true },
        { value: 'c', label: 'Го игнорираш — тој/таа не сака помош', isCorrect: false },
        { value: 'd', label: 'Го советуваш да игнорира и ќе помине', isCorrect: false }
      ],
      explanation: 'Кога некој е во опасност, безбедноста е поважна од тајната. Можеш да му/и кажеш: „Те сакам и затоа мора да кажам — не е предавство, туку грижа."'
    }
  ];

  currentQuestion = computed(() => this.questions[this.currentQuestionIndex()]);
  progressPercent = computed(() => (this.currentQuestionIndex() / this.questions.length) * 100);
  isLastQuestion = computed(() => this.currentQuestionIndex() === this.questions.length - 1);

  score = computed(() =>
    this.questions.reduce((acc, q, i) => {
      const answer = this.selectedAnswers()[i];
      const correct = q.options.find(o => o.isCorrect)?.value;
      return acc + (answer === correct ? 1 : 0);
    }, 0)
  );

  scorePercent = computed(() => Math.round((this.score() / this.questions.length) * 100));

  resultEmoji = computed(() => {
    const p = this.scorePercent();
    if (p === 100) return '🏆';
    if (p >= 80)  return '🌟';
    if (p >= 60)  return '👍';
    return '📚';
  });

  resultSeverity = computed((): 'success' | 'info' | 'warn' => {
    const p = this.scorePercent();
    if (p >= 80) return 'success';
    if (p >= 60) return 'info';
    return 'warn';
  });

  resultMessage = computed(() => {
    const p = this.scorePercent();
    if (p === 100) return 'Совршено! Одлично ги препознаваш формите на кибер-вознемирување. Сподели го ова знаење со своите другари!';
    if (p >= 80)   return 'Одлично! Многу добро ги препознаваш знаците. Уште малку и ќе бидеш вистински експерт!';
    if (p >= 60)   return 'Добро! Имаш солидно разбирање. Провери ги нашите совети за да научиш повеќе.';
    return 'Продолжи да учиш! Кибер-вознемирувањето е сложена тема. Нашите совети ќе ти помогнат да го разбереш подобро.';
  });

  isCurrentAnswerCorrect(): boolean {
    const q = this.currentQuestion();
    const answer = this.selectedAnswers()[this.currentQuestionIndex()];
    return answer === q.options.find(o => o.isCorrect)?.value;
  }

  isAnswerCorrect(index: number): boolean {
    const answer = this.selectedAnswers()[index];
    return answer === this.questions[index].options.find(o => o.isCorrect)?.value;
  }

  confirmAnswer() {
    if (!this.currentAnswer) return;
    const answers = [...this.selectedAnswers()];
    answers[this.currentQuestionIndex()] = this.currentAnswer;
    this.selectedAnswers.set(answers);
    this.showFeedback.set(true);
  }

  nextQuestion() {
    if (this.isLastQuestion()) {
      this.quizFinished.set(true);
    } else {
      this.currentQuestionIndex.update(i => i + 1);
      this.currentAnswer = '';
      this.showFeedback.set(false);
    }
  }

  restart() {
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set([]);
    this.showFeedback.set(false);
    this.quizFinished.set(false);
    this.currentAnswer = '';
  }

  constructor(private router: Router) {}
  goToTips() { this.router.navigate(['/tips']); }
}
