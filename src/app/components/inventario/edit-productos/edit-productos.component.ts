import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ArticulosService } from '../../../services/articulos-service.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-edit-productos',
  templateUrl: './edit-productos.component.html',
  styleUrls: ['./edit-productos.component.css']
})
export class EditProductosComponent implements OnInit {
  @Output() actulizar = new EventEmitter();//Emite un mensaje para que sea captado por el conponente padre
  mensaje:string ='actualizado';
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
    existencias:null
  }
  haySeleccion:boolean = false;

  constructor(private articulosServicio: ArticulosService,private localStorageService:LocalStorageService) {

  }

  ngOnInit() {  
  }
  modificacion() {
    let usuario = this.localStorageService.obtener_localstorage();
    this.art.idUsuario = usuario.id;
    this.articulosServicio.modificacion(this.art).subscribe(datos => {
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
          existencias:null
        }
        this.haySeleccion = false;
        this.actulizar.emit(this.mensaje);
      }
    });    
  }
  obtenerSeleccion(a){//Este metodo se manda llamar desde el componente inventario
    this.haySeleccion = true;
    this.art = a;
    
  }
}
