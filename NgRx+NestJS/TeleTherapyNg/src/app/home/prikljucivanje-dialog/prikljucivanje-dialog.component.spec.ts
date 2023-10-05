import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikljucivanjeDialogComponent } from './prikljucivanje-dialog.component';

describe('PrikljucivanjeDialogComponent', () => {
  let component: PrikljucivanjeDialogComponent;
  let fixture: ComponentFixture<PrikljucivanjeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrikljucivanjeDialogComponent]
    });
    fixture = TestBed.createComponent(PrikljucivanjeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
