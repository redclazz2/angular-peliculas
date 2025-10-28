import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from '../formulario-peliculas/formulario-peliculas.component';

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
}
