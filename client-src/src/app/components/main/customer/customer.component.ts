import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { Http } from '@angular/http';
import {CustomerService} from'../../../services/customers/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../main.component.css', './customer.component.css']
})
export class CustomerComponent implements OnInit {
  mymap: any;
  public customers=[];
  
   customerIcon = L.icon({
    iconUrl: '../../assets/customer.png',
    iconRetinaUrl: '../../assets/customer.png',
    iconSize: [25, 25],
    iconAnchor: [13, 41],
    popupAnchor: [-3, -76],
  });
  myIcon(url){return L.icon({
    iconUrl: url,
    iconRetinaUrl: url,
    iconSize: [50, 50],
    iconAnchor: [24, 24],
    popupAnchor: [0, 0]
  })};

  constructor(private http:Http,private _customerService:CustomerService) { }
  onMapClick(event) {
    let l = event.latlng;
    console.log(l);
    L.marker(l, { icon: this.myIcon('../../assets/adidas_PNG22.png'), draggable: true }).addTo(this.mymap);
    return l;
  }
 
  onClick(event){
    this._customerService.getCustomers().subscribe(
      data => {
        this.customers = data;
        for (let i = 0; i < data.length; i++) {
          if (!data[i].order_code || data[i].order_code.length === 0) {
            L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
          }
        }
      },
      err => console.log(err)
    );

  }

  ngOnInit() {
    //L.Marker.prototype.options.icon = this.myIcon;
    let mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(mymap);
  }

}
