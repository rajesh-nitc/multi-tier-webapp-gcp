import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UtilService } from './util.service';
import { saveAs } from 'file-saver';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private getLeaveBalanceUrl = '/getleavemasterbyid';
  private saveLeaveTxnUrl = '/saveleavetxn';
  private updateLeaveMasterUrl = '/updateleavemaster';

  constructor(private http: HttpClient, private utilService: UtilService) {

  }

  getLeaveMaster() {
    const body = { employeeId: this.utilService.getEmployeeId() };
    return this.http.post(environment.SERVER_HOST + '/api' + this.getLeaveBalanceUrl, body, httpOptions);
  }

  saveLeaveTxn(body: any) {
    return this.http.post(environment.SERVER_HOST + '/api' + this.saveLeaveTxnUrl, body, httpOptions);
  }

  updateLeaveMaster(body: any) {
    return this.http.post(environment.SERVER_HOST + '/api' + this.updateLeaveMasterUrl, body, httpOptions);
  }

}
