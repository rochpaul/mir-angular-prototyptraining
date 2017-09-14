import { TestBed, inject } from '@angular/core/testing';

import { MCRServerStatusService } from './mcrserver-status.service';

describe('MCRServerStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MCRServerStatusService]
    });
  });

  it('should be created', inject([MCRServerStatusService], (service: MCRServerStatusService) => {
    expect(service).toBeTruthy();
  }));
});
