import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
//import Promise = promise.Promise;
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authorizationService: AuthorizationService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(this.authorizationService.getToken() && this.authorizationService.getUID() && this.authorizationService.getUserContext()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
