import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private appConstants: AppConstants) { }

  getSecurityQuestions() {
    let url = this.appConstants.APP_URL + this.appConstants.GET_SECURITY_QUESTIONS_URL;
    return this.http.get(url);
  }

  getSecurityAnswers(qid) {
    let url = this.appConstants.APP_URL + this.appConstants.GET_SECURITY_ANSWERS_URL + "/" + qid;
    return this.http.get(url);
  }

  createUser(regObj) {
    let url = this.appConstants.APP_URL + this.appConstants.CREATE_USER_URL;
    return this.http.post(url, regObj);
  }

  verifyUser(loginObj) {
    let url = this.appConstants.APP_URL + this.appConstants.LOGIN_USER_URL;
    return this.http.post(url, loginObj);
  }
}
