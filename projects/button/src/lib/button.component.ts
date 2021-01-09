import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-button',
  template: `
    <button mat-button>A button<button>
  `,
  styles: [
  ]
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
