import { Component, ElementRef, ViewChild } from '@angular/core';

import {Map, LngLat, Marker} from 'mapbox-gl'

interface MarkerAndColor {
  color : string,
  marker : Marker
}

interface PlainMarker{
  color : string,
  lngLat : number[],
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;
  public map? : Map;
  public currentLatLng : LngLat = new LngLat(-73.24637359556851, 10.465974426338335);
  public markers : MarkerAndColor[] = [];



  ngAfterViewInit(): void {

    if (!this.divMap) throw('El elemento HTML no fué encontrado')
     this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLatLng, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'Ivan Arturo';

    // const marker  = new Marker({
    //   // color: 'red'
    //   element: markerHTML
    // })
    // .setLngLat(this.currentLatLng)
    // .addTo(this.map);

    this.readFromLocalStorage();
  }

  createMarker(){
    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);

  }


  addMarker(lnlat : LngLat , color: string){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat(lnlat)
    .addTo(this.map);

    this.markers.push({marker, color});
    this.saveLocalStorage();

    marker.on('dragend', (ev) =>{
      // console.log(marker.getLngLat());
      console.log({ev});
      this.saveLocalStorage();
    })
  }

  deleteMarker(index : number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveLocalStorage();
  }

  flyTo(marker :  Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

saveLocalStorage(){
  const plainMarkers : PlainMarker[] = this.markers.map( ( { color, marker } ) =>{
    return{
      color,
      lngLat: marker.getLngLat().toArray()
    }
  });
  localStorage.setItem('puntos', JSON.stringify(plainMarkers));
}

readFromLocalStorage(){
  const plainMarkersString = localStorage.getItem('puntos') ?? '[]';
  const plainMarkers : PlainMarker[] = JSON.parse(plainMarkersString);

  plainMarkers.forEach( ({color, lngLat} ) => {
    const [lng, lat] = lngLat;
    const coords = new LngLat(lng,lat);

    this.addMarker(coords,color);
  });
}


}
