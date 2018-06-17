import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { BranchService } from '../../../services/branch/branch.service';
import { AdvertismentService } from '../../../services/advertisement/advertisment.service';
import { CompetitorService } from '../../../services/competitor/competitor.service';
import { CustomerService } from '../../../services/customers/customers.service';

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
  constructor(private _customerService: CustomerService, private _branchService: BranchService,
    private _advertismentService: AdvertismentService, private _competitorService: CompetitorService) {
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
  }

  ngOnInit() {
    this.mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);

    this._branchService.getBranches().subscribe(
      data => {
        this.branches = data;
        for (let i = 0; i < data.length; i++) {


          L.marker([data[i].branch_location.lat, data[i].branch_location.lng], { icon: myIcon }).addTo(this.mymap);

        }
      },
      err => console.log(err)

    );
    this._customerService.getCustomers().subscribe(
      data => {
        this.customers = data;
        for (let i = 0; i < data.length; i++) {


          L.marker([this.customers[i].cst_location.lat, this.customers[i].cst_location.lng], { icon: customerIcon }).addTo(this.mymap);

        }
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
    const myIcon = L.icon({
      iconUrl: '../../assets/adidas_PNG22.png',
      iconRetinaUrl: '../../assets/adidas_PNG22.png',
      iconSize: [50, 50],
      iconAnchor: [13, 41],
      popupAnchor: [-3, -76],
      /* shadowUrl: '../../assets/adidas_PNG22.png',
      shadowRetinaUrl: '../../assets/adidas_PNG22.png', */
      /*       shadowSize: [12, 12],
            shadowAnchor: [22, 94] */
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
  }
}
