import {Injectable} from "@angular/core";
import {User} from "./user";
@Injectable()

export class LoginService {
	authenticate(data :any,username :string, password :string): User {
		for(let user of data) {
  			if(user.userName==username && user.password==password){
  				return user;
  			}
		}
		return null;
	}

}
