import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRendererComponent } from './custom-renderer.component';

describe('SimpleComponent', () => {
  let component: CustomRendererComponent;
  let fixture: ComponentFixture<CustomRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
