import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { MessageModal } from '../shared/message-modal';

/** Carga los estilos del admin y pone el modal de mensajes (antes en views/admin.html). */
@Component({
  selector: 'app-admin-root',
  imports: [RouterOutlet, MessageModal],
  host: { class: 'admin' },
  template: `
    <router-outlet />
    <app-message-modal />
  `,
})
export class AdminRoot {
  constructor() {
    inject(ThemeService).use('admin');
    inject(Title).setTitle('ROMAEF | Admin');
  }
}
