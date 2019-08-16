import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ArticulosService } from '../../../services/articulos-service.service';
import { LocalStorageService } from '../../../services/local-storage.service';

/**Autor: Sergio Alejandro Bustamante Arizmendi
 * Proyecto: punto de venta
 */

@Component({
  selector: 'app-reg-productos',
  templateUrl: './reg-productos.component.html',
  styleUrls: ['./reg-productos.component.css']
})
export class RegProductosComponent implements OnInit {
  @Output() actulizar = new EventEmitter();//Emite un mensaje para que sea captado por el conponente padre
  mensaje:string ='Nuevo producto agregado!';
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
    idUsuario:null,
    existencias:1
  }

  constructor(private articulosServicio: ArticulosService, private localStorageService:LocalStorageService) {}


  //Almacena la información del producto ingresada en cada campo

  ngOnInit() {
  }
  alta() {
    if(this.art.codigo != null){
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
            idUsuario:null,
            existencias:1
          }
          this.actulizar.emit(this.mensaje);
        }
      });
    }else{
      alert("algunos de los campos no se han llenado");
    }
  }
}
