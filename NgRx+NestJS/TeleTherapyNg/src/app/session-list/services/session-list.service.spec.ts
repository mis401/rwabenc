import { TestBed } from '@angular/core/testing';

import { SessionListService } from './session-list.service';

describe('SessionListService', () => {
  let service: SessionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
