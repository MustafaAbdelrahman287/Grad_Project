import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { BranchService } from '../../../services/branch/branch.service';
import { CompetitorService } from '../../../services/competitor/competitor.service';
import { IBranch } from '../../../interfaces/branch';
import { ICompetitor } from '../../../interfaces/competitor';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['../main.component.css', './branches.component.css']
})
export class BranchesComponent implements OnInit {
  mymap: any;

  public branches = [];
  public competitor = [];
  constructor(private _branchService: BranchService, private _competitorService: CompetitorService) {
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
  overlapareas = [{ id: '1', name: 'Adidas' }, { id: '2', name: 'Competitor Branches' }];
  myIcon(url) {
    return L.icon({
      iconUrl: url,
      iconRetinaUrl: url,
      iconSize: [50, 50],
      iconAnchor: [24, 24],
      popupAnchor: [0, 0]
    })
  };
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

  onClick1(event) {
    this._competitorService.getCompetitors().subscribe(
      data => {
        this.competitor = data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < this.competitor[i].competitor_location.length; j++) {
            L.marker([this.competitor[i].competitor_location[j].lat, this.competitor[i].competitor_location[j].lng], { icon: this.myIcon('../../assets/clogo.png'), draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.competitor[i].name}`).addEventListener('click', this.onClick1);
          }
          console.log(this.competitor[i].competitor_location)
        }
      },
      err => console.log(err)
    )
  }

  /******************************************* Overlap Areas*******************************************/
  onClick2(event) {
    let arrayOfPolygonsBranches = [];
    let arrayOfPolygonsCompetitors = [];
    /******************************************* Branches*******************************************/
    this._branchService.getBranches().subscribe(
      data => {
        let point;
        let buffered;
        let buffered_coords;
        let buffered_polygon;
        this.branches = data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          point = turf.point([data[i].branch_location.lat, data[i].branch_location.lng]);
          buffered = turf.buffer(point, 1, { units: 'miles' });
          arrayOfPolygonsBranches.push(buffered);
          buffered_coords = turf.getCoords(buffered);
          buffered_polygon = L.polygon(buffered_coords, { color: 'gold' }).addTo(this.mymap);
          L.marker([this.branches[i].branch_location.lat, this.branches[i].branch_location.lng], { icon: this.myIcon('../../assets/adidas_PNG22.png'), draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.branches[i].name}`).addEventListener('click', this.onClick);
        }
        //intersection
        console.log('arrayOfPolygonsBranches:', arrayOfPolygonsBranches);
        let parcel;
        let parce2;
        let conflict;
        let conflictlist = [];
        let intersectionCoords;
        let polygonOfIntersection;
        for (let i = 0; i < arrayOfPolygonsBranches.length; i++) {
          parcel = arrayOfPolygonsBranches[i];
          for (let j = 0; j < arrayOfPolygonsBranches.length; j++) {
            parce2 = arrayOfPolygonsBranches[j];
            console.log("processing: ", i, " , ", j);
            conflict = turf.intersect(parcel, parce2);
            if (conflict !== null && i !== j) {
              conflictlist.push(conflict);
            }
          }
        }
        for (let i = 0; i < conflictlist.length; i++) {
          console.log("conflictlist: ", conflictlist);
          intersectionCoords = turf.getCoords(conflictlist[i]);
          polygonOfIntersection = L.polygon(intersectionCoords, { color: 'red' }).addTo(this.mymap);
        }
      },
      err => console.log(err)
    )
    /******************************************* Competitor Branches*******************************************/
    this._competitorService.getCompetitors().subscribe(
      data => {
        let point;
        let buffered;
        let buffered_coords;
        let buffered_polygon;
        this.competitor = data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < this.competitor[i].competitor_location.length; j++) {
            point = turf.point([data[i].competitor_location[j].lat, data[i].competitor_location[j].lng]);
            buffered = turf.buffer(point, 1, { units: 'miles' });
            arrayOfPolygonsCompetitors.push(buffered);
            buffered_coords = turf.getCoords(buffered);
            buffered_polygon = L.polygon(buffered_coords, { color: 'violet ' }).addTo(this.mymap);
            L.marker([this.competitor[i].competitor_location[j].lat, this.competitor[i].competitor_location[j].lng], { icon: this.myIcon('../../assets/clogo.png'), draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.competitor[i].name}`).addEventListener('click', this.onClick1);
          }
        }
        //intersection
        console.log('arrayOfPolygonsCompetitors:', arrayOfPolygonsCompetitors);
        let parcell;
        let parcel2;
        let conflict;
        let conflictlist = [];
        let intersectionCoords;
        let polygonOfIntersection;
        for (let i = 0; i < arrayOfPolygonsBranches.length; i++) {
          parcell = arrayOfPolygonsBranches[i];
          for (let j = 0; j < arrayOfPolygonsCompetitors.length; j++) {
            parcel2 = arrayOfPolygonsCompetitors[j];
            console.log("processing: ", i, " , ", j);
            conflict = turf.intersect(parcell, parcel2);
            if (conflict !== null) {
              conflictlist.push(conflict);
            }
          }
        }
        for (let i = 0; i < conflictlist.length; i++) {
          console.log("conflictlist: ", conflictlist);
          intersectionCoords = turf.getCoords(conflictlist[i]);
          polygonOfIntersection = L.polygon(intersectionCoords, { color: 'blue' }).addTo(this.mymap);
        }
      },
      err => console.log(err)
    )
  }
  /*****************************************************************************************************/

  /******************************************* Weakness Point Analysis *******************************************/
  onClick3(event) {
    let point;
    let buffered;
    let buffered_coords;
    let buffered_polygon;
    let arrayOfPolygonsBranches = [];
    let arrayOfPolygonsCompetitors = [];
    let targetParcel;
    let getIntersectionWithBranches;
    let isThereIntersectionWithBranches = false;
    let getIntersectionWithCompetitorBranches;
    let isThereIntersectionWithCompetitorBranches = false;
    let map = this.mymap;
    //get point of a branch from user
    this.mymap.on('click', function (e) {
      point = [e.latlng.lat, e.latlng.lng];
      console.log("You clicked the map at latitude and longitude: " + point);

      //show the buffer of a specific branch
      let pt = turf.point(point);
      let poly;
      let isWithin;
      for (let i = 0; i < arrayOfPolygonsBranches.length; i++) {
        buffered_coords = turf.getCoords(arrayOfPolygonsBranches[i]);
        poly = turf.polygon(buffered_coords);
        isWithin = turf.booleanPointInPolygon(pt, poly);
        console.log("isWithin: ", isWithin);
        if (isWithin === true) {
          L.polygon(buffered_coords, { color: 'gold' }).addTo(map);
          targetParcel = arrayOfPolygonsBranches[i];
          getIntersectionWithBranches();
          getIntersectionWithCompetitorBranches();
          if (isThereIntersectionWithBranches == true && isThereIntersectionWithCompetitorBranches == false) {
            alert("There is overlap with other branches");
          }
          if (isThereIntersectionWithCompetitorBranches == true && isThereIntersectionWithBranches == false) {
            alert("There is overlap with other competitor branches");
          }
          if (isThereIntersectionWithCompetitorBranches == true && isThereIntersectionWithBranches == true) {
            alert("There is overlap with other branches and competitor branches");
          }
        }
      }
    });

    /******************************************* Branches*******************************************/
    this._branchService.getBranches().subscribe(
      data => {
        this.branches = data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          point = turf.point([data[i].branch_location.lat, data[i].branch_location.lng]);
          buffered = turf.buffer(point, 1, { units: 'miles' });
          arrayOfPolygonsBranches.push(buffered);
          buffered_coords = turf.getCoords(buffered);
          L.marker([this.branches[i].branch_location.lat, this.branches[i].branch_location.lng], { icon: this.myIcon('../../assets/adidas_PNG22.png'), draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.branches[i].name}`).addEventListener('click', this.onClick);
        }
        //getIntersectionWithBranches
        getIntersectionWithBranches = function () {
          let parcel;
          let conflict;
          let conflictlist = [];
          let intersectionCoords;
          let polygonOfIntersection;
          for (let i = 0; i < arrayOfPolygonsBranches.length; i++) {
            parcel = arrayOfPolygonsBranches[i];
            conflict = turf.intersect(targetParcel, parcel);
            if (conflict !== null && turf.getCoords(targetParcel) !== turf.getCoords(parcel)) {
              conflictlist.push(conflict);
              buffered_polygon = L.polygon(turf.getCoords(parcel), { color: 'gold' }).addTo(map);
              isThereIntersectionWithBranches = true;
            }
          }
          for (let i = 0; i < conflictlist.length; i++) {
            console.log("conflictlist: ", conflictlist);
            intersectionCoords = turf.getCoords(conflictlist[i]);
            polygonOfIntersection = L.polygon(intersectionCoords, { color: 'red' }).addTo(map);
          }
        }
      },
      err => console.log(err)
    )

    /******************************************* Competitor Branches*******************************************/
    this._competitorService.getCompetitors().subscribe(
      data => {
        this.competitor = data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < this.competitor[i].competitor_location.length; j++) {
            point = turf.point([data[i].competitor_location[j].lat, data[i].competitor_location[j].lng]);
            buffered = turf.buffer(point, 1, { units: 'miles' });
            arrayOfPolygonsCompetitors.push(buffered);
            buffered_coords = turf.getCoords(buffered);
            //buffered_polygon = L.polygon(buffered_coords, { color: 'violet ' }).addTo(this.mymap);
            L.marker([this.competitor[i].competitor_location[j].lat, this.competitor[i].competitor_location[j].lng], { icon: this.myIcon('../../assets/clogo.png'), draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.competitor[i].name}`).addEventListener('click', this.onClick1);
          }
        }
        //getIntersectionWithCompetitorBranche
        getIntersectionWithCompetitorBranches = function () {
          let parcel;
          let conflict;
          let conflictlist = [];
          let intersectionCoords;
          let polygonOfIntersection;
          for (let i = 0; i < arrayOfPolygonsCompetitors.length; i++) {
            parcel = arrayOfPolygonsCompetitors[i];
            conflict = turf.intersect(targetParcel, parcel);
            if (conflict !== null) {
              conflictlist.push(conflict);
              buffered_polygon = L.polygon(turf.getCoords(parcel), { color: 'violet' }).addTo(map);
              isThereIntersectionWithCompetitorBranches = true;
            }
          }
          for (let i = 0; i < conflictlist.length; i++) {
            console.log("conflictlist: ", conflictlist);
            intersectionCoords = turf.getCoords(conflictlist[i]);
            polygonOfIntersection = L.polygon(intersectionCoords, { color: 'blue' }).addTo(map);
          }
        }
      },
      err => console.log(err)
    )
  }

  /******************************************* target segment*******************************************/
  
  /*****************************************************************************************************/
  ngOnInit() {
    this.mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    console.log(this.mymap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);

  }
}
