import { Component, input } from '@angular/core';

/** Pantalla de carga: dos paneles que se abren hacia los lados cuando `open` pasa a true. */
@Component({
  selector: 'app-loader',
  host: { class: 'loader', '[class.loader--open]': 'open()' },
  template: `
    <div class="loader__spinner animated bounceIn"></div>
    <div class="loader__panel loader__panel--left"></div>
    <div class="loader__panel loader__panel--right"></div>
  `,
  styleUrl: './loader.scss',
})
export class Loader {
  readonly open = input(false);
}
