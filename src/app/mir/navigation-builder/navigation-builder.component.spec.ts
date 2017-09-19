import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBuilderComponent } from './navigation-builder.component';

describe('NavigationBuilderComponent', () => {
  let component: NavigationBuilderComponent;
  let fixture: ComponentFixture<NavigationBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
