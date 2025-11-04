import {TestBed} from "@angular/core/testing";
import { MostrarErroresComponent } from "./mostrar-errores.component";

describe("MostrarErroresComponent", ()=>{
    beforeEach( async () =>{
        await TestBed.configureTestingModule({
            imports: [MostrarErroresComponent]
        }).compileComponents();
    });

    it('Should create the component', () =>{
        const fixture = TestBed.createComponent(MostrarErroresComponent);
        const componente = fixture.componentInstance;

        expect(componente).toBeTruthy();
    });

    it("Should display a list item when there's an error", () =>{
        const fixture = TestBed.createComponent(MostrarErroresComponent);
        const componente = fixture.componentInstance; //Obtiene la instancia del componente

        componente.errores = ['Error']; //Cambia las propiedades del componente

        fixture.detectChanges(); //Actualiza las propiedades
        
        //Prueba q se hayan aplicado los cambios al HTML
        const compilado = fixture.nativeElement as HTMLElement;   
        expect(compilado.querySelectorAll('li').length).toBe(1);
    });
});