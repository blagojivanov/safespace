import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  route: string;
  buttonLabel: string;
  colorClass: string;
}

@Component({
  selector: 'app-home',
  imports: [Button, Tag],
  template: `
    <!-- Hero -->
    <div class="hero">
      <div class="hero-inner">
        <p-tag value="💙 Безбеден Простор за млади" severity="info" />
        <h1>Добредојдовте во<br><span class="hero-brand">SafeSpace</span></h1>
        <p>
          Место каде можеш слободно да зборуваш за своите чувства,
          да научиш да препознаваш кибер-вознемирување и да добиеш
          поддршка кога ти е потребна.
        </p>
        <div class="hero-actions">
          <p-button
            label="Провери ги твоите чувства"
            icon="pi pi-heart"
            size="large"
            (onClick)="navigate('/checkin')"
          />
          <p-button
            label="Направи квиз"
            icon="pi pi-question-circle"
            size="large"
            [outlined]="true"
            (onClick)="navigate('/quiz')"
          />
        </div>
      </div>
    </div>

    <!-- Feature cards -->
    <div class="card-grid">
      @for (card of featureCards; track card.route) {
        <div class="feature-card" (click)="navigate(card.route)" role="button" tabindex="0"
             (keydown.enter)="navigate(card.route)">
          <div class="fc-icon-wrap" [class]="card.colorClass">
            <i [class]="'pi ' + card.icon"></i>
          </div>
          <div class="fc-body">
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
          <div class="fc-footer">
            <span class="fc-link">{{ card.buttonLabel }} <i class="pi pi-arrow-right"></i></span>
          </div>
        </div>
      }
    </div>

    <!-- Mission banner -->
    <div class="mission-banner">
      <div class="mission-left">
        <i class="pi pi-shield mission-icon"></i>
      </div>
      <div class="mission-right">
        <h2>Зошто SafeSpace?</h2>
        <p>
          Истражувањата на HBSC покажуваат дека секое четврто дете доживеало
          некаков облик на кибер-вознемирување. SafeSpace е тука за да помогне.
        </p>
        <p-button
          label="Дознај повеќе за HBSC"
          icon="pi pi-external-link"
          iconPos="right"
          [text]="true"
          (onClick)="navigate('/about')"
        />
      </div>
    </div>
  `,
  styles: [`
    /* Hero */
    .hero {
      background: linear-gradient(135deg,
        var(--p-primary-50, #eff6ff) 0%,
        var(--p-surface-50, #f8fafc) 100%);
      border-radius: 16px;
      margin-bottom: 2rem;
      padding: 3.5rem 2rem;
      text-align: center;
    }

    .hero-inner {
      max-width: 640px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }

    h1 {
      font-size: 2.6rem;
      font-weight: 800;
      margin: 0;
      line-height: 1.2;
      letter-spacing: -0.5px;
      color: var(--p-text-color);
    }

    .hero-brand {
      color: var(--p-primary-color);
    }

    .hero-inner p {
      font-size: 1.1rem;
      color: var(--p-text-muted-color);
      line-height: 1.7;
      margin: 0;
      max-width: 520px;
    }

    .hero-actions {
      display: flex;
      gap: 0.875rem;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 0.5rem;
    }

    /* Feature cards grid */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .feature-card {
      display: flex;
      flex-direction: column;
      background: var(--p-surface-0, #ffffff);
      border: 1px solid var(--p-surface-200, #e2e8f0);
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.18s, box-shadow 0.18s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
      }
    }

    .fc-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;

      i {
        font-size: 3rem;
        color: var(--p-primary-color);
      }

      &.blue   { background: linear-gradient(135deg, #dbeafe, #eff6ff); }
      &.green  { background: linear-gradient(135deg, #dcfce7, #f0fdf4); }
      &.amber  { background: linear-gradient(135deg, #fef9c3, #fffbeb); }
    }

    .fc-body {
      padding: 1.25rem 1.25rem 0.5rem;
      flex: 1;

      h3 {
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
        color: var(--p-primary-color);
      }

      p {
        font-size: 0.9rem;
        color: var(--p-text-muted-color);
        line-height: 1.6;
        margin: 0;
      }
    }

    .fc-footer {
      padding: 1rem 1.25rem;
      border-top: 1px solid var(--p-surface-100, #f1f5f9);
    }

    .fc-link {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--p-primary-color);
      display: flex;
      align-items: center;
      gap: 0.375rem;

      i { font-size: 0.8rem; }
    }

    /* Mission banner */
    .mission-banner {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      background: var(--p-surface-0, #ffffff);
      border: 1px solid var(--p-surface-200, #e2e8f0);
      border-radius: 14px;
      padding: 1.75rem;
    }

    .mission-left { flex-shrink: 0; }

    .mission-icon {
      font-size: 2.75rem;
      color: var(--p-primary-color);
    }

    .mission-right {
      h2 {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 0.625rem;
        color: var(--p-primary-color);
      }

      p {
        font-size: 0.95rem;
        color: var(--p-text-muted-color);
        line-height: 1.65;
        margin: 0 0 0.875rem;
      }
    }

    @media (max-width: 640px) {
      .hero { padding: 2.5rem 1rem; }
      h1 { font-size: 2rem; }
      .mission-banner { flex-direction: column; gap: 1rem; }
      .hero-actions { flex-direction: column; align-items: stretch; }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  featureCards: FeatureCard[] = [
    {
      icon: 'pi-heart-fill',
      title: 'Провери се',
      description: 'Кажи ни како се чувствуваш денес на интернет. Ќе добиеш персонализирана порака и поддршка.',
      route: '/checkin',
      buttonLabel: 'Провери ги чувствата',
      colorClass: 'blue'
    },
    {
      icon: 'pi-question-circle',
      title: 'Квиз',
      description: '10 сценарија за препознавање на кибер-вознемирување. Провери колку знаеш.',
      route: '/quiz',
      buttonLabel: 'Започни квиз',
      colorClass: 'green'
    },
    {
      icon: 'pi-lightbulb',
      title: 'Совети',
      description: 'Практични стратегии ако ти се случува тебе или некому кого познаваш. Не си сам/а.',
      route: '/tips',
      buttonLabel: 'Прочитај совети',
      colorClass: 'amber'
    }
  ];

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
