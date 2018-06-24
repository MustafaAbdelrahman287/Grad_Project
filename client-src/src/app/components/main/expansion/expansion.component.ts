import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { BranchService } from '../../../services/branch/branch.service';
import { WarehouseService } from '../../../services/warehouse/warehouse.service';
import { FactoryService } from '../../../services/factory/factory.service';
import { IsochronesService } from '../../../services/isochrones/isochrones.service';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['../main.component.css', './expansion.component.css']
})
export class ExpansionComponent implements OnInit {
  onClick : any;
  mymap:any;
  expansionTypes = [
    { id: '1', class: 'building-o', name: 'Branch' },
    { id: '2', class: 'industry', name: 'Factory' },
    { id: '3', class: 'home', name: 'Warehouse' }
  ];
 
  addexpansions = [
    { id: '1', class: 'industry', name: 'Factory' },
    { id: '2', class: 'home', name: 'Warehouse' }
  ];
  myIcon = L.icon({
    iconUrl: '../../assets/adidas_PNG22.png',
    iconRetinaUrl: '../../assets/adidas_PNG22.png',
    iconSize: [50, 50],
    iconAnchor: [24, 24],
    popupAnchor: [0, 0]
  });

  public warehouse = [];
  public factory = [];
  public branches = [];
  public isochrones;
  public isoline = [];

  showWH = function (map) {
    this._warehouseService.getWarehouse().subscribe(
      data => {
        this.warehouse = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([data[i].warehouse_location.lat, data[i].warehouse_location.lng]).addTo(map);
        }
      },
      err => console.log(err)
    );
  }
  showF = function (map) {
    this._factoryService.getFactories().subscribe(
      data => {
        this.warehouse = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([data[i].factory_location.lat, data[i].factory_location.lng]).addTo(map);
        }
      },
      err => console.log(err)
    );
  }
  showB = function (map) {
    this._branchService.getBranches().subscribe(
      data => {
        this.branches = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([data[i].branch_location.lat, data[i].branch_location.lng]).addTo(map);
        }
      },
      err => console.log(err)
    );
  }
  showSA = function (map) {
    let location:string[] = [];
    this._branchService.getBranches().subscribe(
      data => {
        this.branches = data;
        if (this.branches.length !== 0) {
          for (let i = 0; i < this.branches.length; i++) {
            location[i] = this.branches[i].branch_location.lat + ',' + this.branches[i].branch_location.lng;
            if (location.length !== 0) {
              this._isochronesService.getIsochrones(location[i]).subscribe(
                data => {
                  this.isochrones = data.response.isoline[0].component[0].shape;
                  let arr = [];
                  for (let i = 0; i < this.isochrones.length; i++) {
                    let b = this.isochrones[i].split(',').map(function(item) {
                      return parseFloat(item);
                    });
                      arr.push(b);
                  }
                  L.polygon(arr).addTo(map);
                    this.isoline.push(turf.polygon([arr]));
                    console.log(this.isoline);
                },
                err => console.log(err)
              )
            }
          }
        }
      },
      err => console.log(err)
    );
  }

  constructor(private _warehouseService: WarehouseService,
    private _factoryService: FactoryService,
    private _branchService: BranchService,
    private _isochronesService: IsochronesService) { }

  ngOnInit() {
    L.Marker.prototype.options.icon = this.myIcon;
    let location;
    this.mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(this.mymap);
    this.showB(this.mymap);
    this.showSA(this.mymap);
    function onMapClick(e) {
      location = [e.latlng.lat, e.latlng.lng];
      L.marker(location).addTo(this.mymap);
    }
    this.onClick = () => {
      this.mymap.on('click', onMapClick);
    }

  }

}
