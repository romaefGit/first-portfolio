import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Reemplazo de `$('.parallax').parallax()` de Materialize 0.98: mismo cálculo,
 * mueve la <img> hija según el scroll mientras el contenedor es visible.
 * El contenedor usa el mixin `parallax-layer`.
 */
@Directive({ selector: '[appParallax]' })
export class ParallaxDirective {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const img = host.querySelector<HTMLImageElement>(':scope > img');
      if (!img) return;

      const update = () => {
        const containerHeight = host.offsetHeight > 0 ? host.offsetHeight : img.offsetHeight;
        const parallaxDist = img.offsetHeight - containerHeight;
        const top = host.getBoundingClientRect().top + window.scrollY;
        const bottom = top + containerHeight;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const percentScrolled = (scrollTop + windowHeight - top) / (containerHeight + windowHeight);
        const parallax = Math.round(parallaxDist * percentScrolled);
        if (bottom > scrollTop && top < scrollTop + windowHeight) {
          img.style.transform = `translate3D(-50%, ${parallax}px, 0)`;
        }
      };

      img.style.display = 'block';
      if (img.complete) update();
      img.addEventListener('load', update);
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      });
    });
  }
}
