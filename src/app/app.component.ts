import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const OPTIONS = [
  {
    value: 'daming',
    name: 'daming'
  },
  {
    value: 'xiao2',
    name: 'xiao2'
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'daming-select';

  options = OPTIONS;

  form: FormGroup;

  selectedValue: string;

  get defaultValue() {
    return this.form.get('defaultValue');
  }

  get formValid() {
    return this.form.valid;
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      defaultValue: ['', [Validators.required]]
    });
  }

  submit() {
    this.selectedValue = this.defaultValue.value;
  }
}
