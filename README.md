# Daming Select

基于Angular的类Material Designs的下拉框，

> 本项目使用[Angular CLI](https://github.com/angular/angular-cli) 7.3.6版本创建。

# 安装

目前该代码尚未上传npm，不支持在线安装

# 使用

## 第一步

引入SelectModule，以AppModule为例:
```ts
...
import { SelectModule } from 'select';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SelectModule,
		...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## 第二步

在组件中使用:
```html
<daming-select  placeHolder="select..." formControlName="selectValue">
    <daming-option *ngFor="let option of options" [value]="option.value">{{option.name}}</daming-option>
</daming-select>
```
```ts
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
	...
})
export class AppComponent {

	...

  options = OPTIONS;

  form: FormGroup;
  damingForm: FormGroup;

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
    this.damingForm = fb.group({
      selectValue: []
    });
  }
}
```

## 说明

该项目需要@angular/material和@angular/cdk的支持

# 所有者

[@大明二代](https://github.com/damingerdai)

# License

[MIT](LICENSE) © 大明二代

# 示例
[GitHub](https://damingerdai.github.io/daming-select)
