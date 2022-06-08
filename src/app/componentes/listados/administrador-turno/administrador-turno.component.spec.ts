import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTurnoComponent } from './administrador-turno.component';

describe('AdministradorTurnoComponent', () => {
  let component: AdministradorTurnoComponent;
  let fixture: ComponentFixture<AdministradorTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
