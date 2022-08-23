import { TestBed } from '@angular/core/testing';

import { SnapshotsService } from './snapshot.service';

describe('SnapshotService', () => {
  let service: SnapshotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapshotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
