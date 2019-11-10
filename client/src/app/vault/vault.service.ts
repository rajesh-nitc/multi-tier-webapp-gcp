import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  constructor(private http: HttpClient, private utilService: UtilService) { }

  downloadPayslip(myyyy) {
    const body = {
      employeeId: this.utilService.getEmployeeId(),
      vaultType: 'Payslip',
      myyyy: myyyy
    };
    return this.http.post(environment.SERVER_HOST + '/api/getvault', body, { responseType: 'blob' });

  }

}
