import { TestBed } from '@angular/core/testing';

import { BusLocationsService } from './bus-locations.service';

describe('BusLocationsService', () => {
  let service: BusLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
