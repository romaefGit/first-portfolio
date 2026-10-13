// Lo que se sigue usando de client/landing/commons/Utils.js

export function getWidth(): number {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/** Congela el scroll en la posición actual (mientras el sidenav está abierto). */
export function disableScrolling(): void {
  const x = window.scrollX;
  const y = window.scrollY;
  window.onscroll = () => window.scrollTo(x, y);
}

export function enableScrolling(): void {
  window.onscroll = null;
}

/** Equivalente a `$(el).animateCss(name)`: aplica una animación de animate.css una sola vez. */
export function animateCss(el: Element, animationName: string): void {
  el.classList.remove('animated', animationName);
  // fuerza reflow para poder repetir la misma animación
  void (el as HTMLElement).offsetWidth;
  el.classList.add('animated', animationName);
  el.addEventListener('animationend', () => el.classList.remove('animated', animationName), { once: true });
}

export function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
