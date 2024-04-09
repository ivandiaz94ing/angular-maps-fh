import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import {Map, Marker} from 'mapbox-gl';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat? : [number, number];

  @ViewChild('map') divMap?: ElementRef;
  public map? : Map;
  public marker? : Marker;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if(!this.divMap?.nativeElement) throw "Map div not found";

    if(!this.lngLat) throw "lngLat can't be null";

    //mapa
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    })

    //lmarker
    this.addMarker(this.lngLat)
  }


  addMarker(lnlat : [number, number]){
    if(!this.map) return;

    const marker = new Marker({
      draggable: false
    })
    .setLngLat(lnlat)
    .addTo(this.map);

  }
}
