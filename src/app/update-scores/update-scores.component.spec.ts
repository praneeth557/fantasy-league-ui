import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScoresComponent } from './update-scores.component';

describe('UpdateScoresComponent', () => {
  let component: UpdateScoresComponent;
  let fixture: ComponentFixture<UpdateScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
