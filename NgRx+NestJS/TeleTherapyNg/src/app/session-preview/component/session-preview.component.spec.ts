import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPreviewComponent } from './session-preview.component';

describe('SessionPreviewComponent', () => {
  let component: SessionPreviewComponent;
  let fixture: ComponentFixture<SessionPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionPreviewComponent]
    });
    fixture = TestBed.createComponent(SessionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
