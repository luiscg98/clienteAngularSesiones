import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NcService } from '../../../services/nc.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin;
  token;
  constructor(private nc: NcService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("jwt");
    if(this.token != null)
    {
      this.router.navigate(["home"]);
    }
  }

  login(Username, password){
    this.nc.login(Username, password).subscribe( data => {
      if (data['Token']=="null"){
        console.log(data['err']);
      }
      else{
        localStorage.setItem("jwt", data['Token']);
        localStorage.setItem("refreshToken", data['RefreshToken']);
        this.invalidLogin = false;
        this.router.navigate(["home"]);
      }
    })
  }

}
