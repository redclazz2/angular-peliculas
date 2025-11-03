import { Component, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from "../peliculas/listado-peliculas/listado-peliculas.component";
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  imports: [ListadoPeliculasComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent{
  peliculasEnCines!: any[];
  peliculasEstrenos!: any[];

  constructor(
    private readonly peliculasService : PeliculasService
  ) {
    this.peliculasService.obtenerLandingPage().subscribe(result =>{
      this.peliculasEnCines = result.enCines;
      this.peliculasEstrenos = result.proximosEstrenos;
    })
  }
}
