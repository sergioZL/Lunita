import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarraLateralComponent } from './shared/barra-lateral/barra-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
//Angular material
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
//Componentes
import { FooterComponent } from './shared/footer/footer.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { RepartidoresComponent } from './components/repartidores/repartidores.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { IniciarComponent } from './components/iniciar/iniciar.component';
import { ProductosComponent } from './components/inventario/productos/productos.component';
import { RegProductosComponent } from './components/inventario/reg-productos/reg-productos.component';
import { EditProductosComponent } from './components/inventario/edit-productos/edit-productos.component';
import { BuscarPorComponent } from './components/inventario/buscar-por/buscar-por.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraLateralComponent,
    FooterComponent,
    InventarioComponent,
    RepartidoresComponent,
    VentasComponent,
    ReportesComponent,
    IniciarComponent,
    ProductosComponent,
    RegProductosComponent,
    EditProductosComponent,
    BuscarPorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
