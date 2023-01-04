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

  specialities=[
    {
      value:"ANESTHESIOLOGY",
      desc:"Anesthesiology"
    },
    {
      value:"DERMA",
      desc:"Dermatologist"
    },
    {
      value:"GENETICS",
      desc:"Medical Geneticist"
    },
    {
      value:"NEURO",
      desc:"Neurologist"
    },
    {
      value:"PATHO",
      desc:"Pathologist"
    },
    {
      value:"PSYCHIATRIC",
      desc:"Psychiatrists"
    },
    {
      value:"PULMONO",
      desc:"Pulmonologist"
    },
    {
      value:"PEADO",
      desc:"Pediatrician"
    },
    {
      value:"CARDIO",
      desc:"Cardiologist"
    },
    {
      value:"PHYSICIAN",
      desc:"General Physician"
    },
    {
      value:"DIABETIC",
      desc:"Diabetician"
    },
    {
      value:"URO",
      desc:"Urologist"
    },

  ]

  modes = [
    {
      desc :'Video',
      value:'ONLINE'
    }, 
    {
      desc:'Hospital Op',
      value:'OFFLINE'
    }, 
    {
      desc:'Personal Care',
      value:'HOME'
    }
  ];

  
  constructor(private _authService:AuthService,
    @Inject(MAT_DIALOG_DATA) _data:any,
    private dialogRef: MatDialogRef<DoctorDetailsComponent>,
   ) {
      this.doctor=_data;
    }


  ngOnInit(): void {
    this.roles=this._authService.getRoles();
    // this.specialities.forEach((spec)=>{
    //   for(const key in spec){
    //     if(spec[key]===this.doctor.speciality){

    //     }
    //   }
    // })
    // this.doctor.speciality
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