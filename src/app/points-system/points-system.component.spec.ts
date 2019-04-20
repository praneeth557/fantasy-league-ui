import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsSystemComponent } from './points-system.component';

describe('PointsSystemComponent', () => {
  let component: PointsSystemComponent;
  let fixture: ComponentFixture<PointsSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
