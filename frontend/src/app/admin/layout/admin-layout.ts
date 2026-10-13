import { Component, DOCUMENT, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/** purple, azure, green, orange, danger, rose (material-dashboard). */
export const STYLE_OF_THE_MENU = 'azure';

/** Sidebar + navbar que antes incluía cada vista con ng-include. */
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly styleOfTheMenu = STYLE_OF_THE_MENU;
  protected readonly seccion = signal('');
  protected readonly menuCuentaAbierto = signal(false);
  /** En móvil material-dashboard muestra el sidebar con la clase `nav-open` en <html>. */
  protected readonly sidebarOpen = signal(false);
  protected readonly links = [
    { path: 'perfil', icon: 'person', label: 'Perfil' },
    { path: 'languages', icon: 'code', label: 'Lenguajes' },
    { path: 'empresas', icon: 'work', label: 'Empresas' },
    { path: 'articulos', icon: 'library_books', label: 'Artículos' },
    { path: 'inicio', icon: 'dashboard', label: 'Inicio' },
  ];

  constructor() {
    const html = inject(DOCUMENT).documentElement;
    effect(() => html.classList.toggle('nav-open', this.sidebarOpen()));
    inject(DestroyRef).onDestroy(() => html.classList.remove('nav-open'));

    // en una carga completa el layout se crea después del NavigationEnd inicial
    this.updateSeccion();
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => {
        this.updateSeccion();
        this.sidebarOpen.set(false);
        this.menuCuentaAbierto.set(false);
      });
  }

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }

  private updateSeccion(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) route = route.firstChild;
    this.seccion.set(route.data['seccion'] ?? '');
  }
}
