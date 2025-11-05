import { Component, OnInit } from '@angular/core';
import { IonContent, IonGrid, IonCard, IonCardContent, IonInput, IonItem, IonButton, IonApp, IonRow, IonCol } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { API } from '../service/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonContent, IonCard, IonCardContent, IonInput, IonItem, IonButton, FormsModule],
})
export class LoginComponent  implements OnInit {
user:string="";
password:string="";
respuesta:any;
  constructor(private apiService:API, private http:HttpClient, private ruta:Router,private toastcontroller:ToastController) { }

  ngOnInit() {}
public login(){
  this.apiService.postlogin(this.user,this.password).subscribe ({
    next: async (res)=>{
       this.respuesta=  res;
       //console.log("Login",this.respuesta);
       this.cambioderuta();if (this.respuesta.mensaje === "Autenticación exitosa") {
        await this.mostrarToast('Login Correcto', 'success');
        this.cambioderuta();
      } else {
        await this.mostrarToast('Usuario o Contraseña incorrecta', 'danger');
      }
    },
    error: async (err) => {
      console.error('Error en la API:', err);
      await this.mostrarToast('Error de conexión con el servidor', 'danger');
    }
  });
}
async mostrarToast(mensaje: string, color: string = 'primary') {
  const toast = await this.toastcontroller.create({
    message: mensaje,
    duration: 2000,
    color: color,
    position: 'bottom',
    cssClass: 'mi-toast-pequeno' 
  });
  await toast.present();
}


cambioderuta(){
   if(this.respuesta.length>0)
    console.log("Pasa")
    this.ruta.navigate(['/contactos']);
}

}

