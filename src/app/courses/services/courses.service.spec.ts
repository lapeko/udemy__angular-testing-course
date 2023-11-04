import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {CoursesService} from "./courses.service";
import {Course} from "../model/course";
import {COURSES} from "../../../../server/db-data";

describe("CoursesService", () => {
  const httpReturnCourses = Object.values(COURSES) as Course[];
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,
      ]
    })

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("findAllCourses should return expected courses (HttpClient called once)", () => {
    const expectedCourses: Course[] = Object.values(COURSES);

    const res = coursesService.findAllCourses();

    res.subscribe(courses => expect(courses).toEqual(expectedCourses));

    const req = httpTestingController.expectOne('/api/courses');
    req.flush({payload: httpReturnCourses});

    expect(req.request.method).toBe("GET");
  });

  it("findCourseById should return expected course (HttpClient called once)", () => {
    const expectedCourse = COURSES[12] as Course;

    const res = coursesService.findCourseById(12);

    res.subscribe(course => expect(course).toEqual(expectedCourse));

    const req = httpTestingController.expectOne('/api/courses/12');
    req.flush(expectedCourse);

    expect(req.request.method).toBe("GET");
  });

  it("saveCourse should return expected course (HttpClient called once)", () => {
    const change = {category: "New category"} as Partial<Course>;
    const expectedCourse = {...COURSES[1], ...change};

    const res = coursesService.saveCourse(1, change);

    res.subscribe(course => expect(course).toEqual(expectedCourse));

    const req = httpTestingController.expectOne('/api/courses/1');
    req.flush(expectedCourse);

    expect(req.request.method).toBe("PUT");
  });
});
