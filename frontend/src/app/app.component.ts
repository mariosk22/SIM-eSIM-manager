import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ErrorAlertComponent } from './shared/components/error-alert/error-alert.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, ErrorAlertComponent],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
    <app-navbar></app-navbar>
    <app-error-alert></app-error-alert>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
