import { Component } from '@angular/core';

import { Http } from '@angular/http';

import { RegisterService } from './register.service';


import '../assets/css/styles.css';

import {Observable} from "rxjs/Observable";

import { Router }   from '@angular/router';

import {User} from "./user"

@Component({
	selector:'new-user',
  templateUrl: './app.newUser.html',
  styleUrls: ['./app.newUser.css']
 })
export class newUser {
	errorMessage:String;
	showLogin=true;
	loginSuccess:Boolean;
	registerSuccess:String;
	userName="";
	password="";
	email = "";
	confirmPassword = "";
	public client:any;
	data:string;
	newUser =  new User();
	registerForm:any;
	constructor(private RegisterService: RegisterService, public http:Http, public Router:Router){
	};
	addNewUser(registerForm:any){
		this.registerForm = registerForm;
		this.registerSuccess = this.RegisterService.register(this.newUser.userName,this.newUser.password, this.newUser.email, this.newUser.confirmPassword);
			if(this.registerSuccess == "valid"){
				this.http.get('http://localhost:3004/users').subscribe(response => {
					var rowsThisPage = response.json();
					let maxId=Math.max.apply(Math,rowsThisPage.map(function(o:any){return o.id;}));
					this.newUser.id =maxId+1;
					var headers = new Headers();
					headers.append('Content-Type', 'application/json');
					this.http.post('http://localhost:3004/users',this.newUser,headers).subscribe(response => {
						this.errorMessage = "Congrats!, New User Have Added Successfully";
						this.newUser.userName="";
						this.newUser.firstName = "";
						this.newUser.lastName = "" ;
						this.newUser.password="";
						this.newUser.email="";
						this.newUser.confirmPassword="";
						this.registerForm.reset();
					});
				});
			}
			else{
				this.errorMessage = this.registerSuccess;
			}
	}
}
