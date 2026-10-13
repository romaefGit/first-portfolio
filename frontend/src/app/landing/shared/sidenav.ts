import { Component, inject } from '@angular/core';
import { LandingNavService } from '../landing-nav.service';

@Component({
  selector: 'app-sidenav',
  template: `
    @if (nav.sidenavOpen()) {
      <nav class="sidenav animated fadeIn" aria-label="Menú principal">
        <button class="sidenav__close" type="button" aria-label="Cerrar menú" (click)="nav.closeNav()">
          <i class="material-icons sidenav__close-icon">close</i>
        </button>
        <ul class="sidenav__list">
          @for (item of items; track item.label; let last = $last) {
            <li class="sidenav__item">
              <button class="sidenav__link" type="button" (click)="item.action()">{{ item.label }}</button>
            </li>
            @if (!last) {
              <li class="sidenav__divider" aria-hidden="true"></li>
            }
          }
        </ul>
        <a class="sidenav__github" href="https://gist.github.com/RomarioEstrada" target="_blank" rel="noopener">
          <img class="sidenav__github-icon" alt="GitHub" src="/public/landing/img/icons/git_hub.png" />
        </a>
      </nav>
    }
  `,
  styles: `
    @use 'tokens' as *;
    @use 'mixins' as *;

    .sidenav {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: space(5);
      overflow-y: auto;
      padding: space(18) $gutter space(6);
      background-color: $color-brand;
      animation-duration: 0.2s;

      @include below(sm) {
        padding-top: space(10);
        gap: space(4);
      }
    }

    .sidenav__close {
      @include button-reset;
      position: absolute;
      top: space(2.5);
      left: space(2.5);
      color: $color-white;
    }

    .sidenav__close-icon {
      font-size: 60px;
    }

    .sidenav__list {
      @include list-reset;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .sidenav__link {
      @include button-reset;
      padding: space(2) space(3);
      font-size: 36px;
      font-weight: 300;
      color: $color-white;

      @include below(sm) {
        font-size: 28px;
        padding-block: space(1.5);
      }
    }

    .sidenav__divider {
      width: 30%;
      height: 1px;
      background-color: rgba($color-white, 0.4);

      @include below(sm) {
        width: 80%;
      }
    }

    .sidenav__github-icon {
      display: block;
      width: 50px;
    }
  `,
})
export class Sidenav {
  protected readonly nav = inject(LandingNavService);
  protected readonly items = [
    { label: 'Inicio', action: () => this.nav.inicio() },
    { label: 'Hoja de vida', action: () => this.nav.hojaDeVida() },
    { label: '¿Full stack?', action: () => this.nav.fullstack() },
    { label: 'Contacto', action: () => this.nav.goToContact() },
  ];
}
