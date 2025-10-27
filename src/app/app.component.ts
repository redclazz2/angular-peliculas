import { Component } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MenuComponent } from "./compartidos/componentes/menu/menu.component";
import { MatButtonModule } from "@angular/material/button";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    MatAutocompleteModule,
    MenuComponent,
    MatButtonModule,
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = ""; 
}
