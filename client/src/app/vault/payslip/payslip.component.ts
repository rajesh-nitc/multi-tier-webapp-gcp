import { Component, OnInit } from '@angular/core';
import { VaultService } from '../vault.service';
import { saveAs } from 'file-saver';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';

const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class PayslipComponent implements OnInit {

  date = new FormControl(moment());
  selectedYear = this.date.value.year();
  selectedMonth = this.date.value.month() + 1;

  constructor(private vaultService: VaultService) { }

  ngOnInit() {
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    this.selectedYear = this.date.value.year();
    this.selectedMonth = this.date.value.month() + 1;
    datepicker.close();
  }

  getmyyyy() {
    return this.selectedMonth.toString() + this.selectedYear.toString();
  }

  download() {
    this.vaultService.downloadPayslip(this.getmyyyy()).subscribe(
      blob => {
        console.log('blob', blob);
        saveAs(blob, this.getmyyyy());
      }
    );
  }

  view() {
    this.vaultService.downloadPayslip(this.getmyyyy()).subscribe(
      blob => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      }
    );
  }

}
