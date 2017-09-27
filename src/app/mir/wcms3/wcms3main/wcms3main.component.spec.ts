import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wcms3mainComponent } from './wcms3main.component';

describe('Wcms3mainComponent', () => {
  let component: Wcms3mainComponent;
  let fixture: ComponentFixture<Wcms3mainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wcms3mainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wcms3mainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
