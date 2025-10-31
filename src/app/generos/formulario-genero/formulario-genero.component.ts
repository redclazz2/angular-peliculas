import { Component, EventEmitter, inject, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstCapitalLetter } from '../../compartidos/funciones/validaciones';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GeneroCreacionDTO, GeneroDTO } from '../generos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-genero',
  imports: [MatFormField, MatLabel, MatError, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent implements OnInit{
  ngOnInit(): void {
    if(this.modelo){
      this.form.patchValue({nombre: this.modelo.nombre})
    }
  }

  @Input()
  public modelo? : GeneroDTO;

  @Output()
  public onFormValidationSuccess:EventEmitter<GeneroCreacionDTO> = new EventEmitter();

  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    nombre: [this.modelo?.nombre ?? "", {validators: [Validators.required, firstCapitalLetter(), Validators.maxLength(50)]}],
  });

  public getErrorNameField():string{
    let nombre = this.form.controls.nombre;
    if(nombre.hasError('required')){
      return 'El campo nombre es requerido';
    }

    if(nombre.hasError('primeraLetraMayuscula')){
      return nombre.getError('primeraLetraMayuscula');
    }

    if(nombre.hasError('maxlength')){
      return `El campo nombre no debe tener más de ${nombre.getError('maxlength').requiredLength} caracteres`
    }
    return '';
  }

  public onFormSubmit(){
    const genero = this.form.value as GeneroCreacionDTO;
    this.onFormValidationSuccess.emit(genero);
  }
}
