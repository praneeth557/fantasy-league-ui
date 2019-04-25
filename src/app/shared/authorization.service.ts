import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  token: string;
  userContext: string;
  uid: any;

  setToken(token) {
    this.token = token;
  }

  setUserContext(username) {
    this.userContext = username;
  }

  setUID(uid) {
    this.uid = uid;
  }

  getToken() {
    return this.token;
  }

  getUserContext() {
    return this.userContext;
  }

  getUID(){
    return this.uid;
  }

  getHeadersObject() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Token', this.getToken())
      .set('User-Context', this.getUserContext());

    return headers;
  }

  userLoggedIn = new Subject<boolean>();
}
