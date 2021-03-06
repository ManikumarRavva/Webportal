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
require("../assets/css/styles.css");
require("./app.css");
var store_1 = require("@angular-redux/store");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(Router, ngRedux) {
        var _this = this;
        this.Router = Router;
        this.ngRedux = ngRedux;
        this.isLogged = false;
        this.ngRedux = ngRedux;
        this.ngRedux.subscribe(function () {
            _this.currentState = _this.ngRedux.getState();
            if (_this.currentState && _this.currentState.isLogged) {
                _this.isLogged = true;
                _this.userName = _this.currentState.userName;
            }
            else {
                _this.isLogged = false;
            }
        });
    }
    AppComponent.prototype.showAddUser = function () {
        this.Router.navigateByUrl('newuser');
    };
    AppComponent.prototype.showListOfUsers = function () {
        this.Router.navigateByUrl('usersList');
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, store_1.NgRedux])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map