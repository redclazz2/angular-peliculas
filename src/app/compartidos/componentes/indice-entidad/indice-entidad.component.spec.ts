import { TestBed } from '@angular/core/testing';
import { IndiceEntidadComponent } from './indice-entidad.component';
import { SerivicioCRUD } from '../../interfaces/ServicioCRUD';
import { of } from 'rxjs';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/Proveedores';
import { RouterModule } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { LowerCasePipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

describe('IndiceEntidadComponent', () => {
  //SpyObject: Permite crear un mock de un servicio por ejemplo
  let mockIServicioCRUD = jasmine.createSpyObj<SerivicioCRUD<object, object>>(
    'ServicioCRUD',
    ['obtenerPaginados', 'borrar']
  );

  beforeEach(async () => {
    //Aqui se especifica que tipo de dato necesitas q retorne una funcion de tu mock
    mockIServicioCRUD.obtenerPaginados.and.returnValue(of()); //Este of no deja ejecutar la funcion
    mockIServicioCRUD.borrar.and.returnValue(of({})); //Un of de objeto vacio permite ejecutar la funcion
    //Aqui importas las dependencias y los providers
    await TestBed.configureTestingModule({
      imports: [
        IndiceEntidadComponent,
        RouterModule.forRoot([]),
        LowerCasePipe,
        SweetAlert2Module.forRoot()
      ],
      providers: [
        { provide: SERVICIO_CRUD_TOKEN, useValue: mockIServicioCRUD },
        //provideAnimationsAsync()
      ],
    }).compileComponents();
  });

  it('Should create the component', () => {
    const fixture = TestBed.createComponent(IndiceEntidadComponent);
    const componente = fixture.componentInstance;

    expect(componente).toBeTruthy();
  });

  it('Should navigate to page one after a delete call', () => {
    const fixture = TestBed.createComponent(IndiceEntidadComponent);
    const componente = fixture.componentInstance;

    const id = 1;
    componente.paginacion.pagina = 2;

    componente.borrar(id);

    expect(componente.paginacion.pagina).toBe(1);
  });

  it('Should show a table when registers are loaded', () => {
    const fixture = TestBed.createComponent(IndiceEntidadComponent);
    const componente = fixture.componentInstance;
    const respuesta = new HttpResponse<Object[]>({ body: [{}] });

    //Para esta prueba hay que sobre-escribir el comportamiento de obtenerPaginados
    mockIServicioCRUD.obtenerPaginados.and.returnValue(of(respuesta));

    componente.cargarRegistros();

    fixture.detectChanges();

    const compilado = fixture.nativeElement as HTMLElement;
    expect(compilado.querySelectorAll('table').length).toBe(1);
  });

  it('Should NOT show a table when registers are NOT loaded', () => {
    const fixture = TestBed.createComponent(IndiceEntidadComponent);
    const componente = fixture.componentInstance;
    const respuesta = new HttpResponse<Object[]>({ body: [] });

    //Para esta prueba hay que sobre-escribir el comportamiento de obtenerPaginados
    mockIServicioCRUD.obtenerPaginados.and.returnValue(of(respuesta));

    componente.cargarRegistros();

    fixture.detectChanges();

    const compilado = fixture.nativeElement as HTMLElement;
    expect(compilado.querySelectorAll('table').length).toBe(0);
  });
});
