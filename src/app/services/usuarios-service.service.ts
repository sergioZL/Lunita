import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  url='http://40.76.95.220/ProyectoOne/Angular/'; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }

  alta(usuario) {
    return this.http.post(`${this.url}altaUsuario.php`, JSON.stringify(usuario));    
  }
  log(usuario) {
    return this.http.post(`${this.url}recuperarUsuario.php`, JSON.stringify(usuario));    
  }
  
}
