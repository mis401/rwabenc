import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAuthComponent } from './doctor-auth.component';

describe('DoctorAuthComponent', () => {
  let component: DoctorAuthComponent;
  let fixture: ComponentFixture<DoctorAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAuthComponent]
    });
    fixture = TestBed.createComponent(DoctorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
