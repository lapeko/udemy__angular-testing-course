import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

import {CoursesModule} from "../courses.module";
import {CoursesCardListComponent} from "./courses-card-list.component";
import {setupCourses} from "../common/setup-test-data";

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCardListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.courses = setupCourses();
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    const matCards = el.queryAll(By.css("mat-card"));

    expect(matCards.length)
      .withContext("Unexpected number of courses")
      .toBe(component.courses.length);
  });

  it("should display the first course", () => {
    const courseCard = el.query(By.css("mat-card"));
    const courseTitle = courseCard.query(By.css("mat-card-title")).nativeElement.innerText;
    const courseImg = courseCard.query(By.css("[mat-card-image]")).nativeElement.src;

    expect(courseCard).toBeTruthy();
    expect(courseTitle).toBe(component.courses[0].titles.description);
    expect(courseImg).toBe(component.courses[0].iconUrl);
  });
});
