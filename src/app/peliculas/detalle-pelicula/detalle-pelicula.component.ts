import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../peliculas';
import { Router, RouterLink } from '@angular/router';
import { LoadingGifComponent } from '../../compartidos/componentes/loading-gif/loading-gif.component';
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordenada } from '../../compartidos/componentes/mapa/Coordenada';
import { MapaComponent } from '../../compartidos/componentes/mapa/mapa.component';
import { RatingService } from '../../rating/rating.service';
import Swal from 'sweetalert2';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { RatingComponent } from "../../compartidos/componentes/rating/rating.component";

@Component({
  selector: 'app-detalle-pelicula',
  imports: [
    LoadingGifComponent,
    DatePipe,
    MatChipsModule,
    RouterLink,
    MapaComponent,
    RatingComponent
],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css',
})
export class DetallePeliculaComponent implements OnInit {
  @Input({ transform: numberAttribute })
  public id!: number;

  public pelicula!: PeliculaDTO;
  public trailerURL!: SafeResourceUrl;
  public coordenadas: Coordenada[] = [];

  constructor(
    private readonly router: Router,
    private readonly peliculasService: PeliculasService,
    private readonly sanitizer: DomSanitizer,
    private readonly ratingsService: RatingService,
    private readonly seguridadService : SeguridadService
  ) {}

  ngOnInit(): void {
    this.peliculasService.obtenerPorId(this.id).subscribe({
      next: (pelicula) => {
        this.pelicula = pelicula;
        this.pelicula.fechaLanzamiento = new Date(
          this.pelicula.fechaLanzamiento
        );
        this.trailerURL = this.generarURLYoutube(pelicula.trailer);
        if (pelicula.cines)
          this.coordenadas = pelicula.cines.map<Coordenada>(
            (c) =>
              <Coordenada>{
                latitud: c.latitud,
                longitud: c.longitud,
                texto: c.nombre,
              }
          );
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }

  generarURLYoutube(url: string): SafeResourceUrl | string {
    if (!url) {
      return '';
    }

    var video = url.split('v=')[1];
    var posicionAmpersand = video.indexOf('&');

    if (posicionAmpersand! == -1) {
      video = video.substring(0, posicionAmpersand);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video}`
    );
  }

  puntuar(puntuacion: number) {
    if(!this.seguridadService.estaLogueado()){
      Swal.fire('Error', 'Debes iniciar sesión para votar por una pelicula', 'error');
    }

    this.ratingsService.puntuar(this.id, puntuacion).subscribe({
      next: () => {
        Swal.fire('Exitoso', 'Su voto ha sido recibido.', 'success');
      },
    });
  }
}
