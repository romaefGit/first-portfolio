import { Directive, OnInit, inject, signal } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { Media } from '../../core/api';
import { CrudApi, SaveResponse } from '../services/api.service';
import { MessageService } from './message.service';

type Tab = 1 | 2 | 3;

/**
 * Lógica común de languages/empresas/articulos: pestañas Listar/Crear/Editar,
 * guardar + subir imagen, y eliminar con confirmación.
 */
@Directive()
export abstract class CrudPage<T extends { media?: Media | null }> implements OnInit {
  protected readonly messages = inject(MessageService);

  protected abstract readonly api: CrudApi<T>;
  protected abstract readonly idKey: keyof T & string;
  /** "lenguaje", "empresa", "artículo" para los mensajes. */
  protected abstract readonly nombre: string;

  protected readonly tab = signal<Tab>(1);
  protected readonly items = signal<T[]>([]);
  /** Formulario de "Crear". */
  protected nuevo: Partial<T> = {};
  /** Copia del item en "Editar". */
  protected readonly editando = signal<T | null>(null);
  protected file: File | null = null;

  ngOnInit(): void {
    this.refresh();
  }

  protected refresh(): void {
    this.api.list().subscribe({
      next: (items) => this.items.set(items),
      error: (err) => this.messages.error(err),
    });
  }

  protected setTab(tab: Tab): void {
    if (tab !== 3) {
      this.nuevo = this.emptyForm();
      this.editando.set(null);
    }
    this.file = null;
    this.tab.set(tab);
  }

  protected openEdit(item: T): void {
    this.file = null;
    this.editando.set(structuredClone(item));
    this.tab.set(3);
  }

  protected imageOf(item: Partial<T> | null): string {
    const url = item?.media?.url;
    return `${this.api.imgBase}/${url ? encodeURIComponent(url) : 'default.png'}`;
  }

  /** Texto recortado para la tabla (antes `| limitTo: 100` + '...'). */
  protected resumen(text: string | null | undefined, max = 100): string {
    if (!text) return '';
    return text.length > max ? `${text.slice(0, max)}...` : text;
  }

  protected idOf(item: T): number {
    return Number(item[this.idKey]);
  }

  /** POST/PUT y, si se escogió imagen, la sube con el id del registro. */
  protected save(request: Observable<SaveResponse>, id: number | null, successMessage?: string): void {
    const file = this.file;
    request
      .pipe(
        switchMap((res) => {
          const savedId = id ?? Number(res[this.idKey]);
          if (!file) return of({ res, uploadOk: true });
          return this.api.uploadImage(savedId, file).pipe(map((up) => ({ res, uploadOk: up.status })));
        }),
      )
      .subscribe({
        next: ({ res, uploadOk }) => {
          if (!uploadOk) {
            this.messages.error('Hubo un error al subir la imagen.');
          } else if (res.status) {
            this.messages.success(successMessage ?? res.message);
            this.setTab(1);
            this.refresh();
          } else {
            this.messages.error(res.message);
          }
        },
        error: (err) => this.messages.error(err),
      });
  }

  protected async confirmDelete(item: T): Promise<void> {
    const accepted = await this.messages.confirm({
      type: 'danger',
      title: 'Alerta',
      message: `¿Desea eliminar este ${this.nombre}?`,
    });
    if (!accepted) return;

    this.api.remove(this.idOf(item), item.media).subscribe({
      next: (res) => {
        if (res.status) {
          this.messages.success(res.message);
          this.refresh();
        } else {
          this.messages.error(res.message);
        }
      },
      error: (err) => this.messages.error(err),
    });
  }

  protected emptyForm(): Partial<T> {
    return {};
  }
}
