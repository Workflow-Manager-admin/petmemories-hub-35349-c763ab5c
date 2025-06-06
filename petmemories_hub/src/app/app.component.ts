import { Component } from '@angular/core';
import { MainContainerComponent } from './main-container/main-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainContainerComponent],
  template: '<pmh-main-container></pmh-main-container>',
})
export class AppComponent {}
