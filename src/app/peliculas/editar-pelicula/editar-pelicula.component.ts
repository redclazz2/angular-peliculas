import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { ActorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css',
})
export class EditarPeliculaComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  pelicula: PeliculaDTO = {
    id: 1,
    titulo: 'spider-man',
    trailer: 'abc',
    fechaLanzamiento: new Date('2018-07-18'),
    poster:
      'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg',
  };
  guardarCambios(pelicula: PeliculaCreacionDTO) {
    console.log('editando peli', pelicula);
  }

  generosSeleccionados: SelectorMultipleDTO[] = [{ llave: 1, valor: 'Accion' }];
  generosNoSeleccionados: SelectorMultipleDTO[] = [
    { llave: 2, valor: 'Drama' },
    { llave: 3, valor: 'Comedia' },
  ];

  cinesSeleccionados: SelectorMultipleDTO[] = [{ llave: 1, valor: 'Caracoli' }];
  cinesNoSeleccionados: SelectorMultipleDTO[] = [
    { llave: 2, valor: 'Cacique' },
    { llave: 3, valor: 'Cabecera' },
  ];

  actoresSeleccionados: ActorAutoCompleteDTO[] = [
    {
      id: 1,
      nombre: 'Tom Holland',
      personaje: 'Spider-Man',
      foto: 'https://duckduckgo.com/i/e4403d588fa1ce92.jpg',
    },
    {
      id: 2,
      nombre: 'Zendaya',
      personaje: 'Mary Jane',
      foto: 'https://duckduckgo.com/i/f99117254b2fa3c4.jpg',
    },
  ];
}
