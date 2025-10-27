import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActorCreacionDTO, ActorDTO } from '../actores';

@Component({
  selector: 'app-editar-actor',
  imports: [FormularioActoresComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent {
  @Input({transform: numberAttribute})
  id!:number;

  public actor: ActorDTO = {
    id:1,
    nombre: "Tom Holland",
    fechaNacimiento: new Date(1991,0,25)
  };

  guardarCambios(actorEdicion:ActorCreacionDTO){
    console.log(`Editanto actor: ${actorEdicion.nombre}`);
  }
}
