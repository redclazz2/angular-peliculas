import { inject, Injectable } from '@angular/core';
import { GeneroCreacionDTO, GeneroDTO } from './generos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import PaginacionDTO from '../compartidos/models/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/ConstruirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/generos';

  constructor() { }

  public obtenerTodos():Observable<GeneroDTO[]>{
    return this.http.get<GeneroDTO[]>(this.urlBase);
  }

  public obtenerPaginados(paginacion:PaginacionDTO):Observable<HttpResponse<GeneroDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<GeneroDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  public crearGenero(genero:GeneroCreacionDTO){
    return this.http.post(this.urlBase,genero);
  }

  public obtenerPorId(id:number) : Observable<GeneroDTO>{
    return this.http.get<GeneroDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id:number, genero: GeneroCreacionDTO){
    return this.http.put(`${this.urlBase}/${id}`,genero);
  }

  public borrar(id:number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
