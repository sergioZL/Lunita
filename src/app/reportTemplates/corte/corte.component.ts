import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from "@angular/material";
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
