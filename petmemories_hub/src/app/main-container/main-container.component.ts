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

  // Scrapbook-wide editable description
  scrapbookDescription: string = 'A growing story of all precious memories and milestones.';
  scrapbookDescriptionEditing = false;

  /**
   * PUBLIC_INTERFACE
   * Returns scrapbook-ready photos: user-uploaded + memories' photos, with title, photoUrl, date.
   */
  get scrapbookPhotoList(): { title: string, photoUrl: string, date: string }[] {
    const fromMemories =
      this.memories
        .filter(m => Array.isArray(m.photoUrls) && m.photoUrls.length > 0)
        .flatMap(m =>
          m.photoUrls.map((url: string, i: number) => ({
            title: m.title + (m.photoUrls.length > 1 ? ` (${i + 1})` : ''),
            photoUrl: url,
            date: m.date,
          }))
        );

    return [
      ...this.photos,
      ...fromMemories
    ];
  }

  /**
   * PUBLIC_INTERFACE
   * Returns all milestones and memories in date-descending order with a "kind" property for use in template.
   */
  get scrapbookEventList(): Array<any> {
    const milestoneEvents = this.milestones.map(m => ({
      ...m,
      kind: 'milestone',
    }));

    const memoryEvents = this.memories.map(m => ({
      ...m,
      kind: 'memory',
    }));

    // date descending
    return [...milestoneEvents, ...memoryEvents].sort((a: any, b: any) =>
      b.date > a.date ? 1 : b.date < a.date ? -1 : 0
    );
  }

  /**
   * PUBLIC_INTERFACE
   * Returns true if scrapbookPhotoList is empty
   */
  get isScrapbookPhotoListEmpty(): boolean {
    return this.scrapbookPhotoList.length === 0;
  }

  // Modal and form state for each section
  photoModalOpen = false;
  newPhoto: any = { title: '', file: null, preview: '', date: this.dateStringToday() };

  milestoneModalOpen = false;
  newMilestone: any = { title: '', description: '', date: this.dateStringToday() };

  memoryModalOpen = false;
  // newMemory supports multiple photos (array of files and previews)
  newMemory: any = { title: '', description: '', date: this.dateStringToday(), photoFiles: [], photoPreviews: [] };

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
    this.newMemory = { title: '', description: '', date: this.dateStringToday(), photoFiles: [], photoPreviews: [] };
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
    // Reset newMemory state for multi-photo fields
    if (this.newMemory) {
      this.newMemory.photoFiles = [];
      this.newMemory.photoPreviews = [];
    }
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

  /** Handle file input and base64 previews for memory photo (in Add Memory modal). Supports multiple photos. */
  handleMemoryPhotoInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.newMemory.photoFiles = files;
      this.newMemory.photoPreviews = [];
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          // Only push if not already present
          if (!this.newMemory.photoPreviews.includes(reader.result as string)) {
            this.newMemory.photoPreviews.push(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      this.newMemory.photoFiles = [];
      this.newMemory.photoPreviews = [];
    }
  }

  /** Add memory entry. */
  addMemory() {
    if (this.newMemory.title && this.newMemory.date) {
      // Prepare memory with associated photo URLs array (may be empty).
      const photoUrls = Array.isArray(this.newMemory.photoPreviews) ? this.newMemory.photoPreviews.slice() : [];
      const memoryCopy: any = {
        title: this.newMemory.title,
        description: this.newMemory.description,
        date: this.newMemory.date,
        photoUrls: photoUrls,
      };
      this.memories.push(memoryCopy);

      // Add each photo from this memory to the Photos section, referencing by memory.
      photoUrls.forEach((photoUrl: string, i: number) => {
        this.photos.push({
          title: this.newMemory.title + (photoUrls.length > 1 ? ` (Memory Photo ${i+1})` : ' (Memory Photo)'),
          photoUrl,
          date: this.newMemory.date,
        });
      });

      this.closeModals();
    }
  }

  /** Add scrapbook page. */
  addScrapbookPage() {
    if (this.newScrapbookPage.title && this.newScrapbookPage.content) {
      // Each page may also be extended for photo references later.
      this.scrapbookPages.push({ ...this.newScrapbookPage, editing: false });
      this.closeModals();
    }
  }

  /** Allow editing scrapbooks (toggle edit mode for description/content) */
  editScrapbook(index: number) {
    this.scrapbookPages[index].editing = true;
  }
  stopEditingScrapbook(index: number) {
    this.scrapbookPages[index].editing = false;
  }

  /** Return photos relevant for scrapbook page (demo: show all, or could be filtered in future) */
  scrapbookPhotosForPage() {
    // Demo: show all photos and all memory photos (now supports multiple per memory)
    return [
      ...this.photos,
      ...this.memories
        .filter(m => m.photoUrls && m.photoUrls.length > 0)
        .flatMap(m =>
          m.photoUrls.map((url: string, i: number) => ({
            title: m.title + (m.photoUrls.length > 1 ? ` (${i + 1})` : ''),
            photoUrl: url,
            date: m.date,
          }))
        ),
    ];
  }

  /** Add share link demo */
  addShare() {
    this.shareLinks.push({
      link: `https://mypetstory.app/demo/${Math.random().toString(36).substring(2, 8)}`,
      ...this.newShare,
    });
    this.closeModals();
  }

  /**
   * Combine all memories, milestones, and photo events in date order for the timeline.
   */
  composeTimeline() {
    // Convert memories to timeline entries
    const memoryEvents = this.memories.flatMap((m: any) =>
      (Array.isArray(m.photoUrls) && m.photoUrls.length > 0)
        ? m.photoUrls.map((photoUrl: string) => ({ ...m, type: 'memory', photoUrl }))
        : [{ ...m, type: 'memory', photoUrl: undefined }]
    );
    // Convert milestones to timeline entries
    const milestoneEvents = this.milestones.map((m: any) => ({
      ...m, type: 'milestone', photoUrl: ''
    }));
    // Convert photos to timeline entries not already included as memory photos
    const photoEvents = this.photos.map((p: any) => ({
      ...p, type: 'photo', description: '', // Assign type for correct icon
    }));

    // Combine, then sort by date descending
    return [...memoryEvents, ...milestoneEvents, ...photoEvents]
      .sort((a: any, b: any) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
  }
}
