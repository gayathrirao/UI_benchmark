import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppCalenderModule } from './shared/calender/calender.module';
import { CommonModelComponent } from './shared/common-model/common-model.component';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'home', loadChildren: './feature/feature.module#FeatureModule'}
];

@NgModule({
  declarations: [
    AppComponent,
    CommonModelComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    AppCalenderModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }

