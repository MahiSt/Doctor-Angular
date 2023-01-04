import { Component, OnInit , TemplateRef} from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { PageEvent} from '@angular/material/paginator';
import { Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Doctor } from 'src/app/models/doctor';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { DoctorDetailsComponent } from '../doctor-details/doctor-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  offset!:number;
  pageSize!:number;
  sort!:Sort;
  dataSource :any;
  doctors!:Doctor[];
  roles!:string[];
  id!:number;
  active!:string;
  direction!:string;
  leng!:number;

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
     'bloodGroup',
     'mode',
     'fees',
     'languagesKnown',
     'description',
     'ratings',
  ];

  ColumnChooser: string[] = [       
    'Id',
    'Doctor Name',
    'Gender',
    'Contact No',
    'Registration Id',
    'Dob',
    'Email',
    'Address',
    'Qualification',
    'Speciality',
    'Certification', 
    'Experience',
    'Hospital Name',
    'Available Time',
    'Blood Group',
    'Mode',
    'Fees',
    'Languages Known',
    'Description',
    'Ratings',
 ];


  constructor(private _doctorService:DoctorService,
              private _dialog:MatDialog,
              private _authService:AuthService,
              private _router:Router,
              private _snackBar: MatSnackBar,
              ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.roles=this._authService.getRoles();
    this.offset=0;
    this.pageSize=10;
    this.getCount();
  }

  getAll(){
    this._doctorService.getdoctors().subscribe({
      next:(data)=>{
        this.doctors=data;
        this.dataSource=new MatTableDataSource<Doctor>(this.doctors);
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('Get All In Doctor-List Completed')
  });
  }

  filterChange(event:Event){
    const filvalue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filvalue;
  }

  getrow(row:any){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data=row;
    const dialogRef= this._dialog.open(DoctorDetailsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data==="edit"){
          this.edit(row.id);
        }
      }
  );    

      // this._router.navigate(['/doctor-details',row.id]);
   }

  openDialog(pick:TemplateRef<MatDialog>){
    this._dialog.open(pick);
  }

  options:string[]=this.displayedColumns;

  show=(filter:string[]|any)=>{
    if(filter){
      this.options=filter;
    }
  }

  onPageChange(PageSizeOptions:PageEvent){
    this.offset=PageSizeOptions.pageIndex;
    this.pageSize=PageSizeOptions.pageSize;
    this.sortwithPagination();
  }

  sortData(sort: Sort){
    this.active=sort.active;
    this.direction=sort.direction;
    this.sortwithPagination();
  }

  sortwithPagination(){
    this._doctorService.getDoctorsWithSortingAndPagination(this.offset,this.pageSize,this.active,this.direction).subscribe({
      next:(data)=>{
        this.dataSource.data=data;
        this.doctors=data;
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>{
        console.log("Sorting with Pagination Completed");
      }

    });
  }

  edit(doctorId:number){
    console.log(doctorId);
    this._snackBar.open("Loading....", "OK!",{
      duration: 3000
    } );

    this._router.navigate(['/update-doctor',doctorId]);
  }

  delete(doctorId:number){
    console.log(this.id);
    this._snackBar.open("Loading....", "Ok!",{
      duration: 3000
    } );
    this._doctorService.deleteDoctor(doctorId).subscribe({
      next:(data)=>{
        console.log(data);
      },
      
    });
  }

  getCount(){
    this._doctorService.getNoOfElements().subscribe({
      next:(data)=>{
        this.leng=data;
        console.log(data);
      }
    });
  }
}
