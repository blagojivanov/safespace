import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, Button, RouterLink],
  template: `
    <p-menubar [model]="menuItems" styleClass="ss-menubar">
      <ng-template #start>
        <a routerLink="/home" class="brand-link">
          <i class="pi pi-shield brand-icon"></i>
          <span class="brand-name">SafeSpace</span>
        </a>
      </ng-template>
      <ng-template #end>
        <p-button
          [icon]="isDark() ? 'pi pi-sun' : 'pi pi-moon'"
          [rounded]="true"
          [text]="true"
          [title]="isDark() ? 'Светла тема' : 'Темна тема'"
          (onClick)="toggleDark()"
          styleClass="theme-toggle"
        />
      </ng-template>
    </p-menubar>
  `,
  styles: [`
    :host ::ng-deep .ss-menubar {
      border-radius: 0;
      border-left: none;
      border-right: none;
      border-top: none;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: var(--p-primary-color);
      font-weight: 700;
      font-size: 1.2rem;
      margin-right: 1rem;
    }

    .brand-icon {
      font-size: 1.4rem;
    }

    .brand-name {
      letter-spacing: 0.5px;
    }
  `]
})
export class NavbarComponent {
  isDark = signal(false);

  menuItems: MenuItem[] = [
    { label: 'Дома', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Провери се', icon: 'pi pi-heart', routerLink: '/checkin' },
    { label: 'Квиз', icon: 'pi pi-question-circle', routerLink: '/quiz' },
    { label: 'Совети', icon: 'pi pi-lightbulb', routerLink: '/tips' },
    { label: 'За нас', icon: 'pi pi-info-circle', routerLink: '/about' }
  ];

  toggleDark() {
    this.isDark.update(v => !v);
    document.documentElement.classList.toggle('dark-mode', this.isDark());
  }
}
