import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material";
import { TicketTemplateComponent } from '../reportTemplates/ticket-template/ticket-template.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openConfirmDialog(venta,importe,iva,total){
    return this.dialog.open(TicketTemplateComponent,{
      width:'400px',
      disableClose:true,
      data:{
         sale:venta,
         iv:iva,
         imp:importe,
         tot:total
      }
    });
  }
}
