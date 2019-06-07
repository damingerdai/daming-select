import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

export class DamingOptionSelectionChange {
  constructor(
    public source: OptionComponent,
    public value) { }
}

@Component({
  selector: 'daming-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  @Input()
  public value: string;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  public onSelectionChange = new EventEmitter<DamingOptionSelectionChange>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  select(event): void {
    event.stopPropagation();
    console.log('点击事件');
    const otpion = new DamingOptionSelectionChange(this, this.value);
    this.onSelectionChange.next(otpion);
  }

}
