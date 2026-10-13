import { Component, input, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

/**
 * El formulario antes hacía POST a http://www.romaef.com/views/email.php, que ya no existe
 * y no tiene equivalente en este servidor. Mientras no haya endpoint, se abre el cliente de
 * correo del visitante con el mensaje ya armado.
 */
export const CONTACT_EMAIL = 'romarioestrada.ff@hotmail.com';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  host: { class: 'site-footer' },
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly mostrarContacto = input(false);

  protected readonly enviado = signal(false);
  protected data = { nombre: '', correo: '', mensaje: '' };

  protected enviarCorreo(form: NgForm): void {
    if (form.invalid) return;
    const subject = encodeURIComponent(`Contacto desde romaef.com - ${this.data.nombre}`);
    const body = encodeURIComponent(`${this.data.mensaje}\n\n${this.data.nombre} <${this.data.correo}>`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    this.enviado.set(true);
    setTimeout(() => {
      this.enviado.set(false);
      this.data = { nombre: '', correo: '', mensaje: '' };
      form.resetForm();
    }, 5000);
  }
}
