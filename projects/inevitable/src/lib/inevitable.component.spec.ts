import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InevitableComponent } from './inevitable.component';

describe('InevitableComponent', () => {
  let component: InevitableComponent;
  let fixture: ComponentFixture<InevitableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InevitableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InevitableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
