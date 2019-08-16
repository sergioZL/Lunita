/**
 * Autor:  Carlos Guillermo Muñoz Valerio 
 * Clase de reportes: Esta clase sirve para realizar los reportes de la aplicacion.
 * 
 */
import { Component, OnInit, ViewChild,  ElementRef } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import * as html2canvas from 'html2canvas';
//Esta libreria se añadio para convertir los html a imagen,
//Y nos sirvio para las descargas de las imagenes creadas.

@Component({
  selector: 'app-report-inventario',
  templateUrl: './report-inventario.component.html',
  styleUrls: ['./report-inventario.component.css']
})
export class ReportInventarioComponent implements OnInit {
  fecha = new Date();//Esta es un variable de tipo fecha 
  totalesProdcutos = null;//objeto que tendra los datos de los productos por su nombre 
  bajoInventario = null;//objeto que da los productos que estan por debajo del inventario 
  totalesDepartamento = null;//objeto que da los producos por departamneto 
  
  constructor(private servicioReportes:ReportesService) { }

  ngOnInit() {
    this.servicioReportes.totalesProducto().subscribe(result=>{
      this.totalesProdcutos = result;
    }); // este metodo hace que se conecte al servidor y retorna todos los productos 
    this.servicioReportes.totalesDepatamento().subscribe(result=>{
      this.totalesDepartamento = result//este metodo hace que se conecte al servidor y retorna los productos por departamento 
    });
    this.servicioReportes.productosBajoInventario().subscribe(result=>{
      console.log(result);
      this.bajoInventario = result;
      //este metodo hace que se conecte al servidor y retorna los productos que estan por debajo del inventario 
    });
  }

  @ViewChild('content',{static:false}) screen: ElementRef;//Para obtener los elementos que se encuentran en la pantalla 
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  @ViewChild('downloadLink',{static:false}) downloadLink: ElementRef;//este sirve para descargar la imegen que esta en la pantalla
  public downloadPDF(){
    //convierte el html en imagen y hace que se pueda descargar 
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'ReporteInventario.png';
      this.downloadLink.nativeElement.click();
    });
    
  }
}
