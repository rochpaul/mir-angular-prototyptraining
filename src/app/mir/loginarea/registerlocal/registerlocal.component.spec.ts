import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterlocalComponent} from './registerlocal.component';

describe('RegisterlocalComponent', () => {
  let component: RegisterlocalComponent;
  let fixture: ComponentFixture<RegisterlocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterlocalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterlocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
