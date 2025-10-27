import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGenerosComponent } from './crear-generos.component';

describe('CrearGenerosComponent', () => {
  let component: CrearGenerosComponent;
  let fixture: ComponentFixture<CrearGenerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGenerosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGenerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
