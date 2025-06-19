import { Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as UUIDv4 } from 'uuid';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
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
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-122.4, 37.8], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
    /* const marker = new mapboxgl.Marker({ draggable: false, color: 'red' })
      .setLngLat([-122.4, 37.8])
      .addTo(map); */
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
}
