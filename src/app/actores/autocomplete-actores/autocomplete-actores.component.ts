import { Component, Input, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActorAutoCompleteDTO } from '../actores';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

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
export class AutocompleteActoresComponent {
  control = new FormControl();

  actores: ActorAutoCompleteDTO[] = [
    {
      id: 1,
      nombre: 'Tom Holland',
      personaje: 'Spider-Man',
      foto: 'https://duckduckgo.com/i/e4403d588fa1ce92.jpg',
    },
    {
      id: 2,
      nombre: 'Zendaya',
      personaje: 'Mary Jane',
      foto: 'https://duckduckgo.com/i/f99117254b2fa3c4.jpg',
    },
  ];

  @ViewChild(MatTable) table! : MatTable<ActorAutoCompleteDTO>;

  @Input({required: true})
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];
  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones']

  actorSeleccionado(event: MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if(this.table){
      this.table.renderRows();
    }
  }

  eliminar(actor: ActorAutoCompleteDTO){
    const indice = this.actoresSeleccionados.findIndex((a: ActorAutoCompleteDTO) => a.id == actor.id);
    this.actoresSeleccionados.splice(indice,1);
    this.table.renderRows();
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor == event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }
}
