import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private _baseUrl= "http://localhost:9000/doctor-api/doctors"

  constructor(private _httpClient:HttpClient) { }

  getdoctors=():Observable<Doctor[]>=>{
    return this._httpClient.get<Doctor[]>(this._baseUrl);
  }
}
