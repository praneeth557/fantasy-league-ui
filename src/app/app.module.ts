import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PointsSystemComponent } from './points-system/points-system.component';
import { LoginService } from './shared/login.service';
import { AuthorizationService } from './shared/authorization.service';
import { AppConstants } from './constants/app.constants';
import { FormsModule } from "@angular/forms";
import { AppSelectValidatorDirective } from './directives/app-select-validator.directive';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeaderboardComponent,
    PointsSystemComponent,
    AppSelectValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppConstants, LoginService, CookieService, AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
