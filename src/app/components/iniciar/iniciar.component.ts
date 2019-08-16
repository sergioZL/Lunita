/**
 * autor:  Sergio Zermeño López 
 * fecha:   5/8/2019
 * proyecto: Este es un componente del proyecto Lunita (proyecto final de programación de quinto 
 *           cuatrimestre)
 * 
 */

import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsuariosServiceService } from "../../services/usuarios-service.service";

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.css']
})
export class IniciarComponent implements OnInit {
  
  @Input() valor:boolean ;//Este es un balor enviado por el componente padre que valida si el usuario tiene sesion avierta
  mensaje:string = '';//Es el mensaje que se le mostrara al usuario una vez que inicie sesion
  @Output() open = new EventEmitter();//Es es un evento que se envia al componente padre y sirve para iniciar sesion
  logear:boolean = true;//sirve para indicar si el usuario tiene cuenta o requiere crear una
  usuarior = null; //objeto que contendra los datos de usuario recibidos del servidor
  usuario ={//contiene los datos ingresados por el usuario en el formulario
    id:'',
    nombre : '',
    contrasena:'',
    horaEntrada: ''
  }
  segundacontrasena:'';//sirve para validar la contraseña ingresada por el usuario al registrarse
  constructor(private localstorageServicio: LocalStorageService,private usuariosService:UsuariosServiceService) { }

  ngOnInit() {
    console.log(this.valor);
  }
  /**
   * Logear usuario
   */
  Ingresar(){
    
    this.usuariosService.log(this.usuario).subscribe(result=>{
      if(result != null){  
      if(result['resultado'] == 'OK'){
          alert(result['mensaje'])
        }else { 
          this.usuarior = result[0];
          this.usuario.nombre = this.usuarior.nombre;
          this.usuario.id = this.usuarior.id;
          this.usuario.contrasena = this.usuarior.contrasena;
          let actual = new Date();
          actual.setHours(actual.getHours()+5);//Comentar estas lineas antes de jenerar el dist
          actual
          this.usuario.horaEntrada = actual.getFullYear()+'-'+(actual.getMonth()+1)+'-'+actual.getDate()+' '+actual.getHours()+':'+actual.getMinutes()+':'+actual.getSeconds();          
          this.guardar_localStorage();
          this.mensaje = 'Bien venido '+this.usuario.nombre;
          this.open.emit(this.mensaje);
        }
      }else alert('Nombre de usuario y/o contraseña incorrectos');
    });
  }
  /**
   * Registra un nuevo usuario
   */
  Registrar(){
    if( this.usuario.nombre == '' || this.usuario.contrasena == '' || this.segundacontrasena =='' ){
      alert('Los campos estan vacios');
    } else if(this.validar()){
      this.usuariosService.alta(this.usuario).subscribe(result=>{
        if(result['resultado']=='OK'){
          this.Ingresar();
            this.mensaje += 'Su cuenta a sido añadida con exito '+this.usuario.nombre;
            this.open.emit(this.mensaje);
        }else alert(result['mensaje']);
      })

    }else{
      alert('Las contraseñas no coinsiden');
    }
  }
  /**
   * Valida que las contraseñas ingresadas en los campos de contraseñas
   * coinsidan
   */
  validar(){
    if(this.usuario.contrasena == this. segundacontrasena){
      return true;
    }else return false;
  }
  /**
   * El sigiente metodo guarda los datos de la session en el localstorage para 
   * que puedan se usados en el resto de la aplicacción
   */
  guardar_localStorage(){
     if( this.usuario.nombre!='' && this.usuario.contrasena!='' ){
      this.localstorageServicio.guardar_localstorage(this.usuario);
      return true;
    }else{
      alert('Llene los campos correspondientes primero');
      return false;
    }
  }
}
