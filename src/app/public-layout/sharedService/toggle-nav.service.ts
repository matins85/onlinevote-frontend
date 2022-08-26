import { Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleNavService {
  message: string | undefined;
  message2: string | undefined;
  message3: string | undefined;
  message4: string | undefined;

  private subject = new Subject<any>();

  constructor() {}

  setMessage(data: any) {
    this.message = data;
  }

  getMessage() {
    return this.message;
  }
  //
  setdataMessage(data: any) {
    this.message2 = data;
  }

  getdataMessage() {
    return this.message2;
  }
  //
  setdataMessage2(data: any) {
    this.message3 = data;
  }

  getdataMessage2() {
    return this.message3;
  }
  //
  setUserData(data: any) {
    this.message4 = data;
  }

  getUserData() {
    return this.message4;
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
