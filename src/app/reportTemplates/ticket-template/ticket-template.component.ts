/**
 * Autor:  Carla Maria Lucero Camacho
 * Clase de ticket: Esta clase general los tickets que se le van a entregar al usuario.
 * 
 */
import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from "@angular/material";
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var xeOnline: any;
//Esta libreria se añadio para convertir los html a imagen,
//Y nos sirvio para las descargas de las imagenes creadas.
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-ticket-template',
  templateUrl: './ticket-template.component.html',
  styleUrls: ['./ticket-template.component.css']
})
export class TicketTemplateComponent implements OnInit {

  date = new Date();
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef:MatDialogRef<TicketTemplateComponent>) { }

  ngOnInit() {
  }


  @ViewChild('content',{static:false}) screen: ElementRef;
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  @ViewChild('downloadLink',{static:false}) downloadLink: ElementRef;

  //Método que sirve para descargar la imagen, se dejo el nombre de PDF para
  //no tener problemas en todo el código.
  public downloadPDF(){
    
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'ticket.png';
      this.downloadLink.nativeElement.click();
    });
    
  }
//Cierra la ventana emergente de ticket.
  closeDialog(){
    this.dialogRef.close();
  }


}
