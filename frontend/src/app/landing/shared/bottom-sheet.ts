import { Component, input, model } from '@angular/core';

/** Panel que sube desde abajo (antes `.modal.bottom-sheet` de Materialize con su JS). */
@Component({
  selector: 'app-bottom-sheet',
  host: { class: 'bottom-sheet', '(document:keydown.escape)': 'open.set(false)' },
  template: `
    @if (open()) {
      <div class="bottom-sheet__overlay" (click)="open.set(false)"></div>
      <div class="bottom-sheet__panel" role="dialog" aria-modal="true" [style.border-top-color]="color()">
        <button class="bottom-sheet__close" type="button" aria-label="Cerrar" (click)="open.set(false)">
          <i class="material-icons">close</i>
        </button>
        <ng-content />
      </div>
    }
  `,
  styles: `
    @use 'tokens' as *;
    @use 'mixins' as *;

    .bottom-sheet__overlay {
      position: fixed;
      inset: 0;
      z-index: 1002;
      background: rgba($color-black, 0.5);
      animation: bottom-sheet-fade 300ms ease-out;
    }

    .bottom-sheet__panel {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1003;
      max-height: 80%;
      overflow-y: auto;
      padding: space(4) space(5);
      background: #fafafa;
      border-top: 6px solid;
      animation: bottom-sheet-slide 300ms ease-out;

      @include below(sm) {
        padding: space(4) $gutter space(3);
      }
    }

    .bottom-sheet__close {
      @include button-reset;
      position: absolute;
      top: space(1.5);
      right: space(1.5);
      color: $color-text-muted;
    }

    @keyframes bottom-sheet-slide {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    @keyframes bottom-sheet-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
})
export class BottomSheet {
  readonly open = model(false);
  readonly color = input('#000');
}
