import { Component, OnInit } from '@angular/core';
import { IonItem, IonLabel, IonButton, IonText, IonInput, IonContent, IonTitle, IonToolbar, IonHeader, IonIcon, IonList, IonCardTitle, IonCard, IonCardHeader } from "@ionic/angular/standalone";
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { API } from '../service/api';
import { enableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anadircontactos',
  templateUrl: './anadircontactos.component.html',
  styleUrls: ['./anadircontactos.component.scss'],
  imports: [IonItem, IonLabel, IonButton, IonText, IonInput, IonContent, IonTitle, IonToolbar, IonHeader, IonIcon, IonList, IonCard, FormsModule, IonCardTitle],
})
export class AnadircontactosComponent  implements OnInit {
name:string="";
email:string="";
phone:string="";
respuesta:any=[];
  constructor(private apiService:API, private ruta:Router) { }

  ngOnInit() {}
  adduser(){
    if(!this.comprobacion()){return;}
    this.apiService.anadirusuario(this.name,this.email,this.phone).subscribe({
      next: (res)=>{
        this.respuesta=res
        console.log("Añadiendo",res)
        this.contactos();
      },error: (err)=> console.error,
    })
  }
  contactos(){
    this.ruta.navigate(['/contactos']);
  }
  comprobacion(){
    const soloNumeros = /^[0-9]+$/;
    if((!this.email.includes("@")) || (!soloNumeros.test(this.phone))){
      alert("introduzca bien la informacion de los campos");
      return false;
    }else{
      return true;
    }
    

  }
}
