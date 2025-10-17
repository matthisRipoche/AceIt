import { TestBed } from '@angular/core/testing';
import { TypeStatisticService } from './type-statistic.service';

describe('TypeStatisticService', () => {
  let service: TypeStatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeStatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
