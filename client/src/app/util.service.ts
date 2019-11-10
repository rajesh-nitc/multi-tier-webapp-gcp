import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  getEmployeeId() {
    return localStorage.getItem('employeeId');
  }


}
