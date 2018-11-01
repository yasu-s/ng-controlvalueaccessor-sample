# Overview

It is a sample that performs bi-directional binding when creating self-made components in Angular.  
Using ControlValueAccessor.  
  
For bidirectional binding without using ngModel, please refer to the following repository.  
* https://github.com/yasu-s/ng-twoway-sample  

# System requirements

* Node.js 10.x
* TypeScript 3.1.x
* Angular 7.0.x

# Operation check  

## 1. Download Sample

```
git clone git@github.com:yasu-s/ng-controlvalueaccessor-sample.git
```

## 2. Installing packages  

```
cd ng-controlvalueaccessor-sample
npm install
```

## 3. Launch sample application  

```
npm start
```

## 4. Execution result  

![twoway](https://user-images.githubusercontent.com/2668146/44942338-37cd8080-ade9-11e8-988d-b64aa18fa295.gif)

# Sample source

## src/app/custom-list.component.ts

```typescript
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-list',
  template: `
    <ul>
      <li *ngFor="let num of list"
        (click)="changeValue(num)" [style.background-color]="num === value ? 'yellow' : 'white'">
        {{ num }}
      </li>
    </ul>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomListComponent),
      multi: true
    }
  ]
})
export class CustomListComponent implements ControlValueAccessor {

  /** Selected Value */
  value: number = 0;

  /** Display List */
  list: number[] = [1, 2, 3, 4, 5];

  /** OnChange */
  private fnChange = (_: any) => {};

  /** OnTouched */
  private fnTouched = () => {};

  /** ControlValueAccessor.writeValue */
  writeValue(value: any): void {
    this.value = value ? value : 0;
  }

  /** ControlValueAccessor.registerOnChange */
  registerOnChange(fn: any): void {
    this.fnChange = fn;
  }

  /** ControlValueAccessor.registerOnTouched */
  registerOnTouched(fn: any): void {
    this.fnTouched = fn;
  }

  /** ControlValueAccessor.setDisabledState */
  setDisabledState(isDisabled: boolean): void {

  }


  /**
   * Change Value
   * @param num
   */
  changeValue(num: number): void {
    this.value = num;
    this.fnChange(num);
  }
}
```

## src/app/app.component.ts

```typescript
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
```
