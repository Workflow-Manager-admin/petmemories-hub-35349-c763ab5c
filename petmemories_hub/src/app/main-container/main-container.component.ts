import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule, TimelineComponent],
})
export class MainContainerComponent {
  /** Tracks the currently selected section in the UI. */
  activeSection: string = 'timeline';

  // In-memory data per section (lost on refresh)
  photos: any[] = [];
  milestones: any[] = [];
  memories: any[] = [];
  scrapbookPages: any[] = [];
  shareLinks: any[] = [];

  // Modal and form state for each section
  photoModalOpen = false;
  newPhoto: any = { title: '', file: null, preview: '', date: this.dateStringToday() };

  milestoneModalOpen = false;
  newMilestone: any = { title: '', description: '', date: this.dateStringToday() };

  memoryModalOpen = false;
  newMemory: any = { title: '', description: '', date: this.dateStringToday() };

  scrapbookModalOpen = false;
  newScrapbookPage: any = { title: '', content: '' };

  shareModalOpen = false;
  newShare: any = { note: '', type: 'public' };

  // Helpers for today's date string
  dateStringToday() {
    return new Date().toISOString().substring(0, 10);
  }

  /**
   * PUBLIC_INTERFACE
   * Changes the visible section in the main content based on navigation.
   * @param section Section identifier
   */
  selectSection(section: string) {
    this.closeModals();
    if (section === 'add-memory') {
      this.activeSection = 'add-memory';
    } else {
      this.activeSection = section;
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Handler for Add Memory button; navigates to add-memory section/modal (defaults to Memories).
   */
  onAddMemory() {
    this.closeModals();
    this.activeSection = 'memories';
    this.memoryModalOpen = true;
  }

  /** Opens the add-photo modal. */
  openAddPhoto() {
    this.photoModalOpen = true;
    this.newPhoto = { title: '', file: null, preview: '', date: this.dateStringToday() };
  }

  /** Opens the add-milestone modal. */
  openAddMilestone() {
    this.milestoneModalOpen = true;
    this.newMilestone = { title: '', description: '', date: this.dateStringToday() };
  }

  /** Opens the add-memory modal. */
  openAddMemoryDirect() {
    this.memoryModalOpen = true;
    this.newMemory = { title: '', description: '', date: this.dateStringToday() };
  }

  /** Opens the scrapbook add modal. */
  openAddScrapbook() {
    this.scrapbookModalOpen = true;
    this.newScrapbookPage = { title: '', content: '' };
  }

  /** Opens add share modal. */
  openAddShare() {
    this.shareModalOpen = true;
    this.newShare = { note: '', type: 'public' };
  }

  /** Close all modal states. */
  closeModals() {
    this.photoModalOpen = false;
    this.milestoneModalOpen = false;
    this.memoryModalOpen = false;
    this.scrapbookModalOpen = false;
    this.shareModalOpen = false;
  }

  /** Handle file input and base64 preview for photos. */
  handlePhotoFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.newPhoto.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.newPhoto.preview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /** Add photo entry. */
  addPhoto() {
    if (this.newPhoto.title && this.newPhoto.preview) {
      this.photos.push({
        title: this.newPhoto.title,
        photoUrl: this.newPhoto.preview,
        date: this.newPhoto.date,
      });
      this.closeModals();
    }
  }

  /** Add milestone entry. */
  addMilestone() {
    if (this.newMilestone.title && this.newMilestone.date) {
      this.milestones.push({ ...this.newMilestone });
      this.closeModals();
    }
  }

  /** Add memory entry. */
  addMemory() {
    if (this.newMemory.title && this.newMemory.date) {
      this.memories.push({ ...this.newMemory });
      this.closeModals();
    }
  }

  /** Add scrapbook page. */
  addScrapbookPage() {
    if (this.newScrapbookPage.title && this.newScrapbookPage.content) {
      this.scrapbookPages.push({ ...this.newScrapbookPage });
      this.closeModals();
    }
  }

  /** Add share link demo */
  addShare() {
    this.shareLinks.push({
      link: `https://mypetstory.app/demo/${Math.random().toString(36).substring(2, 8)}`,
      ...this.newShare,
    });
    this.closeModals();
  }
}
