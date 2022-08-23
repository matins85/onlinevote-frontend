import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateDashboardComponent } from './private-dashboard.component';

describe('PrivatedashboardComponent', () => {
  let component: PrivateDashboardComponent;
  let fixture: ComponentFixture<PrivateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
