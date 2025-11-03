import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItem, IonLabel, IonCardTitle, IonList, IonSearchbar, IonCard, IonCardHeader, IonContent, IonHeader, IonToolbar, IonTitle, IonFab, IonFabButton, IonIcon } from "@ionic/angular/standalone";
import { API } from '../service/api';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
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
  constructor(private apiService:API,private http:HttpClient,private ruta:Router) { }


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
     console.log("Pasa")
    this.ruta.navigate(['/anadircontactos']);

  }
  eliminar(id:any){
    if (confirm("Seguro que deseas eliminar este usuario?")){
      
      console.log("ID",id)
      this.apiService.eliminar(id).subscribe({
        next: (res)=>{
          this.resultado=res;
          console.log("Eliminar",res)
          alert("Usuario eliminado correctamente");
          this.getContactos();
        },error: (err) => {
          console.error("Error al eliminar usuario:", err);
        }
      })
    }else{ return;}
  }
  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.contactos.filter((d) => d.name.toLowerCase().includes(query) || d.phone.includes(query) ||d.mobile.includes(query) );
  }
}
