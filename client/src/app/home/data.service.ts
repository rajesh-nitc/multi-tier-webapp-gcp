import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  socket: any
  
  constructor() { }

  getData(): Observable<any> {
    
    this.socket = io(environment.SERVER_HOST)

    return new Observable<any>(observer => {
      this.socket.on('data', (res) => {
        observer.next(res.data)
      })
    })

  }

}