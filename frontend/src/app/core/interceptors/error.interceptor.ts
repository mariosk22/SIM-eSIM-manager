import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Nastala neočakávaná chyba pri komunikácii so serverom.';

      if (error.error) {
        if (typeof error.error === 'string') {
          message = error.error;
        } else if (error.error.message) {
          message = error.error.message;
        } else if (error.status === 0) {
          message = 'Server nie je dostupný. Skontroluj pripojenie k internetu alebo stav backendu.';
        } else if (error.status === 401) {
          message = 'Neautorizovaný prístup. Prosím prihlás sa znova.';
        } else if (error.status === 403) {
          message = 'Nemáš oprávnenie na túto akciu.';
        } else if (error.status === 404) {
          message = 'Požadovaný záznam nebol nájdený.';
        }
      }

      // Chyba sa zobrazí v DOM cez ErrorService, NIE v console
      errorService.setError(message);
      return throwError(() => error);
    })
  );
};
