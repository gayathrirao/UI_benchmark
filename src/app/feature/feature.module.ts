import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AppCalenderModule } from '../shared/calender/calender.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderBy } from './order-by.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent, ProfileComponent, OrderBy],
  imports: [
    CommonModule,
    HttpClientModule,
    AppCalenderModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [HomeComponent]
})
export class FeatureModule { }
