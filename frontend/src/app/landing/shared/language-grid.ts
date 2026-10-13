import { Component, input, output } from '@angular/core';
import { Language } from '../data/languages';
import { HoverAnimateDirective } from './hover-animate.directive';

/**
 * Logos de lenguajes: cuadrícula centrada en pantallas medianas/grandes y
 * fila deslizable en móvil (antes dos marcados distintos + carousel de Materialize).
 */
@Component({
  selector: 'app-language-grid',
  imports: [HoverAnimateDirective],
  host: { class: 'language-grid' },
  template: `
    <ul class="language-grid__list">
      @for (language of languages(); track language.nombreToSelector) {
        <li class="language-grid__item">
          <button class="language-grid__button" type="button" [attr.aria-label]="language.title"
                  [appHoverAnimate]="animaciones" (click)="select.emit(language)">
            <img class="language-grid__image" [src]="language.imgUrl" [alt]="language.title" />
          </button>
        </li>
      }
    </ul>
  `,
  styles: `
    @use 'tokens' as *;
    @use 'mixins' as *;

    $item-size: 120px;

    :host {
      display: block;
    }

    .language-grid__list {
      @include list-reset;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: space(4);

      @include below(sm) {
        flex-wrap: nowrap;
        justify-content: flex-start;
        gap: space(3);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding: space(1) $gutter space(2);
        margin-inline: -$gutter;
      }
    }

    .language-grid__item {
      flex: 0 0 $item-size;

      @include below(sm) {
        flex-basis: 35%;
        scroll-snap-align: center;
      }
    }

    .language-grid__button {
      @include button-reset;
      display: block;
      width: 100%;
    }

    .language-grid__image {
      display: block;
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
    }
  `,
})
export class LanguageGrid {
  readonly languages = input.required<Language[]>();
  readonly select = output<Language>();
  protected readonly animaciones = ['bounce', 'swing', 'jello'];
}
