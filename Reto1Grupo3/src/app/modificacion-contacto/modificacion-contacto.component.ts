import { Component, OnInit } from '@angular/core';
import { API } from '../service/api';
import { ActivatedRoute, Router } from '@angular/router';
import { IonItem, IonText, IonLabel, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTitle, IonHeader, IonBackButton, IonButtons, IonToolbar, IonList, IonInput, IonTextarea, IonFabButton, IonFab, IonIcon, IonButton, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-modificacion-contacto',
  templateUrl: './modificacion-contacto.component.html',
  styleUrls: ['./modificacion-contacto.component.scss'],
  imports: [IonItem, IonLabel, IonContent, IonCard, IonTitle, IonHeader, IonBackButton, IonButtons, IonList, IonInput, IonToolbar, FormsModule, IonIcon, IonButton, FormsModule, IonGrid, IonRow, IonCol],
})
export class ModificacionContactoComponent implements OnInit {
  resultado: any = [];
  contacto= [{
    name:"",
    email:"",
    phone:"",
    city:"",
    street:"",
    vat:"",
    image_1920:""
  }];
  private id=0;

  

  constructor(private apiServices: API, private ruta: Router, private route:ActivatedRoute,private toastcontroller:ToastController) { }

  ngOnInit() { const id = this.route.snapshot.paramMap.get('id');
    this.getusuario(id);
  }
  modificar() {
    if(!this.comprobacion()){return;}
    this.apiServices.modificar(this.id,this.contacto[0].name,this.contacto[0].email,this.contacto[0].phone,this.contacto[0].vat,this.contacto[0].street,this.contacto[0].city,this.contacto[0].image_1920).subscribe({
      next: (res) => {
        this.resultado = res;
        this.mostrarToast("Usuario modificado",'success')
        //console.log("Modificar", res)
        this.Contactos();
      }, error: (err) => {
        console.error("Error al eliminar usuario:", err);
        this.mostrarToast("Error al eliminar usuario",'danger')
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
  eliminar(){
    if (confirm("Seguro que deseas eliminar este usuario?")){
      //console.log("ID",this.id)
      this.apiServices.eliminar(this.id).subscribe({
        next: (res)=>{
          this.resultado=res;
          //console.log("Eliminar",res)
          this.mostrarToast("Usuario eliminador correctamente",'success')
          this.Contactos();
        },error: (err) => {
          console.error("Error al eliminar usuario:", err);
          this.mostrarToast("Error al eliminar usuario",'danger')
        }
      })
    }else{ return;}
  }
  Contactos(){
    //console.log("Pasa")
    this.ruta.navigate(['/contactos']);
}
  getusuario(id: any) {
    this.id=id;
    //console.log("GETUSER",id)
    this.apiServices.getusuario(id).subscribe({
      next: (res) => {
        this.contacto = res;
        //console.log("GetUsuario", res)
      }, error: (err) => {
        console.error("Error con la llamada get", err);
        this.Contactos();
      }
    })
  }
  comprobacion(){
    const soloNumeros = /^[0-9]+$/;
    if((!this.contacto[0].email.includes("@")) || (!soloNumeros.test(this.contacto[0].phone))){
      this.mostrarToast("introduzca bien la informacion de los campos",'danger');
      return false;
    }else{
      return true;
    }
    

  }
}
