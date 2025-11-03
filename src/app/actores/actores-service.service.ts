import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActorAutoCompleteDTO, ActorCreacionDTO, ActorDTO } from './actores';
import { Observable } from 'rxjs';
import PaginacionDTO from '../compartidos/models/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/ConstruirQueryParams';
import { SerivicioCRUD } from '../compartidos/interfaces/ServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class ActoresService implements SerivicioCRUD<ActorDTO,ActorCreacionDTO>{
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/actores';

  public crear(actor: ActorCreacionDTO) : Observable<ActorDTO>{
    let data = this.construirFormData(actor);
    return this.http.post<ActorDTO>(this.urlBase,data);
  }

  public borrar(id:number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  private construirFormData(
    actor:ActorCreacionDTO
  ):FormData{
    const formData = new FormData();

    formData.append('nombre', actor.nombre);
    formData.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0])

    if(actor.foto){
      formData.append('foto',actor.foto);
    }

    return formData;
  }

  public obtenerPaginados(paginacion:PaginacionDTO):Observable<HttpResponse<ActorDTO[]>>{
    let queryparams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase,{
      params: queryparams,
      observe: 'response'
    });
  }

  public obtenerPorId(id:number){
    return this.http.get<ActorDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id:number, actor: ActorCreacionDTO){
    return this.http.put(`${this.urlBase}/${id}`,actor);
  }

  public obtenerPorNombre(nombre:string): Observable<ActorAutoCompleteDTO[]>{
    return this.http.get<ActorAutoCompleteDTO[]>(`${this.urlBase}/${nombre}`);
  }
}
