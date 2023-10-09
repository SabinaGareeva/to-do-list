import { getNumberOfGrades, getFirstGrade, getLastGrade, getAverageGrade } from '../../js/project/stats'

describe("getNumberOfGrades", () => {
  it("should return number of grades", () => {
    expect(getNumberOfGrades([1, 2, 3])).toBe(3);
    expect(getNumberOfGrades([10, 20, 30, 40])).toBe(4);
  });
});

describe("getFirstGrade", () => {
  it("should return first grade", () => {
    expect(getFirstGrade([1, 2, 3])).toBe(1);
    expect(getFirstGrade([10, 20, 30, 40])).toBe(10);
  });
});

describe("getLastGrade", () => {
  it("should return last grade", () => {
    expect(getLastGrade([1, 2, 3])).toBe(3);
    expect(getLastGrade([10, 20, 30, 40])).toBe(40);
  });
});
