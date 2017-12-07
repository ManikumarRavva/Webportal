import { Component } from '@angular/core';

import { Http } from '@angular/http';

import { LoginService } from './login.service';

import '../assets/css/styles.css';

import './app.css';

import { NgReduxModule, NgRedux } from '@angular-redux/store';

import {IAppState} from "./IAppState";

import {Observable} from "rxjs/Observable";

import { Router }   from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
userName:string;
isLogged:boolean = false;
currentState:any;
displaySidePane:boolean=false;
constructor(public Router:Router,public ngRedux:NgRedux<IAppState>){
  this.ngRedux = ngRedux ;

  this.ngRedux.subscribe(() =>{
    this.currentState = this.ngRedux.getState();
      if(this.currentState&&this.currentState.isLogged)
      {
        this.isLogged =true;
        this.userName = this.currentState.userName;
      }
      else {
        this.isLogged =false;
      }
    }
  )
}
toggleSidePane(){
  this.displaySidePane = !this.displaySidePane;
}
showAddUser(){
  this.Router.navigateByUrl('newuser')
}
showListOfUsers(){
  this.Router.navigateByUrl('usersList')
}
}
