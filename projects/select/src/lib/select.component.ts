import { Component, OnInit, Input, QueryList, ContentChildren, AfterContentInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { startWith, switchMap, filter } from 'rxjs/operators';
import { Subject, merge, Subscription, fromEvent } from 'rxjs';

import { OptionComponent, DamingOptionSelectionChange } from './option/option.component';

@Component({
  selector: 'daming-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy, AfterContentInit {

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
  public valueChange: EventEmitter<DamingOptionSelectionChange> = new EventEmitter<DamingOptionSelectionChange>();

  @Input()
  public placeHolder: string;

  @Input()
  public set value(_value: string) {
    if (_value && _value !== this._value) {
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
      this.valueChange.next(option);
    });
  }

  toggle(event) {
    event.stopPropagation();
    this.open = !this.open;
  }

}
