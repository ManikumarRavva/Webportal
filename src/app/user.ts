export class User {
	id:number;
    userName: string;
    password: string;
	email:string;
	firstName:string;
	lastName:string;
	confirmPassword:string;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
