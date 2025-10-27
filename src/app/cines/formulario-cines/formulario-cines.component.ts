import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";
import { Coordenada } from '../../compartidos/componentes/mapa/Coordenada';

@Component({
  selector: 'app-formulario-cines',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInput, MatError, MatButtonModule, RouterLink, MapaComponent],
  templateUrl: './formulario-cines.component.html',
  styleUrl: './formulario-cines.component.css'
})
export class FormularioCinesComponent implements OnInit{
   ngOnInit(): void {
     if(this.modelo){
      this.form.patchValue(this.modelo);
      this.coordenadasIniciales.push(
        {
          latitud: this.modelo.latitud,
          longitud: this.modelo.longitud
        }
      );
     }
   }

   @Input()
   modelo?:CineDTO;

   @Input()
   coordenadasIniciales:Coordenada[] = [];

   @Output()
   formSubmit = new EventEmitter<CineCreacionDTO>();

   private formBuilder = inject(FormBuilder);
   public form = this.formBuilder.group({
    nombre: ["", {validators: [Validators.required]}],
    latitud: new FormControl<number | null>(null, [Validators.required]),
    longitud: new FormControl<number | null>(null, [Validators.required])
   });

   getErrorNameField():string{
    let nombre = this.form.controls.nombre;

    if(nombre.hasError('required')){
      return 'El campo es requerido';
    }

    return '';
   }

   onSubmitForm(){
    if(!this.form.valid) return;

    const cine = this.form.value as CineCreacionDTO;
    this.formSubmit.emit(cine);
   }

   coordenadaSeleccionada(coordenada: Coordenada){
    this.form.patchValue(coordenada);
   }
}
