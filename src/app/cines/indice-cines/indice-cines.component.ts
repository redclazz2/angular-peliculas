import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { IndiceEntidadComponent } from '../../compartidos/componentes/indice-entidad/indice-entidad.component';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/Proveedores';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  imports: [IndiceEntidadComponent],
  templateUrl: './indice-cines.component.html',
  styleUrl: './indice-cines.component.css',
  providers: [{
    provide: SERVICIO_CRUD_TOKEN, useClass: CinesService
  }]
})
export class IndiceCinesComponent {

}
