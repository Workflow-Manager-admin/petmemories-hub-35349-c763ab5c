import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, TimelineComponent],
})
export class MainContainerComponent {
  /** Tracks the currently selected section in the UI. */
  activeSection: string = 'timeline';

  /**
   * PUBLIC_INTERFACE
   * Changes the visible section in the main content based on navigation.
   * @param section Section identifier
   */
  selectSection(section: string) {
    if (section === 'add-memory') {
      this.activeSection = 'add-memory';
    } else {
      this.activeSection = section;
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Handler for Add Memory button; navigates to 'add-memory' section.
   */
  onAddMemory() {
    this.activeSection = 'add-memory';
  }
}
