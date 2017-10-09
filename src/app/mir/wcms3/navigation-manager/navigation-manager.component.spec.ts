import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationManagerComponent } from './navigation-manager.component';

describe('NavigationManagerComponent', () => {
  let component: NavigationManagerComponent;
  let fixture: ComponentFixture<NavigationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
