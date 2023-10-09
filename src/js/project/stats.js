/*
 * @param {array} grades
 */
export function getNumberOfGrades(grades) {
  return grades.length
}

/*
 * @param {array} grades
 */
export function getFirstGrade(grades) {
  return grades[0]
}

/*
 * @param {array} grades
 */
export function getLastGrade(grades) {
  return grades.at(-1)
}

/*
 * @param {array} grades
 */
export function getAverageGrade(grades) {
  if (grades.length === 0) {
    return 0
  }
  let sum = 0
  for (let i = 0; i < grades.length; i++) {
    sum += grades[i]
  }

  return sum / grades.length
}
