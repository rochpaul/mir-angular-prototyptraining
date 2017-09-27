import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleConfirmComponent } from './simple-confirm.component';

describe('SimpleConfirmComponent', () => {
  let component: SimpleConfirmComponent;
  let fixture: ComponentFixture<SimpleConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
