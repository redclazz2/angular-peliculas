import { Component } from '@angular/core';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";
import { CineCreacionDTO, CineDTO } from '../cines';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/Proveedores';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  imports: [ CrearEntidadComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}
  ]
})
export class CrearCineComponent {
  formulario = FormularioCinesComponent;
}
