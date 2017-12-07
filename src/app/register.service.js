"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RegisterService = (function () {
    function RegisterService() {
    }
    RegisterService.prototype.register = function (username, password, email, confirmPassword) {
        if (!this.validateEmail(email)) {
            return "invalid Email";
        }
        else {
            if (this.validatePassword(password)) {
                if (password === confirmPassword) {
                    return "valid";
                }
                else {
                    return "Password and confirm passwords are doesn't match";
                }
            }
            else {
                return "invalid password";
            }
        }
    };
    RegisterService.prototype.validateEmail = function (email) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (email != "" && !EMAIL_REGEXP.test(email)) {
            return false;
        }
        else {
            return true;
        }
    };
    RegisterService.prototype.validatePassword = function (password) {
        if (password != "" && password.length > 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return true;
        }
        else {
            return false;
        }
    };
    return RegisterService;
}());
RegisterService = __decorate([
    core_1.Injectable()
], RegisterService);
exports.RegisterService = RegisterService;
//# sourceMappingURL=register.service.js.map