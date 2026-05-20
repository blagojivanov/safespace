import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'primeng/accordion';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';

interface Tip {
  icon: string;
  text: string;
}

interface TipCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  tips: Tip[];
  severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';
}

@Component({
  selector: 'app-tips',
  imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent, Button, Card, Tag],
  template: `
    <div class="tips-container">
      <div class="page-hero">
        <h1><i class="pi pi-lightbulb mr-2"></i>Совети</h1>
        <p>Практични стратегии за справување со кибер-вознемирување. Никогаш не си сам/а.</p>
      </div>

      <!-- Emergency notice -->
      <p-card styleClass="emergency-card mb-4">
        <div class="emergency-content">
          <i class="pi pi-exclamation-triangle emergency-icon"></i>
          <div>
            <strong>Ако се чувствуваш во опасност:</strong>
            Веднаш кажи на возрасен — родител, наставник или некој друг во кого имаш доверба.
            Во итни случаи јави на полиција (192) или Линија за деца (0800 1 2222 — бесплатна).
          </div>
        </div>
      </p-card>

      <!-- Categories accordion -->
      <p-accordion [multiple]="true" [value]="['0']">
        @for (category of categories; track category.id; let i = $index) {
          <p-accordionpanel [value]="i.toString()">
            <p-accordionheader>
              <div class="accordion-header-content">
                <i [class]="'pi ' + category.icon + ' accordion-icon'"></i>
                <div class="accordion-header-text">
                  <span class="accordion-title">{{ category.title }}</span>
                  <span class="accordion-desc">{{ category.description }}</span>
                </div>
                <p-tag [severity]="category.severity" [value]="category.tips.length + ' совети'" />
              </div>
            </p-accordionheader>
            <p-accordioncontent>
              <div class="tips-list">
                @for (tip of category.tips; track tip.text) {
                  <div class="tip-item">
                    <i [class]="'pi ' + tip.icon + ' tip-icon'"></i>
                    <p>{{ tip.text }}</p>
                  </div>
                }
              </div>
            </p-accordioncontent>
          </p-accordionpanel>
        }
      </p-accordion>

      <!-- CTA -->
      <div class="cta-section">
        <p-card>
          <div class="cta-content">
            <i class="pi pi-heart-fill cta-icon"></i>
            <div>
              <h3>Провери ги твоите чувства</h3>
              <p>Направи нашиот кратак check-in за да добиеш персонализирана порака.</p>
            </div>
            <div class="cta-buttons">
              <p-button label="Провери се" icon="pi pi-heart" (onClick)="navigate('/checkin')" />
              <p-button label="Квиз" icon="pi pi-question-circle" [outlined]="true" (onClick)="navigate('/quiz')" />
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .tips-container {
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

    :host ::ng-deep .emergency-card {
      border-left: 4px solid #f59e0b;
    }

    .emergency-content {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .emergency-icon {
      font-size: 1.5rem;
      color: #f59e0b;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .accordion-header-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
      flex-wrap: wrap;
    }

    .accordion-icon {
      font-size: 1.5rem;
      color: var(--p-primary-color);
      flex-shrink: 0;
    }

    .accordion-header-text {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      flex: 1;
    }

    .accordion-title {
      font-weight: 700;
      font-size: 1rem;
    }

    .accordion-desc {
      font-size: 0.8rem;
      color: var(--p-text-muted-color);
    }

    .tips-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .tip-item {
      display: flex;
      align-items: flex-start;
      gap: 0.875rem;
      padding: 0.875rem 0;
      border-bottom: 1px solid var(--p-surface-200, #e2e8f0);

      &:last-child { border-bottom: none; }

      p {
        margin: 0;
        line-height: 1.6;
        color: var(--p-text-color);
      }
    }

    .tip-icon {
      color: var(--p-primary-color);
      font-size: 1.1rem;
      margin-top: 3px;
      flex-shrink: 0;
    }

    .cta-section {
      margin-top: 2rem;
    }

    .cta-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      h3 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 0.25rem;
        color: var(--p-primary-color);
      }

      p {
        margin: 0;
        color: var(--p-text-muted-color);
        font-size: 0.9rem;
      }

      > div:nth-child(2) { flex: 1; }
    }

    .cta-icon {
      font-size: 2.5rem;
      color: var(--p-primary-color);
      flex-shrink: 0;
    }

    .cta-buttons {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    @media (max-width: 600px) {
      .accordion-header-content { gap: 0.5rem; }
      .cta-content { flex-direction: column; text-align: center; }
    }
  `]
})
export class TipsComponent {
  constructor(private router: Router) {}

  navigate(route: string) { this.router.navigate([route]); }

  categories: TipCategory[] = [
    {
      id: 'victim',
      icon: 'pi-user-minus',
      title: 'Ако ти се случува тебе',
      description: 'Чекори кога ти си жртва на кибер-вознемирување',
      severity: 'danger',
      tips: [
        {
          icon: 'pi-camera',
          text: 'Снимај скриншоти на сите пораки, коментари и содржини — тоа се докази. Не бришај ги пред да ги зачуваш.'
        },
        {
          icon: 'pi-ban',
          text: 'Блокирај го лицето кое те вознемирува на сите платформи каде се одвива вознемирувањето.'
        },
        {
          icon: 'pi-flag',
          text: 'Пријави ги содржините директно на платформата (Instagram, TikTok, Snapchat) — сите имаат опција за пријавување.'
        },
        {
          icon: 'pi-heart',
          text: 'Кажи на возрасен во кого имаш доверба — родител, наставник или советник. Не мораш да го решиш ова сам/а.'
        },
        {
          icon: 'pi-times-circle',
          text: 'Не одговарај на провокации — одговарањето честопати ја влошува ситуацијата и ги охрабрува вознемирувачите.'
        }
      ]
    },
    {
      id: 'witness',
      icon: 'pi-eye',
      title: 'Ако го видиш кај некој друг',
      description: 'Улогата на сведокот е клучна за да се запре вознемирувањето',
      severity: 'warn',
      tips: [
        {
          icon: 'pi-comment',
          text: 'Приватно поддржи ја жртвата — прати порака, покажи дека ти е гајле. Тоа може многу да значи.'
        },
        {
          icon: 'pi-thumbs-down',
          text: 'Не лајкај, не шерај и не коментирај на вознемирувачка содржина. Секоја интеракција го шири проблемот.'
        },
        {
          icon: 'pi-user-plus',
          text: 'Охрабри ја жртвата да пријави и да побара помош — понуди се да одите заедно при возрасен.'
        },
        {
          icon: 'pi-exclamation-triangle',
          text: 'Пријави ја содржината на платформата. Можеш да пријавиш анонимно на повеќето социјални мрежи.'
        }
      ]
    },
    {
      id: 'talking',
      icon: 'pi-comments',
      title: 'Разговор со некого',
      description: 'Да побараш помош е знак на храброст, не слабост',
      severity: 'info',
      tips: [
        {
          icon: 'pi-home',
          text: 'Зборувај со родител или старател — дури и ако мислиш дека нема да разберат, обиди се. Тие се тука за тебе.'
        },
        {
          icon: 'pi-book',
          text: 'Кажи на наставник или педагог во училиштето — тие се обучени да помогнат и знаат кои чекори да ги преземат.'
        },
        {
          icon: 'pi-phone',
          text: 'Јави на Линија за деца: 0800 1 2222 (бесплатна, 24/7) — можеш да разговараш анонимно со стручни лица.'
        },
        {
          icon: 'pi-users',
          text: 'Кажи на пријател во кого имаш доверба — понекогаш само да имаш некој до тебе прави голема разлика.'
        }
      ]
    },
    {
      id: 'wellbeing',
      icon: 'pi-star',
      title: 'Дигитална благосостојба',
      description: 'Здрави навики за подобро онлајн искуство',
      severity: 'success',
      tips: [
        {
          icon: 'pi-lock',
          text: 'Постави ги своите профили на приватни. Контролирај кој може да ти пишува пораки и да ги гледа твоите постови.'
        },
        {
          icon: 'pi-clock',
          text: 'Одреди лимити за времето пред екран. Направи паузи и поминувај време надвор — физичката активност го намалува стресот.'
        },
        {
          icon: 'pi-heart',
          text: 'Следи само содржини кои те инспирираат и те прават среќни. Отфоло профили кои те прават да се чувствуваш лошо.'
        },
        {
          icon: 'pi-shield',
          text: 'Не делиш лични информации онлајн — адреса, телефон, локација, или информации за семејството.'
        },
        {
          icon: 'pi-bell',
          text: 'Исклучи нотификации кога учиш или спиеш. Мозокот ти треба одмор без прекинувања за да функционира добро.'
        }
      ]
    }
  ];
}
