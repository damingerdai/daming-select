import { Component, OnInit, Input, QueryList, ContentChildren, AfterContentInit } from '@angular/core';

import { startWith, switchMap } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';

import { OptionComponent, DamingOptionSelectionChange } from './option/option.component';

@Component({
  selector: 'daming-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterContentInit {

   // tslint:disable-next-line: variable-name
  private readonly _destroy = new Subject<void>();

  // tslint:disable-next-line: variable-name
  private _open = false;
   // tslint:disable-next-line: variable-name
  private _value: string;

  @ContentChildren(OptionComponent, { descendants: true })
  public options: QueryList<OptionComponent>;

  @Input()
  public placeHolder: string;

  @Input()
  public set value(_value: string) {
    if (_value) {
      this._value = _value;
    }
  }

  public get value() {
    return this._value;
  }

  public set open(_open: boolean) {
    this._open = _open;
  }

  public get open() {
    return this._open;
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const options = this.options;
    this.options.changes.pipe(
      startWith(options),
      switchMap(() => merge(...options.map(option => option.onSelectionChange)))
    ).subscribe((option: DamingOptionSelectionChange) => {
      this.value = option.value;
      this.open = false;
    });
  }

  toggle(event) {
    event.stopPropagation();
    this.open = !this.open;
  }

}
