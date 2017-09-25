import { TestBed, inject } from '@angular/core/testing';

import { McrmessagesService } from './mcrmessages.service';

describe('McrmessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [McrmessagesService]
    });
  });

  it('should be created', inject([McrmessagesService], (service: McrmessagesService) => {
    expect(service).toBeTruthy();
  }));
});
