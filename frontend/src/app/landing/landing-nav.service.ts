import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { disableScrolling, enableScrolling } from '../core/utils';

/** Reemplaza globalCtrl: menú lateral y navegación entre páginas del landing. */
@Injectable({ providedIn: 'root' })
export class LandingNavService {
  private readonly router = inject(Router);

  readonly sidenavOpen = signal(false);

  openNav(): void {
    this.sidenavOpen.set(true);
    disableScrolling();
  }

  closeNav(): void {
    this.sidenavOpen.set(false);
    enableScrolling();
  }

  inicio(): void {
    this.goTo('/inicio');
  }

  hojaDeVida(): void {
    this.goTo('/informacion');
  }

  fullstack(): void {
    this.goTo('/fullstack');
  }

  goToContact(): void {
    if (this.isAt('/inicio')) {
      this.closeNav();
      scrollToBottom();
    } else {
      // Inicio baja al formulario cuando termine su loader
      this.contactoPendiente = true;
      this.goTo('/inicio');
    }
  }

  /** true una sola vez si se pidió ir a Contacto desde otra página. */
  consumeContactoPendiente(): boolean {
    const pendiente = this.contactoPendiente;
    this.contactoPendiente = false;
    return pendiente;
  }

  private contactoPendiente = false;

  private goTo(path: string): void {
    if (this.isAt(path)) {
      this.closeNav();
    } else {
      this.closeNav();
      this.router.navigateByUrl(path);
    }
  }

  private isAt(path: string): boolean {
    return this.router.url.split('?')[0] === path;
  }
}

export function scrollToBottom(): void {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
}
