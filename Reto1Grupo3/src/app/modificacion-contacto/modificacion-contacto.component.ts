import { Component, OnInit } from '@angular/core';
import { API } from '../service/api';
import { ActivatedRoute, Router } from '@angular/router';
import { IonItem, IonText, IonLabel, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTitle, IonHeader, IonBackButton, IonButtons, IonToolbar, IonList, IonInput, IonTextarea, IonFabButton, IonFab, IonIcon, IonButton } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-modificacion-contacto',
  templateUrl: './modificacion-contacto.component.html',
  styleUrls: ['./modificacion-contacto.component.scss'],
  imports: [IonItem, IonLabel, IonContent, IonCard, IonTitle, IonHeader, IonBackButton, IonButtons, IonList, IonInput, IonTextarea, IonToolbar, FormsModule, IonIcon, IonButton, FormsModule],
})
export class ModificacionContactoComponent implements OnInit {
  resultado: any = [];
  contacto= [{
    name:String,
    email:String,
    phone:String,
    city:String,
    street:String,
    var_label:String,
    image_1920:String
  }];
  private id=0;

  

  constructor(private apiServices: API, private ruta: Router, private route:ActivatedRoute) { }

  ngOnInit() { const id = this.route.snapshot.paramMap.get('id');
    this.getusuario(id);
  }
  modificar() {
    this.apiServices.modificar(this.id,this.contacto[0].name,this.contacto[0].email).subscribe({
      next: (res) => {
        this.resultado = res;
        console.log("Modificar", res)
      }, error: (err) => {
        console.error("Error al eliminar usuario:", err);
      }
    })
  }
  
  eliminar(){
    if (confirm("Seguro que deseas eliminar este usuario?")){
      console.log("ID",this.id)
      this.apiServices.eliminar(this.id).subscribe({
        next: (res)=>{
          this.resultado=res;
          console.log("Eliminar",res)
          alert("Usuario eliminado correctamente");
          this.Contactos();
        },error: (err) => {
          console.error("Error al eliminar usuario:", err);
        }
      })
    }else{ return;}
  }
  Contactos(){
    console.log("Pasa")
    this.ruta.navigate(['/contactos']);
}
  getusuario(id: any) {
    this.id=id;
    console.log("GETUSER",id)
    this.apiServices.getusuario(id).subscribe({
      next: (res) => {
        this.contacto = res;
        console.log("GetUsuario", res)
      }, error: (err) => {
        console.error("Error al eliminar usuario:", err);
      }
    })
  }
}
