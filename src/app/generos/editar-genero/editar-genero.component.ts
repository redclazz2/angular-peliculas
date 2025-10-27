import { Component, inject, Input, numberAttribute } from '@angular/core';
import { GeneroCreacionDTO, GeneroDTO } from '../generos';
import { Router } from '@angular/router';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';

@Component({
  selector: 'app-editar-genero',
  imports: [FormularioGeneroComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css',
})
export class EditarGeneroComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  private router = inject(Router);

  public genero:GeneroDTO = {
    id: 1,
    nombre: 'Accion'
  };
  
  public guardarCambios(genero: GeneroCreacionDTO) {
    console.log(genero);
    this.router.navigate(['generos']);
  }
}
