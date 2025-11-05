import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class API {
  //private url = 'http://localhost:5000/'; 
  private url = 'https://api-grupo3.duckdns.org/';
  constructor(private http: HttpClient) {}
  
  postlogin(user: string, password: string): Observable<any> {
    const body = { user, password };
    return this.http.post(`${this.url}login`, body, {withCredentials:true});
  }

  anadirusuario(name:string,email:string,phone:string,job:string,street:string,city:string): Observable<any> {
    const body ={name:name, email:email,phone:phone,function:job,street:street,city:city};
    //console.log(body)
    return this.http.post(`${this.url}nuevo/res.partner`, body, {withCredentials:true});
  }
  eliminar(id:any):Observable<any>{
    return this.http.delete(`${this.url}eliminar/res.partner/${id}`, {withCredentials:true});
  }
  modificar(id:any,name:any,email:any,phone:any,vat:any,city:any,street:any,image_1920:any):Observable<any>{
     const modificaciones ={name: name,
      email: email,
      phone: phone,
      city:city,
      street:street,
      vat:vat,
      image_1920:image_1920
  };
        return this.http.put(`${this.url}modificar/res.partner/${id}`,modificaciones, {withCredentials:true});
  }
  getcontactos(): Observable<any> {
    return this.http.get(`${this.url}getDatosFiltro/res.partner?campos=[\"name\",\"id\",\"phone\",\"email\",\"image_1920\",\"vat\",\"city\",\"street\"]`,{withCredentials:true});
  }
  getusuario(id:any): Observable<any> {
    return this.http.get(`${this.url}getDatosFiltro/res.partner?campos=[\"name\",\"id\",\"phone\",\"email\",\"image_1920\",\"vat\",\"city\",\"street\"]&filtros=[["id","=",${id}]]`,{withCredentials:true});
  }
}
