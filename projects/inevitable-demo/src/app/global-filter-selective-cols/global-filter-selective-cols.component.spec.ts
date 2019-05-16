import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalFilterSelectiveColsComponent } from "./global-filter-selective-cols.component";

describe("SimpleObservableComponent", () => {
  let component: GlobalFilterSelectiveColsComponent;
  let fixture: ComponentFixture<GlobalFilterSelectiveColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalFilterSelectiveColsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalFilterSelectiveColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
