import { homeData } from './sample-home-data';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tranings';
  test$: Observable<any>;
  events: object = null;
  viewDate: Date = new Date();
  constructor(private http: HttpClient, private modalService: NgbModal) {

  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit() {
    this.test$ = this.http.get('http://localhost:3010/posts/1')
      .pipe(
        map((data: any) => {
          return data.activityName.map((fnre) => {
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
    });
  }
}
