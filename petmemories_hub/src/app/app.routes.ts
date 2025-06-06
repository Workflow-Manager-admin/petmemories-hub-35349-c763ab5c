import { Routes } from '@angular/router';
import { MainContainerComponent } from './main-container/main-container.component';

export const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    pathMatch: 'full',
    title: 'PetMemories Hub'
  }
];
