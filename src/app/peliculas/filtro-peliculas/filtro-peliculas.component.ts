import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListadoPeliculasComponent } from '../listado-peliculas/listado-peliculas.component';
import { FiltroPeliculas } from './filtroPelicula';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  imports: [
    MatButtonModule,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ListadoPeliculasComponent,
  ],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css',
})
export class FiltroPeliculasComponent implements OnInit {
  ngOnInit(): void {
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value as FiltroPeliculas);

    this.form.valueChanges.subscribe((valores) => {
      this.peliculasFiltradas = this.peliculasOG;
      this.buscarPeliculas(valores as FiltroPeliculas);
      this.escribirParametrosBusquedaURL(valores as FiltroPeliculas);
    });
  }

  buscarPeliculas(valores: FiltroPeliculas) {
    if (valores.titulo) {
      this.peliculasFiltradas = this.peliculasFiltradas.filter(
        (peli) => peli.titulo.indexOf(valores.titulo) !== -1
      );
    }

    if (valores.generoId !== 0) {
      this.peliculasFiltradas = this.peliculasFiltradas.filter(
        (peli) => peli.generos.indexOf(valores.generoId) !== -1
      );
    }

    if (valores.proximosEstrenos) {
      this.peliculasFiltradas = this.peliculasFiltradas.filter(
        (peli) => peli.proximosEstrenos
      );
    }

    if (valores.enCines) {
      this.peliculasFiltradas = this.peliculasFiltradas.filter(
        (peli) => peli.enCines
      );
    }
  }

  escribirParametrosBusquedaURL(valores: FiltroPeliculas) {
    let queryStrings = [];

    if (valores.titulo) {
      queryStrings.push(`titulo=${encodeURIComponent(valores.titulo)}`);
    }

    if (valores.generoId !== 0) {
      queryStrings.push(`generoId=${valores.generoId}`);
    }

    if (valores.proximosEstrenos) {
      queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`);
    }

    if (valores.enCines) {
      queryStrings.push(`enCines=${valores.enCines}`);
    }

    this.location.replaceState('peliculas/filtrar', queryStrings.join('&'));
  }

  leerValoresURL() {
    this.activedRoute.queryParams.subscribe((params: any) => {
      var objeto: any = {};
      if (params.titulo) {
        objeto.titulo = params.titulo;
      }

      if (params.generoId) {
        objeto.generoId = Number(params.generoId);
      }

      if (params.proximosEstrenos) {
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if (params.enCines) {
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    });
  }

  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private activedRoute = inject(ActivatedRoute);

  form = this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  });

  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Acción' },
    { id: 3, nombre: 'Comedia' },
  ];

  peliculasOG = [
    {
      titulo: 'Inside Out 2',
      fechaLanzamiento: new Date(),
      precio: 1400.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832',
      generos: [1, 2, 3],
      enCines: true,
      proximosEstrenos: false,
    },
    {
      titulo: 'Moana 2',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg',
      generos: [1],
      enCines: false,
      proximosEstrenos: true,
    },
    {
      titulo: 'Bad Boys: Ride or Die',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/8/8b/Bad_Boys_Ride_or_Die_%282024%29_poster.jpg',
      generos: [1, 2],
      enCines: false,
      proximosEstrenos: true,
    },
    {
      titulo: 'Deadpool & Wolverine',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Deadpool_%26_Wolverine_poster.jpg/220px-Deadpool_%26_Wolverine_poster.jpg',
      generos: [3],
      enCines: true,
      proximosEstrenos: false,
    },
    {
      titulo: 'Oppenheimer',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg',
      generos: [2],
      enCines: false,
      proximosEstrenos: true,
    },
    {
      titulo: 'The Flash',
      fechaLanzamiento: new Date('2016-05-03'),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/The_Flash_%28film%29_poster.jpg/220px-The_Flash_%28film%29_poster.jpg',
      generos: [1],
      enCines: true,
      proximosEstrenos: false,
    },
  ];

  peliculasFiltradas: any[] = this.peliculasOG;
}
