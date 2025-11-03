import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { icon, latLng, LeafletMouseEvent, MapOptions, marker, Marker, MarkerOptions, tileLayer } from 'leaflet';
import { Coordenada } from './Coordenada';

@Component({
  selector: 'app-mapa',
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {
  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
      const marcador =marker([valor.latitud,valor.longitud])

      return marcador;
    });
  }

  @Input()
  coordenadasIniciales: Coordenada[] = [];

  @Input()
  soloLectura : boolean = false;

  @Output()
  coordenadaSeleccionada = new EventEmitter<Coordenada>();

  markerOptions : MarkerOptions = {
    icon: icon({
      iconSize: [25,41],
      iconAnchor: [13,41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  };
  
  options : MapOptions = {
    layers : [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 14,
    //7.07195918466638, -73.10491418747604
    center: latLng(7.07195918466638,-73.10491418747604)
  }

  capas:Marker<any>[] = [];

  manejarClick(event:LeafletMouseEvent){
    if(this.soloLectura){
      return;
    }

    this.capas = [];

    this.capas.push(
      marker([event.latlng.lat,event.latlng.lng], this.markerOptions)
    );

    this.coordenadaSeleccionada.emit({
      latitud:event.latlng.lat,
      longitud: event.latlng.lng
    })
  }
}
