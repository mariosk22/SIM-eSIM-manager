import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error = signal<string | null>(null);
  error = this._error.asReadonly();

  setError(message: string | null) {
    this._error.set(message);
  }

  clear() {
    this._error.set(null);
  }
}
