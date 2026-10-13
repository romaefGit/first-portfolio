import { Component, inject, signal } from '@angular/core';
import { getWidth } from '../../../core/utils';
import { EMPRESAS, ESTUDIOS, Experiencia } from '../../data/hoja-de-vida';
import { LandingNavService } from '../../landing-nav.service';
import { Atom } from '../../shared/atom';
import { Banner } from '../../shared/banner';
import { BottomSheet } from '../../shared/bottom-sheet';
import { ExperienceCard } from '../../shared/experience-card';
import { Footer } from '../../shared/footer';
import { HoverAnimateDirective } from '../../shared/hover-animate.directive';
import { Loader } from '../../shared/loader';
import { MenuButton } from '../../shared/menu-button';
import { usePageIntro } from '../../shared/page-intro';

@Component({
  selector: 'app-hojadevida',
  imports: [Atom, Banner, BottomSheet, ExperienceCard, Footer, HoverAnimateDirective, Loader, MenuButton],
  host: { class: 'hoja-de-vida' },
  templateUrl: './hojadevida.html',
  styleUrl: './hojadevida.scss',
})
export class HojaDeVida {
  protected readonly nav = inject(LandingNavService);
  protected readonly intro = usePageIntro({ revealDelay: 2000, removeLoaderDelay: 2000 });

  private readonly size = getWidth() < 1024 ? 'md' : 'lg';
  protected readonly imagenUno = `/public/landing/img/elegidas-hv/${this.size}/1.png`;
  protected readonly imagenDos = `/public/landing/img/elegidas-hv/${this.size}/2.png`;
  protected readonly imagenTres = `/public/landing/img/elegidas-hv/${this.size}/3.png`;

  protected readonly empresas = EMPRESAS;
  protected readonly estudios = ESTUDIOS;
  protected readonly abierta = signal<Experiencia | null>(null);
  protected readonly animacionesChip = ['pulse', 'swing', 'jello'];

  constructor() {
    this.nav.closeNav();
  }

  protected cerrar(open: boolean): void {
    if (!open) this.abierta.set(null);
  }
}
