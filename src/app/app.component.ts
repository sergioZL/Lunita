import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usuario = null;
  Session:boolean = false;
  constructor(private localstorageServicio: LocalStorageService){
  }
  ngOnInit(){
    this.consultarSesionGuardada()
  }
  consultarSesionGuardada(){
     this.usuario = this.localstorageServicio.obtener_localstorage();
     if(this.usuario != null){
       this.Session = true;
     }
  }
  recibir(t){
    window.alert(t);
    this.Session = true;
  }
  
}
