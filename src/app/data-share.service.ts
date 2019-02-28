import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class DataShareService {

  constructor() { }

  private selectionFormatState = new Subject<any>();
  private selectionFormatData = {};

  setuserDetails(state: any) {
    localStorage.setItem('userDetails', state.value);
  }

  getuserDetails() {
    return localStorage.getItem('userDetails');
  }
}
