import { Component } from '@angular/core';

const OPTIONS = [
  {
    value: 'daming',
    name: 'daming'
  },
  {
    value: 'xiao2',
    name: 'xiao2'
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'daming-select';

  options = OPTIONS;
}
