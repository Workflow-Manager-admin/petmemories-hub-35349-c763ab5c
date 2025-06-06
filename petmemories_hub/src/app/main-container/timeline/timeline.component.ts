import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * TimelineComponent displays a vertical timeline of pet memories and milestones.
 * Later, it can be extended to accept @Input for dynamic data.
 */
@Component({
  selector: 'pmh-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class TimelineComponent {
  // For demo: hardcoded sample timeline data
  timeline = [
    {
      type: 'photo',
      date: '2024-04-20',
      title: 'Bella\'s First Day Home',
      description: 'Welcome Bella with love and cuddles.',
      photoUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?fit=crop&w=400&q=80'
    },
    {
      type: 'milestone',
      date: '2024-06-10',
      title: 'First Bath',
      description: 'Splish splash! Bella had her first bath today.',
      photoUrl: ''
    },
    {
      type: 'memory',
      date: '2024-08-15',
      title: 'Birthday',
      description: 'Celebrated Bella\'s first birthday with a cake.',
      photoUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?fit=crop&w=400&q=80'
    },
    {
      type: 'milestone',
      date: '2024-10-22',
      title: 'Learned to Sit',
      description: 'Such a smart pup!',
      photoUrl: ''
    }
  ];
}
