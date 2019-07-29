import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../../services/articulos-service.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-reg-productos',
  templateUrl: './reg-productos.component.html',
  styleUrls: ['./reg-productos.component.css']
})
export class RegProductosComponent implements OnInit {

  articulos=null;
  
  art={
    codigo:null,
    descripcion:null,
    costo:null,
    mayoreo:null,
    menudeo:null,
    tipo:null,
    minimo:null,
    departamento:null,
    idUsuario:null
  }

  constructor(private articulosServicio: ArticulosService, private localStorageService:LocalStorageService) {}


  ngOnInit() {
  }
  alta() {
    let usuario = this.localStorageService.obtener_localstorage();
    this.art.idUsuario = usuario.id;
    this.articulosServicio.alta(this.art).subscribe(datos => {
      console.log(datos);
      
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.art={
          codigo:null,
          descripcion:null,
          costo:null,
          mayoreo:null,
          menudeo:null,
          tipo:null,
          minimo:null,
          departamento:null,
          idUsuario:null
        }
      }
    });
  }

}
