import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

export interface ModalMessage {
  type: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  message: string;
}

interface OpenModal extends ModalMessage {
  question: boolean;
  resolve: (accepted: boolean) => void;
}

/** Reemplaza alertMessage()/questionMessage() de globalAdmCtrl y los modales de Bootstrap. */
@Injectable({ providedIn: 'root' })
export class MessageService {
  readonly current = signal<OpenModal | null>(null);

  alert(modal: ModalMessage): void {
    this.open(modal, false);
  }

  /** Resuelve true si el usuario presiona "Aceptar". */
  confirm(modal: ModalMessage): Promise<boolean> {
    return this.open(modal, true);
  }

  success(message: string): void {
    this.alert({ type: 'success', title: 'Mensaje', message });
  }

  error(errOrMessage: unknown, fallback = 'Ocurrió un error.'): void {
    const message =
      typeof errOrMessage === 'string'
        ? errOrMessage
        : errOrMessage instanceof HttpErrorResponse
          ? (errOrMessage.error?.message ?? fallback)
          : fallback;
    this.alert({ type: 'danger', title: 'Error', message });
    if (typeof errOrMessage !== 'string') console.error('error > ', errOrMessage);
  }

  close(accepted: boolean): void {
    const modal = this.current();
    this.current.set(null);
    modal?.resolve(accepted);
  }

  private open(modal: ModalMessage, question: boolean): Promise<boolean> {
    this.current()?.resolve(false);
    return new Promise((resolve) => this.current.set({ ...modal, question, resolve }));
  }
}
