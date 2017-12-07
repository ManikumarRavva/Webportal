"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var login_service_1 = require("./login.service");
require("../assets/css/styles.css");
var router_1 = require("@angular/router");
var store_1 = require("@angular-redux/store");
var LoginComponent = (function () {
    function LoginComponent(loginService, http, Router, ngRedux) {
        var _this = this;
        this.loginService = loginService;
        this.http = http;
        this.Router = Router;
        this.ngRedux = ngRedux;
        this.showLogin = true;
        this.userName = "";
        this.password = "";
        this.http.get('http://localhost:3004/users').subscribe(function (res) {
            _this.data = res.json();
        });
        this.ngRedux.dispatch({ type: 'INCREMENT', payload: { state: this.appState } });
    }
    ;
    /*getClient() : Observable<any>{
    return this.http.get('./data.json')
      .map(res => res.json());
    }*/
    LoginComponent.prototype.displayRegister = function () {
        this.showLogin = false;
    };
    LoginComponent.prototype.displayLogin = function () {
        this.showLogin = true;
    };
    LoginComponent.prototype.loginSubmit = function () {
        if (this.user) {
            this.ngRedux.dispatch({ type: 'LOGIN', payload: { state: this.user } });
            this.Router.navigate(['usersList']);
            this.userName = "";
            this.password = "";
            this.errorMessage = "";
        }
        else {
            this.errorMessage = "Sorry!, Invalid credentials";
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'log-in',
        templateUrl: './app.loginComponent.html',
        styleUrls: ['./app.loginComponent.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService, http_1.Http, router_1.Router, store_1.NgRedux])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=app.loginComponent.js.map