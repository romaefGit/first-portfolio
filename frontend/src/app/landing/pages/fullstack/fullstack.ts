import { Component, inject } from '@angular/core';
import { LandingNavService } from '../../landing-nav.service';
import { Footer } from '../../shared/footer';
import { Hero } from '../../shared/hero';
import { HoverAnimateDirective } from '../../shared/hover-animate.directive';
import { Loader } from '../../shared/loader';
import { usePageIntro } from '../../shared/page-intro';

@Component({
  selector: 'app-fullstack',
  imports: [Footer, Hero, HoverAnimateDirective, Loader],
  host: { class: 'fullstack' },
  templateUrl: './fullstack.html',
  styleUrl: './fullstack.scss',
})
export class Fullstack {
  protected readonly nav = inject(LandingNavService);
  protected readonly intro = usePageIntro({ revealDelay: 3000, removeLoaderDelay: 3000 });

  protected readonly profesionales = [
    {
      icono: 'format_paint',
      color: 'orange',
      titulo: 'Diseñador gráfico',
      descripcion:
        'Está orientado a diseñar todo lo que puede haber en una página, luego maquetar lo cual traduce volver el diseño en código HTML y CSS compatible con todos los navegadores (Chrome, Safari, Edge, FireFox, etc...)',
    },
    {
      icono: 'settings_overscan',
      color: 'green',
      titulo: 'Desarrollador Front - End',
      descripcion:
        'Se dedica a dejar los estilos tal cual el diseñador lo requiere, funcionalidades que conecten con la parte del back y algunas animaciones o maquetación de nuevas secciones en la página. Maquetar es pasar de diseño a código HTML y CSS.',
    },
    {
      icono: 'settings',
      color: 'teal',
      titulo: 'Desarrollador Back - End',
      descripcion: 'Se encarga de crear una estructura en el tema de la información a mostrar y manipular.',
    },
    {
      icono: 'search',
      color: 'red',
      titulo: 'SEO',
      descripcion:
        'Se encarga de posicionar una página web en los buscadores, esto lo logra con monitoreo constante, semanal o quincenal de que busquedas son las que mas hace la gente sobre el tema principal de la página, apartir de estos se generan estrategias, comprar keywords, generar contenido relacionado que lleve a la página y esta así se acerque más en los primeros lugares.',
    },
  ];

  constructor() {
    this.nav.closeNav();
  }
}
