import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['../main.component.css', './expansion.component.css']
})
export class ExpansionComponent implements OnInit {

  constructor() { }
  expansionTypes = [{id:'1', name:'Branch'}, {id:'2', name:'Factory'}, {id:'3', name:'Warehouse'}];
  ngOnInit() {
  }

}
