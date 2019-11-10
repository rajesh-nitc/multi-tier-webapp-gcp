import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService:DataService,private authService:AuthService,private router: Router,) { }
  
  ngOnInit() {
    // this.data$ = this.dataService.getData()
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  initLeaveComponent(){
    this.router.navigate(['/leave'])
  }

  initPayslipComponent(){
    this.router.navigate(['/payslip'])
  }

}
