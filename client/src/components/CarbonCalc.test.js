import { trainCalculator, planeCalculator } from "../components/CarbonCalc";

describe("trainCalculator", () => {
  it("returns 0 when no distance is passed in", () => {
    expect(trainCalculator(0)).toEqual(0);
  });
});
