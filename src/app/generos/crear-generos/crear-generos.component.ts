import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { GeneroCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';
import { obtenerErrores } from '../../compartidos/funciones/ObtenerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-generos',
  imports: [FormularioGeneroComponent, MostrarErroresComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.css',
})
export class CrearGenerosComponent {
  private router: Router = inject(Router);
  private generosService: GenerosService = inject(GenerosService);
  public errores: string[] = [];

  public guardarCambios(genero: GeneroCreacionDTO) {
    this.generosService
      .crearGenero(genero)
      .subscribe({
        next: () => this.router.navigate(['/generos']),
        error: err => { 
          const errores = obtenerErrores(err);
          this.errores = errores;
         }
      });
  }
}
