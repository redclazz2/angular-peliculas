import { Component, EventEmitter, inject, Input, OnInit, Output, output, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActorAutoCompleteDTO } from '../actores';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActoresService } from '../actores-service.service';

@Component({
  selector: 'app-autocomplete-actores',
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    CdkDropList,
    CdkDrag
],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css',
})
export class AutocompleteActoresComponent implements OnInit{
  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor =>{
      if(typeof(valor)== "string" && valor){
        this.actoresService.obtenerPorNombre(valor)
        .subscribe(value => this.actores = value);
      }
    });
  }

  control = new FormControl();
  actoresService = inject(ActoresService);
  actores: ActorAutoCompleteDTO[] = [];

  @ViewChild(MatTable) table! : MatTable<ActorAutoCompleteDTO>;

  @Input({required: true})
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];
  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones']

  @Output()
  actoresSeleccionadosChange = new EventEmitter<ActorAutoCompleteDTO[]>();

  actorSeleccionado(event: MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    this.actoresSeleccionadosChange.emit(this.actoresSeleccionados);

    if(this.table){
      this.table.renderRows();
    }
  }

  eliminar(actor: ActorAutoCompleteDTO){
    const indice = this.actoresSeleccionados.findIndex((a: ActorAutoCompleteDTO) => a.id == actor.id);
    this.actoresSeleccionados.splice(indice,1);
    this.actoresSeleccionadosChange.emit(this.actoresSeleccionados);
    this.table.renderRows();
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor == event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);

    this.actoresSeleccionadosChange.emit(this.actoresSeleccionados);
    this.table.renderRows();
  }
}
