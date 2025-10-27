import { Component, Input, numberAttribute } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";

@Component({
  selector: 'app-editar-cine',
  imports: [FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent {
  @Input({transform: numberAttribute})
  id!:number;

  cine:CineDTO = {
    id: 1,
    nombre : "Caracoli"
  }

  guardarCambios(cine:CineCreacionDTO){
    console.log("Editando", cine);
  }
}
