import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSegmentComponent } from './target-segment.component';

describe('TargetSegmentComponent', () => {
  let component: TargetSegmentComponent;
  let fixture: ComponentFixture<TargetSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
