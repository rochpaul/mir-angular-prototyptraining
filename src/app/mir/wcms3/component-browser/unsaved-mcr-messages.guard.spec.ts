import { TestBed, async, inject } from '@angular/core/testing';

import { UnsavedMcrMessagesGuard } from './unsaved-mcr-messages.guard';

describe('UnsavedMcrMessagesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedMcrMessagesGuard]
    });
  });

  it('should ...', inject([UnsavedMcrMessagesGuard], (guard: UnsavedMcrMessagesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
