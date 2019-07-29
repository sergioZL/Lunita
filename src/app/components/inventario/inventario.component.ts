import { Component, OnInit,ViewChild  } from '@angular/core';
import {FormControl} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import{ EditProductosComponent } from './edit-productos/edit-productos.component';
import { ProductosComponent } from './productos/productos.component';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  @ViewChild('editar', null) ventanaEditar: EditProductosComponent; //sirve para acceder a los metodos del componente
  @ViewChild('productos', null) ventanaProductos: ProductosComponent;
  selected = new FormControl(0); // define a FormControl with value 0. Value means index.
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
  constructor(private localstorageServicio: LocalStorageService) { }
  
  ngOnInit() {
  }
  changeTab(t) { 
    this.art=JSON.parse(t); 
    this.ventanaEditar.obtenerSeleccion(this.art); //Accede al metodo obtener seleccion del componente hijo y envia como argumento el articulo seleccionado
    this.selected.setValue(this.selected.value+2);//Canbia el mat-tab mostrado en pantalla por el de editar productos
  } 
  returnTab(t) {
    this.actualizar(); //Actualiza los productos de la lista 
    this.selected.setValue(this.selected.value-2); //Canbia el mat-tab mostrado en pantalla por el de productos
  } 
  actualizar(){
    this.ventanaProductos.recuperarTodos();//manda llamar el metodo recuperar todos del componente hijo
  }

}
