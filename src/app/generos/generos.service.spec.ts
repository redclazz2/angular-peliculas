import { provideHttpClient } from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { GenerosService } from "./generos.service";
import { firstValueFrom } from "rxjs";

describe("GenerosService", ()=>{
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
    });

    it('Should create the service', () => {
        const generosService = TestBed.inject(GenerosService);
        expect(generosService).toBeTruthy();
    });

    it('Should execute a GET function to obtain all generos', () => {
        const httpTesting = TestBed.inject(HttpTestingController);
        const generosService = TestBed.inject(GenerosService);
        //el $ indica que es un observable
        const obtenerTodos$ =  generosService.obtenerTodos();
        //En las pruebas se llama así para ver su resultado
        firstValueFrom(obtenerTodos$);
        const peticion = httpTesting.expectOne( 
            req => req.url.endsWith('api/generos/todos'),
            'Obtiene todos los generos');

        expect(peticion.request.method).toBe('GET');
    });
});