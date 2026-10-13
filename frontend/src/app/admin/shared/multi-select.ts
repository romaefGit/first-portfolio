import { Component, computed, input, model, signal } from '@angular/core';

/** Reemplazo de <multiple-autocomplete> (angular-multiple-select): chips + autocompletado. */
@Component({
  selector: 'app-multi-select',
  host: { class: 'multi-select' },
  template: `
    <div class="multi-select__field">
      @for (item of selected(); track keyOf(item)) {
        <span class="multi-select__chip">
          {{ labelOf(item) }}
          <button class="multi-select__chip-remove" type="button" [attr.aria-label]="'Quitar ' + labelOf(item)"
                  (click)="remove(item)">×</button>
        </span>
      }
      <input
        class="multi-select__input"
        type="text"
        [value]="query()"
        (input)="query.set($any($event.target).value)"
        (focus)="focused.set(true)"
        (blur)="focused.set(false)"
        (keydown.enter)="$event.preventDefault(); addFirst()"
        placeholder="Buscar..."
      />
    </div>
    @if (focused() && matches().length) {
      <ul class="multi-select__suggestions">
        @for (item of matches(); track keyOf(item)) {
          <li class="multi-select__suggestion" (mousedown)="add(item)">{{ labelOf(item) }}</li>
        }
      </ul>
    }
  `,
  styles: `
    @use 'tokens' as *;
    @use 'mixins' as *;

    :host {
      position: relative;
      display: block;
    }

    .multi-select__field {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: space(1);
      min-height: 36px;
      padding: space(0.5) 0;
      border-bottom: 1px solid #d2d2d2;

      &:focus-within {
        border-bottom: 2px solid $color-admin-success;
      }
    }

    .multi-select__chip {
      display: inline-flex;
      align-items: center;
      gap: space(0.5);
      padding: space(0.5) space(1.5);
      border-radius: $radius-pill;
      background: $color-admin-primary;
      color: $color-white;
      font-size: 13px;
    }

    .multi-select__chip-remove {
      @include button-reset;
      color: $color-white;
      font-size: 16px;
      line-height: 1;
    }

    .multi-select__input {
      flex: 1;
      min-width: 120px;
      border: 0;
      outline: 0;
      background: transparent;
    }

    .multi-select__suggestions {
      @include list-reset;
      position: absolute;
      z-index: 10;
      left: 0;
      right: 0;
      max-height: 220px;
      overflow-y: auto;
      background: $color-white;
      box-shadow: 0 4px 12px rgba($color-black, 0.15);
    }

    .multi-select__suggestion {
      padding: space(1) space(2);
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  `,
})
export class MultiSelect<T extends object> {
  readonly suggestions = input.required<T[]>();
  readonly selected = model<T[]>([]);
  /** Propiedad que se muestra (object-property). */
  readonly property = input.required<keyof T & string>();
  /** Propiedad que identifica cada item. */
  readonly key = input.required<keyof T & string>();

  protected readonly query = signal('');
  protected readonly focused = signal(false);

  protected readonly matches = computed(() => {
    const q = this.query().toLowerCase();
    const chosen = new Set(this.selected().map((i) => this.keyOf(i)));
    return this.suggestions().filter(
      (i) => !chosen.has(this.keyOf(i)) && this.labelOf(i).toLowerCase().includes(q),
    );
  });

  protected keyOf(item: T): unknown {
    return item[this.key()];
  }

  protected labelOf(item: T): string {
    return String(item[this.property()] ?? '');
  }

  protected add(item: T): void {
    this.selected.update((s) => [...s, item]);
    this.query.set('');
  }

  protected addFirst(): void {
    const first = this.matches()[0];
    if (first) this.add(first);
  }

  protected remove(item: T): void {
    this.selected.update((s) => s.filter((i) => this.keyOf(i) !== this.keyOf(item)));
  }
}
