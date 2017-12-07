import {Injectable} from "@angular/core";

@Injectable()

export class RegisterService {
	register(username:string,  password:string, email:string, confirmPassword:string ): string{
		if(!this.validateEmail(email)){
			return "invalid Email"
		}
		else{
			if(this.validatePassword(password)){
				if(password === confirmPassword){
					return "valid";
				}
				else{
					return "Password and confirm passwords are doesn't match";
				}
			}
			else{
				return "invalid password";
			}
		}
	}
	validateEmail(email :string){
		var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
		if (email != "" && !EMAIL_REGEXP.test(email)){
			return false;
		}
		else {
			return true;
		}
	}
	validatePassword(password :string){
		var PASSWORD_EXP = /(?=.*?[a-z])(?=.*?[0-9]).{6,}$/i;
		if (password != "" && PASSWORD_EXP.test(password)){
			return true;
		}
		else {
			return false;
		}
	}
}
