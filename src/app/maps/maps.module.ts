import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken= 'pk.eyJ1IjoiaWFkaWF6IiwiYSI6ImNsdWp6cGtiZzBnOWwybG82dThhNzg4eGsifQ.ReBNXF9AuEXaf96QH4y5Vg';




@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
