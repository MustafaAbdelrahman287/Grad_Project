import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Http } from '@angular/http';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  geojsonFeature: any;
  constructor(http: Http) {
    http.get('../../../../assets/map.geojson').subscribe(response => {
    this.geojsonFeature = response.json(); console.log(this.geojsonFeature)
    });
  }
  onMapClick(event) {
    let l = event.latlng;
    console.log(l.lat, l.lng);
  }

  geojsonFeature1 = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-104.99404, 39.75621]
    }
  };

  ngOnInit() {
    const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(mymap);
    L.geoJSON(this.geojsonFeature).addTo(mymap);
    mymap.on('click', this.onMapClick);
  }

}
