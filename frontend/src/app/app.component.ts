import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ErrorAlertComponent } from './shared/components/error-alert/error-alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ErrorAlertComponent],
  template: `
    <app-navbar></app-navbar>
    <app-error-alert></app-error-alert>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
