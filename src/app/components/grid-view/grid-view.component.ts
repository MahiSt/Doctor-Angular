import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { DoctorDetailsComponent } from '../doctor-details/doctor-details.component';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

  doctors!:Doctor[];
  

  constructor(private _doctorService:DoctorService,
    private _dialog:MatDialog,
    private _router:Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._doctorService.getdoctors().subscribe({
      next:(data)=>{
        this.doctors=data;
      }
    })
  }

  openDialog(pick:TemplateRef<MatDialog>){
    this._dialog.open(pick);
  }
  // onClick(id:number){
  //   this._router.navigate(['/doctor-details',id]);
  // }

  onClick(doctor:Doctor){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data=doctor;
    const dialogRef= this._dialog.open(DoctorDetailsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data==="edit"){
          this.edit(doctor.id);
        }
      }
  );    

      // this._router.navigate(['/doctor-details',row.id]);
   }

   edit(doctorId:number){
    console.log(doctorId);
    this._snackBar.open("Loading....", "OK!" );
    this._router.navigate(['/update-doctor',doctorId]);
  }

}
