import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstCapitalLetter } from '../../compartidos/funciones/validaciones';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GeneroCreacionDTO } from '../generos';

@Component({
  selector: 'app-formulario-genero',
  imports: [MatFormField, MatLabel, MatError, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent {
  @Output()
  public onFormValidationSuccess:EventEmitter<GeneroCreacionDTO> = new EventEmitter();

  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required, firstCapitalLetter()]}],
  });

  public getErrorNameField():string{
    let nombre = this.form.controls.nombre;
    if(nombre.hasError('required')){
      return 'El campo nombre es requerido';
    }

    if(nombre.hasError('primeraLetraMayuscula')){
      return nombre.getError('primeraLetraMayuscula');
    }
    return '';
  }

  public onFormSubmit(){
    const genero = this.form.value as GeneroCreacionDTO;
    this.onFormValidationSuccess.emit(genero);
  }
}
