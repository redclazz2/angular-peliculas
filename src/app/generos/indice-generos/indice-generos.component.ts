import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { environment } from '../../../environments/environment.development';
import { MatTableModule } from "@angular/material/table";
import { GeneroDTO } from '../generos';
import { MatInputModule } from '@angular/material/input';
import PaginacionDTO from '../../compartidos/models/PaginacionDTO';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-indice-generos',
  imports: [
    RouterLink, 
    MatButtonModule, 
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    SweetAlert2Module
  ],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {
  generosService = inject(GenerosService);
  production = environment.production;
  generos:GeneroDTO[] = [];
  columnas = ['id','nombre','accion'];
  paginacion : PaginacionDTO = {pagina: 1, recordsPorPagina: 3};
  cantidadTotalRegistros!:number;

  constructor(){
    this.obtenerGeneros();
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = {
      pagina: datos.pageIndex + 1,
      recordsPorPagina: datos.pageSize
    }

    this.obtenerGeneros();
  }

  private obtenerGeneros(){
    this.generosService.obtenerPaginados(this.paginacion).subscribe(resp => {
      //console.log(generos)
      //console.log(this.production)
      
      this.cantidadTotalRegistros = parseInt(resp.headers.get('cantidad-total-registros') as string);

      if(resp.body){
        this.generos = resp.body;
      }else{
        this.generos = [];
      }
    });
  }

  borrar(id:number){
    this.generosService.borrar(id).subscribe(
      ()=>{
        this.paginacion = {pagina: 1, recordsPorPagina: 3}
        this.obtenerGeneros();
      }
    );
  }
}
