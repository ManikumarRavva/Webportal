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
var material_1 = require("@angular/material");
var usersList = (function () {
    function usersList(RegisterService, http, Router, dialog) {
        var _this = this;
        this.RegisterService = RegisterService;
        this.http = http;
        this.Router = Router;
        this.dialog = dialog;
        this.userModel = new user_1.User();
        this.showModal = false;
        this.gridOptions = {
            onGridReady: function () {
                _this.gridOptions.api.sizeColumnsToFit();
                _this.gridOptions.api.setDatasource(_this.dataSource);
            }
        };
        http.get('http://localhost:3004/users').toPromise()
            .then(function (result) { return _this.data = result.json(); });
        this.dataSource = {
            pageSize: 1,
            overflowSize: 10,
            getRows: function (params) {
                http.get('http://localhost:3004/users').subscribe(function (response) {
                    var rowsThisPage = response.json().slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    params.successCallback(rowsThisPage, lastRow);
                });
            }
        };
        function returnRows() {
            return http.get('http://localhost:3004/users').toPromise();
        }
        this.columnDefs = [
            { headerName: "User Id", field: "id", filter: "number" },
            { headerName: "User Name", field: "userName", filter: "text" },
            { headerName: "First Name", field: "firstName", filter: "text" },
            { headerName: "Last Name", field: "lastName", filter: "text" },
            { headerName: "EMail", field: "email", filter: "text" },
            { headerName: "Actions", suppressMenu: true, suppressSorting: true,
                template: "<button type=\"button\" data-action-type=\"view\" class=\"btn btn-default\">\n               View\n             </button>\n\t\t\t<button type=\"button\" data-action-type=\"edit\" class=\"btn btn-default\">\n               Edit\n             </button>\n            <button type=\"button\" data-action-type=\"delete\" class=\"btn btn-default\">\n               Delete\n            </button>"
            }
        ];
    }
    usersList.prototype.showAddUser = function () {
        this.currentScreen = "AddNewUser";
    };
    usersList.prototype.showListOfUsers = function () {
        this.currentScreen = "ListOfUsers";
    };
    usersList.prototype.openModal = function (user, editMode) {
        this.showModal = true;
        this.userModel = user;
        this.editMode = editMode;
    };
    usersList.prototype.closeModal = function () {
        this.showModal = false;
    };
    usersList.prototype.updateUser = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(this.userModel);
        this.http.put('http://localhost:3004/users/' + this.userModel.id, body, options).subscribe(function (res) {
            _this.updateGrid();
        });
        this.closeModal();
    };
    usersList.prototype.deleteUser = function (user) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(this.userModel);
        this.http.delete('http://localhost:3004/users/' + user.id).subscribe(function (res) {
            _this.updateGrid();
        });
    };
    usersList.prototype.updateGrid = function () {
        var _this = this;
        this.http.get('http://localhost:3004/users').subscribe(function (res) {
            _this.data = res.json();
            console.log(_this.data);
            _this.refreshGrid();
        });
    };
    usersList.prototype.refreshGrid = function () {
        var _this = this;
        this.gridOptions.api.setRowData(this.data);
        this.gridOptions.api.refreshView();
        this.dataSource = {
            pageSize: 1,
            overflowSize: 10,
            getRows: function (params) {
                _this.http.get('http://localhost:3004/users').subscribe(function (response) {
                    var rowsThisPage = response.json().slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    params.successCallback(rowsThisPage, lastRow);
                });
            }
        };
        this.gridOptions.api.setDatasource(this.dataSource);
        this.gridOptions.api.setRowData(this.gridOptions.rowData);
    };
    usersList.prototype.onRowClicked = function (e) {
        if (e.event.target !== undefined) {
            var data = e.data;
            var actionType = e.event.target.getAttribute("data-action-type");
            switch (actionType) {
                case "view":
                    return this.openModal(e.data, false);
                case "edit":
                    return this.openModal(e.data, true);
                case "delete":
                    return this.deleteUser(e.data);
            }
        }
    };
    ;
    usersList.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogResultExampleDialog);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.selectedOption = result;
        });
    };
    return usersList;
}());
usersList = __decorate([
    core_1.Component({
        selector: 'users-list',
        templateUrl: './app.usersList.html',
        styleUrls: ['./app.usersList.css'],
    }),
    __metadata("design:paramtypes", [register_service_1.RegisterService, http_1.Http, router_1.Router, material_1.MdDialog])
], usersList);
exports.usersList = usersList;
var DialogResultExampleDialog = (function () {
    function DialogResultExampleDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return DialogResultExampleDialog;
}());
DialogResultExampleDialog = __decorate([
    core_1.Component({
        selector: 'dialog-result-example-dialog',
        templateUrl: 'dialog-result-example-dialog.html',
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], DialogResultExampleDialog);
exports.DialogResultExampleDialog = DialogResultExampleDialog;
//# sourceMappingURL=app.usersList.js.map