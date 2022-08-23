import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Capture2Component } from './capture2.component';

describe('Capture2Component', () => {
  let component: Capture2Component;
  let fixture: ComponentFixture<Capture2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Capture2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Capture2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
