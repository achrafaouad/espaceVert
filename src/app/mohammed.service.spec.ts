import { TestBed } from '@angular/core/testing';

import { MohammedService } from './mohammed.service';

describe('MohammedService', () => {
  let service: MohammedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MohammedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
