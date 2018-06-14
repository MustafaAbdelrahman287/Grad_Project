import { TestBed, inject } from '@angular/core/testing';

import { CompetitorService } from './competitor.service';

describe('CompetitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompetitorService]
    });
  });

  it('should be created', inject([CompetitorService], (service: CompetitorService) => {
    expect(service).toBeTruthy();
  }));
});
