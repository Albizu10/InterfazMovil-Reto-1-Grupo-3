import { Component, OnInit } from '@angular/core';
import { IonContent, IonGrid, IonCard, IonCardContent, IonInput, IonItem, IonButton, IonApp, IonRow, IonCol } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { API } from '../service/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonContent, IonCard, IonCardContent, IonInput, IonItem, IonButton, FormsModule],
})
export class LoginComponent  implements OnInit {
user:string="";
password:string="";
respuesta:string="";
  constructor(private apiService:API, private http:HttpClient, private ruta:Router) { }

  ngOnInit() {}
public login(){
  this.apiService.postlogin(this.user,this.password).subscribe({
    next: (res)=>{
      this.respuesta=res,
      console.log("Login",res);
      this.cambioderuta();
    },error:(err)=> console.error("Error: ", err)
  });
}
cambioderuta(){
  if(this.respuesta.trim() === "Autenticacion completada con exito..."){
    this.ruta.navigate(['/login']);
  }else{
    alert("Usuario o contraseña incorrecta");
  }
}
}
