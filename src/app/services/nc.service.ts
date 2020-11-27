import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NcService {

  constructor(private http: HttpClient) { }

  login(Username:String, password:String){
    let body={
      Username,
      password
    }
    return this.http.post("https://localhost:44338/api/login", body);
  }

  logout(token:String){
    let body={
      fhgj:"fghjkl"
    }
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.post("https://localhost:44338/api/token/revoke", body, {headers});
  }

  refresh(AccessToken:String, RefreshToken){
    let body={
      AccessToken,
      RefreshToken
    }
    return this.http.post("https://localhost:44338/api/token/refresh", body);
  }

  usuariosget(token:string){
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get("https://localhost:44338/api/user", {headers});
  }



}
