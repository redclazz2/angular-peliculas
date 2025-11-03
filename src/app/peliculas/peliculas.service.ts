import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculasPostGetDTO, PeliculasPutGetDTO } from './peliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiURL + "/peliculas";

  constructor() { }

  public obtenerLandingPage():Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(`${this.baseUrl}/landing`);
  }

  public crearGet():Observable<PeliculasPostGetDTO>{
    return this.http.get<PeliculasPostGetDTO>(`${this.baseUrl}/PostGet`);
  }

  public crear(pelicula:PeliculaCreacionDTO) : Observable<PeliculaDTO>{
    let formData = this.construirFormData(pelicula);
    return this.http.post<PeliculaDTO>(this.baseUrl, formData);
  }

  private construirFormData(pelicula : PeliculaCreacionDTO) : FormData{
    const formData = new FormData();
    formData.append(
      'titulo', pelicula.titulo
    );

    formData.append(
      'fechaLanzamiento', 
      pelicula.fechaLanzamiento.toISOString().split('T')[0]
    );

    if(pelicula.poster){
      formData.append(`poster`, pelicula.poster);
    }

    if(pelicula.trailer){
      formData.append(`trailer`, pelicula.trailer);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }

  public actualizarGet(id:number): Observable<PeliculasPutGetDTO>{
    return this.http.get<PeliculasPutGetDTO>(`${this.baseUrl}/PutGet/${id}`);
  }

  public actualizar(id:number, pelicula: PeliculaCreacionDTO){
    const formData = this.construirFormData(pelicula);
    return this.http.put(`${this.baseUrl}/${id}`,formData);
  }

  public borrar(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
