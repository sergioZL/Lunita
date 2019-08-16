/**
 * Autor:  Carla Maria Lucero Camacho
 * Clase de corte: Esta clase general el corte de caja.
 * 
 */
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from "@angular/material";
//Esta libreria se añadio para convertir los html a imagen,
//Y nos sirvio para las descargas de las imagenes creadas.
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.css']
})
export class CorteComponent implements OnInit {
  date = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef:MatDialogRef<CorteComponent>) { }

  ngOnInit() {
    console.log(this.date);
    
  }
  closeDialog(){
    this.dialogRef.close();
  }
  //Estos 3 sirven para ver el contenido de html y poderlo convertir a imagen.
  @ViewChild('content',{static:false}) screen: ElementRef;
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  @ViewChild('downloadLink',{static:false}) downloadLink: ElementRef;
   //Método que sirve para descargar la imagen, se dejo el nombre de PDF para
  //no tener problemas en todo el código.
  public downloadPDF(){
    
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'ReporteInventario.png';
      this.downloadLink.nativeElement.click();
    });
    
  }

}
