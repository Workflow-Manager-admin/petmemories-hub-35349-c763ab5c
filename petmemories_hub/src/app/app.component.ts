import { Component } from '@angular/core';
import { MainContainerComponent } from './main-container/main-container.component';
import { TimelineComponent } from './main-container/timeline/timeline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainContainerComponent, TimelineComponent],
  template: '<pmh-main-container></pmh-main-container>',
})
export class AppComponent {}
