import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.gaurd';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],data:{roles:["manager","editor","member"]}},
//  {path:'doctor-list',component:DoctorListComponent},
  {path:'add-doctor',component:AddDoctorComponent,canActivate:[AuthGuard],data:{roles:["manager"]}},
  {path:'doctor-details',component:DoctorDetailsComponent,canActivate:[AuthGuard],data:{roles:["manager","editor","member"]}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
