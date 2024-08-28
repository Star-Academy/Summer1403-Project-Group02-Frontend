import { TestBed } from '@angular/core/testing';

import { CsvStorageService } from './csv-storage.service';

describe('CsvStorageService', () => {
  let service: CsvStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
