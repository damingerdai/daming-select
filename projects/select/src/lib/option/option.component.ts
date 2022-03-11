import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public onSelectionChange = new EventEmitter<DamingOptionSelectionChange>();

  constructor(
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  select(event): void {
    event.stopPropagation();
    const otpion = new DamingOptionSelectionChange(this, this.value);
    this.onSelectionChange.next(otpion);
  }

}
