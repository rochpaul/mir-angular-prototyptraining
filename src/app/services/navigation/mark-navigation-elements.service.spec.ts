import { TestBed, inject } from '@angular/core/testing';

import { MarkNavigationElementsService } from './mark-navigation-elements.service';

describe('MarkNavigationElementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkNavigationElementsService]
    });
  });

  it('should be created', inject([MarkNavigationElementsService], (service: MarkNavigationElementsService) => {
    expect(service).toBeTruthy();
  }));
});
