import { Component, inject, Inject } from '@angular/core';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActorCreacionDTO } from '../actores';
import { ActoresService } from '../actores-service.service';
import { Router } from '@angular/router';
import { obtenerErrores } from '../../compartidos/funciones/ObtenerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-actor',
  imports: [FormularioActoresComponent, MostrarErroresComponent],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css'
})
export class CrearActorComponent {
  //service:ActoresServiceService = Inject(ActoresServiceService);
  //router:Router = inject(Router);
  errores:string[] = [];

  constructor(
    private readonly service : ActoresService,
    private readonly router : Router
  ) {
    
    
  }

  public onFormSubmit(actor:ActorCreacionDTO){
    this.service.crear(actor).subscribe({
      next: () => { this.router.navigate(["/actores"])},
      error: (err) => {
        this.errores = obtenerErrores(err);
      }
    });
  }
}
