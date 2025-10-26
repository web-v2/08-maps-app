import { Pipe, PipeTransform } from '@angular/core';
import { LngLat } from 'mapbox-gl';

@Pipe({
  name: 'coordinatesFormat',
  standalone: true,
})
export class CoordinatesFormatPipe implements PipeTransform {
  transform(lngLat: LngLat): string {
    return `{lat: ${lngLat.lat},\n  lng: ${lngLat.lng}}`;
  }
}
