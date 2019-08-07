import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventarioComponent } from './report-inventario.component';

describe('ReportInventarioComponent', () => {
  let component: ReportInventarioComponent;
  let fixture: ComponentFixture<ReportInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
