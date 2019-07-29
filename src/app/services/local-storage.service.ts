import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { 
   
  }
  //Manejar la información de usuarios en el localstorage
  obtener_localstorage(){
    return JSON.parse( sessionStorage.getItem("usuario") );
  }
  guardar_localstorage(usuario){
    sessionStorage.setItem("usuario",JSON.stringify(usuario));
  }
  borrar_localstorage(){
    sessionStorage.removeItem("usuario");
  }
  //Manejar la información de articulos en el localstorage
  guardarArticulo_localstorage(art){
    localStorage.setItem("articulo",JSON.stringify(art));
  }
  obtenerArticulo_localstorage(){
    return JSON.parse( localStorage.getItem("articulo") );
  }
  borrarArticulo_localstorage(){
    localStorage.removeItem("articulo");
  }

}
