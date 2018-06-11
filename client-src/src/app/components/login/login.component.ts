import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private url = 'http://localhost:5000/api/Users/login'
  
  constructor(private http:Http) { }
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


  ngOnInit() { }
}
