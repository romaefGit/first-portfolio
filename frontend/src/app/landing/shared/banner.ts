import { Component, input } from '@angular/core';
import { ParallaxDirective } from './parallax.directive';

/** Dirección de la diagonal: `rtl` baja de derecha a izquierda, `ltr` al revés. */
export type EdgeDirection = 'rtl' | 'ltr';

/**
 * Franja con imagen en parallax, título y bordes diagonales blancos
 * (antes `.parallax-container` + `.diagonal-dev-*`).
 */
@Component({
  selector: 'app-banner',
  imports: [ParallaxDirective],
  host: { class: 'banner' },
  template: `
    <div class="banner__media" appParallax>
      <img [src]="image()" alt="" />
    </div>
    @if (edgeTop(); as dir) {
      <div class="banner__edge banner__edge--top" [class]="'banner__edge--' + dir"></div>
    }
    <div class="banner__content">
      <ng-content />
      <h2 class="banner__title" [attr.id]="titleId()">{{ title() }}</h2>
    </div>
    @if (edgeBottom(); as dir) {
      <div class="banner__edge banner__edge--bottom" [class]="'banner__edge--' + dir"></div>
    }
  `,
  styleUrl: './banner.scss',
})
export class Banner {
  readonly image = input.required<string>();
  readonly title = input.required<string>();
  readonly titleId = input<string | null>(null);
  readonly edgeTop = input<EdgeDirection | null>(null);
  readonly edgeBottom = input<EdgeDirection | null>(null);
}
