import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  styles: `
    div {
      width: 100%;
      height: 260px;
      border-radius: 8px;
      box-shadow: 0 0 10px 0 rgb(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }
  `,
  templateUrl: './mini-map.html',
})
export class MiniMap implements AfterViewInit {
  divElement = viewChild<ElementRef>('mapa');
  map = signal<mapboxgl.Map | null>(null);
  LngLat = input.required<{ lng: number; lat: number }>();
  zoom = input<number>(15);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 100));
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.LngLat(),
      zoom: this.zoom(),
      interactive: false,
      pitch: 60,
    });
    this.map.set(map);
    new mapboxgl.Marker()
      .setLngLat([this.LngLat().lng, this.LngLat().lat])
      .addTo(map);
  }
}
