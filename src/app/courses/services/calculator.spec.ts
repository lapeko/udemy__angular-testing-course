import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";

describe("Calculator service", () => {
  let calculatorService: CalculatorService;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = jasmine.createSpyObj("LoggerService", ["log"])
    calculatorService = new CalculatorService(loggerService);
  });

  it("should add two numbers", () => {
    const res = calculatorService.add(2, 3);

    expect(res).toBe(5);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const res = calculatorService.subtract(2, 3);

    expect(res).toBe(-1);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });
});
