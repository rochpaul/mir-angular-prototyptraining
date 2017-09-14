import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirComponent } from './mir.component';

describe('MirComponent', () => {
  let component: MirComponent;
  let fixture: ComponentFixture<MirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
