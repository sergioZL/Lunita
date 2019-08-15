import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { ArticulosService } from '../../../services/articulos-service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @Output() regresarSeleccion = new EventEmitter();
  seleccionado:string;
  articulos=null;
  
  art={
    codigo:null,
    descripcion:null,
    costo:null,
    mayoreo:null,
    menudeo:null,
    tipo:null,
    minimo:null,
    departamento:null
  }

  constructor(private articulosServicio: ArticulosService) {}

  ngOnInit() {
    this.recuperarTodos();
  }
  recuperarTodos() {
    this.articulosServicio.recuperarTodos().subscribe(result =>{ 
      console.log(result);
      
      this.articulos = result;
    });
  }
  seleccionar(codigo) {
    this.articulosServicio.seleccionar(codigo).subscribe(result => {
      this.art = result[0]
      console.log(this.art);
      this.seleccionado = JSON.stringify(this.art);
      this.regresarSeleccion.emit(this.seleccionado);
    });
  }
  hayRegistros() {
    if(this.articulos!=null)return true;
    else return false;
    
  } 
  baja(codigo) {
    this.articulosServicio.baja(codigo).subscribe(datos => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }
}
