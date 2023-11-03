import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";

describe("Calculator service", () => {
  let calculatorService: CalculatorService;
  beforeEach(() => {
    calculatorService = new CalculatorService(new LoggerService());
  });

  it("should add two numbers", () => {
    const res = calculatorService.add(2, 3);

    expect(res).toBe(5);
  });

  it("should subtract two numbers", () => {
    const res = calculatorService.subtract(2, 3);

    expect(res).toBe(-1);
  });
});
