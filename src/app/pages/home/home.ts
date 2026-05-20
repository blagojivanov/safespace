import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  route: string;
  buttonLabel: string;
  severity: 'success' | 'info' | 'warn';
}

@Component({
  selector: 'app-home',
  imports: [Card, Button, Tag],
  template: `
    <div class="page-hero">
      <p-tag value="Безбеден Простор" severity="info" styleClass="mb-3" />
      <h1>Добредојдовте во SafeSpace</h1>
      <p>
        Место каде што можеш слободно да зборуваш за своите чувства,
        да научиш да препознаваш кибер-вознемирување и да најдеш
        поддршка кога ти е потребна.
      </p>
      <p-button
        label="Провери ги твоите чувства"
        icon="pi pi-heart"
        routerLink="/checkin"
        size="large"
        (onClick)="navigate('/checkin')"
      />
    </div>

    <div class="card-grid">
      @for (card of featureCards; track card.route) {
        <p-card styleClass="feature-card" (click)="navigate(card.route)">
          <ng-template #header>
            <div class="card-header-visual" [class]="'card-header-' + card.severity">
              <i [class]="'pi ' + card.icon + ' card-icon'"></i>
            </div>
          </ng-template>
          <div class="card-body-content">
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
          <ng-template #footer>
            <p-button
              [label]="card.buttonLabel"
              [severity]="card.severity"
              [outlined]="true"
              size="small"
              styleClass="w-full"
              (onClick)="navigate(card.route)"
            />
          </ng-template>
        </p-card>
      }
    </div>

    <div class="mission-section">
      <p-card>
        <div class="mission-content">
          <i class="pi pi-shield mission-icon"></i>
          <div>
            <h2>Зошто SafeSpace?</h2>
            <p>
              Истражувањата на HBSC покажуваат дека секое четврто дете во Македонија
              доживеало некаков облик на кибер-вознемирување. Ние сме тука за да помогнеме.
            </p>
            <p-button
              label="Дознај повеќе"
              icon="pi pi-external-link"
              [text]="true"
              (onClick)="navigate('/about')"
            />
          </div>
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    .page-hero {
      text-align: center;
      padding: 3rem 1rem 2rem;

      h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin: 1rem 0;
        color: var(--p-primary-color);
      }

      p {
        font-size: 1.15rem;
        color: var(--p-text-muted-color);
        max-width: 600px;
        margin: 0 auto 2rem;
        line-height: 1.7;
      }
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    :host ::ng-deep .feature-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .p-card-header {
        padding: 0;
      }
    }

    .card-header-visual {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      border-radius: 8px 8px 0 0;

      &.card-header-info { background: linear-gradient(135deg, #667eea22, #764ba222); }
      &.card-header-success { background: linear-gradient(135deg, #11998e22, #38ef7d22); }
      &.card-header-warn { background: linear-gradient(135deg, #f7971e22, #ffd20022); }
    }

    .card-icon {
      font-size: 3.5rem;
      color: var(--p-primary-color);
    }

    .card-body-content {
      h3 {
        font-size: 1.3rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
        color: var(--p-primary-color);
      }

      p {
        color: var(--p-text-muted-color);
        line-height: 1.6;
        margin: 0;
      }
    }

    .mission-section {
      margin-top: 1rem;
    }

    .mission-content {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;

      h2 {
        font-size: 1.4rem;
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

    .mission-icon {
      font-size: 3rem;
      color: var(--p-primary-color);
      flex-shrink: 0;
    }

    @media (max-width: 600px) {
      .page-hero h1 { font-size: 1.8rem; }
      .mission-content { flex-direction: column; }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  featureCards: FeatureCard[] = [
    {
      icon: 'pi-heart-fill',
      title: 'Провери се',
      description: 'Кажи ни како се чувствуваш денес на интернет. Ние ќе ти дадеме персонализирана порака и поддршка.',
      route: '/checkin',
      buttonLabel: 'Провери ги чувствата',
      severity: 'info'
    },
    {
      icon: 'pi-question-circle',
      title: 'Квиз',
      description: 'Тест за препознавање на кибер-вознемирување. Провери дали знаеш да ги препознаеш знаците.',
      route: '/quiz',
      buttonLabel: 'Започни квиз',
      severity: 'success'
    },
    {
      icon: 'pi-lightbulb',
      title: 'Совети',
      description: 'Практични стратегии ако ти се случува тебе или некому кого познаваш. Никогаш не си сам/а.',
      route: '/tips',
      buttonLabel: 'Прочитај совети',
      severity: 'warn'
    }
  ];

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
