import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrmapComponent } from './brmap.component';

describe('BrmapComponent', () => {
  let component: BrmapComponent;
  let fixture: ComponentFixture<BrmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
