import { Component } from '@angular/core';
import { TimelineComponent } from './timeline/timeline.component';

/**
 * PUBLIC_INTERFACE
 * MainContainerComponent serves as the main dashboard for PetMemories Hub.
 * Features a sidebar for navigation and a content area for timeline, add memory, etc.
 */
@Component({
  selector: 'pmh-main-container',
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css',
  standalone: true,
  imports: [TimelineComponent],
})
export class MainContainerComponent {}
