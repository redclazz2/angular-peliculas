import { Component, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from "../peliculas/listado-peliculas/listado-peliculas.component";
import { PeliculasService } from '../peliculas/peliculas.service';
import { AutorizadoComponent } from "../seguridad/autorizado/autorizado.component";
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-landing-page',
  imports: [ListadoPeliculasComponent, AutorizadoComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent{
  peliculasEnCines!: any[];
  peliculasEstrenos!: any[];

  constructor(
    private readonly peliculasService : PeliculasService
  ) {
    this.cargarPeliculas();
  }

  public peliculaBorrada(){
    this.cargarPeliculas();
  }

  private cargarPeliculas(){
    this.peliculasService.obtenerLandingPage().subscribe(result =>{
      this.peliculasEnCines = result.enCines;
      this.peliculasEstrenos = result.proximosEstrenos;
    })
  }
}
