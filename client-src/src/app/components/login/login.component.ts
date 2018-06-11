import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  
 user ={
  email:'',
  Password:''
} 
 onSubmit({value,valid}){
  if(valid){
console.log(value)
  }else{
    console.log('failuer:)')

  }
 
} 
  constructor(  
   ) { }

   

  ngOnInit() {
  }
/* loginUser(event){
  event.preventDefault()
  const target = event.target
  const usermail= target.querySelector("#inputEmail").value
  const password = target.querySelector("#inputPassword").value
  this.Auth.getUserDetails(usermail,password )
  console.log(usermail,password)
} */
}
