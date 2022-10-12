import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { userModel } from './user-dash board.model';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
formValue!:FormGroup
userModelObj:userModel=new userModel();
UserData:any
showadd!:boolean;
showupdate!:boolean;


  constructor(private formbuilder :FormBuilder,private api :ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName: ["",[Validators.required,Validators.pattern('[ a-z A-Z]*')]],
      lastName:["",[Validators.required,Validators.pattern('[ a-z A-Z]*')]],
      email:["",[Validators.required,Validators.email]],
      mobile:["",[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]  ,
     salary:["",[Validators.required,Validators.pattern('[0-9]*')]]   
    })
    this.getAllUser();
  }


  clickAddUser(){
    this.formValue.reset()
    this.showadd=true;
    this.showupdate=false;

  }
postUserDetails(){
  this.userModelObj.firstName=this.formValue.value.firstName;
  this.userModelObj.lastName=this.formValue.value.lastName;
  this.userModelObj.email=this.formValue.value.email;
  this.userModelObj.mobile=this.formValue.value.mobile;
  this.userModelObj.salary=this.formValue.value.salary;
  
  
  
  this.api.postUser(this.userModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("user added successfully")
    let ref =document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllUser();
    
  },err=>{
    alert("something went wrong")
  } 
  
  )
}
getAllUser(){
  this.api.getUser()
  .subscribe(res=>{
    this.UserData=res;
  })
}
deleteUser(row:any){
  this.api.deleteUser(row.id)
  .subscribe(res=>{
    alert("User Deleted Successfully")
    this.getAllUser();
  })
}
onEdit(row:any){
  this.showadd=false;
  this.showupdate=true;
  this.userModelObj.id=row.id
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
}
updateUserDetails(){
  this.userModelObj.firstName=this.formValue.value.firstName;
  this.userModelObj.lastName=this.formValue.value.lastName;
  this.userModelObj.email=this.formValue.value.email;
  this.userModelObj.mobile=this.formValue.value.mobile;
  this.userModelObj.salary=this.formValue.value.salary;


  this.api.updateUser(this.userModelObj,this.userModelObj.id)
  .subscribe(res=>{
    alert("Updated successfully")
    let ref =document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllUser();
    
  })
}
}
