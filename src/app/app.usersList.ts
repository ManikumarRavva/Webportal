import { Component } from '@angular/core';

import {Response, Http,Headers,RequestOptions } from '@angular/http';

import { RegisterService } from './register.service';

import '../assets/css/styles.css';

import {Observable} from "rxjs/Observable";

import { Router }   from '@angular/router';

import {AgGridModule} from "ag-grid-angular/main";

import {GridOptions} from "ag-grid/main";

import {User} from "./user"

import {DialogResultExample} from "./dialog-result-example";
import {MdDialogRef,MdDialog} from "@angular/material";
@Component({
	selector:'users-list',
	templateUrl: './app.usersList.html',
	styleUrls: ['./app.usersList.css'],
 })
export class usersList {

 public gridOptions:GridOptions;

	public rowData:any[];
  private columnDefs:any[];
	data:any;
	editMode:any;
	userModel = new User();
	showModal = false;
	currentScreen:string;
	update:any;
	dataSource:any;
	errorMessage:string;
	updateForm:any;
	newUser =  new User();
	registerSuccess:string;

	showAddUser(){
		this.currentScreen = "AddNewUser";
	}
	showListOfUsers(){
		this.currentScreen = "ListOfUsers";
	}

	openModal(user:any,editMode:any){
		this.errorMessage='';
		this.showModal = true;
		this.userModel = user;
		this.editMode = editMode;
	}
	closeModal(){
		this.showModal = false;
	}

	updateUser(updateForm:any){
		this.updateForm = updateForm;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify(this.userModel);
		this.registerSuccess = this.RegisterService.register(this.userModel.userName,this.userModel.password, this.userModel.email, this.userModel.confirmPassword);
			if(this.registerSuccess == "valid"){
				this.http.put('http://localhost:3004/users/'+this.userModel.id, body, options ).subscribe((res:any) => {
					this.updateGrid();
				});
				var temp =  Object.assign({}, this.userModel);

				this.errorMessage="User details updated successfully."
				setTimeout(() => {
		      this.errorMessage=null;
					this.registerSuccess='';
		    }, 1000);
				this.userModel = temp;
			}
			else{
				this.errorMessage = this.registerSuccess;
			}
		}
	deleteUser(user:any){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify(this.userModel);

		this.http.delete('http://localhost:3004/users/'+user.id).subscribe((res:any) => {
		        this.updateGrid();
		});
	}
	updateGrid(){
		this.http.get('http://localhost:3004/users').subscribe((res:any) => {
				this.data=res.json();
				console.log(this.data);
				this.refreshGrid();
		});
	}
	refreshGrid(){
		this.gridOptions.api.setRowData(this.data);
		this.gridOptions.api.refreshView();

		this.dataSource = {
        pageSize: 1,
        overflowSize: 10,
			getRows: (params: any) => {
				this.http.get('http://localhost:3004/users').subscribe(response => {
					var rowsThisPage = response.json().slice(params.startRow, params.endRow);
					var lastRow = -1;
					params.successCallback(rowsThisPage, lastRow);
				});
			}
		}
		this.gridOptions.api.setDatasource(this.dataSource);
		this.gridOptions.api.setRowData(this.gridOptions.rowData)
	}
	public onRowClicked(e:any) {
			if (e.event.target !== undefined) {
				let data = e.data;
				let actionType = e.event.target.getAttribute("data-action-type");
				switch(actionType) {
					case "view":
						return this.openModal(e.data,false);
					case "edit":
						return this.openModal(e.data,true);
					case "delete":
						return this.deleteConfirm(e.data);
				}
			}
		}
	constructor(private RegisterService: RegisterService, public http:Http, public Router:Router,public dialog: MdDialog){

		this.gridOptions = <GridOptions>{
				onGridReady: () => {
					this.gridOptions.api.sizeColumnsToFit();
					this.gridOptions.api.setDatasource(this.dataSource);
				}
			};

		http.get('http://localhost:3004/users').toPromise()
           .then(result => this.data=result.json());

		this.dataSource = {
        pageSize: 1,
        overflowSize: 10,
			getRows: (params: any) => {
				http.get('http://localhost:3004/users').subscribe(response => {
					var rowsThisPage = response.json().slice(params.startRow, params.endRow);
					var lastRow = -1;
					params.successCallback(rowsThisPage, lastRow);
				});
			}
		}

		function returnRows(){
			return http.get('http://localhost:3004/users').toPromise();
		}
        this.columnDefs = [
			{ headerName: "User Id", field: "id",filter: "number"},
            { headerName: "User Name", field: "userName",filter: "text"},
            { headerName: "First Name", field: "firstName",filter: "text"},
			{ headerName: "Last Name", field: "lastName",filter: "text"},
			{ headerName: "EMail", field: "email",filter: "text"},

			{ headerName: "Actions",  suppressMenu: true, suppressSorting: true,
          template:
            `<button type="button" data-action-type="view" class="btn btn-success">
               View
             </button>
			<button type="button" data-action-type="edit" class="btn btn-primary">
               Edit
             </button>
            <button type="button" data-action-type="delete" class="btn btn-danger">
               Delete
            </button>`
        }
        ];
	};
selectedOption: string;
	deleteConfirm(data:any) {
		let dialogRef = this.dialog.open(DialogResultExampleDialog, {
      height: '160px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
			console.log(result);
			if(result == 'yes')
				this.deleteUser(data)
    });
  }
}
@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: 'dialog-result-example-dialog.html',
	styleUrls: ['./dialog-result-example-dialog.css'],
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}
