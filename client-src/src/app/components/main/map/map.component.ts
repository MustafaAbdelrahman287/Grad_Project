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
  
  constructor(private http: Http) {
    http.get('../../../../assets/map.geojson').subscribe(response => {
    this.geojsonLayer = response.json();
    L.geoJSON(this.geojsonLayer).addTo(this.mymap);
    });
  }
  onMapClick(event) {
    let l = event.latlng;
    console.log(l);
    return l;
  }

  ngOnInit() {
    this.mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);

    var myIcon = L.icon({
      iconUrl: '../../assets/adidas_PNG22.png',
      iconRetinaUrl: '../../assets/adidas_PNG22.png',
      iconSize: [50, 50],
      iconAnchor: [13, 41],
      popupAnchor: [-3, -76],
      /* shadowUrl: '../../assets/adidas_PNG22.png',
      shadowRetinaUrl: '../../assets/adidas_PNG22.png', */
/*       shadowSize: [12, 12],
      shadowAnchor: [22, 94] */
    });
    
    L.marker([50.505, 30.57], {icon: myIcon}).addTo(this.mymap);
    L.marker([51.505, -0.09], {icon: myIcon}).addTo(this.mymap);

    this.mymap.on('click', this.onMapClick);
  }

}
