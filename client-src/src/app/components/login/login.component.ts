import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin:boolean;
  constructor(private router: Router, private authService: AuthService) { }
  onSubmit({ value, valid }) {
    console.log(value, valid);
    if (valid) {
      let result = this.authService.login(value);
      console.log(result)
      result.subscribe(result => { 
        if (result)
          this.router.navigate(['/main']);
        else  
          this.invalidLogin = true; 
      }, (err:Response) => {console.log(err)});
    } else {
      this.invalidLogin = true;
      console.log(this.invalidLogin);
    }
  }


  ngOnInit() { }
}
