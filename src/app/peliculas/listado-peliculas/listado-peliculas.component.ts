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
    NgOptimizedImage,
    ListadoGenericoComponent,
  ],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.css',
})
export class ListadoPeliculasComponent {
  @Input({ required: true })
  peliculas!: any[];
}
