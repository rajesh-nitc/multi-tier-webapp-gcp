import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myGroup: FormGroup
  validationData = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Must be atleast 5 characters' }
    ]
  }

  constructor(private formBuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.myGroup = this.formBuilder.group({
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))

    })
  }

  setSnackBarMessage(message) {
    this.matSnackBar.open(message, null, { duration: 3000 })
  }

  onSubmit(data: any) {

    this.spinnerService.show()
    this.authService.login(data.value).subscribe(
      (res: any) => {

        if (res.token) {
          this.spinnerService.hide()
          this.setSnackBarMessage('Welcome home!')

          localStorage.setItem('token', res.token)
          localStorage.setItem('employeeId', res.employeeId)
          this.router.navigate(['/home'])
        } else {
          this.spinnerService.hide()
          this.setSnackBarMessage(res.message)
        }
      },
      err => {
        this.spinnerService.hide()
        this.setSnackBarMessage(err.statusText)
      }
    )
  }
}