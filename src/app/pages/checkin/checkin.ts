import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Divider } from 'primeng/divider';

type MoodKey = 'great' | 'ok' | 'anxious' | 'sad' | 'scared' | null;
type HappenedKey = 'yes' | 'no' | 'unsure' | null;

interface Mood {
  key: MoodKey;
  emoji: string;
  label: string;
}

interface ResponseMessage {
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
  text: string;
}

@Component({
  selector: 'app-checkin',
  imports: [Card, Button, Message, Divider],
  template: `
    <div class="checkin-container">
      <div class="page-hero">
        <h1><i class="pi pi-heart mr-2"></i>Провери се</h1>
        <p>Кажи ни како се чувствуваш денес на интернет. Твоите одговори се приватни.</p>
      </div>

      @if (!submitted()) {
        <p-card>
          <!-- Step 1: Mood -->
          <div class="step-section">
            <h2 class="step-title">
              <span class="step-num">1</span>
              Како се чувствуваш денес на интернет?
            </h2>
            <div class="mood-grid">
              @for (mood of moods; track mood.key) {
                <button
                  class="mood-btn"
                  [class.selected]="selectedMood() === mood.key"
                  (click)="selectMood(mood.key!)"
                >
                  <span class="mood-emoji">{{ mood.emoji }}</span>
                  <span class="mood-label">{{ mood.label }}</span>
                </button>
              }
            </div>
          </div>

          <p-divider />

          <!-- Step 2: Follow-up -->
          <div class="step-section">
            <h2 class="step-title">
              <span class="step-num">2</span>
              Дали ти се случило нешто или некому кого познаваш на интернет?
            </h2>
            <div class="happened-grid">
              @for (opt of happenedOptions; track opt.key) {
                <button
                  class="happened-btn"
                  [class.selected]="selectedHappened() === opt.key"
                  (click)="selectHappened(opt.key)"
                >
                  <i [class]="'pi ' + opt.icon"></i>
                  <span>{{ opt.label }}</span>
                </button>
              }
            </div>
          </div>

          <p-divider />

          <div class="submit-section">
            <p-button
              label="Прати"
              icon="pi pi-send"
              size="large"
              [disabled]="!canSubmit()"
              (onClick)="submit()"
            />
            <p class="privacy-note">
              <i class="pi pi-lock mr-1"></i>
              Твоите одговори не се снимаат и се целосно приватни.
            </p>
          </div>
        </p-card>
      } @else {
        <!-- Result -->
        <div class="result-container">
          <p-card>
            <div class="result-content">
              <div class="result-emoji">{{ getResultEmoji() }}</div>
              <p-message
                [severity]="getResponseMessage().severity"
                styleClass="result-message"
              >
                <span>{{ getResponseMessage().text }}</span>
              </p-message>

              @if (needsSupport()) {
                <div class="support-box">
                  <h3><i class="pi pi-hands-helping mr-2"></i>Не си сам/а</h3>
                  <p>
                    Разговорот со возрасен во кого имаш доверба е секогаш добра идеја.
                    Можеш да му/и кажеш на родител, наставник или советник во училиштето.
                  </p>
                  <p-button
                    label="Прочитај совети"
                    icon="pi pi-lightbulb"
                    (onClick)="goToTips()"
                    styleClass="mr-2"
                  />
                  <p-button
                    label="Направи уште еден квиз"
                    icon="pi pi-question-circle"
                    [outlined]="true"
                    (onClick)="goToQuiz()"
                  />
                </div>
              } @else {
                <div class="positive-actions">
                  <p-button
                    label="Совети за дигитална благосостојба"
                    icon="pi pi-lightbulb"
                    [outlined]="true"
                    (onClick)="goToTips()"
                    styleClass="mr-2"
                  />
                  <p-button
                    label="Тест за кибер-вознемирување"
                    icon="pi pi-question-circle"
                    [text]="true"
                    (onClick)="goToQuiz()"
                  />
                </div>
              }

              <p-button
                label="Провери повторно"
                icon="pi pi-refresh"
                [text]="true"
                styleClass="mt-3"
                (onClick)="reset()"
              />
            </div>
          </p-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .checkin-container {
      max-width: 700px;
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
        font-size: 1.05rem;
      }
    }

    .step-section {
      padding: 1rem 0;
    }

    .step-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .step-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: var(--p-primary-color);
      color: white;
      font-size: 0.9rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .mood-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    .mood-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
      border: 2px solid var(--p-surface-200, #e2e8f0);
      border-radius: 12px;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s;
      min-width: 90px;

      &:hover {
        border-color: var(--p-primary-color);
        background: var(--p-primary-50, #eff6ff);
        transform: translateY(-2px);
      }

      &.selected {
        border-color: var(--p-primary-color);
        background: var(--p-primary-100, #dbeafe);
        box-shadow: 0 0 0 3px var(--p-primary-200, #bfdbfe);
      }
    }

    .mood-emoji {
      font-size: 2.5rem;
      line-height: 1;
    }

    .mood-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--p-text-color);
    }

    .happened-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    .happened-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1.5rem;
      border: 2px solid var(--p-surface-200, #e2e8f0);
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      color: var(--p-text-color);
      transition: all 0.2s;

      i { font-size: 1.2rem; }

      &:hover {
        border-color: var(--p-primary-color);
        background: var(--p-primary-50, #eff6ff);
      }

      &.selected {
        border-color: var(--p-primary-color);
        background: var(--p-primary-100, #dbeafe);
        box-shadow: 0 0 0 3px var(--p-primary-200, #bfdbfe);
      }
    }

    .submit-section {
      text-align: center;
      padding-top: 0.5rem;
    }

    .privacy-note {
      font-size: 0.8rem;
      color: var(--p-text-muted-color);
      margin-top: 1rem;
    }

    .result-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.5rem;
    }

    .result-emoji {
      font-size: 4rem;
      line-height: 1;
    }

    :host ::ng-deep .result-message {
      width: 100%;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .support-box {
      background: var(--p-surface-100, #f1f5f9);
      border-radius: 12px;
      padding: 1.5rem;
      width: 100%;

      h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 0.75rem;
        color: var(--p-primary-color);
      }

      p {
        color: var(--p-text-muted-color);
        line-height: 1.6;
        margin: 0 0 1rem;
      }
    }

    .positive-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
  `]
})
export class CheckinComponent {
  selectedMood = signal<MoodKey>(null);
  selectedHappened = signal<HappenedKey>(null);
  submitted = signal(false);

  moods: Mood[] = [
    { key: 'great', emoji: '😄', label: 'Одлично' },
    { key: 'ok', emoji: '😊', label: 'Добро' },
    { key: 'anxious', emoji: '😰', label: 'Вознемирен/а' },
    { key: 'sad', emoji: '😢', label: 'Тажен/Тажна' },
    { key: 'scared', emoji: '😨', label: 'Исплашен/а' }
  ];

  happenedOptions = [
    { key: 'yes' as HappenedKey, icon: 'pi-check-circle', label: 'Да' },
    { key: 'no' as HappenedKey, icon: 'pi-times-circle', label: 'Не' },
    { key: 'unsure' as HappenedKey, icon: 'pi-question-circle', label: 'Не сум сигурен/а' }
  ];

  canSubmit = computed(() => this.selectedMood() !== null && this.selectedHappened() !== null);

  needsSupport = computed(() => {
    const mood = this.selectedMood();
    const happened = this.selectedHappened();
    return (
      ['anxious', 'sad', 'scared'].includes(mood!) ||
      happened === 'yes' ||
      happened === 'unsure'
    );
  });

  selectMood(key: MoodKey) {
    this.selectedMood.set(key);
  }

  selectHappened(key: HappenedKey) {
    this.selectedHappened.set(key);
  }

  submit() {
    if (this.canSubmit()) {
      this.submitted.set(true);
    }
  }

  reset() {
    this.selectedMood.set(null);
    this.selectedHappened.set(null);
    this.submitted.set(false);
  }

  getResultEmoji(): string {
    const map: Record<string, string> = {
      great: '🌟',
      ok: '😊',
      anxious: '💙',
      sad: '💜',
      scared: '🤗'
    };
    return map[this.selectedMood()!] ?? '💙';
  }

  getResponseMessage(): ResponseMessage {
    const mood = this.selectedMood();
    const happened = this.selectedHappened();

    if (mood === 'great' && happened === 'no') {
      return {
        severity: 'success',
        text: 'Одлично! Радуваме се што денес се чувствуваш добро. Продолжи да внимаваш на другите онлајн и биди добар дигитален граѓанин.'
      };
    }
    if (mood === 'ok' && happened === 'no') {
      return {
        severity: 'success',
        text: 'Добро е да се чувствуваш добро! Запомни — ако забележиш нешто вознемирувачко онлајн, секогаш можеш да побараш помош.'
      };
    }
    if (happened === 'yes') {
      return {
        severity: 'warn',
        text: 'Жал ни е дека ти се случило нешто непријатно. Тоа не е твоја вина. Важно е да зборуваш со некого во кого имаш доверба — родител, наставник или советник.'
      };
    }
    if (mood === 'anxious' || mood === 'sad' || mood === 'scared') {
      return {
        severity: 'info',
        text: 'Разбираме дека понекогаш интернетот може да биде стресно место. Твоите чувства се важни. Не мораш да се справуваш сам/а — поддршката е на дофат на рака.'
      };
    }
    if (happened === 'unsure') {
      return {
        severity: 'info',
        text: 'Нормално е да не си сигурен/а. Нашиот квиз може да ти помогне да препознаеш дали она што се случува е кибер-вознемирување. Провери ги и нашите совети.'
      };
    }
    return {
      severity: 'info',
      text: 'Благодариме за откривањето. Запомни — SafeSpace е секогаш тука за тебе.'
    };
  }

  constructor(private router: Router) {}

  goToTips() { this.router.navigate(['/tips']); }
  goToQuiz() { this.router.navigate(['/quiz']); }
}
