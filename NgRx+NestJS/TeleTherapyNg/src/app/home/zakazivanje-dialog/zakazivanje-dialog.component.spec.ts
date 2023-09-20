import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakazivanjeDialogComponent } from './zakazivanje-dialog.component';

describe('ZakazivanjeDialogComponent', () => {
  let component: ZakazivanjeDialogComponent;
  let fixture: ComponentFixture<ZakazivanjeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZakazivanjeDialogComponent]
    });
    fixture = TestBed.createComponent(ZakazivanjeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
