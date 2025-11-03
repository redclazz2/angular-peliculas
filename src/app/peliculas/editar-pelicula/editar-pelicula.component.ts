import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO, PeliculasPutGetDTO } from '../peliculas';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { ActorAutoCompleteDTO } from '../../actores/actores';
import { PeliculasService } from '../peliculas.service';
import { MostrarErroresComponent } from '../../compartidos/componentes/mostrar-errores/mostrar-errores.component';
import { Router } from '@angular/router';
import { obtenerErrores } from '../../compartidos/funciones/ObtenerErrores';
import { LoadingGifComponent } from '../../compartidos/componentes/loading-gif/loading-gif.component';

@Component({
  selector: 'app-editar-pelicula',
  imports: [
    FormularioPeliculasComponent,
    MostrarErroresComponent,
    LoadingGifComponent,
  ],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css',
})
export class EditarPeliculaComponent implements OnInit {
  @Input({ transform: numberAttribute })
  id!: number;

  pelicula!: PeliculaDTO;
  generosSeleccionados!: SelectorMultipleDTO[];
  generosNoSeleccionados!: SelectorMultipleDTO[];
  cinesSeleccionados!: SelectorMultipleDTO[];
  cinesNoSeleccionados!: SelectorMultipleDTO[];
  actoresSeleccionados!: ActorAutoCompleteDTO[];

  errors: string[] = [];

  constructor(
    private readonly peliculasService: PeliculasService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.peliculasService.actualizarGet(this.id).subscribe((modelo:PeliculasPutGetDTO) => {
      this.pelicula = modelo.pelicula;
      this.actoresSeleccionados = modelo.actores;

      this.cinesNoSeleccionados = modelo.cinesNoSeleccionados.map((cine) => {
        return <SelectorMultipleDTO>{
          llave: cine.id,
          valor: cine.nombre,
        };
      });

      this.cinesSeleccionados = modelo.cinesSeleccionados.map((cine) => {
        return <SelectorMultipleDTO>{
          llave: cine.id,
          valor: cine.nombre,
        };
      });

      this.generosNoSeleccionados = modelo.generosNoSeleccionados.map(
        (genero) => {
          return <SelectorMultipleDTO>{
            llave: genero.id,
            valor: genero.nombre,
          };
        }
      );

      this.generosSeleccionados = modelo.generosSeleccionados.map((genero) => {
        return <SelectorMultipleDTO>{
          llave: genero.id,
          valor: genero.nombre,
        };
      });
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.actualizar(this.id, pelicula).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errors = obtenerErrores(err);
      },
    });
  }
}
