import { Component } from '@angular/core';

import { Http } from '@angular/http';

import { LoginService } from './login.service';

import '../assets/css/styles.css';

import {Observable} from "rxjs/Observable";

import { Router }   from '@angular/router';

import { NgReduxModule, NgRedux } from '@angular-redux/store';

import {IAppState} from "./IAppState";

import {User} from "./user";

@Component({
	selector:'log-in',
	templateUrl: './app.loginComponent.html',
	styleUrls: ['./app.loginComponent.css']
 })
export class LoginComponent {
	errorMessage:String;
	showLogin=true;
	user:User;
	registerSuccess:String;
	userName="";
	password="";
	public client:any;
	data:string;

	appState:IAppState;
	constructor(private loginService: LoginService, public http:Http, public Router:Router,public ngRedux:NgRedux<IAppState>){
		this.http.get('http://localhost:3004/users').subscribe((res:any) => {
				this.data=res.json();
		});
		this.ngRedux.dispatch({ type: 'INCREMENT',payload:{state:this.appState} });
	};
  	displayRegister() {
  		this.showLogin = false;
  	}

 	displayLogin() {
  		this.showLogin = true;
  	}

	loginSubmit(){
		this.user = this.loginService.authenticate(this.data,this.userName,this.password);
			if(this.user){
				this.ngRedux.dispatch({ type: 'LOGIN',payload:{state:this.user} });
				this.Router.navigate(['usersList']);
				this.userName="";
				this.password="";
				this.errorMessage = "";
			}
			else{
				this.errorMessage = "Sorry!, Invalid credentials";
			}

	}
}
