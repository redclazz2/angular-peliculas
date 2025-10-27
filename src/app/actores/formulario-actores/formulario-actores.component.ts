import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import moment from 'moment';
import { dateCannotBeFuture, firstCapitalLetter } from '../../compartidos/funciones/validaciones';
import { InputImgComponent } from "../../compartidos/componentes/input-img/input-img.component";

@Component({
  selector: 'app-formulario-actores',
  imports: [
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    InputImgComponent
],
  templateUrl: './formulario-actores.component.html',
  styleUrl: './formulario-actores.component.css',
})
export class FormularioActoresComponent implements OnInit {
  ngOnInit(): void {
    if (this.modelo) {
      this.form.patchValue(this.modelo)
    }
  }

  @Input()
  public modelo?: ActorDTO;

  @Output()
  onFormSuccessValidation: EventEmitter<ActorCreacionDTO> = new EventEmitter();

  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    nombre: ['', { validators: [Validators.required, firstCapitalLetter()] }],
    fechaNacimiento: new FormControl<Date | null>(null, {validators: [Validators.required, dateCannotBeFuture()]}),
    foto: new FormControl<File | string | null>(null)
  });

  public onFormSubmit() {
    if (!this.form.valid) {
      return;
    }

    const actor = this.form.value as ActorCreacionDTO;
    actor.fechaNacimiento = moment(actor.fechaNacimiento).toDate();
    
    if(typeof(actor.foto) == "string"){
      actor.foto = undefined;
    }

    this.onFormSuccessValidation.emit(actor);
  }

  public getErrorNameField(){
    let campo =  this.form.controls.nombre;

    if(campo.hasError('required')){
      return 'El campo nombre es requerido';
    }

    if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula');
    }

    return "";
  }

  public getErrorDateField(){
    let campo = this.form.controls.fechaNacimiento;

    if(campo.hasError('required')){
      return 'El campo es requerido';
    }


    if(campo.hasError("futuro")){
      return campo.getError("futuro").message;
    }

    return '';
  }

  public archivoSeleccionado(file:File){
    this.form.controls.foto.setValue(file);
  }
}
