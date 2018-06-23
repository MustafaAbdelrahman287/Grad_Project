import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { BranchService } from '../../../services/branch/branch.service';
import { CompetitorService } from 'src/app/services/competitor/competitor.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['../main.component.css', './branches.component.css']
})
export class BranchesComponent implements OnInit {
  mymap: any;
  geojsonLayer: any;
  geojson: any;
  
  public branches=[];
  public competitor=[];
  constructor(private _branchService: BranchService,private _competitorService:CompetitorService) { 
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
overlapareas= [{id:'1', name:'Adidas'}, {id:'2', name:'Competitor Branches'}];
myIcon(url){return L.icon({
  iconUrl: url,
  iconRetinaUrl: url,
  iconSize: [50, 50],
  iconAnchor: [24, 24],
  popupAnchor: [0, 0]
})};
 onMapClick(event) {
  let l = event.latlng;
  console.log(l);
  L.marker(l, { icon: this.myIcon('../../assets/adidas_PNG22.png'), draggable: true }).addTo(this.mymap);
  return l;
}
onClick(event) {
  this._branchService.getBranches().subscribe(
    data => {
      this.branches = data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        L.marker([this.branches[i].branch_location.lat, this.branches[i].branch_location.lng], { icon: this.myIcon('../../assets/adidas_PNG22.png'), draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.branches[i].name}`).addEventListener('click', this.onClick);
      }
    },
      err => console.log(err)
    )
  
}
onClick1(event){
 

  this._competitorService.getCompetitors().subscribe(
    data => {
      this.competitor = data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j <this.competitor[i].competitor_location.length; j++){ 
           L.marker([this.competitor[i].competitor_location[j].lat, this.competitor[i].competitor_location[j].lng], { icon: this.myIcon('../../assets/clogo.png'), draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.competitor[i].name}`).addEventListener('click', this.onClick1);
          }
        console.log(this.competitor[i].competitor_location)
       
      }
    },
      err => console.log(err)
    )
  
}

  ngOnInit() {
    this.mymap = L.map('bmap').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);

   
  }

}
