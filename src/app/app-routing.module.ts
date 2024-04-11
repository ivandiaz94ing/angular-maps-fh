import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from './maps/layout/maps-layout/maps-layout.component';

const routes: Routes = [
  {
    path: 'maps',
    loadChildren:() => import('./maps/maps.module').then(m => m.MapsModule),
  },
  {
    path: 'alone',
    loadComponent: ()=> import('./alone/pages/alone-page/alone-page.component')
    .then(m => m.AlonePageComponent),
  },
  {path: '**', redirectTo:'maps'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
