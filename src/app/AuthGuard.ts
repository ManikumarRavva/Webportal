import {Injectable} from "@angular/core";
import { Router }   from '@angular/router';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import {IAppState} from "./IAppState";

import {ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router'

@Injectable()
export class AuthGuard {

  constructor(ngRedux:NgRedux<IAppState>,private Router : Router ) {
    this.ngRedux = ngRedux ;
  }
  ngRedux:NgRedux<IAppState>;

  appState:IAppState;
  canLogin:boolean;
  currentState:any;
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.ngRedux.subscribe(() =>{
      this.currentState = this.ngRedux.getState();
      if(this.currentState&&this.currentState.isLogged)
      {
        return true;
      }
      else if(this.Router.url != '/'){
        this.Router.navigate(['/']);
      }
    }
    )
    if(!this.currentState && state.url != '/'){
      this.Router.navigate(['/']);
    }
    return true;
  }
}
