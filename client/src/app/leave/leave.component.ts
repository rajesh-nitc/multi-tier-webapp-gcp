import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../http.service';
import { UtilService } from '../util.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
  },
};
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class LeaveComponent implements OnInit {

  casual: number;
  earned: number;
  sick: number;
  total: number;
  myGroup: FormGroup;
  categories = [
    { name: 'casual', value: 'casual' },
    { name: 'earned', value: 'earned' },
    { name: 'sick', value: 'sick' }
  ];
  selectedCategory: any;
  days: number;
  balance: number;
  constructor(
    private httpService: HttpService,
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.httpService.getLeaveMaster().subscribe(
      (res: any) => {
        if (res.id) {
          this.casual = res.casual;
          this.earned = res.earned;
          this.sick = res.sick;
          this.total = this.casual + this.earned + this.sick;
        } else {
          this.setSnackBarMessage(res.message);
        }
      },
    );

    this.myGroup = this.formBuilder.group({
      from: new FormControl(moment()),
      to: new FormControl(moment()),
      category: new FormControl(),
    });
  }

  getMMDDYYYY(m: Moment): string {
    return (m.month() + 1).toString() + '/' + m.date().toString() + '/' + m.year().toString();
  }

  setSnackBarMessage(message) {
    this.matSnackBar.open(message, null, { duration: 3000 });
  }

  saveLeaveTxn(mygroupData) {
    const body = {
      from: this.getMMDDYYYY(mygroupData.value.from),
      to: this.getMMDDYYYY(mygroupData.value.to),
      txnOn: this.getMMDDYYYY(moment()),
      employee: this.utilService.getEmployeeId(),
      category: mygroupData.value.category
    };
    this.selectedCategory = mygroupData.value.category;

    this.days = mygroupData.value.to.diff(mygroupData.value.from, 'days') + 1;
    this.balance = this.getBalanceObjectWay(this.selectedCategory);

    if (this.balance >= this.days) {
      this.httpService.saveLeaveTxn(body).subscribe(
        (res: any) => {
          if (res.id) {
            this.refreshBalance();
            this.setSnackBarMessage('Successfully submitted');
          } else {
            this.setSnackBarMessage('oops');
          }
        },
      );
    } else {
      this.setSnackBarMessage('You don\'t have enough balance!');
    }
  }

  getBalanceObjectWay(key) {
    const obj = {
      'casual': this.casual,
      'earned': this.earned,
      'sick': this.sick
    };
    return obj[key];
  }

  refreshBalance() {
    const body = {
      employeeId: this.utilService.getEmployeeId(),
      category: this.selectedCategory,
      newBalance: this.balance - this.days
    };
    this.httpService.updateLeaveMaster(body).subscribe(
      res => console.log(res),
    );
  }

}
