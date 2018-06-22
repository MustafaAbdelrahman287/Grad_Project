import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-target-segment',
  templateUrl: './target-segment.component.html',
  styleUrls: ['../../main.component.css', './target-segment.component.css']
})

export class TargetSegmentComponent implements OnInit {
  selectedValue = [];
  constructor() { }
  genderTypes = [
    { id: '1', class: 'male', name: 'Male', checked:false },
    { id: '2', class: 'female', name: 'Female', checked:false },
  ];
  eduLevels = [{id:'1', name:'Low', checked:false}, {id:'2', name:'Medium', checked:false}, {id:'3', name:'High', checked:false}];
  incomeLevels = [{id:'1', name:'A', checked:false}, {id:'2', name:'B', checked:false}, {id:'3', name:'C', checked:false}, {id:'4', name:'D', checked:false}];
  ngOnInit() {
  }

  change(x){
    x.checked = !x.checked
    console.log(x);
    if(x.checked){
      this.selectedValue.push(x);
    }
    else{
     let updateItem = this.selectedValue.find(this.findIndexToUpdate, x.id);

     let index = this.selectedValue.indexOf(updateItem);

     this.selectedValue.splice(index, 1);
    }
    console.log(this.selectedValue);
  }

  findIndexToUpdate(x) { 
        return x.id === this;
    }
}
