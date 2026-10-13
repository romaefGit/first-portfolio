import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {
  constructor() {
    const css = 'font-size: 20px;background: #222; color: #1cdcea';
    console.log('%c%s', css, 'www.romaef.com');
  }
}
