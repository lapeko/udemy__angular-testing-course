import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";

import {CoursesModule} from "../courses.module";
import {CoursesCardListComponent} from "./courses-card-list.component";

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    pending();
  });

  it("should display the first course", () => {
    pending();
  });
});