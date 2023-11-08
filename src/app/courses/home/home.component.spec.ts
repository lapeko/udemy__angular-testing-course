import {ComponentFixture, fakeAsync, flush, TestBed, waitForAsync} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

import {HomeComponent} from './home.component';
import {CoursesModule} from "../courses.module";
import {CoursesService} from "../services/courses.service";
import {setupCourses} from "../common/setup-test-data";
import {click} from "../common/test-utils";

describe('HomeComponent', () => {
  const allCourses = setupCourses();
  const beginnerCourses = allCourses.filter(({category}) => category === "BEGINNER");
  const advancedCourses = allCourses.filter(({category}) => category === "ADVANCED");

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: jasmine.SpyObj<CoursesService>;

  beforeEach(waitForAsync(() => {
    const CourseServiceMock = jasmine.createSpyObj("CoursesService", ["findAllCourses"])
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: CoursesService, useValue: CourseServiceMock}
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mdc-tab"));
    expect(tabs.length).toBe(1);
  });


  it("should display only advanced courses", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mdc-tab"));
    expect(tabs.length).toBe(1);
  });


  it("should display both tabs", () => {
    coursesService.findAllCourses.and.returnValue(of(allCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mdc-tab"));
    expect(tabs.length).toBe(2);
  });


  it("should display advanced courses when tab clicked", fakeAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(allCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mdc-tab"));
    expect(tabs.length).toBeGreaterThan(1);
    click(tabs[1]);
    fixture.detectChanges();

    flush();
    fixture.detectChanges();

    const titles = el.queryAll(By.css("mat-card-title")).map(m => m.nativeElement.innerText);
    expect(titles[0]).toBe("Angular Security Course - Web Security Fundamentals");
  }));
});
