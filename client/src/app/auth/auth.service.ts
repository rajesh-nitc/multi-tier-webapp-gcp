import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post(environment.SERVER_HOST + '/api/login', body,httpOptions)
  }

  logout() {
    localStorage.removeItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
