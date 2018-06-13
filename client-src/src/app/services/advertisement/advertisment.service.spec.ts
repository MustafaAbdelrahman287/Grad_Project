import { TestBed, inject } from '@angular/core/testing';

import { AdvertismentService } from './advertisment.service';

describe('AdvertismentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertismentService]
    });
  });

  it('should be created', inject([AdvertismentService], (service: AdvertismentService) => {
    expect(service).toBeTruthy();
  }));
});
