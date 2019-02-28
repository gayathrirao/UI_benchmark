import { environment } from 'src/environments/environment';
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
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/data-share.service';


function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
  return `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
}

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Tranings';
  countries = COUNTRIES;
  test$: Observable<any>;
  events: object = null;
  viewDate: Date = new Date();
  order = "rank";
  ascending = false;
  trainingList;
  constructor(private http: HttpClient, private modalService: NgbModal, private router: Router, private dataShare: DataShareService) {

  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit() {
    this.http.get(environment.baseUrl + environment.api.profile + this.dataShare.getuserDetails()).subscribe(data => {
      console.log(data);
      this.trainingList = data;
    });
      
    
  }


  logout() {
    this.router.navigateByUrl('/landing');
  }
}
