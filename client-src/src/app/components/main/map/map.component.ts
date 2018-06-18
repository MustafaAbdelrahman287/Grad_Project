import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { BranchService } from '../../../services/branch/branch.service';
import { AdvertismentService } from '../../../services/advertisement/advertisment.service';
import { CompetitorService } from '../../../services/competitor/competitor.service';
import { CustomerService } from '../../../services/customers/customers.service';
import * as turf from '@turf/turf';
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
  public advertisment = [];
  public competitor = [];
  public customers = [];
  public factories = [];
  constructor(private http: Http, private _customerService: CustomerService, private _branchService: BranchService, private _advertismentService: AdvertismentService, private _competitorService: CompetitorService, private _factoryService: FactoryService) {
    /* http.get('../../../../assets/map.geojson').subscribe(response => {
      this.geojsonLayer = response.json();
      this.geojson = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[34.8486328125,29.420460341013133],[34.892578125,29.726222319395504],[34.2333984375,31.27855085894653],[32.2998046875,31.353636941500987],[30.9814453125,31.615965936476076],[29.0478515625,30.826780904779774],[24.960937499999996,31.80289258670676],[24.960937499999996,21.983801417384697],[36.650390625,21.90227796666864],[32.431640625,29.80251790576445],[34.365234375,27.916766641249065],[34.8486328125,29.420460341013133]]]}}]}
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
    let l = event;
    console.log(event);
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
        for (let i = 0; i < data.length; i++) {
          L.marker([this.branches[i].branch_location.lat, this.branches[i].branch_location.lng], { icon: this.myIcon, draggable: true }).addTo(this.mymap).bindPopup(`Name : ${this.branches[i].name}`).addEventListener('click', this.onClick);
        }
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

    var customerIcon = L.icon({
      iconUrl: '../../assets/customer.png',
      iconRetinaUrl: '../../assets/customer.png',
      iconSize: [25, 25],
      iconAnchor: [13, 41],
      popupAnchor: [-3, -76],
    });
  }

}
