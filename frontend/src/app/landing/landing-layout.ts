import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../core/theme.service';
import { Sidenav } from './shared/sidenav';

@Component({
  selector: 'app-landing-layout',
  imports: [RouterOutlet, Sidenav],
  host: { class: 'landing' },
  template: `
    <app-sidenav />
    <router-outlet />
  `,
})
export class LandingLayout {
  constructor() {
    inject(ThemeService).use('landing');
  }
}
