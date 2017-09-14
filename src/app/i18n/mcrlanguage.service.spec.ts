import { TestBed, inject } from '@angular/core/testing';

import { MCRLanguageService } from './mcrlanguage.service';

describe('MCRLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MCRLanguageService]
    });
  });

  it('should be created', inject([MCRLanguageService], (service: MCRLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
