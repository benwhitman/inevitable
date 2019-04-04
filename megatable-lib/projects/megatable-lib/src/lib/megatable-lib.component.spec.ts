import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegatableLibComponent } from './megatable-lib.component';

describe('MegatableLibComponent', () => {
  let component: MegatableLibComponent;
  let fixture: ComponentFixture<MegatableLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegatableLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegatableLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
