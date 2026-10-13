import { Component, input, output } from '@angular/core';

/** Encabezado de pestañas Listar / Crear / Editar de las páginas CRUD. */
@Component({
  selector: 'app-crud-tabs',
  template: `
    <div class="card-header card-header-tabs card-header-info">
      <div class="nav-tabs-navigation">
        <div class="nav-tabs-wrapper">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link u-pointer" [class.active]="tab() === 1" (click)="tabChange.emit(1)">
                <i class="material-icons">list</i> Listar
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link u-pointer" [class.active]="tab() === 2" (click)="tabChange.emit(2)">
                <i class="material-icons">create</i> Crear
              </a>
            </li>
            @if (editLabel() !== null) {
              <li class="nav-item">
                <a class="nav-link u-pointer" [class.active]="tab() === 3" (click)="tabChange.emit(3)">
                  <i class="material-icons">edit</i> Editar {{ editLabel() }}
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class CrudTabs {
  readonly tab = input.required<number>();
  /** null = no hay nada en edición (oculta la pestaña). */
  readonly editLabel = input<string | null>(null);
  readonly tabChange = output<1 | 2 | 3>();
}
