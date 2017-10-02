import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCRMessagesManagerComponent } from './mcrmessages-manager.component';

describe('MCRMessagesManagerComponent', () => {
  let component: MCRMessagesManagerComponent;
  let fixture: ComponentFixture<MCRMessagesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCRMessagesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCRMessagesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
