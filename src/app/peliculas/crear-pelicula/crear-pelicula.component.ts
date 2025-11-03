import { Component } from '@angular/core';
import { PeliculaCreacionDTO } from '../peliculas';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { ActorAutoCompleteDTO } from '../../actores/actores';
import { PeliculasService } from '../peliculas.service';
import { Router } from '@angular/router';
import { obtenerErrores } from '../../compartidos/funciones/ObtenerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { LoadingGifComponent } from "../../compartidos/componentes/loading-gif/loading-gif.component";

@Component({
  selector: 'app-crear-pelicula',
  imports: [FormularioPeliculasComponent, MostrarErroresComponent, LoadingGifComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css',
})
export class CrearPeliculaComponent {
  generosSeleccionados: SelectorMultipleDTO[] = [];
  generosNoSeleccionados: SelectorMultipleDTO[] = [];

  cinesSeleccionados: SelectorMultipleDTO[] = [];
  cinesNoSeleccionados: SelectorMultipleDTO[] = [];

  actoresSeleccionados: ActorAutoCompleteDTO[] = [];

  errores : string[] = [];

  constructor(
    private readonly peliculasService: PeliculasService,
    private readonly router : Router
  ) {
    this.peliculasService.crearGet().subscribe((modelo) => {
      this.generosNoSeleccionados = modelo.generos.map((genero) => {
        return <SelectorMultipleDTO>{
          llave: genero.id,
          valor: genero.nombre,
        };
      });

      this.cinesNoSeleccionados = modelo.cines.map((cine) => {
        return <SelectorMultipleDTO>{
          valor: cine.nombre,
          llave: cine.id,
        };
      });
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService
      .crear(pelicula)
      .subscribe({ next: (pelicula) => {
        console.log(pelicula);
        this.router.navigate(['/']);
      }, error: (err) => {
        const error = obtenerErrores(err);
        this.errores = error;
      } });
  }
}
