import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCinesComponent } from './formulario-cines.component';

describe('FormularioCinesComponent', () => {
  let component: FormularioCinesComponent;
  let fixture: ComponentFixture<FormularioCinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
