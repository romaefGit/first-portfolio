import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

/** Tarjeta de bienvenida (antes includes/info_card.html). */
@Component({
  selector: 'app-admin-inicio',
  imports: [RouterLink],
  template: `
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <div class="card card-profile">
          <div class="card-avatar">
            <a routerLink="/admin/perfil">
              <img class="img" [src]="foto()" alt="" />
            </a>
          </div>
          <div class="card-body">
            <h6 class="card-category text-gray">Administrador</h6>
            <h4 class="card-title">{{ usuario()?.nombre }} {{ usuario()?.apellidos }}</h4>
            <p class="card-description">{{ usuario()?.email }}</p>
            <a class="btn btn-primary btn-round" routerLink="/admin/perfil">Ir a Perfil</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminInicio {
  protected readonly usuario = inject(AuthService).usuario;

  protected foto(): string {
    const url = this.usuario()?.media?.url;
    return url ? `/public/img/usuarios/${encodeURIComponent(url)}` : '/public/images/1.jpg';
  }
}
