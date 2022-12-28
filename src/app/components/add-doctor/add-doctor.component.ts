import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  constructor(private _doctorService:DoctorService) { }

  ngOnInit(): void {
  }
  resdat:any;

  specialitees:string[]=[
    'Anesthesiology',
    'Dermatologist',
    'Medical Geneticist',
    'Neurologist',
    'Pathologist',
    'Psychiatrists',
    'Pulmonologist',
    'Pediatrician',
    'Diabetician',
    'Cardiologist',
    'General Physician',
    'Urologist'
  ];

  mode:string[]=[
    'Video',
    'Hospital Op',
    'Personal Care'
  ]
  
  reactiveForm=new FormGroup({
    id:new FormControl({value:0,disabled:true}),
    doctorName:new FormControl("",Validators.required),
    gender:new FormControl("Male"),
    contactNo:new FormControl("",Validators.required),
    registrationId:new FormControl("",Validators.required),
    dob:new FormControl(),
    email:new FormControl("",Validators.required),
    address:new FormControl("",Validators.required),
    qualification:new FormControl("",Validators.required),
    speciality:new FormControl("",Validators.required),
    certification:new FormControl("",Validators.required), 
    experience:new FormControl("",Validators.required),
    hospitalName:new FormControl("",Validators.required),
    available_time:new FormControl("",Validators.required),
    acheivements:new FormControl(),
    mode:new FormControl("",Validators.required),
    fees:new FormControl("",Validators.required),
    languagesKnown:new FormControl("",Validators.required),
    description:new FormControl(),
    ratings:new FormControl()
  });

  saveDoctor(form:any){
    if(this.reactiveForm.valid){
      console.log(this.reactiveForm.getRawValue());
      this._doctorService.addDoctor(form.value).subscribe(result=>{
        this.resdat=result;
        console.log(this.resdat);
      })

    }else{

    }
  }
}
