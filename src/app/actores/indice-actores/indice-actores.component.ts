import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActoresService } from '../actores-service.service';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/Proveedores';

@Component({
  selector: 'app-indice-actores',
  imports: [ MatButtonModule, MatTableModule, SweetAlert2Module, IndiceEntidadComponent],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService }
  ]
})
export class IndiceActoresComponent{}
