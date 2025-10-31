import { Observable } from 'rxjs';
import PaginacionDTO from '../models/PaginacionDTO';
import { HttpResponse } from '@angular/common/http';

export interface SerivicioCRUD<T, C> {
  obtenerPaginados(paginacion: PaginacionDTO): Observable<HttpResponse<T[]>>;

  obtenerPorId(id: number): Observable<T>;

  crear(genero: C): Observable<any>;

  actualizar(id: number, entidad: C): Observable<any>;

  borrar(id: number): Observable<any>;
}
