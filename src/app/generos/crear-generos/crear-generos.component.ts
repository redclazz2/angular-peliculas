import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import {GeneroCreacionDTO} from "../generos";

@Component({
  selector: 'app-crear-generos',
  imports: [FormularioGeneroComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.css'
})

export class CrearGenerosComponent {
  private router:Router = inject(Router);
  
  public guardarCambios(genero: GeneroCreacionDTO){
    console.log(genero);
    this.router.navigate(['generos']);
  }
}
