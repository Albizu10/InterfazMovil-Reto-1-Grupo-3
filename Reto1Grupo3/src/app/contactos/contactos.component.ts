import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItem, IonLabel, IonCardTitle, IonList, IonSearchbar, IonCard, IonCardHeader, IonContent, IonHeader, IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon } from "@ionic/angular/standalone";
import { API } from '../service/api';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {ToastController} from '@ionic/angular';
@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
  imports: [IonItem, IonLabel, IonList, IonSearchbar, IonCard, CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon, RouterModule],
})
export class ContactosComponent  implements OnInit {
 contactos:any[]=[];
 results:any[]=[];
 resultado:any=[];
  constructor(private apiService:API,private http:HttpClient,private ruta:Router,private toastcontroller:ToastController) { }


  ngOnInit() {this.getContactos()}
    getContactos(){
      this.apiService.getcontactos().subscribe({
        next: (res)=>{
          this.contactos=res
          this.results = [...res];
        console.log("Contactos",res)
      },error:(err)=> console.error("Error: ", err)
    })
  }
  adduser(){
    this.ruta.navigate(['/anadircontactos']);

  }
  modificar(id:any){
    this.ruta.navigate(['/modificarcontactos',id]);
  }
 handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.contactos.filter((data) => data.name.toLowerCase().includes(query) || (data.phone && data.phone.includes(query)) || (data.mobile && data.mobile.includes(query)) || (data.email && data.email.toLowerCase().includes(query)));
  }
}
