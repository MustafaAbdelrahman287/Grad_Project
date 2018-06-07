import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-target-segment',
  templateUrl: './target-segment.component.html',
  styleUrls: ['../../main.component.css', './target-segment.component.css']
})

export class TargetSegmentComponent implements OnInit {
  constructor() { }
  eduLevels = [{id:'1', name:'Illiterate'}, {id:'2', name:'Primary School'}, {id:'3', name:'Prep School'}, {id:'4', name:'High School'}, {id:'5', name:'University'}, {id:'6', name:'Post Graduatation Degree'}];
  incomeLevels = [{id:'1', name:'A'}, {id:'2', name:'B'}, {id:'3', name:'C'}, {id:'4', name:'D'}];
  ngOnInit() {
  }

}
