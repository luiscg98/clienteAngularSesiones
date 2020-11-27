import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NcService } from '../../../services/nc.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token;
  refresh;
  usuarios;
  constructor(private nc: NcService, private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("jwt");
    this.refresh = localStorage.getItem("refreshToken");
    if(this.token == null){
      this.router.navigate(["login"]);
    }
    if (this.token && this.jwtHelper.isTokenExpired(this.token)){
      this.nc.refresh(this.token, this.refresh).subscribe(data => {
        localStorage.setItem("jwt", data['accessToken']);
        localStorage.setItem("refreshToken", data['refreshToken']);
        console.log("se refresco");
      })
    }
  }

  cerrarsesion(){
    this.token = localStorage.getItem("jwt");
    this.refresh = localStorage.getItem("refreshToken");
    if (this.token && this.jwtHelper.isTokenExpired(this.token)){
      this.expired(this.token, this.refresh);
    }
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    this.nc.logout(this.token).subscribe( data => {
    })
  }

  cusuarios(){
    this.token = localStorage.getItem("jwt");
    this.refresh = localStorage.getItem("refreshToken");
    if (this.token && this.jwtHelper.isTokenExpired(this.token)){
      this.expired(this.token, this.refresh);
    }
    this.nc.usuariosget(this.token).subscribe( data => {
      this.usuarios=data;
    })
  }

  expired(token, refresh){
    this.nc.refresh(token, refresh).subscribe(data => {
      localStorage.setItem("jwt", data['accessToken']);
      localStorage.setItem("refreshToken", data['refreshToken']);
      console.log("se refresco");
    })
  }

}
