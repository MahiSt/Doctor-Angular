import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  roles!:string[];
  isOnDashboard:boolean=false;
  isOnAddcomponent:boolean=false;
  isOnUpdateComp:boolean=false;
  isOngridView:boolean=false;
  

  constructor(private _service:AuthService,
    private _router:Router,
    private _location:Location) { }

  ngOnInit(): void {
    this.roles=this._service.getRoles();
    
    this._router.events.subscribe((data)=>{
      this.isOnDashboard=this._router.url==='/dashboard'||this._router.url==='/';    
      this.isOnAddcomponent=(this._router.url==='/add-doctor');
      this.isOngridView=this._router.url==='/grid-view';
    }) 
  }

  onHome(){
    this._router.navigate(['/dashboard'])
  }

  onClick=()=>{
    this._service.logout();
  }

  onAdd(){
    this._router.navigate(['/add-doctor'])
  }

  back(){
    this._location.back();
  }

  grid(){
    this._router.navigate(['/grid-view']);
  }

}
