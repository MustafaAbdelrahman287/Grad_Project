import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private url = 'http://localhost:5000/api/Users/login'
  
user ={
  email:'',
  Password:''
}
onSubmit({value,valid}){
  let login = value;
  if(valid){
    this.http.post(this.url, login).subscribe(response => {
      console.log(response.json());
    });
  }else{
    console.log('failuer:)')
  }

}

  constructor(private http:Http) {

  }

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
