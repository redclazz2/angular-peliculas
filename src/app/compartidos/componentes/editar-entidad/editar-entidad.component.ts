import { Component, ComponentRef, inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/Proveedores';
import { SerivicioCRUD } from '../../interfaces/ServicioCRUD';
import { obtenerErrores } from '../../funciones/ObtenerErrores';
import { MostrarErroresComponent } from "../mostrar-errores/mostrar-errores.component";
import { LoadingGifComponent } from "../loading-gif/loading-gif.component";

@Component({
  selector: 'app-editar-entidad',
  imports: [MostrarErroresComponent, LoadingGifComponent],
  templateUrl: './editar-entidad.component.html',
  styleUrl: './editar-entidad.component.css',
})
export class EditarEntidadComponent <T,C> implements OnInit{
  @Input({ required: true })
  public id!: number;
  
  @Input({ required: true })
  public titulo!: string;

  @Input({ required: true })
  public rutaIndice!: string;

  @Input({ required: true })
  formulario: any;

  errores: string[] = [];
  entidad!: T;
  cargando:boolean = true;

  constructor(private readonly router: Router) {}
  
  ngOnInit(): void {
    this.servicioCRUD.obtenerPorId(this.id).subscribe((e)=>{
      this.cargarComponente(e);
    });
    
  }

  cargarComponente(entidad:T){
    if(this.contenedorFormulario){
      this.componentRef = this.contenedorFormulario.createComponent(this.formulario);
      this.componentRef.instance.modelo = entidad;
      this.componentRef.instance.onFormValidationSuccess.subscribe(
      (modelo: any) => {
        this.guardarCambios(modelo);
      }
    );
    this.cargando = false
    }
  }

  @ViewChild('contenedorFormulario', { read: ViewContainerRef })
  contenedorFormulario!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as SerivicioCRUD<T, C>;

  public guardarCambios(genero: C) {
    this.servicioCRUD.actualizar(this.id,genero).subscribe({
      next: () => this.router.navigate([this.rutaIndice]),
      error: (err) => {
        const errores = obtenerErrores(err);
        this.errores = errores;
      },
    });
  }
}
