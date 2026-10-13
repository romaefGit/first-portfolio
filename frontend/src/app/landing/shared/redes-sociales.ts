import { Component } from '@angular/core';
import { HoverAnimateDirective } from './hover-animate.directive';

@Component({
  selector: 'app-redes-sociales',
  imports: [HoverAnimateDirective],
  host: { class: 'social-links' },
  template: `
    <ul class="social-links__list">
      @for (red of redes; track red.url) {
        <li class="social-links__item" appHoverAnimate="pulse">
          <a class="social-links__link" [href]="red.url" target="_blank" rel="noopener" [attr.aria-label]="red.nombre">
            <img class="social-links__icon" [src]="red.icon" [alt]="red.nombre" />
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    @use 'tokens' as *;
    @use 'mixins' as *;

    :host {
      display: block;
    }

    .social-links__list {
      @include list-reset;
      display: flex;
      justify-content: center;
      gap: space(2);

      @include below(sm) {
        gap: space(1.5);
      }
    }

    .social-links__link {
      display: block;
    }

    .social-links__icon {
      display: block;
      width: 48px;
      height: 48px;
      object-fit: contain;

      @include below(sm) {
        width: 40px;
        height: 40px;
      }
    }
  `,
})
export class RedesSociales {
  protected readonly redes = [
    { nombre: 'Instagram', url: 'https://www.instagram.com/romaef_/', icon: '/public/landing/img/icons/instagram.png' },
    { nombre: 'Twitter', url: 'https://twitter.com/romaestradaflo', icon: '/public/landing/img/icons/twit.png' },
    { nombre: 'Facebook', url: 'https://www.facebook.com/romaef/', icon: '/public/landing/img/icons/facebook.png' },
    { nombre: 'GitHub', url: 'https://gist.github.com/RomarioEstrada', icon: '/public/landing/img/icons/git_hub.png' },
    {
      nombre: 'LinkedIn',
      url: 'https://www.linkedin.com/in/romario-augusto-estrada-fl%C3%B3rez-18b66a159',
      icon: '/public/landing/img/icons/linkedin.png',
    },
  ];
}
