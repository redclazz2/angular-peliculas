import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";
import { CinesService } from '../cines.service';
import { EditarEntidadComponent } from '../../compartidos/componentes/editar-entidad/editar-entidad.component';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/Proveedores';

@Component({
  selector: 'app-editar-cine',
  imports: [EditarEntidadComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css',
  providers: [{
    provide: SERVICIO_CRUD_TOKEN ,useClass: CinesService
  }]
})
export class EditarCineComponent {
  @Input({transform: numberAttribute})
  id!:number;

  formulario = FormularioCinesComponent;
}
