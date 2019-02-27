import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HeaderModule } from './calender-header/header.module';
import { CalenderComponent } from './calender.component';
import { CalenderTextPipe } from './calender-text.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    HeaderModule
  ],
  declarations: [CalenderComponent, CalenderTextPipe],
  exports: [CalenderComponent]
})
export class AppCalenderModule {}