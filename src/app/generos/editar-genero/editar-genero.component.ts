import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { GeneroCreacionDTO, GeneroDTO } from '../generos';
import { Router } from '@angular/router';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { GenerosService } from '../generos.service';
import { LoadingGifComponent } from "../../compartidos/componentes/loading-gif/loading-gif.component";
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { obtenerErrores } from '../../compartidos/funciones/ObtenerErrores';

@Component({
  selector: 'app-editar-genero',
  imports: [FormularioGeneroComponent, LoadingGifComponent, MostrarErroresComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css',
})
export class EditarGeneroComponent implements OnInit {
  ngOnInit(): void {
    this.generoService.obtenerPorId(this.id).subscribe(genero => 
      this.genero = genero
    );
  }

  @Input({ transform: numberAttribute })
  id!: number;

  private router = inject(Router);
  private generoService = inject(GenerosService);
  genero?:GeneroDTO;
  errores:string[]= [];

  public guardarCambios(genero: GeneroCreacionDTO) {
    this.generoService.actualizar(this.id,genero).subscribe(
      {
        next: () => this.router.navigate(['generos']),
        error: err => { this.errores = obtenerErrores(err);}
      }
    );
  }
}
