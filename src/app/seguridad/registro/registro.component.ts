import { Component, inject } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { Router } from '@angular/router';
import { CredencialesUsuarioDTO } from '../seguridad';
import { extraerErroresIdentity } from '../../compartidos/funciones/ObtenerErrores';
import { FormularioAutenticacionComponent } from "../formulario-autenticacion/formulario-autenticacion.component";

@Component({
  selector: 'app-registro',
  imports: [FormularioAutenticacionComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  seguridadService: SeguridadService = inject(SeguridadService);
  router = inject(Router);
  errores: string[] = [];

  registrar(credenciales: CredencialesUsuarioDTO) {
    this.seguridadService.registrar(credenciales).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        let e = extraerErroresIdentity(err);
        this.errores = e;
      },
    });
  }
}
