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
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/Proveedores';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";

@Component({
  selector: 'app-indice-generos',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    SweetAlert2Module,
    IndiceEntidadComponent
],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css',
  providers:[
    {provide : SERVICIO_CRUD_TOKEN, useClass: GenerosService}
  ]
})
export class IndiceGenerosComponent {

}
