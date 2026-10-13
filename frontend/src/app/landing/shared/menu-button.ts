import { Component, inject } from '@angular/core';
import { LandingNavService } from '../landing-nav.service';

/** Botón hamburguesa de la esquina superior izquierda que abre el sidenav. */
@Component({
  selector: 'app-menu-button',
  host: { class: 'menu-button' },
  template: `
    <button class="menu-button__trigger" type="button" aria-label="Abrir menú" (click)="nav.openNav()">
      <i class="material-icons menu-button__icon">menu</i>
    </button>
  `,
  styles: `
    @use 'tokens' as *;
    @use 'mixins' as *;

    :host {
      position: absolute;
      top: space(2.5);
      left: space(2.5);
      z-index: 4;
    }

    .menu-button__trigger {
      @include button-reset;
      color: $color-white;
    }

    .menu-button__icon {
      font-size: 45px;
    }
  `,
})
export class MenuButton {
  protected readonly nav = inject(LandingNavService);
}
