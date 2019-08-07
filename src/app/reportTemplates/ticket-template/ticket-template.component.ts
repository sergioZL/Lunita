import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from "@angular/material";
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var xeOnline: any;
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

  //@ViewChild('content',{static:false}) content:ElementRef;

  @ViewChild('content',{static:false}) screen: ElementRef;
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  @ViewChild('downloadLink',{static:false}) downloadLink: ElementRef;

  public downloadPDF(){
    
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'ticket.png';
      this.downloadLink.nativeElement.click();
    });
    
    //return xeOnline.Formatter.Format('content',{renderer:'download'});
    /*let doc = new jsPDF();

    doc.autoTable({html: '#my-table'});
    let specialElementHandlers = {
      '#editor':function(element,renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15,{
      'width':380,
      'elementHandlers':specialElementHandlers
    });

    doc.save('ticket.pdf');*/
  }

  closeDialog(){
    this.dialogRef.close();
  }


}
