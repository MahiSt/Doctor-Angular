import { Component,  Inject,  OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute,  Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  id!:number;
  doctor!:Doctor;
  roles!:string[];

  
  constructor(private _authService:AuthService,
    @Inject(MAT_DIALOG_DATA) _data:any,
    private dialogRef: MatDialogRef<DoctorDetailsComponent>,
   ) {
      this.doctor=_data;
    }


  ngOnInit(): void {
    this.roles=this._authService.getRoles();
  }

  edit(){
    console.log(this.id);
    this.dialogRef.close("edit");
  }

  delete(){
    console.log(this.id);
    this.dialogRef.close("delete");
  }
  end(){
    this.dialogRef.close();
  }

}