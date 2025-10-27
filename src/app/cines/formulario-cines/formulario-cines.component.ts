import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-cines',
  imports: [MatFormField, MatLabel, ReactiveFormsModule, MatInput, MatError, MatButtonModule, RouterLink],
  templateUrl: './formulario-cines.component.html',
  styleUrl: './formulario-cines.component.css'
})
export class FormularioCinesComponent implements OnInit{
   ngOnInit(): void {
     if(this.modelo){
      this.form.patchValue(this.modelo);
     }
   }

   @Input()
   modelo?:CineDTO;

   @Output()
   formSubmit = new EventEmitter<CineCreacionDTO>();

   private formBuilder = inject(FormBuilder);
   public form = this.formBuilder.group({
    nombre: ["", {validators: [Validators.required]}]
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
}
