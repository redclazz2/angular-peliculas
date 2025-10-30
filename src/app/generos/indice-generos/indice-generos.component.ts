import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-indice-generos',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {
  generosService = inject(GenerosService);
  production = environment.production;

  constructor(){
    this.generosService.obtenerTodos().subscribe(generos => {
      console.log(generos)
      console.log(this.production)
    });
  }
}
