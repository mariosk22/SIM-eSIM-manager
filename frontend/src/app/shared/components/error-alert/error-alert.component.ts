import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { ErrorService } from '../../../core/services/error.service';

@Component({
    selector: 'app-error-alert',
    imports: [],
    template: `
    @if (errorService.error()) {
      <div class="error-alert">
        {{ errorService.error() }}
        <button class="close-btn" (click)="close()">✕</button>
      </div>
    }
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: [`
    .error-alert {
      background-color: #f8d7da;
      color: #721c24;
      padding: 12px 40px 12px 16px;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      margin: 16px auto;
      max-width: 1100px;
      position: relative;
    }
    .close-btn {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: #721c24;
    }
  `]
})
export class ErrorAlertComponent {
  errorService = inject(ErrorService);

  close() {
    this.errorService.clear();
  }
}
