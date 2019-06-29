import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';


@NgModule({
  declarations: [SelectComponent, OptionComponent],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [SelectComponent, OptionComponent]
})
export class SelectModule { }
