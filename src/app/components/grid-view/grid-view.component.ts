import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

  doctors!:Doctor[];

  constructor(private _doctorService:DoctorService,
    private _router:Router) { }

  ngOnInit(): void {
    this._doctorService.getdoctors().subscribe({
      next:(data)=>{
        this.doctors=data;
      }
    })
  }

  onClick(id:number){
    this._router.navigate(['/doctor-details',id]);
  }
}
