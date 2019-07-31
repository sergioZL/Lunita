import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from "@angular/material";
import * as jsPDF from 'jspdf';

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

  @ViewChild('content',{static:false}) content:ElementRef;

  public downloadPDF(){
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor':function(element,renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 30, 30,{
      'width':380,
      'elementHandlers':specialElementHandlers
    })
    doc.save('ticket.pdf');
  }

  closeDialog(){
    this.dialogRef.close();
  }


}
