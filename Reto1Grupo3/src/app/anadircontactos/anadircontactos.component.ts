import { Component, OnInit } from '@angular/core';
import { IonItem, IonLabel, IonButton, IonText, IonInput, IonContent, IonTitle, IonToolbar, IonHeader, IonIcon, IonList, IonCardTitle, IonCard, IonCardHeader } from "@ionic/angular/standalone";
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { API } from '../service/api';
import { enableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-anadircontactos',
  templateUrl: './anadircontactos.component.html',
  styleUrls: ['./anadircontactos.component.scss'],
  imports: [IonItem, IonLabel, IonButton, IonText, IonInput, IonContent, IonTitle, IonToolbar, IonHeader, IonIcon, IonList, IonCard, FormsModule],
})
export class AnadircontactosComponent  implements OnInit {
name:string="";
user:string="";
password:string="";
email:string="";
phone:string="";
respuesta:any=[];
  constructor(private apiService:API) { }

  ngOnInit() {}
  adduser(){
    this.apiService.anadirusuario(this.name,this.user,this.password,this.email,this.phone).subscribe({
      next: (res)=>{
        this.respuesta=res
        console.log("Añadiendo",res)
      },error: (err)=> console.error,
    })
  }
}
