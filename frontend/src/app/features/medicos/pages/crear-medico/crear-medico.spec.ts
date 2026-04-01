import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMedico } from './crear-medico';

describe('CrearMedico', () => {
  let component: CrearMedico;
  let fixture: ComponentFixture<CrearMedico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearMedico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMedico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
