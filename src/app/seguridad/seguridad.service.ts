import { HttpClient, HttpResourceFn, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CredencialesUsuarioDTO, RespuestaAutenticacionDTO, UsuarioDTO } from './seguridad';
import { Observable, tap } from 'rxjs';
import PaginacionDTO from '../compartidos/models/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/ConstruirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private urlBase = environment.apiURL + "/usuarios";
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'tokenExpiracion';

  constructor(
    private readonly http: HttpClient,
  ) { }

  registrar(credenciales : CredencialesUsuarioDTO) : Observable <RespuestaAutenticacionDTO>{
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlBase}/registrar`, credenciales)
      .pipe(tap(rta => this.guardarToken(rta)));
  }

  login(credenciales : CredencialesUsuarioDTO) : Observable <RespuestaAutenticacionDTO>{
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlBase}/login`, credenciales)
      .pipe(tap(rta => this.guardarToken(rta)));;
  }

  private guardarToken(respuestaAutenticacionDTO : RespuestaAutenticacionDTO){
    localStorage.setItem(this.llaveToken,respuestaAutenticacionDTO.token);
    localStorage.setItem(this.llaveExpiracion,respuestaAutenticacionDTO.expiracion.toString());
  }

  public obtenerCampoJWT(campo:string){
    const token =  localStorage.getItem(this.llaveToken);
    if(!token) return '';

    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  estaLogueado():boolean {
    const token = localStorage.getItem(this.llaveToken);

    if(!token) return false;

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion!);

    if(expiracionFecha <= new Date()){
      return false;
    }

    return true;
  }

  logout(){
    localStorage.removeItem(this.llaveExpiracion);
    localStorage.removeItem(this.llaveToken);
  }

  obtenerRol():string {
    const isAdmin = this.obtenerCampoJWT('esadmin');
    if(isAdmin){
      return "admin"
    }else{
      return "";
    }
  }

  obtenerToken():string | undefined{
    return localStorage.getItem(this.llaveToken) ?? undefined;
  }

  obtenerUsuariosPaginado(paginacion:PaginacionDTO) : Observable<HttpResponse<UsuarioDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<UsuarioDTO[]>(`${this.urlBase}/listadoUsuarios`, {
      params: queryParams, observe: 'response'
    });
  }

  hacerAdmin(email:string){
    return this.http.post(`${this.urlBase}/haceradmin`, {email});
  }

  removerAdmin(email:string){
    return this.http.post(`${this.urlBase}/removeradmin`, {email});
  }
}
