import {Component,
        OnInit,
        OnChanges,
        SimpleChanges,
        ViewChild} from '@angular/core';
import { LoginService } from '../shared/login.service'
import {NgForm} from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationService } from '../shared/authorization.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  @ViewChild('f') RegisterForm: NgForm;
  @ViewChild('loginForm') loginForm: NgForm;
  isLoginView: boolean = true;
  isForgotPassword: boolean = false;
  securityQuestions:any = [];
  securityAnswers:any = [];
  message:string;
  isError:boolean = false;
  isRegisterSuccess:boolean = false;
  loginMessage:string;
  isLoginError:boolean = false;

  constructor(private loginService: LoginService,
              private cookieService: CookieService,
              private authorizationService: AuthorizationService,
              private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getRegisterView() {
    this.isRegisterSuccess = false;
    this.isLoginView = false;
    this.isForgotPassword = false;

    this.loginService.getSecurityQuestions()
      .subscribe(
        (response) => {
          this.securityQuestions = response;
        },
        (error) => console.log(error)
      )
  }

  getLoginView() {
    this.isLoginView = true;
    this.isForgotPassword = false;
    this.isLoginError = false;
  }

  getResetPasswordView() {
    this.isForgotPassword = true;
  }

  registerUser(form: NgForm) {
    if (!form.valid) {
      this.isError = true;
      this.message = "Please fill all the required field.";
    }
    const value = form.value;

    let reqObj = {
      name : value.name,
      username : value.username,
      password : value.password,
      qid: parseInt(value.squestion),
      aid: parseInt(value.sanswer)
    };

    this.loginService.createUser(reqObj)
      .subscribe(
        (response:any) => {
          if(response && response.success) {
            this.isRegisterSuccess = true;
            this.message = response.message;
            this.RegisterForm.reset();
            setTimeout(() => {
              this.isLoginView = true;
              this.isForgotPassword = false;
            }, 3000);
          } else {
            this.isError = true;
            this.message = response.message;
          }
        },
        (error) => {
          this.isError = true;
          this.message = "Registration Failed.";
        }
      )
  }

  getAnswers(qid) {
    if(qid && qid != "Select")  {
      this.loginService.getSecurityAnswers(qid)
        .subscribe(
          (response) => {
            this.securityAnswers = response;
            console.log(response)
          },
          (error) => console.log(error)
        )
    } else {
      this.securityAnswers = [];
    }
  }

  loginUser(loginForm: NgForm) {
    if (!loginForm.valid) {
      this.isLoginError = true;
      this.loginMessage = "Please fill all the required fields.";
    }
    const value:any = loginForm.value;

    let loginObj = {
      "username" : value.loginUsername,
      "password" : value.loginPassword
    };

    this.loginService.verifyUser(loginObj)
      .subscribe(
        (response:any) => {
          if(response && response.success) {
            this.cookieService.set( 'Token', response.token, 1/24 );
            this.cookieService.set( 'User-Context', response.username, 1/24 );
            this.cookieService.set( 'UID', response.uid, 1/24 );
            this.authorizationService.userLoggedIn.next(true);
            this.authorizationService.setToken(response.token);
            this.authorizationService.setUserContext(response.username);
            this.authorizationService.setUID(response.uid);
            this.router.navigate(['/home']);
          } else {
            this.isLoginError = true;
            this.loginMessage = response.message;
          }
        },
        (error) => {
          this.isLoginError = true;
          this.loginMessage = "Unable to login.";
        }
      )
  }
}
