import { TestBed } from '@angular/core/testing';

import { PermissionStatusService } from './permission-status.service';

describe('PermissionStatusService', () => {
  let service: PermissionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
