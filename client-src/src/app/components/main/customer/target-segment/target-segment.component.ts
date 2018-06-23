import { Component, OnInit } from '@angular/core';
import { DistrictsService } from '../../../../services/districts/districts.service';

@Component({
  selector: 'app-target-segment',
  templateUrl: './target-segment.component.html',
  styleUrls: ['../../main.component.css', './target-segment.component.css']
})

export class TargetSegmentComponent implements OnInit {
  selectedValue = [];
  geojsonLayer: any;
  constructor(private _districtsService: DistrictsService) { }
  genderTypes = [{ id: '1', class: 'male', name: 'Male', checked: false }, { id: '2', class: 'female', name: 'Female', checked: false },];
  eduLevels = [{ id: '3', name: 'Low', checked: false }, { id: '4', name: 'Medium', checked: false }, { id: '5', name: 'High', checked: false }];
  incomeLevels = [{ id: '6', name: 'A', checked: false }, { id: '7', name: 'B', checked: false }, { id: '8', name: 'C', checked: false }, { id: '9', name: 'D', checked: false }];
  ngOnInit() {
  }

  change(x) {
    x.checked = !x.checked
    console.log(x);
    if (x.checked) {
      this.selectedValue.push(x);
    }
    else {
      let updateItem = this.selectedValue.find(this.findIndexToUpdate, x.id);
      let index = this.selectedValue.indexOf(updateItem);
      this.selectedValue.splice(index, 1);
    }
    console.log(this.selectedValue);

  }
  findIndexToUpdate(x) {
    return x.id === this;
  }
  onSubmit() {
    let targetClasses = [];
    let targetELevels = [];
    let targetGender = [];
    let districts = [];
    if (this.selectedValue.length !== 0) {
      for (let i = 0; i < this.selectedValue.length; i++) {
        switch (this.selectedValue[i].id) {
          case '1':
          case '2':
            targetGender.push(this.selectedValue[i].id);
            break;
          case '3':
          case '4':
          case '5':
            targetELevels.push(this.selectedValue[i].id);
            break;
          case '6':
          case '7':
          case '8':
          case '9':
            targetClasses.push(this.selectedValue[i].id);
            break;
          default:
            break;
        }
      }
      this._districtsService.getDistricts().subscribe(response => {
        console.log(response);
        this.geojsonLayer = response;
        if (targetClasses.length !== 0) {
          let selectedClasses = [];
          for (let i = 0; i < this.geojsonLayer.features.length; i++) {
            selectedClasses[i] = { calssesNo: 0, index: i };
            for (let j = 0; j < targetClasses.length; j++) {
              switch (targetClasses[j]) {
                case '6':
                  selectedClasses[i].calssesNo += this.geojsonLayer.features[i].properties.classA;
                  break;
                case '7':
                  selectedClasses[i].calssesNo += this.geojsonLayer.features[i].properties.classB;
                  break;
                case '8':
                  selectedClasses[i].calssesNo += this.geojsonLayer.features[i].properties.classC;
                  break;
                case '9':
                  selectedClasses[i].calssesNo += this.geojsonLayer.features[i].properties.classD;
                  break;
                default:
                  break;
              }
            }
          }
          console.log(selectedClasses)
          selectedClasses.sort(function (a, b) { return (a.calssesNo > b.calssesNo) ? 1 : ((b.calssesNo > a.calssesNo) ? -1 : 0); });
          console.log('selectedClasses')
          console.log(selectedClasses)
          console.log(selectedClasses.length)
          var max = this.geojsonLayer.features[selectedClasses[selectedClasses.length-1].index];
          console.log(max);
        }




      });
    }
  }
}
