import {
  CurrencyPipe,
  DatePipe,
  NgOptimizedImage,
  UpperCasePipe,
} from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listado-peliculas',
  imports: [
    MatButtonModule,
    MatIconModule,
    DatePipe,
    UpperCasePipe,
    CurrencyPipe,
    NgOptimizedImage,
    ListadoGenericoComponent,
  ],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.css',
})
export class ListadoPeliculasComponent {
  @Input({ required: true })
  peliculas!: any[];

  public agregarPeli(): void {
    this.peliculas.push({
      titulo: 'Oppenheimer 2',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster: '',
    });
  }

  public eliminarPelicula(peli: any): void {
    const indice = this.peliculas.findIndex(
      (peliculaActual: any) => peliculaActual.titulo == peli.titulo
    );
    this.peliculas.splice(indice, 1);
  }
}
