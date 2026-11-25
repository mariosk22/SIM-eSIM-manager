import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive],
    template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">SIM/eSIM Manager</div>
        @if (authService.isLoggedIn()) {
          <div class="nav-links">
            <a routerLink="/sims" routerLinkActive="active">SIM karty</a>
            <a routerLink="/customers" routerLinkActive="active">Zákazníci</a>
            <a routerLink="/reviews" routerLinkActive="active">Recenzie</a>
            <button class="logout-btn" (click)="logout()">Odhlásiť sa</button>
          </div>
        } @else {
          <div class="nav-links">
            <a routerLink="/login" routerLinkActive="active">Prihlásenie</a>
          </div>
        }
      </div>
    </nav>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: [`
    .navbar {
      background-color: #1976d2;
      color: white;
      padding: 12px 0;
    }
    .nav-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-brand {
      font-size: 18px;
      font-weight: bold;
    }
    .nav-links {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
    }
    .nav-links a.active {
      text-decoration: underline;
    }
    .logout-btn {
      background: none;
      border: 1px solid white;
      color: white;
      padding: 6px 12px;
      cursor: pointer;
      border-radius: 4px;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
