import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  constructor() { }
  onMapClick($event) {
    let l = $event.latlng;
    console.log(l.lat, l.lng);
  }
  ngOnInit() {
    const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
    maxZoom: 18,
  }).addTo(mymap);
  mymap.on('click', this.onMapClick);
  }
  
}
