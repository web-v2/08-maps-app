import { Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { v4 as UUIDv4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { CoordinatesFormatPipe } from '../../shared/pipes/coordinates-format.pipe';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [CoordinatesFormatPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-75.3957, 9.2943],
      zoom: 5,
    });
    this.mapListeners(map);
  }
  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));
    this.map.set(map);
  }
  mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;
    const mapa = this.map()!;
    const coords = event.lngLat;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({ color: color })
      .setLngLat(coords)
      .addTo(mapa);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker,
    };

    this.markers.set([newMarker, ...this.markers()]);
    console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;

    this.map()?.flyTo({
      center: lngLat,
    });
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;
    const markerToDelete = this.markers().find((m) => m.id === marker.id);
    if (!markerToDelete) return;

    markerToDelete.mapboxMarker.remove();
    this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }
}
