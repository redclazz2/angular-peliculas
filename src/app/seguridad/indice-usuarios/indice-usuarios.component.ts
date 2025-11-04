import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import PaginacionDTO from '../../compartidos/models/PaginacionDTO';
import { UsuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-usuarios',
  imports: [RouterLink, MatButtonModule, MatTableModule, ListadoGenericoComponent, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-usuarios.component.html',
  styleUrl: './indice-usuarios.component.css'
})
export class IndiceUsuariosComponent {
  columnasAMostrar = ['email','acciones'];
  paginacion: PaginacionDTO = {
    pagina: 1,
    recordsPorPagina: 10
  };
  cantidadTotalRegistros ! : number;

  usuarios ! :UsuarioDTO[];

  servicioSeguridad = inject(SeguridadService);

  constructor() {
    this.cargarRegistros();  
  }

  cargarRegistros(){
    this.servicioSeguridad.obtenerUsuariosPaginado(this.paginacion).subscribe(
      rta => {
        this.usuarios = rta.body as UsuarioDTO[];
        const cabecera =  rta.headers.get("cantidad-total-registros") as string;
        this.cantidadTotalRegistros = parseInt(cabecera,10);
      }
    );
  }

  actualizarPaginacion(datos:PageEvent){
    this.paginacion = {
      pagina: datos.pageIndex + 1,
      recordsPorPagina: datos.pageSize
    }
  }

  hacerAdmin(email : string){
    this.servicioSeguridad.hacerAdmin(email).subscribe({
      next: () => Swal.fire('Exitoso', 'El usuario ahora es admin.', 'success'),
      error: () => Swal.fire('Error', 'Algo ha ido mal', 'error'),
    });
  }

  removerAdmin(email : string){
    this.servicioSeguridad.removerAdmin(email).subscribe({
      next: () => Swal.fire('Exitoso', 'El usuario ya no es admin.', 'success'),
      error: () => Swal.fire('Error', 'Algo ha ido mal', 'error'),
    });
  }
}
