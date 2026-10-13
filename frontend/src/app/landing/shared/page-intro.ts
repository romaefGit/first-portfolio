import { DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';

export interface PageIntroOptions {
  /** Espera tras cargar la primera imagen antes de abrir el loader. */
  revealDelay: number;
  /** Espera tras abrir el loader antes de quitarlo del DOM. */
  removeLoaderDelay: number;
  /** Se ejecuta cuando el loader ya se quitó. */
  onRevealed?: () => void;
}

/**
 * Lo que hacía cada controlador en `init()`: esperar a que carguen las imágenes,
 * abrir el loader, animar el header y quitar el loader.
 * Debe llamarse en el constructor del componente de página.
 */
export function usePageIntro(options: PageIntroOptions) {
  const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** El loader se abre (y el hero anima su entrada). */
  const revealed = signal(false);
  /** El loader sigue en el DOM. */
  const showLoader = signal(true);
  const timers: ReturnType<typeof setTimeout>[] = [];
  const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

  afterNextRender(() => {
    let started = false;
    const reveal = () => {
      if (started) return;
      started = true;
      later(() => {
        revealed.set(true);
        later(() => {
          showLoader.set(false);
          options.onRevealed?.();
        }, options.removeLoaderDelay);
      }, options.revealDelay);
    };

    const imgs = Array.from(host.querySelectorAll('img'));
    if (imgs.length === 0 || imgs.some((i) => i.complete && i.naturalWidth > 0)) {
      reveal();
    } else {
      imgs.forEach((i) => i.addEventListener('load', reveal, { once: true }));
      // por si ninguna imagen carga (404), no dejar al usuario con el loader eterno
      later(reveal, 5000);
    }
  });

  inject(DestroyRef).onDestroy(() => timers.forEach(clearTimeout));

  return { revealed, showLoader };
}
