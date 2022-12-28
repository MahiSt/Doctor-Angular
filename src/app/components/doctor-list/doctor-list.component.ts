import { Component, OnInit ,AfterViewInit, ViewChild} from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Doctor } from 'src/app/models/doctor';
import { MatDialog } from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';


@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  displayedColumns: string[] = [       
     'id',
     'doctorName',
     'gender',
     'contactNo',
     'registrationId',
     'dob',
     'email',
     'address',
     'qualification',
     'speciality',
     'certification', 
     'experience',
     'hospitalName',
     'available_time',
     'acheivements',
     'mode',
     'fees',
     'languagesKnown',
     'description',
     'ratings',
     'action',
  ];
  dataSource :any;
  doctors!:Doctor[];

  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor(private _doctorService:DoctorService,private _dialog:MatDialog) {

  }

  ngOnInit(): void {
    this.getAll();

  }

  getAll(){
    this._doctorService.getdoctors().subscribe(result=>{
      this.doctors=result;

      this.dataSource=new MatTableDataSource<Doctor>(this.doctors);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    }
    );
  }

  filterChange(event:Event){
    const filvalue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filvalue;
  }

  getrow(row:any){
    console.log(row);
  }

  edit(doctorId:number){
    console.log(doctorId);

    // let doctor!:Doctor;
    // this._doctorService.getById(doctorId).subscribe((res)=>{
    //   doctor=res;
    // })
    // this._doctorService.update(doctor);
  }

  delete(doctorId:number){
    console.log(doctorId);
    // this._doctorService.delete(doctorId);
  }

  openDialog(enteranimation:any,exitanimation:any){
    this._dialog.open(AddDoctorComponent,{
      enterAnimationDuration:enteranimation,
      exitAnimationDuration:exitanimation,
      width:"50%"
    })
  }
}
