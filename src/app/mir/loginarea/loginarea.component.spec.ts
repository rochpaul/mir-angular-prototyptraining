import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginareaComponent } from './loginarea.component';

describe('LoginareaComponent', () => {
  let component: LoginareaComponent;
  let fixture: ComponentFixture<LoginareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
