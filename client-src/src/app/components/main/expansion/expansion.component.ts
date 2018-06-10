import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['../main.component.css', './expansion.component.css']
})
export class ExpansionComponent implements OnInit {

  constructor() { }
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
  ngOnInit() {
  }

}
