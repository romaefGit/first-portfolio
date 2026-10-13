import { DOCUMENT, Injectable, inject } from '@angular/core';

/**
 * Landing (Materialize) y admin (material-dashboard / Bootstrap 4) usan frameworks CSS
 * que chocan entre sí, así que en vez de empaquetarlos juntos se cargan como <link>
 * según la sección activa. Los archivos viven en /public y los sirve Express.
 * Los estilos propios están en SCSS dentro de cada componente.
 */
const THEMES = {
  landing: [
    '/public/landing/materialicons.css',
    '/public/landing/materialize.css',
    '/public/landing/animate.css',
  ],
  admin: [
    '/public/admin/material-dashboard.css',
    '/public/admin/bootstrap/css/bootstrap.css',
  ],
} as const;

export type Theme = keyof typeof THEMES;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private current: Theme | null = null;

  use(theme: Theme): void {
    if (this.current === theme) return;
    this.current = theme;

    const head = this.document.head;
    head.querySelectorAll('link[data-theme]').forEach((l) => l.remove());
    // antes de los estilos de la app para que estos puedan sobrescribir al framework
    const anchor = head.querySelector('link[rel=stylesheet]:not([data-theme]), style');
    for (const href of THEMES[theme]) {
      const link = this.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset['theme'] = theme;
      head.insertBefore(link, anchor);
    }
  }
}
