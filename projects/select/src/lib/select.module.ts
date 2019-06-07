import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';


@NgModule({
  declarations: [SelectComponent, OptionComponent],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [SelectComponent, OptionComponent]
})
export class SelectModule { }
