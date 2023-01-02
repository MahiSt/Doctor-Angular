import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable ,map } from 'rxjs';
import { Doctor } from '../models/doctor';

type DoctorListResponse = {
  content: Doctor[]
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private _cudUrl= "http://localhost:9000/doctor-cud-api/doctors/";
  private _getUrl="http://localhost:9000/doctor-get-api/doctors/"

  constructor(private _httpClient:HttpClient) { }

  getdoctors=():Observable<Doctor[]>=>{
    return this._httpClient.get<Doctor[]>(this._getUrl).pipe();
  }

  getById=(id:number):Observable<Doctor>=>{
    let url=this._getUrl+id;
    return this._httpClient.get<Doctor>(url);
  }

  updateDoctor=(doctor:Doctor):Observable<void>=>{
    console.log(this._cudUrl+doctor);
    return this._httpClient.put<void>(this._cudUrl,doctor);
  }

  deleteDoctor=(id:number):Observable<void>=>{
    let url=this._cudUrl+id;
    console.log(url);
    return this._httpClient.delete<void>(url);
  }

  addDoctor=(doctor:Doctor):Observable<void>=>{
    return this._httpClient.post<void>(this._cudUrl,doctor);
  }

  getDoctorsWithSortingAndPagination(offset:number,pageSize:number,active:string,direction:string){
    if(direction){
      let doctorResponse$=this._httpClient.get<DoctorListResponse>(this._getUrl.concat("page/")+offset+"/"+pageSize+"/sort/"+active+"/"+direction);
    return doctorResponse$.pipe(map((response)=>{
      return response.content;
    }));   
    }
    else{
      return this.getdoctors();
    }

  }

  // getSortedList(active:String,direction:String){
  //   if(direction){
  //     let url=this._baseUrl.concat("sort/")+active+"/"+direction;
  //     let doctorResponse$=this._httpClient.get<Doctor[]>(url);
  //     return doctorResponse$;
  //   }
  //   else{
  //     return this.getdoctors();
  //   }
  // }
}
