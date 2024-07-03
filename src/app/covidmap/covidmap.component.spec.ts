import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidmapComponent } from './covidmap.component';

describe('CovidmapComponent', () => {
  let component: CovidmapComponent;
  let fixture: ComponentFixture<CovidmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
