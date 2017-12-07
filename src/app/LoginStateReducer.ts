import { Action } from 'redux';
import {User} from "./user";

import {IAppState} from "./IAppState";

export const INITIAL_STATE = {
    userEmail: '',
    userName: '',
    isLogged: false,
};
export const loginStateReducer =
    (state = INITIAL_STATE, action:any) => {
			switch(action.type){
				case 'LOGIN':
					state = {
					  userName: action.payload.state.userName,
						userEmail:action.payload.state.email,
						isLogged:true,
					}
					return state;
				case 'LOGOUT':
					state = {
						userName: '',
						userEmail:'',
						isLogged:false,
					}
					return state;
				default:
				  return state;
			}
		}
