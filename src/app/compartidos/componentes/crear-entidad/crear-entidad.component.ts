import { AfterViewInit, Component, ComponentRef, inject, Input, model, ViewChild, ViewContainerRef } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/Proveedores';
import { SerivicioCRUD } from '../../interfaces/ServicioCRUD';
import { Router } from '@angular/router';
import { obtenerErrores } from '../../funciones/ObtenerErrores';
import { MostrarErroresComponent } from "../mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-entidad',
  imports: [MostrarErroresComponent],
  templateUrl: './crear-entidad.component.html',
  styleUrl: './crear-entidad.component.css'
})
export class CrearEntidadComponent<T, C> implements AfterViewInit{
  @Input({ required: true })
  public titulo!: string;

  @Input({ required: true })
  public rutaIndice!: string;

  @Input({ required: true })
  formulario: any;

  errores: string[] = [];

  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    this.componentRef = this.contenedorFormulario.createComponent(
      this.formulario
    )
    this.componentRef.instance.onFormValidationSuccess.subscribe((modelo:any) => {
      this.guardarCambios(modelo)
    });
  }

  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario! : ViewContainerRef;

  private componentRef !: ComponentRef<any>;

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as SerivicioCRUD<T, C>;

  public guardarCambios(genero: C) {
    this.servicioCRUD.crear(genero).subscribe({
      next: () => this.router.navigate([this.rutaIndice]),
      error: (err) => {
        const errores = obtenerErrores(err);
        this.errores = errores;
      },
    });
  }
}
