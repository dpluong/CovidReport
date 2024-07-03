import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidtableComponent } from './covidtable.component';

describe('CovidtableComponent', () => {
  let component: CovidtableComponent;
  let fixture: ComponentFixture<CovidtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
