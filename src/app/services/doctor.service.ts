import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private _baseUrl= "http://localhost:8081/doctor-api/doctors/"

  constructor(private _httpClient:HttpClient) { }

  getdoctors=():Observable<Doctor[]>=>{
    return this._httpClient.get<Doctor[]>(this._baseUrl);
  }

  getById=(id:number):Observable<Doctor>=>{
    let url=this._baseUrl+id;
    return this._httpClient.get<Doctor>(url);
  }

  updateDoctor=(doctor:Doctor):Observable<void>=>{
    return this._httpClient.put<void>(this._baseUrl,doctor);
  }

  deleteDoctor=(id:number):Observable<void>=>{
    let url=this._baseUrl+id;
    return this._httpClient.delete<void>(url);
  }

  addDoctor=(doctor:Doctor):Observable<void>=>{
    return this._httpClient.post<void>(this._baseUrl,doctor);
  }

}
