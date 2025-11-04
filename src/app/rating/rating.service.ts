import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private urlBase = environment.apiURL + "/ratings";

  constructor(
    private readonly http : HttpClient
  ) { }

  puntuar(peliculaId:number, puntuacion: number){
    return this.http.post(this.urlBase, {peliculaId,puntuacion})
  }
}
