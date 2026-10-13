import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Credenciales, Registro } from '../../auth/auth.service';
import { MessageService } from '../../shared/message.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messages = inject(MessageService);

  protected readonly modal = signal<'login' | 'signup' | null>(null);
  protected autenticacion: Credenciales = { email: '', password: '' };
  protected registro: Registro = { nombre: '', apellidos: '', email: '', password: '' };

  protected login(credenciales: Credenciales): void {
    this.auth.login(credenciales).subscribe({
      next: () => {
        this.modal.set(null);
        this.router.navigate(['/admin/inicio']);
      },
      error: (err) => {
        this.autenticacion.password = '';
        this.messages.error('No se pudo iniciar sesión, verfica los datos que ingresaste.');
        console.log('error en el logueo > ', err);
      },
    });
  }

  protected signup(): void {
    this.auth.signup(this.registro).subscribe({
      next: (res) => {
        if (!res.status) {
          this.messages.error('No se pudo registrar, vuelve a intentarlo.');
          return;
        }
        this.modal.set(null);
        this.messages.success('¡Su registro fue exitioso!');
        setTimeout(() => this.login(res.autenticacion), 1000);
      },
      error: (err) => {
        this.messages.error('No se pudo registrar, vuelve a intentarlo.');
        console.log('error en el registro > ', err);
      },
    });
  }
}
