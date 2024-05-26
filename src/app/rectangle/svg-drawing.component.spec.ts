import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgDrawingComponent } from './svg-drawing.component';

describe('RectangleComponent', () => {
  let component: SvgDrawingComponent;
  let fixture: ComponentFixture<SvgDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgDrawingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvgDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
