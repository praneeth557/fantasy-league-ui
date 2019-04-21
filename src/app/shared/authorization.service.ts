import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  token: string;
  userContext: string;

  setToken(token) {
    this.token = token;
  }

  setUserContext(username) {
    this.userContext = username;
  }

  getToken() {
    return this.token;
  }

  getUserContext() {
    return this.userContext;
  }

  getHeadersObject() {
    let obj = {
      "Token": this.getToken(),
      "User-Context": this.getUserContext(),
      "Content-Type": "application/json"
    };

    return obj;
  }

  userLoggedIn = new Subject<boolean>();
}
