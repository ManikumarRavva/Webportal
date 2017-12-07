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
var register_service_1 = require("./register.service");
require("../assets/css/styles.css");
var router_1 = require("@angular/router");
var user_1 = require("./user");
var register = (function () {
    function register(RegisterService, http, Router) {
        this.RegisterService = RegisterService;
        this.http = http;
        this.Router = Router;
        this.showLogin = true;
        this.userName = "";
        this.password = "";
        this.email = "";
        this.confirmPassword = "";
        this.newUser = new user_1.User();
    }
    ;
    register.prototype.registerSubmit = function () {
        var _this = this;
        this.registerSuccess = this.RegisterService.register(this.newUser.userName, this.newUser.password, this.newUser.email, this.newUser.confirmPassword);
        if (this.registerSuccess == "valid") {
            this.http.get('http://localhost:3004/users').subscribe(function (response) {
                var rowsThisPage = response.json();
                var maxId = Math.max.apply(Math, rowsThisPage.map(function (o) { return o.id; }));
                _this.newUser.id = maxId + 1;
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                debugger;
                _this.http.post('http://localhost:3004/users', _this.newUser, headers).subscribe(function (response) {
                    _this.errorMessage = "Congrats!, You Have Registered Successfully";
                    _this.newUser.userName = "";
                    _this.newUser.firstName = "";
                    _this.newUser.lastName = "";
                    _this.newUser.password = "";
                    _this.newUser.email = "";
                    _this.newUser.confirmPassword = "";
                });
            });
        }
        else {
            this.errorMessage = this.registerSuccess;
        }
    };
    return register;
}());
register = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: './app.register.html',
        styleUrls: ['./app.register.css']
    }),
    __metadata("design:paramtypes", [register_service_1.RegisterService, http_1.Http, router_1.Router])
], register);
exports.register = register;
//# sourceMappingURL=app.register.js.map