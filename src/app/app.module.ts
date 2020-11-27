import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AppRouterModule } from './app.routes';
import { HomeComponent } from './components/pages/home/home.component';
import { JwtModule } from "@auth0/angular-jwt" ;

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    JwtModule. forRoot ( {
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [ "localhost:44368" ] ,
        blacklistedRoutes: [ ]
      }
    } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
