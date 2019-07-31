import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './components/inventario/inventario.component';
import { RepartidoresComponent } from './components/repartidores/repartidores.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ReportesComponent } from './components/reportes/reportes.component';


const routes: Routes = [
  {
    path:'inventario',
    component:InventarioComponent
  },
  {
    path:'repartidores',
    component:RepartidoresComponent
  },
  {
    path:'ventas',
    component:VentasComponent
  },
  {
    path:'reportes',
    component:ReportesComponent
  },
  { path: '',
    redirectTo: '/inventario',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
