import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActorCreacionDTO, ActorDTO } from '../actores';
import { ActoresService } from '../actores-service.service';
import { Router } from '@angular/router';
import { obtenerErrores } from '../../compartidos/funciones/ObtenerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { LoadingGifComponent } from "../../compartidos/componentes/loading-gif/loading-gif.component";

@Component({
  selector: 'app-editar-actor',
  imports: [FormularioActoresComponent, MostrarErroresComponent, LoadingGifComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent implements OnInit{
  @Input({transform: numberAttribute})
  id!:number;

  public actor!: ActorDTO;
  public errores : string [] = [];

  constructor(
    private readonly actorService : ActoresService,
    private readonly router : Router
  ) {}
  
  ngOnInit(): void {
    this.actorService.obtenerPorId(this.id).subscribe(actor => {
      this.actor = actor;
    });
  }

  guardarCambios(actorEdicion:ActorCreacionDTO){
    this.actorService.actualizar(this.id,actorEdicion).subscribe({
      next: ()=>{ this.router.navigate(["/actores"]); },
      error: (err => this.errores = obtenerErrores(err))
    });
  }
}
