import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActoresService } from '../actores-service.service';
import PaginacionDTO from '../../compartidos/models/PaginacionDTO';
import { ActorDTO } from '../actores';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-indice-actores',
  imports: [RouterLink, MatButtonModule, MatTableModule, SweetAlert2Module,MatPaginator],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css'
})
export class IndiceActoresComponent implements OnInit{
  public actores!: ActorDTO[];
  public paginacion: PaginacionDTO = {
    pagina: 1,
    recordsPorPagina: 2
  };
  public cantidadTotalRegistros!:number;
  public columnas:string[] = ['foto','id','nombre','fechaNacimiento','accion'];
  
  constructor(
    private readonly actoresService : ActoresService
  ) {}

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  private obtenerRegistros():void{
    this.actoresService.obtenerPaginados(this.paginacion).subscribe(resp => {
      this.cantidadTotalRegistros = parseInt(resp.headers.get('cantidad-total-registros') as string);
      
      if(resp.body){
        this.actores = resp.body;
      }else{
        this.actores = [];
      }
    });
  }

  public actualizarPaginacion(datos: PageEvent):void{
    this.paginacion = {
      pagina : datos.pageIndex + 1,
      recordsPorPagina: datos.pageSize
    };

    this.obtenerRegistros();
  }

  public borrar(id:number):void{
    this.actoresService.borrar(id).subscribe({
      next: () => this.obtenerRegistros()
    });
  }
}
