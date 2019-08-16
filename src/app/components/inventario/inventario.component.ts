import { Component, OnInit,ViewChild  } from '@angular/core';
import {FormControl} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import{ EditProductosComponent } from './edit-productos/edit-productos.component';
import { ProductosComponent } from './productos/productos.component';
import { RegProductosComponent } from "./reg-productos/reg-productos.component";
import {MatIconModule} from '@angular/material/icon'

/**Autor: Sergio Alejandro Bustamante Arizmendi
 * Proyecto: punto de venta
 */

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
//sirven para acceder a los métodos de cada componente

  @ViewChild('editar', null) ventanaEditar: EditProductosComponent;
  @ViewChild('productos', null) ventanaProductos: ProductosComponent;
  @ViewChild('registrar', null) ventanaRegistrar: RegProductosComponent;
  selected = new FormControl(0); 
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
    this.ventanaEditar.obtenerSeleccion(this.art); //Accede al método obtener seleccion envia el articulo seleccionado
    this.selected.setValue(this.selected.value+2);//Cambia el mat-tab mostrado en pantalla por el de editar productos
  } 
  returnTab(t) {
    this.actualizar(); //Actualiza los productos de la lista 
    this.selected.setValue(0); //Cambia el mat-tab mostrado en pantalla por el de productos
  } 
  actualizar(){
    this.ventanaProductos.recuperarTodos();//manda llamar el método recuperar todos
  }

}
