import { Directive, ElementRef, inject, input } from '@angular/core';
import { animateCss, randomItem } from '../../core/utils';

/**
 * Reemplaza los `$(document).on('mouseenter', '.x', ...animateCss())`.
 * Recibe una animación de animate.css o una lista para escoger una al azar.
 */
@Directive({
  selector: '[appHoverAnimate]',
  host: { '(mouseenter)': 'play()' },
})
export class HoverAnimateDirective {
  readonly appHoverAnimate = input.required<string | readonly string[]>();
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected play(): void {
    const value = this.appHoverAnimate();
    animateCss(this.el, typeof value === 'string' ? value : randomItem(value));
  }
}
