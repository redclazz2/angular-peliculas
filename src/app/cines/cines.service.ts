import { inject, Injectable } from '@angular/core';
import { SerivicioCRUD } from '../compartidos/interfaces/ServicioCRUD';
import { CineCreacionDTO, CineDTO } from './cines';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import PaginacionDTO from '../compartidos/models/PaginacionDTO';
import { environment } from '../../environments/environment.development';
import { construirQueryParams } from '../compartidos/funciones/ConstruirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class CinesService implements SerivicioCRUD<CineDTO, CineCreacionDTO>{
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/cines';

  constructor() { }

  obtenerPaginados(paginacion: PaginacionDTO): Observable<HttpResponse<CineDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<CineDTO[]>(this.urlBase,{
      params: queryParams,
      observe: 'response'
    });
  }

  obtenerPorId(id: number): Observable<CineDTO> {
    return this.http.get<CineDTO>(`${this.urlBase}/${id}`);
  }

  crear(cine: CineCreacionDTO): Observable<any> {
    return this.http.post<CineDTO>(this.urlBase,cine);
  }

  actualizar(id: number, entidad: CineCreacionDTO): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`,entidad);
  }

  borrar(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
