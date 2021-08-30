import { TestBed } from '@angular/core/testing';

import { LiberadorService } from './liberador.service';

describe('LiberadorService', () => {
  let service: LiberadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiberadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
