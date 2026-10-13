import { Component, computed, input, output, signal } from '@angular/core';

const MAX_SIZE = 1_000_000;

/**
 * Foto circular con botón para escoger imagen y vista previa.
 * Reemplaza ng-file-upload + los handlers `$('.file-upload').on('change')` + lightbox2.
 */
@Component({
  selector: 'app-image-upload',
  host: { class: 'image-upload' },
  template: `
    <button class="image-upload__frame" type="button" [attr.aria-label]="'Ver ' + title()" (click)="preview.set(true)">
      <span class="image-upload__picture" [style.background-image]="'url(' + shown() + ')'"></span>
    </button>

    <button class="image-upload__action image-upload__action--upload" type="button" aria-label="Escoger imagen"
            (click)="input.click()">
      <i class="material-icons">add_a_photo</i>
    </button>
    <input #input class="image-upload__input" type="file" accept="image/*" (change)="onFile(input)" />

    @if (deletable()) {
      <button class="image-upload__action image-upload__action--delete" type="button" aria-label="Eliminar imagen"
              (click)="delete.emit()">
        <i class="material-icons">delete_forever</i>
      </button>
    }

    @if (preview()) {
      <div class="image-upload__preview" (click)="preview.set(false)">
        <img class="image-upload__preview-image" [src]="shown()" [alt]="title()" />
        @if (title()) {
          <p class="image-upload__preview-caption">{{ title() }}</p>
        }
      </div>
    }
  `,
  styles: `
    @use 'tokens' as *;
    @use 'mixins' as *;

    $size: 220px;

    :host {
      position: relative;
      display: block;
      width: $size;
      margin: space(4) auto space(2);
    }

    .image-upload__frame {
      @include button-reset;
      display: block;
      width: $size;
      height: $size;
    }

    .image-upload__picture {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #aeaeaee6;
      background-size: cover;
      background-position: center;
      transition: border-color 0.3s;

      .image-upload__frame:hover & {
        border-color: #32e8ffe6;
      }
    }

    .image-upload__input {
      display: none;
    }

    .image-upload__action {
      @include button-reset;
      position: absolute;
      bottom: -(space(1));
      color: $color-admin-muted;
      transition: color $transition-bounce;

      .material-icons {
        font-size: 32px;
      }

      &--upload {
        right: -(space(1));

        &:hover {
          color: $color-admin-primary;
        }
      }

      &--delete {
        left: -(space(1));

        &:hover {
          color: $color-admin-danger;
        }
      }
    }

    .image-upload__preview {
      position: fixed;
      inset: 0;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: space(1.5);
      background: rgba($color-black, 0.8);
      cursor: zoom-out;
    }

    .image-upload__preview-image {
      max-width: 90vw;
      max-height: 80vh;
    }

    .image-upload__preview-caption {
      margin: 0;
      color: $color-white;
    }
  `,
})
export class ImageUpload {
  /** URL de la imagen guardada (o la imagen por defecto). */
  readonly src = input.required<string>();
  readonly title = input('');
  readonly deletable = input(false);
  readonly fileChange = output<File>();
  readonly delete = output<void>();

  protected readonly preview = signal(false);
  private readonly localPreview = signal<string | null>(null);
  protected readonly shown = computed(() => this.localPreview() ?? this.src());

  protected onFile(input: HTMLInputElement): void {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (file.size > MAX_SIZE) {
      alert('La imagen que desea subir pesa mas de 1mb, inténtelo de nuevo con una imagen menos pesada.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => this.localPreview.set(reader.result as string);
    reader.readAsDataURL(file);
    this.fileChange.emit(file);
  }
}
