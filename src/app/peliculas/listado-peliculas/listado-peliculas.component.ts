import {
  CurrencyPipe,
  DatePipe,
  NgOptimizedImage,
  UpperCasePipe,
} from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  imports: [
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    ListadoGenericoComponent,
    RouterLink,
    SweetAlert2Module
  ],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.css',
})
export class ListadoPeliculasComponent {
  @Input({ required: true })
  peliculas!: any[];

  @Output()
  borrado = new EventEmitter<void>();

  peliculaService = inject(PeliculasService);

  borrar(id:number){
    this.peliculaService.borrar(id).subscribe(
      () => this.borrado.emit()
    );
  }
}
