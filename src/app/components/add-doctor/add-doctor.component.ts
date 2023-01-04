import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatDatepickerToggle } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent implements OnInit {
  constructor(
    private _doctorService: DoctorService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _router:Router
  ) {}

  id!: number;
  doctor!: Doctor;
  flag!:boolean;

  languages = [
    'Tamil',
    'Telugu',
    'Malayalam',
    'Kannadam',
    'Hindi',
    'English',
    'Others',
  ];

  qualifications:string[]=["MBBS","BDS","BAMS","BHMS","B.V.Sc & AH","MD","D.M.","FRCS"];

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

  bloodGroups: string[] = [
    'A +ve',
    'A -ve',
    'B +ve',
    'B -ve',
    'AB +ve',
    'AB -ve',
    'O +ve',
    'O -ve',
  ];

  doctorForm = new FormGroup({
    id: new FormControl<number|null>(null,Validators.required),
    doctorName: new FormControl('', Validators.required),
    gender: new FormControl('Male'),
    contactNo: new FormControl<number|null>(null, Validators.required),
    registrationId: new FormControl<number|null>(null, Validators.required),
    dob: new FormControl(),
    email: new FormControl('', Validators.required),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl<number|null>(null,Validators.required),
    }),
    qualification: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    certification: new FormControl('', Validators.required),
    experience: new FormControl<number|null>(null, Validators.required),
    hospitalName: new FormControl('', Validators.required),
    available_time: new FormControl('', Validators.required),
    bloodGroup: new FormControl('', Validators.required),
    mode: new FormControl([''], Validators.required),
    fees: new FormControl<number|null>(null, Validators.required),
    languagesKnown: new FormControl([''], Validators.required),
    description: new FormControl(),
    ratings: new FormControl<number|null>(null),
  });


  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: (data) => {
        this.id = data['id'];
        console.log(this.id);
        if (this.id) {
          this._doctorService.getById(this.id).subscribe({
            next: (data) => {
              console.log(data);
              console.log(data.dob.toString().slice(0, -6));
              this.flag=true;
              this.doctorForm.setValue(data);
              this.doctorForm.patchValue({dob:data.dob.toString().slice(0, -6)
              })
            },
          });
        }
      },
    });
  }

  addDoctor(doct: any) {
    console.log(doct);
    this.doctor = doct;
    if(!this.flag){
      doct.dob.toString().slice(0,-6);
    this._doctorService.addDoctor(doct).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
  else{
    this._doctorService.updateDoctor(doct).subscribe({
      next: (data) => {
        console.log(data);
      },
    });

  }
  }
  openSnackBar(check: boolean,name?:string) {
    if(this.flag && check){
      this._snackBar.open(name+"Updated Successfully", "Continue",{
        duration: 3000
      } );
    }
    else if(check){
      this._snackBar.open(name+" - Added Sucessfully","Continue",{
        duration: 3000
      });
    }
    else{
      this._snackBar.open("Enter all the required fields","Ok",{
        duration: 3000
      });
    }
  }

}
