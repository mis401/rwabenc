import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtkazivanjeDialogComponent } from './otkazivanje-dialog.component';

describe('OtkazivanjeDialogComponent', () => {
  let component: OtkazivanjeDialogComponent;
  let fixture: ComponentFixture<OtkazivanjeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtkazivanjeDialogComponent]
    });
    fixture = TestBed.createComponent(OtkazivanjeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
