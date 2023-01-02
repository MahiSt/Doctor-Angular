import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { AuthModule } from './auth/auth.module';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GridViewComponent } from './components/grid-view/grid-view.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    AddDoctorComponent,
    NavBarComponent,
    GridViewComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
