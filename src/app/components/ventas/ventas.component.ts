import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../services/articulos-service.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})

export class VentasComponent implements OnInit {
  buscador:boolean = true;
  //Contiene las opciones de busqueda para buscar productos en el inventario
  opcionesBusqueda=[
    {
      opcion:'Departamento',
      opciones:[]
    },
    {
      opcion:'Tipo',
      opciones:[
      ]
    }
  ];
  opcionesDescripciones =[
    {
      opcion:'Descripcion',
      opciones:[

      ]
    }
  ]
  seleccionada: string = this.opcionesBusqueda[0].opcion; //Almacena la opcion seleccionada en el primer mat option
  seleccion: string = '';//Almacena la opcion seleccionada en el segundo mat option
  tarticulos=null; //Almacena los articulos recibidos del servidor
  articulos:Array<Object> = [];//Almacena los articulos consultados al servidor por medio del metodo buscar
  articuloBuscado = null;
  total = 0;
  importe = 0;
  iva = 0;
  art={//Guarda la información de un articulo seleccionado
    codigo:null,
    descripcion:null,
    costo:null,
    mayoreo:null,
    menudeo:null,
    tipo:null,
    minimo:null,
    departamento:null,
    presio:null,
    cantidad:null,
    existencias:null
  }
  radioSelect:boolean = true;
  radioButons = [
    true,
    false
  ];
  constructor( private articulosServicio: ArticulosService,
               private localStorageService:LocalStorageService,
               private dialogService:DialogService ) { }

  ngOnInit() {
    this.recuperarTodos();
  }
  hayRegistros() {
    if(this.articulos!=null)return true;
    else return false;
  }
  limpiarLista(){
    this.articulos = [];
    this.importe = null;
    this.iva = null;
    this.total = null;
  }

  Vender(){
    if( this.articulos != null && this.articulos.length > 0){
      let venta={
        usuario:this.localStorageService.obtener_localstorage(),
        productos:this.articulos,
        idventa:null
      };
      let sale:any;
      this.articulosServicio.vender(venta).subscribe(result=>{
        console.log(result);
        sale = result;
        this.dialogService.openConfirmDialog(sale,this.importe,this.iva,this.total)
        .afterClosed().subscribe(result=>{

          this.limpiarLista();
        });
        
      },error=>{
        console.log(error);
      });
    }else alert('¡Primero debes de agregar productos a la lista de venta!');
  }

  seleccionar(arti,index){
    this.art = arti;
    this.borrarDeLista(index);
  }
  borrarDeLista(indice){
    let arti =this.articulos.splice(indice,1);
    console.log(arti);
    
  }
  cargarPorNombre(){
    if(this.art.descripcion != null){
      let criterios={
        criterio:'nombre',
        buscar:this.art.descripcion
      }
      this.articulosServicio.buscarPor(criterios).subscribe(result=>{
        if(result){
          this.art = result[0]
        }
        else alert('No existe ningun articulo con ese nombre')
      })
    }
  }
  Agregar(){
    if( this.art.cantidad < this.art.existencias  ){

      if( this.art.cantidad  < 10 )  this.art.presio = this.art.menudeo;

      else this.art.presio  = this.art.mayoreo;

      this.importe = this.importe + ( this.art.presio * this.art.cantidad );
      this.iva = (  this.importe  * 16  ) / 100;
      this.total = this.importe+this.iva;
      
      this.articulos.push(  this.art );
      this.art  = {
        codigo:null,
        descripcion:null,
        costo:null,
        mayoreo:null,
        menudeo:null,
        tipo:null,
        minimo:null,
        departamento:null,
        presio:null,
        cantidad:null,
        existencias:null
      }
      this.Buscar();
    }else alert('Por el momento no disponemos de esa cantidad de '+this.art.descripcion+' en el inventario');
  }
  cargarNombres(){
    let i =0;
    let sw;
    let descripciones: Array<Object> = [];

    descripciones.push( this.articuloBuscado[ i ] );
    
    while(  this.articuloBuscado[i] != null ){
    
      for(  let j = 0 ; j < descripciones.length ; j++ ){
    
        for ( var key in descripciones[j] ) {
            
            if( descripciones[j][key] == this.articuloBuscado[ i ].descripcion ){
              sw = false;  
            }
        }
      }
      if(sw)descripciones.push(this.articuloBuscado[i]);
      sw = true;
      i++;
    }
    this.opcionesDescripciones[0].opciones = descripciones;    
  }
  Buscar(){
    let criterios={
      criterio:this.seleccionada,
      buscar:this.seleccion
    }
    this.articulosServicio.buscarPor(criterios).subscribe(result=>{
      this.articuloBuscado = result;
      this.cargarNombres();
    })
  }
  recuperarTodos() {
    this.articulosServicio.recuperarTodos().subscribe(result =>{ 
      this.tarticulos = result;
      this.cargarOpciones();
    });
  }
  cargarOpciones(){
    let i =0;
    let departamentos: Array<Object>  = [];
    let tipos:Array<Object>  = [];
    departamentos.push({nombre:this.tarticulos[i].departamento});
    tipos.push({nombre:this.tarticulos[i].tipo});
    while(this.tarticulos[i]!=null){
      let ws:boolean = true;
      let ww:boolean = true;   
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
    this.opcionesBusqueda[1].opciones = tipos;
  }

}
