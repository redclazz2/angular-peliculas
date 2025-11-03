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
import { GeneroDTO } from '../../generos/generos';
import { PeliculaDTO } from '../peliculas';
import { GenerosService } from '../../generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import PaginacionDTO from '../../compartidos/models/PaginacionDTO';
import { debounceTime } from 'rxjs';

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
  paginacion: PaginacionDTO = {pagina: 1, recordsPorPagina: 10};
  cantidadTotalRegistros! : number;
  
  constructor(
    private readonly generosService: GenerosService,
    private readonly peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    this.generosService.obtenerTodos().subscribe((generos) => {
      this.generos = generos;

      this.leerValoresURL();
      this.buscarPeliculas(this.form.value as FiltroPeliculas);

      this.form.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe((valores) => {
        this.buscarPeliculas(valores as FiltroPeliculas);
        this.escribirParametrosBusquedaURL(valores as FiltroPeliculas);
      });
    });
  }

  buscarPeliculas(valores: FiltroPeliculas) {
    valores.pagina = this.paginacion.pagina;
    valores.recordsPorPagina = this.paginacion.recordsPorPagina;

    this.peliculasService.filtrar(valores).subscribe(respuesta => {
      this.peliculas = respuesta.body as PeliculaDTO[];
      const cabecera = respuesta.headers.get('cantidad-total-registros') as string;
      this.cantidadTotalRegistros = parseInt(cabecera,10);
    });
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

  generos!: GeneroDTO[];

  peliculas!: PeliculaDTO[];
}
