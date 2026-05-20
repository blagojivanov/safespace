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
        <h1><i class="pi pi-question-circle mr-2"></i>Квиз</h1>
        <p>Тест за препознавање кибер-вознемирување. 5 прашања, секое со вистинита и погрешна опција.</p>
      </div>

      @if (!quizFinished()) {
        <!-- Progress -->
        <div class="progress-section">
          <div class="progress-header">
            <span>Прашање {{ currentQuestionIndex() + 1 }} од {{ questions.length }}</span>
            <p-tag [value]="progressLabel()" severity="info" />
          </div>
          <p-progressbar [value]="progressPercent()" styleClass="mt-2" />
        </div>

        <!-- Question -->
        <p-card styleClass="question-card">
          <div class="question-content">
            @if (currentQuestion().scenario) {
              <div class="scenario-box">
                <i class="pi pi-comment scenario-icon"></i>
                <p>{{ currentQuestion().scenario }}</p>
              </div>
            }

            <h2 class="question-text">{{ currentQuestion().question }}</h2>

            <div class="options-list" role="radiogroup">
              @for (option of currentQuestion().options; track option.value) {
                <label
                  class="option-item"
                  [class.selected]="selectedAnswers()[currentQuestionIndex()] === option.value"
                  [class.correct]="showFeedback() && option.isCorrect"
                  [class.wrong]="showFeedback() && !option.isCorrect && selectedAnswers()[currentQuestionIndex()] === option.value"
                >
                  <p-radiobutton
                    [name]="'q' + currentQuestion().id"
                    [value]="option.value"
                    [(ngModel)]="currentAnswer"
                    [disabled]="showFeedback()"
                  />
                  <span class="option-label">{{ option.label }}</span>
                  @if (showFeedback() && option.isCorrect) {
                    <i class="pi pi-check-circle option-check success"></i>
                  }
                  @if (showFeedback() && !option.isCorrect && selectedAnswers()[currentQuestionIndex()] === option.value) {
                    <i class="pi pi-times-circle option-check error"></i>
                  }
                </label>
              }
            </div>

            @if (showFeedback()) {
              <div class="feedback-box">
                <p-message
                  [severity]="isCurrentAnswerCorrect() ? 'success' : 'error'"
                >
                  <span>
                    <strong>{{ isCurrentAnswerCorrect() ? '✓ Точно!' : '✗ Не точно.' }}</strong>
                    {{ currentQuestion().explanation }}
                  </span>
                </p-message>
              </div>
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
        <!-- Results -->
        <p-card styleClass="result-card">
          <div class="result-content">
            <div class="result-trophy">{{ resultEmoji() }}</div>
            <h2>Резултат</h2>
            <p class="score-text">{{ score() }} / {{ questions.length }} точни одговори</p>

            <p-progressbar
              [value]="scorePercent()"
              [style]="{ height: '1.5rem', 'border-radius': '0.75rem' }"
              styleClass="score-bar"
            />

            <p-message [severity]="resultSeverity()">
              <span>{{ resultMessage() }}</span>
            </p-message>

            <!-- Per-question review -->
            <div class="review-section">
              <h3>Преглед на одговори</h3>
              <p-divider />
              @for (q of questions; track q.id; let i = $index) {
                <div class="review-item">
                  <div class="review-header">
                    <p-tag
                      [value]="isAnswerCorrect(i) ? 'Точно' : 'Не точно'"
                      [severity]="isAnswerCorrect(i) ? 'success' : 'danger'"
                    />
                    <span class="review-q">{{ q.question }}</span>
                  </div>
                  <p class="review-explanation">{{ q.explanation }}</p>
                </div>
              }
            </div>

            <div class="result-actions">
              <p-button
                label="Играј повторно"
                icon="pi pi-refresh"
                (onClick)="restart()"
                styleClass="mr-2"
              />
              <p-button
                label="Совети"
                icon="pi pi-lightbulb"
                [outlined]="true"
                (onClick)="goToTips()"
              />
            </div>
          </div>
        </p-card>
      }
    </div>
  `,
  styles: [`
    .quiz-container {
      max-width: 750px;
      margin: 0 auto;
    }

    .page-hero {
      text-align: center;
      padding: 2rem 1rem 1rem;

      h1 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--p-primary-color);
        margin: 0 0 0.5rem;
      }

      p {
        color: var(--p-text-muted-color);
        margin: 0;
      }
    }

    .progress-section {
      margin-bottom: 1.5rem;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: var(--p-text-muted-color);
    }

    .question-content {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .scenario-box {
      display: flex;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: var(--p-surface-100, #f1f5f9);
      border-radius: 10px;
      border-left: 4px solid var(--p-primary-color);

      p {
        margin: 0;
        font-style: italic;
        line-height: 1.6;
        color: var(--p-text-color);
      }
    }

    .scenario-icon {
      font-size: 1.5rem;
      color: var(--p-primary-color);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .question-text {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0;
      color: var(--p-text-color);
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .option-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      border-radius: 10px;
      border: 2px solid var(--p-surface-200, #e2e8f0);
      cursor: pointer;
      transition: all 0.2s;

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
        background: var(--p-primary-50, #eff6ff);
      }
    }

    .option-label {
      flex: 1;
      font-size: 0.95rem;
    }

    .option-check {
      font-size: 1.1rem;
      flex-shrink: 0;

      &.success { color: #16a34a; }
      &.error { color: #dc2626; }
    }

    .feedback-box {
      margin-top: 0.25rem;
    }

    .action-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 0.5rem;
    }

    .result-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      text-align: center;

      h2 {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0;
        color: var(--p-primary-color);
      }
    }

    .result-trophy {
      font-size: 5rem;
      line-height: 1;
    }

    .score-text {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--p-primary-color);
      margin: 0;
    }

    :host ::ng-deep .score-bar {
      width: 100%;
    }

    .review-section {
      width: 100%;
      text-align: left;

      h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
        color: var(--p-text-color);
      }
    }

    .review-item {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--p-surface-200, #e2e8f0);

      &:last-child { border-bottom: none; }
    }

    .review-header {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .review-q {
      font-weight: 600;
      font-size: 0.9rem;
      line-height: 1.4;
      flex: 1;
    }

    .review-explanation {
      font-size: 0.85rem;
      color: var(--p-text-muted-color);
      line-height: 1.5;
      margin: 0;
      padding-left: 0.5rem;
    }

    .result-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
  `]
})
export class QuizComponent {
  currentQuestionIndex = signal(0);
  selectedAnswers = signal<string[]>(Array(5).fill(''));
  showFeedback = signal(false);
  quizFinished = signal(false);
  currentAnswer = '';

  questions: QuizQuestion[] = [
    {
      id: 1,
      scenario: 'Марко постојано добива непристојни и навредливи пораки од непознат корисник на социјална мрежа, секој ден во текот на неколку недели.',
      question: 'Ова ситуација е пример на:',
      options: [
        { value: 'a', label: 'Кибер-вознемирување — намерно и повторувачко онлајн вознемирување', isCorrect: true },
        { value: 'b', label: 'Нормална комуникација меѓу врсниците', isCorrect: false },
        { value: 'c', label: 'Шега без последици', isCorrect: false },
        { value: 'd', label: 'Технички проблем на апликацијата', isCorrect: false }
      ],
      explanation: 'Кибер-вознемирувањето е намерно, повторувачко онлајн вознемирување. Постојаните навредливи пораки јасно спаѓаат во оваа категорија.'
    },
    {
      id: 2,
      scenario: 'Ана и нејзиниот клика создале тајна онлајн група за да ја исклучат Ема и да објавуваат навредливи работи за неа.',
      question: 'Ова е форма на кибер-вознемирување. Зошто?',
      options: [
        { value: 'a', label: 'Не е — тие имаат право на своја приватна група', isCorrect: false },
        { value: 'b', label: 'Да — намерно исклучување и исмевање е онлајн вознемирување', isCorrect: true },
        { value: 'c', label: 'Само ако Ема дознае за групата', isCorrect: false },
        { value: 'd', label: 'Не е — ако ништо не е пратено до Ема директно', isCorrect: false }
      ],
      explanation: 'Намерното исклучување и исмевање преку онлајн групи е форма на кибер-вознемирување, без разлика дали жртвата е директно контактирана.'
    },
    {
      id: 3,
      scenario: 'Твојот другар сподели срамна фотографија на соученик без негова дозвола и многу луѓе почнале да се смеат и коментираат.',
      question: 'Правилното нешто да се направи е:',
      options: [
        { value: 'a', label: 'Да се смееш заедно — ако е смешно, нема проблем', isCorrect: false },
        { value: 'b', label: 'Да го игнорираш — не е твоја работа', isCorrect: false },
        { value: 'c', label: 'Да пријавиш ја фотографијата и да кажеш на возрасен', isCorrect: true },
        { value: 'd', label: 'Да ја сподели и ти за да покажеш солидарност со другарот', isCorrect: false }
      ],
      explanation: 'Делење фотографија без согласност е форма на кибер-вознемирување. Треба да ја пријавиш и да кажеш на возрасен — тоа е акт на храброст, не предавство.'
    },
    {
      id: 4,
      scenario: 'Некој ти испраќа заканувачки пораки и вели дека знае каде живееш.',
      question: 'Треба веднаш да:',
      options: [
        { value: 'a', label: 'Да одговориш и да кажеш да те остават на мир', isCorrect: false },
        { value: 'b', label: 'Да ги избришеш пораките и да не кажеш ништо', isCorrect: false },
        { value: 'c', label: 'Да снимиш скриншот, да го блокираш испраќачот и веднаш да кажеш на возрасен', isCorrect: true },
        { value: 'd', label: 'Да ги игнорираш — пораките сигурно се лажни', isCorrect: false }
      ],
      explanation: 'Заканувачките пораки се сериозни. Скриншотот служи како доказ. Никогаш не бришај докази — кажи на возрасен веднаш.'
    },
    {
      id: 5,
      scenario: 'Забележуваш дека твој соученик е жртва на кибер-вознемирување — луѓето го задеваат онлајн и тој/таа изгледа многу тажно.',
      question: 'Како сведок, треба да:',
      options: [
        { value: 'a', label: 'Да не се вмешуваш — не е твоја работа', isCorrect: false },
        { value: 'b', label: 'Да лајкаш коментарите — така ќе ти станат другарите', isCorrect: false },
        { value: 'c', label: 'Да го поддржиш приватно и да пријавиш на возрасен', isCorrect: true },
        { value: 'd', label: 'Да чекаш да се реши само', isCorrect: false }
      ],
      explanation: 'Сведоците имаат моќ да го сменат исходот. Приватна поддршка и пријавување на возрасен се најважните чекори. Никогаш не лајкај или шери вознемирувачка содржина.'
    }
  ];

  currentQuestion = computed(() => this.questions[this.currentQuestionIndex()]);
  progressPercent = computed(() => ((this.currentQuestionIndex()) / this.questions.length) * 100);
  progressLabel = computed(() => `${this.currentQuestionIndex() + 1}/${this.questions.length}`);
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
    const pct = this.scorePercent();
    if (pct === 100) return '🏆';
    if (pct >= 80) return '🌟';
    if (pct >= 60) return '👍';
    return '📚';
  });

  resultSeverity = computed((): 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' => {
    const pct = this.scorePercent();
    if (pct >= 80) return 'success';
    if (pct >= 60) return 'info';
    return 'warn';
  });

  resultMessage = computed(() => {
    const pct = this.scorePercent();
    if (pct === 100) return 'Совршено! Одлично ги препознаваш формите на кибер-вознемирување. Сподели го ова знаење со своите другари!';
    if (pct >= 80) return 'Одлично! Многу добро ги препознаваш знаците на кибер-вознемирување. Уште малку и ќе бидеш експерт!';
    if (pct >= 60) return 'Добро! Имаш основно разбирање. Провери ги нашите совети за да научиш повеќе.';
    return 'Продолжи да учиш! Кибер-вознемирувањето е сложена тема. Нашите совети ќе ти помогнат да го разбереш подобро.';
  });

  isCurrentAnswerCorrect(): boolean {
    const q = this.currentQuestion();
    const answer = this.selectedAnswers()[this.currentQuestionIndex()];
    const correct = q.options.find(o => o.isCorrect)?.value;
    return answer === correct;
  }

  isAnswerCorrect(index: number): boolean {
    const q = this.questions[index];
    const answer = this.selectedAnswers()[index];
    const correct = q.options.find(o => o.isCorrect)?.value;
    return answer === correct;
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
    this.selectedAnswers.set(Array(5).fill(''));
    this.showFeedback.set(false);
    this.quizFinished.set(false);
    this.currentAnswer = '';
  }

  constructor(private router: Router) {}
  goToTips() { this.router.navigate(['/tips']); }
}
