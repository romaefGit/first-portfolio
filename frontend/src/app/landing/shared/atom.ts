import { Component, ElementRef, inject } from '@angular/core';
import { animateCss } from '../../core/utils';

/** Átomo 3D animado de la hoja de vida (antes circulo_animado.css). */
@Component({
  selector: 'app-atom',
  host: {
    class: 'atom',
    '(mouseenter)': 'animate("pulse")',
    '(click)': 'animate("rubberBand")',
  },
  template: `
    <div class="atom__plane">
      @for (orbit of orbits; track orbit) {
        <div class="atom__orbit"></div>
      }
    </div>
  `,
  styles: `
    $size: 120px;
    $glow: #e3cda19c;
    $glow-inner: #f5e0b38c;

    :host {
      position: absolute;
      inset: 0;
      perspective: 400px;
      cursor: pointer;
    }

    .atom__plane {
      position: absolute;
      inset: 0;
      width: $size;
      height: $size;
      margin: auto;
      transform-style: preserve-3d;
      transform: rotateX(60deg) rotateZ(-30deg);
      animation: atom-rotate 20s infinite linear;
    }

    .atom__orbit {
      position: absolute;
      width: $size;
      height: $size;
      box-sizing: border-box;
      border-radius: 100%;
      transform-style: preserve-3d;
      box-shadow: 0 0 60px $glow, inset 0 0 60px $glow-inner;

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          transform: rotateZ(#{$i * 72}deg) rotateX(63.435deg);
        }
      }
    }

    @keyframes atom-rotate {
      from { transform: rotateX(0) rotateY(0) rotateZ(0); }
      to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
    }
  `,
})
export class Atom {
  protected readonly orbits = [1, 2, 3, 4, 5, 6];
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected animate(name: string): void {
    animateCss(this.el, name);
  }
}
