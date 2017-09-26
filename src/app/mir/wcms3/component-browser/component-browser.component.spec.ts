import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBrowserComponent } from './component-browser.component';

describe('ComponentBrowserComponent', () => {
  let component: ComponentBrowserComponent;
  let fixture: ComponentFixture<ComponentBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
