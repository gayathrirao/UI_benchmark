import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  startOfDay, endOfDay, format, subDays,
  addDays,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataShareService } from '../data-share.service';
import { NgxSpinnerService } from 'ngx-spinner';


function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
  return `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  title = 'Tranings';
  test$: Observable<any>;
  events: object = null;
  viewDate: Date = new Date();
  loginForm: FormGroup;
  constructor(private http: HttpClient, private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router, private dataShare: DataShareService, private spinner: NgxSpinnerService) {

  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
  });
  this.spinner.show();
    this.test$ = this.http.get(environment.baseUrl+environment.api.trainings)
      .pipe(
        map((data: any) => {
          return data.map((fnre) => {
            return {
              allDay: true,
              color: { primary: "#e3bc08", secondary: "#FDF1BA" },
              meta: fnre,
              start: subDays(startOfDay(new Date(fnre.from)), 1),
              end: addDays(new Date(fnre.to), 1),
              title: fnre.name
            }
          });
        })
      )
    this.test$.subscribe(data => {
      this.events = data;
      //console.log(this.events);
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }
  login(){
    let formValue = this.loginForm;
    if(formValue.valid) {
      this.dataShare.setuserDetails(formValue.controls.email);
      this.router.navigateByUrl('/home');
      this.modalService.dismissAll();
    }
  }

}
