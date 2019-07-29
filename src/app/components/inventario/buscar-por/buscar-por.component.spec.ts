import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPorComponent } from './buscar-por.component';

describe('BuscarPorComponent', () => {
  let component: BuscarPorComponent;
  let fixture: ComponentFixture<BuscarPorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
