import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';

import { BranchService } from '../../../services/branch/branch.service';
import { IsochronesService } from '../../../services/isochrones/isochrones.service';
import { CompetitorService } from '../../../services/competitor/competitor.service';
import { CustomerService } from '../../../services/customers/customers.service';
import { ItemService } from '../../../services/item/item.service';
import { SurveyService } from '../../../services/survey/survey.service';
import { Http } from '@angular/http';
import { latLngBounds } from 'leaflet';
import { OrderService } from '../../../services/order/order.service';
import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public mymap: any;
  public geojsonLayer: any;
  geojson: any;
  public branches = [];
  public competitor = [];
  public customers = [];
  public survey = [];
  public item = [];
  public order = [];
  constructor(private http: Http, private _customerService: CustomerService, private _branchService: BranchService, private _competitorService: CompetitorService,
               private _itemService: ItemService, private _surveyService: SurveyService, private _orderService: OrderService, private _isochronesService: IsochronesService) {

    /************************************ target segment districts ************************************/
    let poly1,poly5,poly4,poly3,poly2,poly6,poly7,poly8;
    let poly_props = [];
    let index;
   
    this.http.get('../../../../assets/districts.geojson').subscribe(response => {
      const  districts=  this.geojsonLayer = response.json();  
        //destructuring the features into objects
   let poly_array= [poly1,poly2,poly3,poly4,poly5,poly6,poly7,poly8]=districts.features; 
   //pushing all polygons props into an array
   for (let i = 0; i < districts.features.length; i++) {
     poly_props.push(districts.features[i].properties); 
   } 
///-----------------------Max ClassA ---------------------////
  let findMaxClassA = function(){ // function Start
      let property=[];
      //looping on properties to get only the specified property
      for (let i = 0; i < poly_props.length; i++) { 
          property.push(poly_props[i].classA);      
      }

      var max = 0; //getting max value
      for (let i=0; i<property.length; i++) {
        index = i;
      if (property[i]>max) {
          max = property[i];
      }

  } 
  return poly_array[index]; //return of GeoJSON object 

    }
  //---------------ClassB------------------//
  let findMaxClassB = function(){ // function Start
    let property=[];
    //looping on properties to get only the specified property
    for (let i = 0; i < poly_props.length; i++) { 
        property.push(poly_props[i].classB);      
    }

    var max = 0; //getting max value
    for (let i=0; i<property.length; i++) {
      index = i;
    if (property[i]>max) {
        max = property[i];
    }

} 
return poly_array[index]; //return of GeoJSON object 

  }
  //---------------ClassC------------------//
  let findMaxClassC = function(){ // function Start
    let property=[];
    //looping on properties to get only the specified property
    for (let i = 0; i < poly_props.length; i++) { 
        property.push(poly_props[i].classC);      
    }

    var max = 0; //getting max value
    for (let i=0; i<property.length; i++) {
      index = i;
    if (property[i]>max) {
        max = property[i];
    }

} 
return poly_array[index]; //return of GeoJSON object 

  }
    //---------------ClassD------------------//
  let findMaxClassD = function(){ // function Start
      let property=[];
      //looping on properties to get only the specified property
      for (let i = 0; i < poly_props.length; i++) { 
          property.push(poly_props[i].classD);      
      }
  
      var max = 0; //getting max value
      for (let i=0; i<property.length; i++) {
        index = i;
      if (property[i]>max) {
          max = property[i];
      }
  
  } 
  return poly_array[index]; //return of GeoJSON object 
  
    }  //---------------age from 18-30 ------------------//
  let findMaxAge30 = function(){ // function Start
      let property=[];
      //looping on properties to get only the specified property
      for (let i = 0; i < poly_props.length; i++) { 
          property.push(poly_props[i].age30);      
      }
  
      var max = 0; //getting max value
      for (let i=0; i<property.length; i++) {
        index = i;
      if (property[i]>max) {
          max = property[i];
      }
  
  } 
  return poly_array[index]; //return of GeoJSON object 
  
    }  //---------------age 30 - 45 ------------------//
  let findMaxAge45 = function(){ // function Start
      let property=[];
      //looping on properties to get only the specified property
      for (let i = 0; i < poly_props.length; i++) { 
          property.push(poly_props[i].age45);      
      }
  
      var max = 0; //getting max value
      for (let i=0; i<property.length; i++) {
        index = i;
      if (property[i]>max) {
          max = property[i];
      }
  
  } 
  return poly_array[index]; //return of GeoJSON object 
  
    }
      //---------------Age 45 - 55 ------------------//
  let findMaxAge55 = function(){ // function Start
    let property=[];
    //looping on properties to get only the specified property
    for (let i = 0; i < poly_props.length; i++) { 
        property.push(poly_props[i].age55);      
    }

    var max = 0; //getting max value
    for (let i=0; i<property.length; i++) {
      index = i;
    if (property[i]>max) {
        max = property[i];
    }

} 
return poly_array[index]; //return of GeoJSON object 

  }
    //---------------high education ------------------//
  let findMaxHighEdu = function(){ // function Start
      let property=[];
      //looping on properties to get only the specified property
      for (let i = 0; i < poly_props.length; i++) { 
          property.push(poly_props[i].edu_high);      
      }
  
      var max = 0; //getting max value
      for (let i=0; i<property.length; i++) {
        index = i;
      if (property[i]>max) {
          max = property[i];
      }
  
  } 
  return poly_array[index]; //return of GeoJSON object 
  
    } 
    //---------------Mid education ------------------//
  let findMaxMidEdu = function(){ // function Start
      let property=[];
      //looping on properties to get only the specified property
      for (let i = 0; i < poly_props.length; i++) { 
          property.push(poly_props[i].edu_mid);      
      }
  
      var max = 0; //getting max value
      for (let i=0; i<property.length; i++) {
        index = i;
      if (property[i]>max) {
          max = property[i];
      }
  
  } 
  return poly_array[index]; //return of GeoJSON object 
  
    }  
     //---------------low education ------------------//
  let findMaxLowEdu = function(){ // function Start
      let property=[];
      //looping on properties to get only the specified property
      for (let i = 0; i < poly_props.length; i++) { 
          property.push(poly_props[i].edu_low);      
      }
  
      var max = 0; //getting max value
      for (let i=0; i<property.length; i++) {
        index = i;
      if (property[i]>max) {
          max = property[i];
      }
  
  } 
  return poly_array[index]; //return of GeoJSON object 
  
    }
    //------------------- ClassA + ClassB---------------//
  let findMaxClassAAndB = function(){ // function Start
    let property1=[];
    let property2=[];
    let propertySum=[];
    //looping on properties to get only the specified property
    for (let i = 0; i < poly_props.length; i++) { 
        property1.push(poly_props[i].classA); 
        property2.push(poly_props[i].classB);   
        propertySum.push(property1[i]+property2[i]);
    }

    var max = 0; //getting max value
    for (let i=0; i<propertySum.length; i++) {
      index = i;
    if (propertySum[i]>max) {
        max = propertySum[i];
    }

} 
return poly_array[index]; //return of GeoJSON object 

  }
   //------------------- ClassA + ClassB + ClassC---------------//

    
  let findMaxClassAAndBAndC = function(){ // function Start
    let property1=[];
    let property2=[];
    let property3=[];
    let propertySum=[];
    //looping on properties to get only the specified property
    for (let i = 0; i < poly_props.length; i++) { 
        property1.push(poly_props[i].classA); 
        property2.push(poly_props[i].classB);
        property3.push(poly_props[i].classC);
        propertySum.push(property1[i]+property2[i]+property3[i]);
    }

    var max = 0; //getting max value
    for (let i=0; i<propertySum.length; i++) {
      index = i;
    if (propertySum[i]>max) {
        max = propertySum[i];
    }

} 
return poly_array[index]; //return of GeoJSON object 

  } 
  //------------------- ClassA + ClassB + ClassC + Age 18-30---------------//

    
  let findMaxClassAAndBAndCAndAge = function(){ // function Start
   let property1=[];
   let property2=[];
   let property3=[];
   let property4=[];
   let propertySum=[];
   //looping on properties to get only the specified property
   for (let i = 0; i < poly_props.length; i++) { 
       property1.push(poly_props[i].classA); 
       property2.push(poly_props[i].classB);
       property3.push(poly_props[i].classC);
       property4.push(poly_props[i].age30)
       propertySum.push(property1[i]+property2[i]+property3[i]+property4[i]);
   }

   var max = 0; //getting max value
   for (let i=0; i<propertySum.length; i++) {
     index = i;
   if (propertySum[i]>max) {
       max = propertySum[i];
   }

} 
return poly_array[index]; //return of GeoJSON object 

 }
  

  
  
  L.geoJSON(findMaxClassA()).addTo(this.mymap)
 console.log(districts);

});   
/************************************************************************/

    //#region GeoJson Marker Icon
    function createCustomIcon(feature, latlng) {
      let myIcon = L.icon({
        iconUrl: '../../assets/adidas_PNG22.png',
        iconSize: [50, 50],
        iconAnchor: [24, 24],
        popupAnchor: [0, 0]
      })
      return L.marker(latlng, { icon: myIcon, draggable: true })
    }

    let myLayerOptions = {
      pointToLayer: createCustomIcon
    }
    //#endregion
   /* L.Marker.prototype.options.icon = this.myIcon;
    this.http.get('../../../../assets/FIRE_STATION.geojson').subscribe(response => {
      this.geojsonLayer = response.json();
      console.log(this.geojsonLayer)
      L.geoJSON(this.geojsonLayer, myLayerOptions).addTo(this.mymap);
    });*/
  }

  myIcon = L.icon({
    iconUrl: '../../assets/adidas_PNG22.png',
    iconRetinaUrl: '../../assets/adidas_PNG22.png',
    iconSize: [50, 50],
    iconAnchor: [24, 24],
    popupAnchor: [0, 0]
  });
  customerIcon = L.icon({
    iconUrl: '../../assets/customer.png',
    iconRetinaUrl: '../../assets/customer.png',
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
    console.log(event, this);
  }

  ngOnInit() {
  

   
   this.mymap = L.map('mapid').setView([30.091041, 31.19618], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);


    /*
    this._customerService.getCustomers().subscribe(
      data => {
        this.customers = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([this.customers[i].cst_location.lat, this.customers[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
        }
      },
      err => console.log(err)
    );
*/


    this._itemService.getItem().subscribe(
      data => {
        this.item = data;
      },
      err => console.log(err)

    );
    this._surveyService.getSurvey().subscribe(
      data => {
        this.survey = data;
      },
      err => console.log(err)

    );

    const customerIcon = L.icon({
      iconUrl: '../../assets/customer.png',
      iconRetinaUrl: '../../assets/customer.png',
      iconSize: [25, 25],
      iconAnchor: [13, 41],
      popupAnchor: [-3, -76],
    });


    /************************************ turf intersect ************************************/
    // create a first green polygon from an array of LatLng points
    /* const poly1 = turf.polygon([[
      [30.04971, 31.30199],
      [30.10138, 31.30500],
      [30.1047, 31.33571],
      [30.1047, 31.33963],
      [30.04971, 31.30199]
    ]]);
    const poly1Coords = turf.getCoords(poly1);
    //const polygon1 = L.polygon(poly1Coords, { color: 'green' }).addTo(this.mymap);

    // create a second green polygon from an array of LatLng points
    const poly2 = turf.polygon([[
      [30.09962, 31.31747],
      [30.11936, 31.32769],
      [30.11342, 31.33151],
      [30.1047, 31.33963],
      [30.06612, 31.35404],
      [30.05669, 31.35052],
      [30.06389, 31.32297],
      [30.09962, 31.31747]
    ]]);
    const poly2Coords = turf.getCoords(poly2);
    //const polygon2 = L.polygon(poly2Coords, { color: 'green' }).addTo(this.mymap);

    // create a red polygon from the intersection of the two polygons
    const intersection = turf.intersect(poly1, poly2);
    const intersectionCoords = turf.getCoords(intersection);
    //const polygonOfIntersection = L.polygon(intersectionCoords, { color: 'red' }).addTo(this.mymap);
    /************************************ turf nearst point ************************************
    const targetPoint = turf.point([28.965797, 41.010086], { "marker-color": "#0F0" });
    const points = turf.featureCollection([
      turf.point([28.973865, 41.011122]),
      turf.point([28.948459, 41.024204]),
      turf.point([28.938674, 41.013324])

  ]);
  
  const nearest = turf.nearestPoint(targetPoint, points);
  console.log(nearest);


 const nearstp= L.geoJSON(nearest).addTo(this.mymap);
 /************************************ Draw rectangular ************************************/
  }
}

    
    

    /************************************ Potential Customers Marker************************************/
    /*
     this._customerService.getCustomers().subscribe(
       data => {
         this.customers = data;
         for (let i = 0; i < data.length; i++) {
           if (!data[i].order_code || data[i].order_code.length === 0) {
             L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: customerIcon, draggable: true }).addTo(this.mymap);
           }
         }
       },
       err => console.log(err)
     );
 */

    /************************************ Loyal Customers Marker************************************/
    let duration;
    let numberOfOrders;
    /********************Orders********************
    if (numberOfOrders !== null && duration === undefined) {
      this._customerService.getCustomers().subscribe(
        data => {
          this.customers = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].order_code.length >= numberOfOrders) {
              console.log("target customer from number of orders is: ", data[i]);
              L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
            }
          }
        },
        err => console.log(err)
      );
    }
    /********************Duration********************
    if (duration !== null && numberOfOrders === undefined) {
      let today = new Date();
      let yearOfOrder;
      let currentYear = today.getFullYear();
      let customersOfMatchesOrdersCode = [];
      this._orderService.getOrders().subscribe(
        data => {
          this.order = data;
          for (let o = 0; o < data.length; o++) {
            yearOfOrder = data[o].date.toString().substring(0, 4);
            if (currentYear - yearOfOrder >= duration) {
              customersOfMatchesOrdersCode.push(data[o].customer_id_fk);
            }
          }
          console.log("customersOfMatchesOrdersCode: ", customersOfMatchesOrdersCode);
        },
        err => console.log(err)
      );
      this._customerService.getCustomers().subscribe(
        data => {
          this.customers = data;
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < customersOfMatchesOrdersCode.length; j++) {
              if (customersOfMatchesOrdersCode[j] == data[i].customer_Code) {
                console.log("target customer from duration is: ", data[i]);
                L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
              }
            }
          }
        },
        err => console.log(err)
      );
    }
    /********************Orders and Duration********************
    if (duration !== null && numberOfOrders !== null) {
      let today = new Date();
      let yearOfOrder;
      let currentYear = today.getFullYear();
      let customersOfMatchesOrdersCode = [];
      this._orderService.getOrders().subscribe(
        data => {
          this.order = data;
          for (let o = 0; o < data.length; o++) {
            yearOfOrder = data[o].date.toString().substring(0, 4);
            if (currentYear - yearOfOrder >= duration) {
              customersOfMatchesOrdersCode.push(data[o].customer_id_fk);
            }
          }
          console.log("customersOfMatchesOrdersCode: ", customersOfMatchesOrdersCode);
        },
        err => console.log(err)
      );
      this._customerService.getCustomers().subscribe(
        data => {
          this.customers = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].order_code.length >= numberOfOrders) {
              for (let j = 0; j < customersOfMatchesOrdersCode.length; j++) {
                if (customersOfMatchesOrdersCode[j] == data[i].customer_Code) {
                  console.log("target customer from number of orders and duration is: ", data[i]);
                  L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
                }
              }
            }
          }
        },
        err => console.log(err)
      );
    }
    /***********************************************************************************************/







