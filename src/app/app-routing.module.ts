import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.gaurd';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],data:{roles:["manager","editor","member"]}},
//  {path:'doctor-list',component:DoctorListComponent},
  {path:'add-doctor',component:AddDoctorComponent},
  {path:'update-doctor/:id',component:AddDoctorComponent},
  {path:'doctor-details/:id',component:DoctorDetailsComponent},
  {path:'grid-view',component:GridViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
