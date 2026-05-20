import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-about',
  imports: [Card, Button, Tag, Divider],
  template: `
    <div class="about-container">
      <div class="page-hero">
        <h1>За нас</h1>
        <p>Дознај повеќе за SafeSpace, HBSC истражувањето и зошто го правиме ова.</p>
      </div>

      <div class="about-content">
        <!-- HBSC Section -->
        <p-card styleClass="mb-4">
          <div class="section-header">
            <p-tag value="HBSC" severity="info" />
            <h2>Што е HBSC?</h2>
          </div>
          <p>
            <strong>Health Behaviour in School-aged Children (HBSC)</strong> е меѓународна студија
            под покровителство на Светската здравствена организација (СЗО) која го истражува здравјето
            и благосостојбата на деца на возраст 11, 13 и 15 години.
          </p>
          <p>
            Студијата се спроведува на секои 4 години во повеќе од 50 земји, вклучително и Македонија.
            Таа покрива теми како физичка активност, исхрана, ментално здравје, социјални односи
            и — се повеќе — онлајн однесување и кибер-вознемирување.
          </p>
          <p-button
            label="Посети hbsc.org"
            icon="pi pi-external-link"
            iconPos="right"
            [link]="true"
            (onClick)="openHbsc()"
          />
        </p-card>

        <!-- Stats -->
        <p-card styleClass="mb-4">
          <div class="section-header">
            <p-tag value="Статистики" severity="warn" />
            <h2>Бројките говорат</h2>
          </div>
          <p class="stat-intro">
            Истражувачките наоди на HBSC покажуваат загрижувачки трендови меѓу младите:
          </p>
          <div class="stat-grid">
            @for (stat of stats; track stat.label) {
              <div class="stat-card">
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            }
          </div>
          <p class="stat-note">
            <i class="pi pi-info-circle mr-1"></i>
            Извор: HBSC 2022 меѓународен извештај и регионални студии.
          </p>
        </p-card>

        <p-divider />

        <!-- SafeSpace mission -->
        <p-card styleClass="mb-4">
          <div class="section-header">
            <p-tag value="Мисија" severity="success" />
            <h2>Зошто SafeSpace?</h2>
          </div>
          <p>
            SafeSpace е создаден со цел да им помогне на младите луѓе на возраст 11–15 години да:
          </p>
          <ul class="mission-list">
            @for (item of missionItems; track item) {
              <li>
                <i class="pi pi-check-circle check-icon"></i>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </p-card>

        <!-- What is cyberbullying -->
        <p-card styleClass="mb-4">
          <div class="section-header">
            <p-tag value="Дефиниции" severity="secondary" />
            <h2>Што е кибер-вознемирување?</h2>
          </div>
          <p>
            Кибер-вознемирувањето е намерно, повторувачко агресивно однесување преку дигитални
            уреди и платформи. За разлика од традиционалното вознемирување, онлајн вознемирувањето:
          </p>
          <div class="diff-grid">
            @for (item of differenceItems; track item.title) {
              <div class="diff-item">
                <i [class]="'pi ' + item.icon + ' diff-icon'"></i>
                <div>
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            }
          </div>
        </p-card>

        <!-- Contact/Credits -->
        <p-card>
          <div class="section-header">
            <p-tag value="Контакт" />
            <h2>Контакт и правна помош</h2>
          </div>
          <div class="contact-grid">
            @for (contact of contacts; track contact.label) {
              <div class="contact-item">
                <i [class]="'pi ' + contact.icon + ' contact-icon'"></i>
                <div>
                  <strong>{{ contact.label }}</strong>
                  <p>{{ contact.value }}</p>
                </div>
              </div>
            }
          </div>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 800px;
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

    .section-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      h2 {
        font-size: 1.3rem;
        font-weight: 700;
        margin: 0;
        color: var(--p-primary-color);
      }
    }

    p {
      line-height: 1.7;
      color: var(--p-text-color);
      margin-bottom: 1rem;

      &:last-of-type { margin-bottom: 0; }
    }

    .stat-intro { margin-bottom: 1.25rem; }

    .stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .stat-card {
      text-align: center;
      padding: 1.25rem 1rem;
      border-radius: 12px;
      background: var(--p-surface-100, #f1f5f9);
      border: 1px solid var(--p-surface-200, #e2e8f0);
    }

    .stat-number {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--p-primary-color);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.82rem;
      color: var(--p-text-muted-color);
      line-height: 1.4;
    }

    .stat-note {
      font-size: 0.8rem;
      color: var(--p-text-muted-color);
      font-style: italic;
      margin-top: 1rem !important;
    }

    .mission-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      li {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        line-height: 1.5;
      }
    }

    .check-icon {
      color: #16a34a;
      font-size: 1.1rem;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .diff-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .diff-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      padding: 0.875rem 1rem;
      background: var(--p-surface-100, #f1f5f9);
      border-radius: 10px;

      strong {
        display: block;
        font-weight: 700;
        margin-bottom: 0.25rem;
        color: var(--p-primary-color);
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--p-text-muted-color);
      }
    }

    .diff-icon {
      font-size: 1.5rem;
      color: var(--p-primary-color);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .contact-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;

      strong {
        display: block;
        font-weight: 700;
        color: var(--p-text-color);
        margin-bottom: 0.2rem;
      }

      p { margin: 0; font-size: 0.9rem; color: var(--p-text-muted-color); }
    }

    .contact-icon {
      font-size: 1.4rem;
      color: var(--p-primary-color);
      flex-shrink: 0;
      margin-top: 2px;
    }
  `]
})
export class AboutComponent {
  openHbsc() {
    window.open('https://hbsc.org', '_blank', 'noopener,noreferrer');
  }

  stats = [
    { number: '1 од 4', label: 'деца доживеало кибер-вознемирување барем еднаш' },
    { number: '37%', label: 'пријавуваат дека се чувствуваат исклучено онлајн' },
    { number: '60%', label: 'не пријавуваат вознемирување на возрасен' },
    { number: '15+', label: 'часа неделно на екран кај просечен тинејџер' }
  ];

  missionItems = [
    'Препознаат знаци на кибер-вознемирување — и кај себе и кај другите',
    'Разберат дека не се сами и дека поддршката е достапна',
    'Научат практични стратегии за справување со онлајн вознемирување',
    'Изградат здрави дигитални навики и критичко размислување',
    'Знаат кому да се обратат кога им е потребна помош'
  ];

  differenceItems = [
    {
      icon: 'pi-clock',
      title: 'Достапно 24/7',
      desc: 'Вознемирувањето не запира кога детето доаѓа дома — го следи во секое доба.'
    },
    {
      icon: 'pi-users',
      title: 'Пошироко публика',
      desc: 'Содржината може брзо да се сподели со стотици или илјадници луѓе.'
    },
    {
      icon: 'pi-eye-slash',
      title: 'Анонимност',
      desc: 'Вознемирувачите честопати се скриени зад анонимни профили, откривањето е потешко.'
    },
    {
      icon: 'pi-trash',
      title: 'Трајност',
      desc: 'Дигиталните докази може да траат долго — скриншоти и постови тешко се бришат целосно.'
    }
  ];

  contacts = [
    {
      icon: 'pi-phone',
      label: 'Линија за деца (Македонија)',
      value: '0800 1 2222 — бесплатна, достапна 24/7'
    },
    {
      icon: 'pi-shield',
      label: 'МВР — Сектор за компјутерски криминал',
      value: 'prijava@mvr.gov.mk'
    },
    {
      icon: 'pi-globe',
      label: 'HBSC Истражување',
      value: 'hbsc.org — Меѓународна студија за здравје на ученици'
    },
    {
      icon: 'pi-heart',
      label: 'SafeSpace',
      value: 'Апликација создадена врз основа на HBSC наоди за млади 11–15 год.'
    }
  ];
}
