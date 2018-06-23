import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import * as L from 'leaflet';
import {Http} from '@angular/http';
import {ICustomer} from '../../../../interfaces/customer'

@Component({
  selector: 'app-loyal-customers',
  templateUrl: './loyal-customers.component.html',
  styleUrls: ['./loyal-customers.component.css']
})
export class LoyalCustomersComponent implements OnInit {
  
   public customers=[];
  constructor(private http:Http,private _customerService:CustomerService) { }

  ngOnInit() {
   
  }
  onSubmit({value}){
    console.log(value)
  
    if (value.orders && value.duration) {
      console.log(value.orders)
      
      this._customerService.getCustomer().subscribe(
        data => {
          this.customers = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].orders_code.length >= value.orders) {
              console.log("target customer from number of orders is: ", data[i]);
              //L.marker([data[i].cst_location.lat, data[i].cst_location.lng], { icon: this.customerIcon, draggable: true }).addTo(this.mymap);
            }
          }
        },
        err => console.log(err)
      );

  }
}
}


