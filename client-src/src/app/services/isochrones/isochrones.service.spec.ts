import { TestBed, inject } from '@angular/core/testing';

import { IsochronesService } from './isochrones.service';

describe('IsochronesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsochronesService]
    });
  });

  it('should be created', inject([IsochronesService], (service: IsochronesService) => {
    expect(service).toBeTruthy();
  }));
});
