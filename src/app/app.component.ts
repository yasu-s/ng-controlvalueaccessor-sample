import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>TwoWay Binding Sample(ControlValueAccessor)</h2>
    <custom-list [(ngModel)]="num"></custom-list>
    <div>num: {{ num }}</div>
  `
})
export class AppComponent {
  num: number = 2;
}
