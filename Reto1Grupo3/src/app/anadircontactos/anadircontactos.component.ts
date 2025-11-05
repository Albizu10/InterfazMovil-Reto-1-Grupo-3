import { Component, OnInit } from '@angular/core';
import { IonItem, IonLabel, IonButton, IonText, IonInput, IonContent, IonTitle, IonToolbar, IonHeader, IonIcon, IonList, IonCardTitle, IonCard, IonCardHeader, IonButtons, IonBackButton, IonRow, IonGrid, IonCol } from "@ionic/angular/standalone";
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { API } from '../service/api';
import { enableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {ToastController} from "@ionic/angular"

@Component({
  selector: 'app-anadircontactos',
  templateUrl: './anadircontactos.component.html',
  styleUrls: ['./anadircontactos.component.scss'],
  imports: [IonItem, IonLabel, IonButton, IonText, IonInput, IonContent, IonTitle, IonToolbar, IonHeader, IonIcon, IonList, IonCard, FormsModule, IonCardTitle, IonButtons, IonBackButton, IonRow, IonGrid, IonCol],
})
export class AnadircontactosComponent  implements OnInit {
name:string="";
email:string="";
phone:string="";
job:string="";
street:string="";
city:string="";
respuesta:any=[];
  constructor(private apiService:API, private ruta:Router,private toastcontroller:ToastController) { }

  ngOnInit() {}
  adduser(){
    if(!this.comprobacion()){return;}
    this.apiService.anadirusuario(this.name,this.email,this.phone,this.job,this.street,this.city).subscribe({
      next: (res)=>{
        this.respuesta=res
        //console.log("Añadiendo",res)
        this.mostrarToast("Añadido correctamente el nuevo usuario", 'success')
        this.contactos();
      },error: (err) => {
          console.error("Error al crear nuevo usuario", err);
          this.mostrarToast("Error al crear nuevo usario",'danger')
        }
    })
  }
  async mostrarToast(mensaje: string, color: string = 'primary') {
  const toast = await this.toastcontroller.create({
    message: mensaje,
    duration: 2000,
    color: color,
    position: 'bottom',
  });
  await toast.present();
}
  contactos(){
    this.ruta.navigate(['/contactos']);
  }
  comprobacion(){
    const soloNumeros = /^[0-9]+$/;
    if((!this.email.includes("@")) || (!soloNumeros.test(this.phone))){
      this.mostrarToast("introduzca bien la informacion de los campos",'danger');
      return false;
    }else{
      return true;
    }
    

  }
}
