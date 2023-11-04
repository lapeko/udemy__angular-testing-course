import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

import {CoursesService} from "./courses.service";
import {Course} from "../model/course";

describe("CoursesService", () => {
  let coursesService: CoursesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj("HttpClient", ["get", "put"]);

    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        {provide: HttpClient, useValue: httpSpy},
      ]
    })

    coursesService = TestBed.inject(CoursesService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it("should return expected courses (HttpClient called once)", (done) => {
    const expectedCourses: Course[] = [{} as Course];
    httpClientSpy.get.and.returnValue(of({payload: expectedCourses}));

    const res = coursesService.findAllCourses();

    res.subscribe(courses => {
      console.log(courses);
      expect(courses).toEqual(expectedCourses);
      done();
    });
  });
});
