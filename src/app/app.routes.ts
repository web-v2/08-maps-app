import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { HousesPagesComponent } from './pages/houses-pages/houses-pages.component';

export const routes: Routes = [
  {
    path: 'fullscreen',
    component: FullscreenMapPageComponent,
    title: 'FullScreen Map',
  },
  {
    path: 'markers',
    component: MarkersPageComponent,
    title: 'Marcadores',
  },
  {
    path: 'houses',
    component: HousesPagesComponent,
    title: 'Propiedades disponibles',
  },
  {
    path: '**',
    redirectTo: 'fullscreen',
  },
];
