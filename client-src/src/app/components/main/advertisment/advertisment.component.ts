import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { AdvertismentService } from '../../../services/advertisement/advertisment.service';

@Component({
  selector: 'app-advertisment',
  templateUrl: './advertisment.component.html',
  styleUrls: ['../main.component.css', './advertisment.component.css']
})
export class AdvertismentComponent implements OnInit {
  onClick : any;
  public advertisment = [];
  myIcon = L.icon({
    iconUrl: '../../assets/adidas_PNG22.png',
    iconRetinaUrl: '../../assets/adidas_PNG22.png',
    iconSize: [50, 50],
    iconAnchor: [24, 24],
    popupAnchor: [0, 0]
  });
  
  
  constructor(private _advertismentService: AdvertismentService) { }
  ngOnInit() {
    L.Marker.prototype.options.icon = this.myIcon;
    let location;
    let mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(mymap);
    function onMapClick(e) {
      location = [e.latlng.lat, e.latlng.lng];
      console.log(location);
      L.marker(location).addTo(mymap);
    }
    this.onClick = () => {
      console.log('fire')
      mymap.on('click', onMapClick);
    }
  }
}
