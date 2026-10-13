import { Component, input, output } from '@angular/core';
import { Experiencia } from '../data/hoja-de-vida';
import { HoverAnimateDirective } from './hover-animate.directive';

/** Tarjeta de empresa / estudio en la hoja de vida. */
@Component({
  selector: 'app-experience-card',
  imports: [HoverAnimateDirective],
  host: { class: 'experience-card' },
  template: `
    <article class="experience-card__card" appHoverAnimate="bounce">
      <div class="experience-card__media" [style.background]="item().color">
        <img class="experience-card__image" [src]="item().urlImagen" [alt]="item().titulo" />
      </div>
      <p class="experience-card__summary">{{ resumen() }}</p>
      <button class="experience-card__action" type="button" [style.background-color]="item().colorText" (click)="more.emit()">
        Quiero saber más...
      </button>
    </article>
  `,
  styles: `
    @use 'tokens' as *;
    @use 'mixins' as *;

    // ocupa todo el alto de la celda para que las tarjetas de una fila midan lo mismo
    :host {
      display: block;
      height: 100%;
    }

    .experience-card__card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: $color-white;
      border-radius: 2px;
      box-shadow:
        0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12),
        0 1px 5px 0 rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }

    .experience-card__image {
      display: block;
      width: 100%;
    }

    .experience-card__summary {
      flex: 1;
      margin: 0;
      padding: space(2) space(2.5);
      text-align: center;
      font-size: $font-size-body-mobile;
      line-height: 1.6;
      color: $color-text;
    }

    .experience-card__action {
      @include button-reset;
      padding: space(2) space(2.5);
      color: $color-white;
      font-size: 0.85rem;
      text-transform: uppercase;
      text-align: left;
    }
  `,
})
export class ExperienceCard {
  readonly item = input.required<Experiencia>();
  readonly more = output<void>();

  protected resumen(): string {
    const text = this.item().descripcion;
    return text.length > 90 ? `${text.slice(0, 90)}...` : text;
  }
}
