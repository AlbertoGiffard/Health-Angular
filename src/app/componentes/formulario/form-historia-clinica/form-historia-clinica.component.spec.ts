import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHistoriaClinicaComponent } from './form-historia-clinica.component';

describe('FormHistoriaClinicaComponent', () => {
  let component: FormHistoriaClinicaComponent;
  let fixture: ComponentFixture<FormHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
