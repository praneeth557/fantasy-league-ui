import {Component,
        OnInit,
        OnChanges,
        SimpleChanges,
        ViewChild} from '@angular/core';
import { LoginService } from '../shared/login.service'
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  @ViewChild('f') RegisterForm: NgForm;
  isLoginView: boolean = true;
  isForgotPassword: boolean = false;
  securityQuestions:any = [];
  securityAnswers:any = [];
  message:string;
  isError:boolean = false;
  isRegisterSuccess:boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getRegisterView() {
    this.isLoginView = false;
    this.isForgotPassword = false;

    this.loginService.getSecurityQuestions()
      .subscribe(
        (response) => {
          this.securityQuestions = response;
          console.log(response)
        },
        (error) => console.log(error)
      )
  }

  getLoginView() {
    this.isLoginView = true;
    this.isForgotPassword = false;
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
    this.RegisterForm.reset();

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
}
