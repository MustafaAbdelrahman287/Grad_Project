import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DistrictsService } from '../../../services/districts/districts.service';
import * as turf from '@turf/turf';
import {CustomerService} from'../../../services/customers/customers.service';
import{ICustomer} from'../../../interfaces/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../main.component.css', './customer.component.css']
})
export class CustomerComponent implements OnInit {
  geojsonLayer: any;
  selectedValue = [];
  targetPolygon:any;
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

  constructor(private _districtsService: DistrictsService, private _customerService:CustomerService) { }

  //#region targetSegment
  findIndexByIndexProperty(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].index === value) {
        return array.indexOf(array[i]);
      }
    }
    return null;
  }
  getSortedArrForSelectedParams(Arr, outArr):Object[] {
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

  genderTypes = [{ id: '1', class: 'male', name: 'Male', checked: false }, { id: '2', class: 'female', name: 'Female', checked: false },];
  eduLevels = [{ id: '3', name: 'Low', checked: false }, { id: '4', name: 'Medium', checked: false }, { id: '5', name: 'High', checked: false }];
  incomeLevels = [{ id: '6', name: 'A', checked: false }, { id: '7', name: 'B', checked: false }, { id: '8', name: 'C', checked: false }, { id: '9', name: 'D', checked: false }];
  ageRanges = [{ id: '10', name: '18:30', checked: false }, { id: '11', name: '30:45', checked: false }, { id: '12', name: '45:55', checked: false }];

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
        let indicator:Array<number> = [];
        for (let i = 0; i < this.geojsonLayer.features.length; i++) {
          indicator.push(this.findIndexByIndexProperty(income, i) + this.findIndexByIndexProperty(age, i) + this.findIndexByIndexProperty(gender, i) + this.findIndexByIndexProperty(edu, i));
        };
        this.targetPolygon = L.geoJSON(this.geojsonLayer.features[indicator.indexOf(Math.max(...indicator))]);
        this.mymap.geoJSON.remove();
        this.targetPolygon.addTo(this.mymap);
      }, err => { return err });
    }
  }
  //#endregion
  onMapClick(event) {
    let l = event.latlng;
    console.log(l);
    L.marker(l, { icon: this.myIcon('../../assets/adidas_PNG22.png'), draggable: true }).addTo(this.mymap);
    return l;
  }
  //*****************************************CurrentCustomer********************************** */
  onClick1(event){
   
    this._customerService.getCustomers().subscribe(
      data => {
        this.customers = data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          if ( data[i].orders_code.length !== 0) {

            L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
          }
         
        }
      },
      err => console.log(err)
    );


  }
 //*****************************************PotentialCustomer********************************** */
  onClick(event){
    this._customerService.getCustomers().subscribe(
      data => {
        this.customers = data;
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          if (!data[i].orders_code || data[i].orders_code.length === 0) {
            L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
          }
        }
      },
      err => console.log(err)
    );
  }
  //*****************************************LoyalCustomer********************************** */
  onSubmitt({value}){
    console.log(value)
  
    if (value.orders && value.duration) {
      console.log(value.orders)
      
      this._customerService.getCustomers().subscribe(
        data => {
          this.customers = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].orders_code.length >= value.orders) {
              console.log("target customer from number of orders is: ", data[i]);
              L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
            }
          }
        },
        err => console.log(err)
      );

  }
}

  ngOnInit() {
    //L.Marker.prototype.options.icon = this.myIcon;
    this.mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);
  }

}
