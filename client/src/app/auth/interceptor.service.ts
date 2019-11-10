import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
      console.log('Request', request)
      return next.handle(request);

    } else {
      console.log('Request', request)
      return next.handle(request);

    }

  }

}
