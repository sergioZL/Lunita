import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  url='http://40.76.95.220/ProyectoOne/Angular/'; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }
  totalesProducto() {
    return this.http.get(`${this.url}totalesProducto.php`);
  }
  totalesDepatamento(){
    return this.http.get(`${this.url}totalesDepartamento.php`);
  }
  productosBajoInventario(){
    return this.http.get(`${this.url}productosBajoInventario.php`);
  }
  corteReport( fechas ){
    return this.http.post(`${this.url}corte.php`, JSON.stringify(fechas) );
  }
}
