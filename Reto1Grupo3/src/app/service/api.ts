import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class API {
  //private url = 'http://localhost:5000/'; 
  private url = 'http://api-grupo3.duckdns.org/';
  constructor(private http: HttpClient) {}

  postlogin(user: string, password: string): Observable<any> {
    const body = { user, password };
    return this.http.post(`${this.url}login`, body);
  }

  getcontactos(): Observable<any> {
    return this.http.get(`${this.url}getDatosFiltro/res.partner?campos=[\"name\",\"id\",\"phone\",\"mobile\",\"email\",\"image_1920\"]`);
  }
}
