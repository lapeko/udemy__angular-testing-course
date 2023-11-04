import {TestBed} from "@angular/core/testing";

import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";

describe("Calculator service", () => {
  let calculatorService: CalculatorService;
  let loggerSpyService: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    loggerSpyService = jasmine.createSpyObj("LoggerService", ["log"])

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide :LoggerService, useValue: loggerSpyService},
      ]
    });

    calculatorService = TestBed.inject(CalculatorService);
    loggerSpyService = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  it("should add two numbers", () => {
    const res = calculatorService.add(2, 3);

    expect(res).toBe(5);
    expect(loggerSpyService.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const res = calculatorService.subtract(2, 3);

    expect(res).toBe(-1);
    expect(loggerSpyService.log).toHaveBeenCalledTimes(1);
  });
});
