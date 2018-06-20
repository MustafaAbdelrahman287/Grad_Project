import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { Http } from '@angular/http';
import { BranchService } from '../../../../services/branch/branch.service';
import { latLng } from 'leaflet';


@Component({
  selector: 'app-brmap',
  templateUrl: './brmap.component.html',
  styleUrls: ['./brmap.component.css']
})
export class BrmapComponent implements OnInit {
  mymap: any;
  geojsonLayer: any;
  geojson: any;
  public branches=[];
  constructor( private http:Http, private _branchService: BranchService) {

    function createCustomIcon(latlng) {
      let myIcon = L.icon({
        iconUrl: '../../assets/adidas_PNG22.png',
        iconSize: [50, 50],
        iconAnchor: [24, 24],
        popupAnchor: [0, 0]
      })
      return L.marker(latlng, { icon: myIcon, draggable: true })
    }
   
  }
  myIcon = L.icon({
    iconUrl: '../../assets/adidas_PNG22.png',
    iconRetinaUrl: '../../assets/adidas_PNG22.png',
    iconSize: [50, 50],
    iconAnchor: [24, 24],
    popupAnchor: [0, 0]
  });
   onMapClick(event) {
    let l = event.latlng;
    console.log(l);
    L.marker(l, { icon: this.myIcon, draggable: true }).addTo(this.mymap);
    return l;
  }
  onClick(event) {
    console.log(event);
  }


  ngOnInit() {

    this.mymap = L.map('bmap').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);

    this._branchService.getBranches().subscribe(
      data => {
        this.branches = data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          L.marker([this.branches[i].branch_location.lat, this.branches[i].branch_location.lng], { icon: this.myIcon, draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.branches[i].name}`).addEventListener('click', this.onClick);
        }
      },
        err => console.log(err)
      )
  }

}
