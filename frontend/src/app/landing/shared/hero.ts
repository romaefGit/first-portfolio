import { Component, input, output, signal } from '@angular/core';
import { MenuButton } from './menu-button';
import { RedesSociales } from './redes-sociales';

/**
 * Encabezado con nombre, foto, subtítulo y redes (inicio y fullstack).
 * El fondo se proyecta con `<div heroBackground>`.
 */
@Component({
  selector: 'app-hero',
  imports: [MenuButton, RedesSociales],
  host: { class: 'hero' },
  template: `
    <div class="hero__background">
      <ng-content select="[heroBackground]" />
    </div>

    <app-menu-button />

    <div class="hero__content">
      <h1 class="hero__title animated" [class.bounceInDown]="revealed()">{{ title() }}</h1>

      <div class="hero__photo animated" [class.bounceIn]="revealed()">
        <!-- al pasar el mouse cambia a la imagen "alien" -->
        @if (!alien()) {
          <img class="hero__image animated fadeIn" src="/public/landing/img/menu/img_perfil_2.png" alt="Romario"
               (mouseenter)="alien.set(true)" />
        } @else {
          <img class="hero__image animated fadeIn" src="/public/landing/img/menu/romaef.png" alt="romaef"
               (mouseleave)="alien.set(false)" />
        }
      </div>

      @if (subtitleClickable()) {
        <button class="hero__subtitle hero__subtitle--link animated bounceIn" type="button" [class.bounceInUp]="revealed()"
                (click)="subtitleClick.emit()">
          {{ subtitle() }}
        </button>
      } @else {
        <p class="hero__subtitle animated bounceIn" [class.bounceInUp]="revealed()">{{ subtitle() }}</p>
      }
    </div>

    <app-redes-sociales class="hero__social" />
  `,
  styleUrl: './hero.scss',
})
export class Hero {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly subtitleClickable = input(false);
  /** Activa las animaciones de entrada cuando se abre el loader. */
  readonly revealed = input(false);
  readonly subtitleClick = output<void>();

  protected readonly alien = signal(false);
}
