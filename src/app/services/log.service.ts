import { Injectable } from '@angular/core';
import { Log } from '../models/log'
import { Observable } from 'rxjs';
import { of } from 'rxjs'
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null })
  selectedLod = this.logSource.asObservable();
  private _stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this._stateSource.asObservable();
  constructor() {
    // this.logs = [
    //   { id: '1', text: 'generated Components', date: new Date('12/27/2017 9:33:13') },
    //   { id: '2', text: 'Added bootstrap', date: new Date('12/27/2017 12:00:23') },
    //   { id: '3', text: 'Added logs component', date: new Date('12/26/2017 12:00:23') },
    // ]
    this.logs = []
  }
  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }


    return of(this.logs.sort((a,b)=>{
      return b.date = a.date
    }))
  }
  setFormLog(log: Log) {
    this.logSource.next(log);
  }
  addLog(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    })
    this.logs.unshift(log);

    localStorage.setItem('logs',JSON.stringify(this.logs));
  }
  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    })
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }
  clearState() {
    this._stateSource.next(true);
  }
}
