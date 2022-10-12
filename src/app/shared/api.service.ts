import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

postUser(data:any){
  return this.http.post("http://localhost:3000/user",data)
  .pipe(map((res:any)=>{
    return res;
  }))
}

getUser(){
  return this.http.get("http://localhost:3000/user")
  .pipe(map((res:any)=>{
    return res;
  }))
}
updateUser(data:any,id:number){
  return this.http.put("http://localhost:3000/user/"+id,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
deleteUser(id:number){
  return this.http.delete<any>("http://localhost:3000/user/"+id)
  .pipe(map((res:any)=>{
    return res;
  }))
}

}
