import {  Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { IonItem, IonLabel, IonCardTitle, IonList, IonSearchbar, IonCard, IonCardHeader, IonContent, IonHeader, IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon } from "@ionic/angular/standalone";
import { API } from '../service/api';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
  imports: [IonItem, IonLabel, IonList, IonSearchbar, IonCard, CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon],
})
export class ContactosComponent  implements OnInit {
 contactos:any[]=[];
 results:any[]=[];
  constructor(private apiService:API) { }

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
  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.contactos.filter((d) => d.name.toLowerCase().includes(query) || d.phone.includes(query) ||d.mobile.includes(query) );
  }
}
