import { Component, inject, signal } from '@angular/core';
import { BACK_END_LANGUAGES, FRONT_END_LANGUAGES, Language } from '../../data/languages';
import { LandingNavService, scrollToBottom } from '../../landing-nav.service';
import { Banner } from '../../shared/banner';
import { BottomSheet } from '../../shared/bottom-sheet';
import { Footer } from '../../shared/footer';
import { Hero } from '../../shared/hero';
import { HoverAnimateDirective } from '../../shared/hover-animate.directive';
import { LanguageGrid } from '../../shared/language-grid';
import { LiquidGauge } from '../../shared/liquid-gauge';
import { Loader } from '../../shared/loader';
import { usePageIntro } from '../../shared/page-intro';
import { ParallaxDirective } from '../../shared/parallax.directive';

@Component({
  selector: 'app-inicio',
  imports: [Banner, BottomSheet, Footer, Hero, HoverAnimateDirective, LanguageGrid, LiquidGauge, Loader, ParallaxDirective],
  host: { class: 'inicio' },
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  protected readonly nav = inject(LandingNavService);
  protected readonly intro = usePageIntro({
    revealDelay: 1000,
    removeLoaderDelay: 1000,
    onRevealed: () => {
      if (this.nav.consumeContactoPendiente()) scrollToBottom();
    },
  });

  protected readonly imagenUno = '/public/landing/img/elegidas/lg/1.png';
  protected readonly imagenDos = '/public/landing/img/elegidas/lg/2.png';
  protected readonly imagenTres = '/public/landing/img/elegidas/lg/3.png';

  protected readonly features = [
    {
      icon: 'flash_on',
      animation: 'jello',
      title: 'Desarrollo eficiente',
      text: 'Ofrezco un desarrollo a la medida basado en los requirimientos de la idea que tienes para una web o una app.',
    },
    {
      icon: 'group',
      animation: 'flip',
      title: 'Enfocado en la experiencia',
      text: 'Utilizando elementos y principios de diseño, con ayuda de componentes animados que proporciona retroalimentación a los usuarios.',
    },
  ];

  protected readonly frontEndLanguages = FRONT_END_LANGUAGES;
  protected readonly backEndLanguages = BACK_END_LANGUAGES;
  protected readonly lenguajeAbierto = signal<Language | null>(null);

  constructor() {
    this.nav.closeNav();
  }

  protected cerrar(open: boolean): void {
    if (!open) this.lenguajeAbierto.set(null);
  }
}
