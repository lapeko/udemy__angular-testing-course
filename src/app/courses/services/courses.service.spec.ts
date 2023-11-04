import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {CoursesService} from "./courses.service";
import {Course} from "../model/course";
import {COURSES, findLessonsForCourse} from "../../../../server/db-data";
import {Lesson} from "../model/lesson";

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

  it("findAllCourses should return expected courses", () => {
    const expectedCourses: Course[] = Object.values(COURSES);

    const res = coursesService.findAllCourses();

    res.subscribe(courses => expect(courses).toEqual(expectedCourses));

    const req = httpTestingController.expectOne('/api/courses');
    req.flush({payload: httpReturnCourses});

    expect(req.request.method).toBe("GET");
  });

  it("findCourseById should return expected course", () => {
    const expectedCourse = COURSES[12] as Course;

    const res = coursesService.findCourseById(12);

    res.subscribe(course => expect(course).toEqual(expectedCourse));

    const req = httpTestingController.expectOne('/api/courses/12');
    req.flush(expectedCourse);

    expect(req.request.method).toBe("GET");
  });

  describe("saveCourse should", () => {
    it("return expected course", () => {
      const change = {category: "New category"} as Partial<Course>;
      const expectedCourse = {...COURSES[1], ...change};

      const res = coursesService.saveCourse(1, change);

      res.subscribe(course => expect(course).toEqual(expectedCourse));

      const req = httpTestingController.expectOne('/api/courses/1');
      req.flush(expectedCourse);

      expect(req.request.method).toBe("PUT");
    });

    it("throw an error", () => {
      const expectedErrorProps = {status: 500, statusText: "Server error"};
      const mockError = new ProgressEvent("error");
      const change = {category: "New category"} as Partial<Course>;

      const res = coursesService.saveCourse(1, change);

      res.subscribe({
        next: () => fail("Should throw an error"),
        error: error => {
          expect(error.status).toBe(expectedErrorProps.status);
          expect(error.statusText).toBe(expectedErrorProps.statusText);
        },
      });

      const req = httpTestingController.expectOne('/api/courses/1');
      req.error(mockError, expectedErrorProps);

      expect(req.request.method).toBe("PUT");
    });
  })

  it("findLessons should return expected lessons", () => {
    const expectedLessons = (findLessonsForCourse(1) as Lesson[]).slice(0, 3);

    coursesService.findLessons(1).subscribe(lessons => expect(lessons).toBe(expectedLessons));

    const req = httpTestingController.expectOne(request => request.url === "/api/lessons");
    req.flush({payload: expectedLessons});

    expect(req.request.method).toBe("GET");
    expect(req.request.params.get("courseId")).toBe("1");
    expect(req.request.params.get("filter")).toBe("");
    expect(req.request.params.get("sortOrder")).toBe("asc");
    expect(req.request.params.get("pageNumber")).toBe("0");
    expect(req.request.params.get("pageSize")).toBe("3");
  });
});
