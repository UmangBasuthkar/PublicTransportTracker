import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      const L = await import('leaflet');

      const map = L.map('map', {
        zoomControl: false
      }).setView([28.6139, 77.2090], 12);

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      //-------dummy vehicles--------
      const dummyVehicles = [
        { id: 1, lat: 28.6139, lng: 77.2090 },
        { id: 2, lat: 28.6150, lng: 77.2150 },
        { id: 3, lat: 28.6100, lng: 77.2000 }
      ];

      const vehicleMarkers: { [key: number]: L.CircleMarker } = {};

      dummyVehicles.forEach(vehicle => {
        const marker = L.circleMarker([vehicle.lat, vehicle.lng], {
          radius: 8,
          color: 'blue',
          fillColor: '#00f',
          fillOpacity: 0.8
        }).addTo(map);
        vehicleMarkers[vehicle.id] = marker;
      });

      //Simulate movment every 2 seconds
      setInterval(() => {
        dummyVehicles.forEach(vehicle => {
          vehicle.lat += (Math.random() - 0.5) * 0.001;
          vehicle.lng += (Math.random() - 0.5) * 0.001;

          const marker = vehicleMarkers[vehicle.id];
          marker.setLatLng([vehicle.lat, vehicle.lng]);
        });
      }, 2000);
    }
  }
}
