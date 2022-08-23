import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vote2Component } from './vote2.component';

describe('Vote2Component', () => {
  let component: Vote2Component;
  let fixture: ComponentFixture<Vote2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Vote2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vote2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
