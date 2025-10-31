import { Component, inject, Input } from '@angular/core';
import PaginacionDTO from '../../models/PaginacionDTO';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/Proveedores';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoadingGifComponent } from '../loading-gif/loading-gif.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SerivicioCRUD } from '../../interfaces/ServicioCRUD';

@Component({
  selector: 'app-indice-entidad',
  imports: [
    LoadingGifComponent,
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    SweetAlert2Module,
  ],
  templateUrl: './indice-entidad.component.html',
  styleUrl: './indice-entidad.component.css',
})
export class IndiceEntidadComponent<T,C> {
  @Input({ required: true })
  public title!: string;

  @Input({ required: true })
  public rutaCrear!: string;

  @Input({ required: true })
  public rutaEditar!: string;

  @Input()
  columnasAMostrar: string[] = ['id', 'nombre', 'acciones'];

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as SerivicioCRUD<T,C>;

  paginacion: PaginacionDTO = { pagina: 1, recordsPorPagina: 3 };
  entidades: T[] = [];
  totalRegistros: number = 0;

  constructor() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.servicioCRUD
      .obtenerPaginados(this.paginacion)
      .subscribe((resp: HttpResponse<T[]>) => {
        this.totalRegistros = parseInt(
          resp.headers.get('cantidad-total-registros') as string
        );

        if (resp.body) {
          this.entidades = resp.body;
        } else {
          this.entidades = [];
        }
      });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = {
      pagina: datos.pageIndex + 1,
      recordsPorPagina: datos.pageSize,
    };

    this.cargarRegistros();
  }

  borrar(id: number) {
    this.servicioCRUD.borrar(id).subscribe(() => {
      this.paginacion = { pagina: 1, recordsPorPagina: 3 };
      this.cargarRegistros();
    });
  }
}
