import { TestBed, inject } from '@angular/core/testing';

import { ComponentRegistryService } from './component-registry.service';

describe('ComponentRegistryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentRegistryService]
    });
  });

  it('should be created', inject([ComponentRegistryService], (service: ComponentRegistryService) => {
    expect(service).toBeTruthy();
  }));
});
