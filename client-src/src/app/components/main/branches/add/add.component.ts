import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../services/branch/branch.service';
import { IBranch } from '../../../../interfaces/branch';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private _branchService: BranchService) { }

  ngOnInit() {
  }

  onAddSubmit({value}) {
    // console.log(value);
    value.branch_location = JSON.parse(value.branch_location);
    let branch: IBranch = {
      branch_code: value.branch_code,
      branch_location: value.branch_location,
      city: value.city,
      name: value.name
    };
    // console.log(branch);
    this._branchService.createBranch(branch);
  }

}
