import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['../main.component.css', './branches.component.css']
})
export class BranchesComponent implements OnInit {

  constructor() { }
overlapareas= [{id:'1', name:'Adidas'}, {id:'2', name:'Competitor Branches'}];
  ngOnInit() {
  }

}
