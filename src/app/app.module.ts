import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginService } from './login.service';
import { RouterModule }   from '@angular/router';
import { RegisterService } from './register.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './app.loginComponent';
import { newUser } from './app.newUser';
import { AgGridModule} from "ag-grid-angular/main";
import { usersList } from './app.usersList';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './AuthGuard';
import { register } from './app.register';
import { loginStateReducer } from './LoginStateReducer';
import {User} from "./user";
import {DialogResultExampleDialog} from './app.usersList';
import {IAppState} from "./IAppState";
import {MdDialogModule,MdDialogRef} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk';
import {
  applyMiddleware,
  Store,
  combineReducers,
  compose,
  createStore
} from 'redux';

const store: Store<IAppState> = compose(applyMiddleware())(createStore)(loginStateReducer);
@NgModule({
  imports: [
    BrowserModule,
	FormsModule,
	HttpModule,
	NgReduxModule ,
  MdDialogModule,
  BrowserAnimationsModule,
	NgbModule.forRoot(),
  CdkTableModule,

	RouterModule.forRoot([
	  {
  		path : '',
  		component : LoginComponent,
      canActivate: [AuthGuard],

  	},
  	{
  		path : 'register',
  		component : register,
  	},
  	{
  		path : 'newuser',
  		component : newUser,
      canActivate: [AuthGuard],
    },
    {
  		path : 'usersList',
  		component : usersList,
      canActivate: [AuthGuard],
    },
    {
  		path : 'logout',
  		component : LoginComponent
  	}
  ]),
  	AgGridModule.withComponents([])
  	],
  declarations: [
    AppComponent,
    LoginComponent,
    register,
    newUser,
    usersList,DialogResultExampleDialog
  ],
  entryComponents: [DialogResultExampleDialog],
  providers: [LoginService,RegisterService,AuthGuard],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
