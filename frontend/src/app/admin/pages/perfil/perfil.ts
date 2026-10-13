import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { AuthService, Usuario } from '../../auth/auth.service';
import { ApiService } from '../../services/api.service';
import { ImageUpload } from '../../shared/image-upload';
import { MessageService } from '../../shared/message.service';

interface PerfilForm extends Usuario {
  password_actual?: string;
  password_nuevo?: string;
}

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, ImageUpload],
  templateUrl: './perfil.html',
  styles: `
    .perfil {
      max-width: 960px;
      margin-inline: auto;
    }
  `,
})
export class Perfil implements OnInit {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);
  private readonly messages = inject(MessageService);

  protected readonly perfil = signal<PerfilForm | null>(null);
  private file: File | null = null;

  private get idusuario(): number {
    return this.auth.usuario()!.idusuario;
  }

  ngOnInit(): void {
    this.load();
  }

  protected foto(perfil: PerfilForm): string {
    const url = perfil.media?.url;
    return url ? `/public/img/usuarios/${encodeURIComponent(url)}` : '/public/images/1.jpg';
  }

  protected onFile(file: File): void {
    this.file = file;
  }

  protected updatePerfil(perfil: PerfilForm): void {
    const file = this.file;
    const cambiarPassword = !!perfil.password_actual && !!perfil.password_nuevo;

    forkJoin({
      imagen: file ? this.api.uploadUserImage(this.idusuario, file) : of(null),
      password: cambiarPassword ? this.api.updatePassword(this.idusuario, perfil) : of(null),
      datos: this.api.updateUsuario(this.idusuario, perfil),
    }).subscribe({
      next: ({ imagen, password, datos }) => {
        if (imagen && !imagen.status) {
          this.messages.error('Hubo un error al subir la imagen.');
          return;
        }
        if (password && !password.status) {
          this.messages.error(password.message);
          return;
        }
        this.file = null;
        this.messages.success(datos.message);
        this.load();
      },
      error: (err) => this.messages.error(err),
    });
  }

  protected async deleteImage(perfil: PerfilForm): Promise<void> {
    if (!perfil.media) return;
    const accepted = await this.messages.confirm({
      type: 'danger',
      title: 'Alerta',
      message: '¿Desea eliminar esta imagen?',
    });
    if (!accepted) return;

    this.api.deleteUserImage(this.idusuario, perfil.media).subscribe({
      next: (res) => {
        if (res.status) {
          this.messages.success('Se eliminó la imagen correctamente.');
          this.load();
        } else {
          this.messages.error('No se pudo eliminar la imagen.');
        }
      },
      error: (err) => this.messages.error(err),
    });
  }

  private load(): void {
    this.api.getUsuario(this.idusuario).subscribe({
      next: (usuario) => {
        this.perfil.set({ ...usuario });
        // mantiene nombre/foto del navbar e inicio al día
        this.auth.usuario.set({ ...this.auth.usuario()!, ...usuario });
        localStorage.setItem('usuarioLogueado', JSON.stringify(this.auth.usuario()));
      },
      error: (err) => this.messages.error(err),
    });
  }
}
