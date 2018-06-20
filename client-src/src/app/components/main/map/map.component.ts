import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { BranchService } from '../../../services/branch/branch.service';
import { CompetitorService } from '../../../services/competitor/competitor.service';
import { CustomerService } from '../../../services/customers/customers.service';
import { WarehouseService } from '../../../services/warehouse/warehouse.service';
import { ItemService } from '../../../services/item/item.service';
import { SurveyService } from '../../../services/survey/survey.service';
import { FactoryService } from '../../../services/factory/factory.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mymap: any;
  geojsonLayer: any;
  geojson: any;
  public branches = [];
  public competitor = [];
  public customers = [];
  public warehouse=[];
  public survey=[];
  public item=[];
  constructor(private http:Http,private _customerService: CustomerService, private _branchService: BranchService, private _competitorService: CompetitorService,
  private _warehouseService:WarehouseService,private _itemService:ItemService,private _surveyService:SurveyService) {

   
    /* http.get('../../../../assets/map.geojson').subscribe(response => {
      this.geojsonLayer = response.json();
      this.geojson = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},
      "geometry":{"type":"Polygon","coordinates":[[[34.8486328125,29.420460341013133],[34.892578125,29.726222319395504],
      [34.2333984375,31.27855085894653],[32.2998046875,31.353636941500987],[30.9814453125,31.615965936476076],
      [29.0478515625,30.826780904779774],[24.960937499999996,31.80289258670676],[24.960937499999996,21.983801417384697],
      [36.650390625,21.90227796666864],[32.431640625,29.80251790576445],[34.365234375,27.916766641249065],
      [34.8486328125,29.420460341013133]]]}}]}
      L.geoJSON(this.geojson).addTo(this.mymap);
    }); */
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
    L.Marker.prototype.options.icon = this.myIcon;
    this.http.get('../../../../assets/FIRE_STATION.geojson').subscribe(response => {
      this.geojsonLayer = response.json();
      console.log(this.geojsonLayer)
      L.geoJSON(this.geojsonLayer, myLayerOptions).addTo(this.mymap);
    });
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
    console.log(event, this);
  }

  ngOnInit() {
    this.mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);


    this._branchService.getBranches().subscribe(
      data => {
        this.branches = data;
        console.log(data);
        this.branches.forEach((branch) => {
          this.mymap.push(
            L.marker([branch.branch_location.lat, branch.branch_location.lng], {
              icon: this.myIcon
            }).on('click', this.onClick.bind(this))
          );
        });
        /* for (let i = 0; i < data.length; i++) {
          L.marker([this.branches[i].branch_location.lat, this.branches[i].branch_location.lng], { icon: this.myIcon, draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.branches[i].name}`).addEventListener('click', this.onClick);
        } */
      },
        err => console.log(err)
      )

      


    this._customerService.getCustomers().subscribe(
      data => {
        this.customers = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([this.customers[i].cst_location.lat, this.customers[i].cst_location.lng], { icon: customerIcon, draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.customers[i].name}`);
        }
      },
      err => console.log(err)
    )

   
 
    this._customerService.getCustomers().subscribe(
      data => {
        this.customers = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([this.customers[i].cst_location.lat, this.customers[i].cst_location.lng], { icon: customerIcon }).addTo(this.mymap);
        }
      },
      err => console.log(err)
    );
    this._warehouseService.getWarehouse().subscribe(
      data => {
        this.warehouse = data;
        for (let i = 0; i < data.length; i++) {



          L.marker([data[i].warehouse_location.lat, data[i].warehouse_location.lng]).addTo(this.mymap);

          L.marker([data[i].warehouse_location.lat, data[i].warehouse_location.lng]).addTo(this.mymap);

        }
      },
      err => console.log(err)
    );
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
    const poly1 = turf.polygon([[
      [30.04971, 31.30199],
      [30.10138, 31.30500],
      [30.1047, 31.33571],
      [30.1047, 31.33963],
      [30.04971, 31.30199]
    ]]);
    const poly1Coords = turf.getCoords(poly1);
    const polygon1 = L.polygon(poly1Coords, { color: 'green' }).addTo(this.mymap);

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
    const polygon2 = L.polygon(poly2Coords, { color: 'green' }).addTo(this.mymap);

    // create a red polygon from the intersection of the two polygons
    const intersection = turf.intersect(poly1, poly2);
    const intersectionCoords = turf.getCoords(intersection);
   const polygonOfIntersection = L.polygon(intersectionCoords, { color: 'red' }).addTo(this.mymap);
  /************************************ turf nearst point ************************************/
  const targetPoint = turf.point([28.965797, 41.010086], {"marker-color": "#0F0"});
  const  points = turf.featureCollection([
      turf.point([28.973865, 41.011122]),
      turf.point([28.948459, 41.024204]),
      turf.point([28.938674, 41.013324])
  ]);
  
  const nearest = turf.nearestPoint(targetPoint, points);
  console.log(nearest);

 // const nearstt=turf.getCoords(nearest);
 const nearstp= L.geoJSON(nearest).addTo(this.mymap);
  
 
 
 
 
 
  }
}
