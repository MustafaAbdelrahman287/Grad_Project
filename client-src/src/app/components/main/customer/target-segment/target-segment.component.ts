import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-target-segment',
  templateUrl: './target-segment.component.html',
  styleUrls: ['../../main.component.css', './target-segment.component.css']
})

export class TargetSegmentComponent implements OnInit {
  constructor() { }
  eduLevels = [{id:'1', name:'Low'}, {id:'2', name:'Medium'}, {id:'3', name:'High'}];
  incomeLevels = [{id:'1', name:'A'}, {id:'2', name:'B'}, {id:'3', name:'C'}, {id:'4', name:'D'}];
  ngOnInit() {
  }

}
