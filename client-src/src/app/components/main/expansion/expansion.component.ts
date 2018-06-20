import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { BranchService } from '../../../services/branch/branch.service';
import { WarehouseService } from '../../../services/warehouse/warehouse.service';
import { FactoryService } from '../../../services/factory/factory.service';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['../main.component.css', './expansion.component.css']
})
export class ExpansionComponent implements OnInit {
  expansionTypes = [
    { id: '1', class: 'building-o', name: 'Branch' },
    { id: '2', class: 'industry', name: 'Factory' },
    { id: '3', class: 'home', name: 'Warehouse' }
  ];
  selectionTypes = [
    { id: '1', class: 'square-o', name: 'Rectangle' },
    { id: '2', class: 'bookmark-o fa-rotate-180', name: 'Polygon' },
    { id: '3', class: 'map-marker', name: 'Pinpoint' }
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

  public warehouse=[];
  public factory=[];
  public branch=[];

  showWH = function () {
    this._warehouseService.getWarehouse().subscribe(
      data => {
        this.warehouse = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([data[i].warehouse_location.lat, data[i].warehouse_location.lng]).addTo(this.mymap);
        }
      },
      err => console.log(err)
    );
  }
  showF = function () {
    this._factoryService.getFactories().subscribe(
      data => {
        this.warehouse = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([data[i].factory_location.lat, data[i].factory_location.lng]).addTo(this.mymap);
        }
      },
      err => console.log(err)
    );
  }
  showB =  function () {
    this._branchService.getBranches().subscribe(
      data => {
        this.branch = data;
        for (let i = 0; i < data.length; i++) {
          L.marker([data[i].branch_location.lat, data[i].branch_location.lng]).addTo(this.mymap);
        }
      },
      err => console.log(err)
    );
  }

  constructor(private _warehouseService: WarehouseService,
    private _factoryService: FactoryService,
    private _branchService: BranchService) { }

  ngOnInit() {
    L.Marker.prototype.options.icon = this.myIcon;
    let mymap = L.map('mapid').setView([30.09219, 31.32297], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
      maxZoom: 18,
    }).addTo(mymap);

  }

}
