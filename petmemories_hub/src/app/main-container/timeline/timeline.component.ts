import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * TimelineComponent displays a vertical timeline of pet memories and milestones.
 * Takes timeline data as @Input for dynamic rendering.
 */
@Component({
  selector: 'pmh-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class TimelineComponent {
  /**
   * PUBLIC_INTERFACE
   * Receives timeline data from the parent main container.
   */
  @Input() timeline: any[] = [];
}
