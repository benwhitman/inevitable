import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPanelComponent } from './query-panel.component';

describe('QueryPanelComponent', () => {
  let component: QueryPanelComponent;
  let fixture: ComponentFixture<QueryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
