import { Component, inject } from '@angular/core';
import { MessageService } from './message.service';

/** Markup de includes/modal_message.html y question_message.html, abierto sin Bootstrap JS. */
@Component({
  selector: 'app-message-modal',
  host: { '(document:keydown.escape)': 'messages.close(false)' },
  template: `
    @if (messages.current(); as modal) {
      <div class="modal fade show" style="display: block" role="dialog" tabindex="-1" (click)="messages.close(false)">
        <div class="modal-dialog" role="document" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header" [class]="'bg-' + modal.type">
              <h3 class="modal-title text-center text-white">{{ modal.title }}</h3>
              <button aria-label="Cerrar" class="close" type="button" (click)="messages.close(false)">
                <span class="text-white" aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="text-center">{{ modal.message }}</p>
            </div>
            <div class="modal-footer">
              <button class="btn text-white" [class]="'btn-' + modal.type" type="button" (click)="messages.close(true)">
                Aceptar
              </button>
              @if (modal.question) {
                <button class="btn text-white" [class]="'btn-' + modal.type" type="button" (click)="messages.close(false)">
                  Cancelar
                </button>
              }
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    }
  `,
})
export class MessageModal {
  protected readonly messages = inject(MessageService);
}
