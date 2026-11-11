import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="card" style="max-width: 400px; margin: 40px auto;">
        <h2 style="margin-bottom: 20px;">Prihlásenie</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Používateľské meno</label>
            <input id="username" type="text" formControlName="username">
            @if (loginForm.get('username')?.invalid && loginForm.get('username')?.touched) {
              <div class="error-text">Používateľské meno je povinné</div>
            }
          </div>

          <div class="form-group">
            <label for="password">Heslo</label>
            <input id="password" type="password" formControlName="password">
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <div class="error-text">Heslo je povinné</div>
            }
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid || loading">
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
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
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
}
