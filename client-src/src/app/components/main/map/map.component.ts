import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Http } from '@angular/http';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mymap:any;
  geojsonLayer: any;
  constructor(http: Http) {
    http.get('../../../../assets/STREET.json').subscribe(response => {
    this.geojsonLayer = response.json(); console.log(this.geojsonLayer)
    });
  }
  onMapClick(event) {
    let l = event.latlng;
    console.log(l.lat, l.lng);
  }

  ngOnInit() {
    const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(mymap);
    L.geoJSON(this.geojsonLayer).addTo(mymap);
    mymap.on('click', this.onMapClick);
  }
}
