import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorinterceptorService implements HttpInterceptor {

  constructor(private router: Router, private matSnackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Response', event);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.setSnackBarMessage(err.statusText)
            this.router.navigate(['/login'])
          } else {
            this.setSnackBarMessage(err.statusText)
          }
        }
      }
    );
  }

  setSnackBarMessage(message) {
    this.matSnackBar.open(message, null, { duration: 3000 })
  }
}
