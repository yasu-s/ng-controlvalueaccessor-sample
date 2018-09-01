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

// #region fields

  /** */
  value: number = 0;

  /** 表示リスト */
  list: number[] = [1, 2, 3, 4, 5];

  /** */
  private fnChange = (_: any) => {};

  /** */
  private fnTouched = () => {};

// #endregion

// #region methods

  /**
   *
   * @param value
   */
  writeValue(value: any): void {
    this.value = value ? value : 0;
  }

  registerOnChange(fn: any): void {
    this.fnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }


  /**
   * 選択値変更処理
   * @param num
   */
  changeValue(num: number): void {
    this.value = num;
    this.fnChange(num);
  }

// #endregion

}
