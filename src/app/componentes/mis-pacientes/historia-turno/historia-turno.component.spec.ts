import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaTurnoComponent } from './historia-turno.component';

describe('HistoriaTurnoComponent', () => {
  let component: HistoriaTurnoComponent;
  let fixture: ComponentFixture<HistoriaTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
