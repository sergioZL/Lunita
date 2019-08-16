import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../../services/articulos-service.service';

/**Autor: Sergio Alejandro Bustamante Arizmendi
 * Proyecto: punto de venta
 */

@Component({
  selector: 'app-buscar-por',
  templateUrl: './buscar-por.component.html',
  styleUrls: ['./buscar-por.component.css']
})
export class BuscarPorComponent implements OnInit {
  //Muestra las opciones para buscar productos
  opcionesBusqueda=[
    {
      opcion:'Departamento',
      opciones:[]
    },
    {
      opcion:'nombre',
      opciones:[
      ]
    },
    {
      opcion:'Tipo',
      opciones:[
      ]
    }
  ];


  seleccionada: string = this.opcionesBusqueda[0].opcion; //Almacena la opción seleccionada en la primera opción
  seleccion: string = '';//Almacena la opción seleccionada en la segunda opción
  tarticulos=null; //Almacena los articulos recibidos del servidor
  articulos=null;//Almacena los artículos consultados al servidor
  art={//Guarda la información del articulo seleccionado
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

  constructor(private articulosServicio: ArticulosService) {
  }
  ngOnInit() {
    this.recuperarTodos();
  }
  Buscar(){
    let criterios={
      criterio:this.seleccionada,
      buscar:this.seleccion
    }
    this.articulosServicio.buscarPor(criterios).subscribe(result=>{
      this.articulos = result;
    })
  }
  hayRegistros() {
    if(this.articulos!=null)return true;
    else return false;
  }
  recuperarTodos() {
    this.articulosServicio.recuperarTodos().subscribe(result =>{ 
      this.tarticulos = result;
      this.cargarOpciones();
    });
  }
  cargarOpciones(){
    let i =0;
    let f = 0;  
    let descripciones: Array<Object> = [];
    let departamentos: Array<Object>  = [];
    let tipos:Array<Object>  = [];
    descripciones.push({nombre:this.tarticulos[i].descripcion});
    departamentos.push({nombre:this.tarticulos[i].departamento});
    tipos.push({nombre:this.tarticulos[i].tipo});
    while(this.tarticulos[i]!=null){
      let sw:boolean = true;
      let ws:boolean = true;
      let ww:boolean = true;   
      for(let j = 0 ; j < descripciones.length ; j++ ){
        for (var key in descripciones[j]) {  
            if(descripciones[j][key] == this.tarticulos[ i ].descripcion ){
              sw = false;  
            }
        }
      }
      if(sw)descripciones.push({nombre:this.tarticulos[i].descripcion});
      sw = true;
      for(let j = 0 ; j < departamentos.length ; j++ ){
        for (var key in departamentos[j]) {  
            if(departamentos[j][key] == this.tarticulos[ i ].departamento){
              ws = false;  
            }
        }
      }
      if(ws)departamentos.push({nombre:this.tarticulos[i].departamento});
      ws=true;
      for(let j = 0 ; j < tipos.length ; j++ ){
        for (var key in tipos[j]) {  
            if(tipos[j][key] == this.tarticulos[ i ].tipo){
              ww = false;  
            }
        }
      }
      if(ww)tipos.push({nombre:this.tarticulos[i].tipo});
      ww=true;
      /**/
      i++;
    }
    this.opcionesBusqueda[0].opciones = departamentos;
    this.opcionesBusqueda[1].opciones = descripciones;
    this.opcionesBusqueda[2].opciones = tipos;
  } 
}
