import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationService } from './shared/authorization.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserLoggedIn = false;
  tokenValue : string;
  userContext : string;
  uid : any;

  constructor(private cookieService: CookieService,
              private authorizationService: AuthorizationService,
              private router: Router) { }

  ngOnInit(): void {
    this.tokenValue = this.cookieService.get('Token');
    if(this.tokenValue) {
      this.authorizationService.setToken(this.tokenValue);
    }
    this.userContext = this.cookieService.get('User-Context');
    if(this.userContext) {
      this.authorizationService.setUserContext(this.userContext);
    }
    this.uid = this.cookieService.get('UID');
    if(this.uid) {
      this.authorizationService.setUID(this.uid);
    }
  }

  logout(): void {
    console.log("Logout");
    this.cookieService.delete('Token');
    this.cookieService.delete('User-Context');
    this.cookieService.delete('UID');
    this.cookieService.delete('IsStarted');
    this.cookieService.delete('Role');
    this.router.navigate(['/login']);
  }
}
