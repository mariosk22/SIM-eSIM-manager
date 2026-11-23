import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

interface LoginModel {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="container">
      <div class="card" style="max-width: 400px; margin: 40px auto;">
        <h2 style="margin-bottom: 20px;">Prihlásenie</h2>
        <form (submit)="onSubmit($event)">
          <div class="form-group">
            <label for="username">Používateľské meno</label>
            <input id="username" type="text" [formField]="loginForm.username">
            @if (loginForm.username().touched() && loginForm.username().invalid()) {
              <div class="error-text">Používateľské meno je povinné</div>
            }
          </div>

          <div class="form-group">
            <label for="password">Heslo</label>
            <input id="password" type="password" [formField]="loginForm.password">
            @if (loginForm.password().touched() && loginForm.password().invalid()) {
              <div class="error-text">Heslo je povinné</div>
            }
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="loginForm().invalid() || loading">
            {{ loading ? 'Prihlasujem...' : 'Prihlásiť sa' }}
          </button>
        </form>
        <p style="margin-top: 16px; font-size: 13px; color: #666;">
          Testovací účet: admin / admin123
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly loginModel = signal<LoginModel>({ username: '', password: '' });

  readonly loginForm = form(this.loginModel, (path) => {
    required(path.username);
    required(path.password);
  });

  loading = false;

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm().value()).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/sims']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
