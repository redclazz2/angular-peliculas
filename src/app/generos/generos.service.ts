import { inject, Injectable } from '@angular/core';
import { GeneroDTO } from './generos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

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
}
