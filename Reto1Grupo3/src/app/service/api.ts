import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class API {
  private url = 'http://localhost:5000/'; 
  //private url = 'http://api-grupo3.duckdns.org/';
  constructor(private http: HttpClient) {}
  
  postlogin(user: string, password: string): Observable<any> {
    const body = { user, password };
    return this.http.post(`${this.url}login`, body, {withCredentials:true});
  }

  anadirusuario(name:string,user: string, password: string,email:string,phone:string): Observable<any> {
    const body = {
  tabla: "res.users",
  nuevo: {name: name,       
      login: user,      
      password: password,
      email: email,
      phone: phone}};
    return this.http.post(`${this.url}nuevo`, body, {withCredentials:true});
  }
  eliminar(id:any):Observable<any>{
    const body = {
  tabla: "res.partner",
  id: [id]};
    return this.http.delete(`${this.url}eliminar`, {body});
  }

  getcontactos(): Observable<any> {
    return this.http.get(`${this.url}getDatosFiltro/res.partner?campos=[\"name\",\"id\",\"phone\",\"mobile\",\"email\",\"image_1920\"]`,{withCredentials:true});
  }
}
