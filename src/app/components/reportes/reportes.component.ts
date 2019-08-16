import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { ReportesService } from '../../services/reportes.service';
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor( private dialogService:DialogService, 
               private servicioReportes:ReportesService,
               private localservicio:LocalStorageService ) { }

  ngOnInit() {
  }

  cortarCaja(){
    
    let usuario =this.localservicio.obtener_localstorage();
    let actual = new Date();
    actual.setHours(actual.getHours()+5);
    let inicio;
    inicio = usuario.horaEntrada;
    let fechas = {
      inicio:inicio,
      fin:actual.getFullYear()+'-'+(actual.getMonth()+1)+'-'+actual.getDate()+' '+actual.getHours()+':'+actual.getMinutes()+':'+actual.getSeconds()
    };
    this.servicioReportes.corteReport(fechas).subscribe(response=>{
      console.log(response);
      this.dialogService.abrirCorte(usuario.nombre,inicio,actual,response['totalEntradas'],response['totalSalidas'],response['totalventas']);
      usuario.horaEntrada = fechas.fin;
      this.localservicio.borrar_localstorage();
      this.localservicio.guardar_localstorage(usuario);
      
    });
  }

}
