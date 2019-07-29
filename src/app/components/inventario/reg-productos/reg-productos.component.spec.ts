import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegProductosComponent } from './reg-productos.component';

describe('RegProductosComponent', () => {
  let component: RegProductosComponent;
  let fixture: ComponentFixture<RegProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
