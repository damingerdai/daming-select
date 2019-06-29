import {
  Component,
  OnInit,
  Input,
  QueryList,
  ContentChildren,
  AfterContentInit,
  OnDestroy, EventEmitter,
  Output,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { startWith, switchMap, filter } from 'rxjs/operators';
import { Subject, merge, Subscription, fromEvent } from 'rxjs';

import { OptionComponent, DamingOptionSelectionChange } from './option/option.component';


@Component({
  selector: 'daming-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => SelectComponent),
    //   multi: true,
    // }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, OnDestroy, AfterContentInit, ControlValueAccessor {

  // tslint:disable-next-line: variable-name
  private readonly _destroy = new Subject<void>();

  // tslint:disable-next-line: variable-name
  private _open = false;
  // tslint:disable-next-line: variable-name
  private _value: string;
  // tslint:disable-next-line: variable-name
  private _subscriptions: Subscription[] = [];

  @ContentChildren(OptionComponent, { descendants: true })
  public options: QueryList<OptionComponent>;

  @Output()
  public valueChange = new EventEmitter<string>();

  @Input()
  public placeHolder: string;

  @Input()
  public set value(newValue: string) {
    if (newValue && newValue !== this._value) {
      this._value = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }

  public get value() {
    return this._value;
  }

  // tslint:disable-next-line: variable-name
  public set open(_open: boolean) {
    this._open = _open;
  }

  public get open() {
    return this._open;
  }

  // tslint:disable-next-line: variable-name
  private _onChange: (value: any) => void = () => {};
  // tslint:disable-next-line: variable-name
  private _onTouched = () => {};

  constructor(
    // tslint:disable-next-line: variable-name
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    const subscription = fromEvent(document, 'click').pipe(
      filter(() => this.open === true),
    ).subscribe(res => this.open = false);
    this._subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe);
  }

  ngAfterContentInit() {
    const options = this.options;
    this.options.changes.pipe(
      startWith(options),
      switchMap(() => merge(...options.map(option => option.onSelectionChange)))
    ).subscribe((option: DamingOptionSelectionChange) => {
      this.value = option.value;
      this.open = false;
      this._onChange(this.value);
      this.valueChange.emit(this.value);
    });
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  toggle(event) {
    event.stopPropagation();
    this.open = !this.open;
  }

}
