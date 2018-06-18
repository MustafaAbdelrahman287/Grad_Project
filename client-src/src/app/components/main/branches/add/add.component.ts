import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../services/branch/branch.service';
import { IBranch } from '../../../../interfaces/branch';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private _branchService:BranchService) { }

  ngOnInit() {
  }

  onAddSubmit ({value, valid}) {
    console.log(value, valid);
    console.log(value.branch_location);
    let branch:IBranch = value;
    console.log(branch);
    this._branchService.createBranch(branch);
  }

}
