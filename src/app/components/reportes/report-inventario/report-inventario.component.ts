import { Component, OnInit, ViewChild,  ElementRef } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-report-inventario',
  templateUrl: './report-inventario.component.html',
  styleUrls: ['./report-inventario.component.css']
})
export class ReportInventarioComponent implements OnInit {
  fecha = new Date();
  totalesProdcutos = null;
  bajoInventario = null;
  totalesDepartamento = null;
  
  constructor(private servicioReportes:ReportesService) { }

  ngOnInit() {
    this.servicioReportes.totalesProducto().subscribe(result=>{
      this.totalesProdcutos = result;
    });
    this.servicioReportes.totalesDepatamento().subscribe(result=>{
      this.totalesDepartamento = result
    });
    this.servicioReportes.productosBajoInventario().subscribe(result=>{
      console.log(result);
      this.bajoInventario = result;
    });
  }

  @ViewChild('content',{static:false}) screen: ElementRef;
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  @ViewChild('downloadLink',{static:false}) downloadLink: ElementRef;
  public downloadPDF(){
    
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'ReporteInventario.png';
      this.downloadLink.nativeElement.click();
    });
    
  }
}
