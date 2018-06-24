import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { BranchService } from '../../../services/branch/branch.service';
import { DistrictsService } from '../../../services/districts/districts.service';
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
  genderTypes = [{ id: '1', class: 'male', name: 'Male', checked: false }, { id: '2', class: 'female', name: 'Female', checked: false },];
  eduLevels = [{ id: '3', name: 'Low', checked: false }, { id: '4', name: 'Medium', checked: false }, { id: '5', name: 'High', checked: false }];
  incomeLevels = [{ id: '6', name: 'A', checked: false }, { id: '7', name: 'B', checked: false }, { id: '8', name: 'C', checked: false }, { id: '9', name: 'D', checked: false }];
  ageRanges = [{ id: '10', name: '18:30', checked: false }, { id: '11', name: '30:45', checked: false }, { id: '12', name: '45:55', checked: false }];
  geojsonLayer: any;
  selectedValue = [];
  targetPolygon: any;
  public targetSegmentPolygon;
  public customers = [];
  public branches = [];
  public competitor = [];
  constructor(private _districtsService: DistrictsService, private _branchService: BranchService, private _competitorService: CompetitorService) {
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

  /********************************************************************************************************/

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
    let BranchWithin_TargetSegmentPolygon;
    let isBranchWithin_TargetSegmentPolygon = false;
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
          BranchWithin_TargetSegmentPolygon();
          getIntersectionWithBranches();
          getIntersectionWithCompetitorBranches();
          if (isThereIntersectionWithBranches == true && isThereIntersectionWithCompetitorBranches == false) {
            let popup = L.popup().setLatLng(point).setContent("There is overlap with other branches").openOn(map);
          }
          if (isThereIntersectionWithCompetitorBranches == true && isThereIntersectionWithBranches == false) {
            let popup = L.popup().setLatLng(point).setContent("There is overlap with other competitor branches").openOn(map);
          }
          if (isThereIntersectionWithCompetitorBranches == true && isThereIntersectionWithBranches == true) {
            let popup = L.popup().setLatLng(point).setContent("There is overlap with other branches and competitor branches").openOn(map);
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
          L.marker([this.branches[i].branch_location.lat, this.branches[i].branch_location.lng], { icon: this.myIcon('../../assets/adidas_PNG22.png'), draggable: true }).addTo(this.mymap);
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
            L.marker([this.competitor[i].competitor_location[j].lat, this.competitor[i].competitor_location[j].lng], { icon: this.myIcon('../../assets/clogo.png'), draggable: true }).addTo(this.mymap).addEventListener('click', this.onClick1);
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
    /******************************************* target segment *******************************************/
    //proplem polygon
    BranchWithin_TargetSegmentPolygon = function () {
      let pt = turf.point(point);
      console.log("pt",pt);
      let poly = BranchesComponent.prototype.targetSegmentPolygon;
      //proplem polygon
      console.log("targetSegmentPolygon", poly);
      let isWithin = turf.booleanPointInPolygon(pt, poly);
      console.log("isWithin: ", isWithin);
    }
  }
  /****************************************************************************************************/

  /******************************************* target segment *******************************************/
  findIndexByIndexProperty(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].index === value) {
        return array.indexOf(array[i]);
      }
    }
    return null;
  }
  getSortedArrForSelectedParams(Arr, outArr): Object[] {
    outArr = [];
    if (Arr.length !== 0) {
      for (let i = 0; i < this.geojsonLayer.features.length; i++) {
        outArr[i] = { calssesNo: 0, index: i };
        for (let j = 0; j < Arr.length; j++) {
          switch (Arr[j]) {
            case '1':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.male;
              break;
            case '2':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.female;
              break;
            case '3':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.edu_low;
              break;
            case '4':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.edu_mid;
              break;
            case '5':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.edu_high;
              break;
            case '6':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.classA;
              break;
            case '7':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.classB;
              break;
            case '8':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.classC;
              break;
            case '9':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.classD;
              break;
            case '11':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.age30;
              break;
            case '12':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.age45;
              break;
            case '13':
              outArr[i].calssesNo += this.geojsonLayer.features[i].properties.age55;
              break;
            default:
              break;
          }
        }
      }
      outArr.sort(function (a, b) { return (a.calssesNo > b.calssesNo) ? 1 : ((b.calssesNo > a.calssesNo) ? -1 : 0); });
      //var max = this.geojsonLayer.features[outArr[outArr.length - 1].index];
    }
    return outArr;
  }

  change(x) {
    x.checked = !x.checked
    console.log(x);
    if (x.checked) {
      this.selectedValue.push(x);
    }
    else {
      let updateItem = this.selectedValue.find(this.findIndexToUpdate, x.id);
      let index = this.selectedValue.indexOf(updateItem);
      this.selectedValue.splice(index, 1);
    }
    console.log(this.selectedValue);
  }
  findIndexToUpdate(x) {
    return x.id === this;
  }
  onSubmit() {
    let targetClasses = [], targetELevels = [], targetGender = [], targetAges = [],
      income = [], edu = [], gender = [], age = [];
    if (this.selectedValue.length !== 0) {
      for (let i = 0; i < this.selectedValue.length; i++) {
        switch (this.selectedValue[i].id) {
          case '1':
          case '2':
            targetGender.push(this.selectedValue[i].id);
            break;
          case '3':
          case '4':
          case '5':
            targetELevels.push(this.selectedValue[i].id);
            break;
          case '6':
          case '7':
          case '8':
          case '9':
            targetClasses.push(this.selectedValue[i].id);
            break;
          case '10':
          case '11':
          case '12':
            targetAges.push(this.selectedValue[i].id);
            break;
          default:
            break;
        }
      }
      this._districtsService.getDistricts().subscribe(response => {
        this.geojsonLayer = response;
        if (targetClasses.length !== 0) {
          income = this.getSortedArrForSelectedParams(targetClasses, income);
        }
        if (targetELevels.length !== 0) {
          console.log('targetELevels')
          edu = this.getSortedArrForSelectedParams(targetELevels, edu);
        }
        if (targetGender.length !== 0) {
          console.log('targetGender')
          gender = this.getSortedArrForSelectedParams(targetGender, gender);
        }
        if (targetAges.length !== 0) {
          console.log('targetAges')
          age = this.getSortedArrForSelectedParams(targetAges, age);
        }
        let indicator: Array<number> = [];
        for (let i = 0; i < this.geojsonLayer.features.length; i++) {
          indicator.push(this.findIndexByIndexProperty(income, i) + this.findIndexByIndexProperty(age, i) + this.findIndexByIndexProperty(gender, i) + this.findIndexByIndexProperty(edu, i));
        };
        if (this.targetPolygon) {
          this.targetPolygon.clearLayers();
        }
        this.targetPolygon = L.geoJSON(this.geojsonLayer.features[indicator.indexOf(Math.max(...indicator))]);
        BranchesComponent.prototype.targetSegmentPolygon = this.targetPolygon;
        this.targetPolygon.addTo(this.mymap);
      }, err => { return err });
    }
  }
  //#endregion


  /*****************************************************************************************************/
  ngOnInit() {
    this.mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    console.log(this.mymap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);

  }
}
