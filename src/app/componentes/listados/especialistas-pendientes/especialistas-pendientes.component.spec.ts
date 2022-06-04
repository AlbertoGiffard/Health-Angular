import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasPendientesComponent } from './especialistas-pendientes.component';

describe('EspecialistasPendientesComponent', () => {
  let component: EspecialistasPendientesComponent;
  let fixture: ComponentFixture<EspecialistasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistasPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
