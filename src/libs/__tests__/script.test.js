import { addSortEventListener, updateGradesHistory, render } from "../../js/project/script";


/**
 * @jest-environment jsdom
 */

// мокаем DOM
document.body.innerHTML = `
<form id="grades-form" action="#">
  <div class="select-container">
    <label for="sort">Сортировать по:</label>
    <select id="sort" name="sort">
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 11L3 6L3.7 5.3L8 9.6L12.3 5.3L13 6L8 11Z" fill="#161616"/>
    </svg>
  </div>
</form>
<!-- Для отображения истории оценок -->
<div id="grades-history">
  <h2>Grades History</h2>
  <ul id="grade-list"></ul>
</div>
<!-- Для отображения таблицы оценок -->
<table border="1" id="stats-table" class="table table-center">
  <thead>
    <tr>
      <th width="25%">Number of tests taken</th>
      <th width="25%">First submitted grade</th>
      <th width="25%">Last submitted grade</th>
      <th width="25%">Average grade</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
`


describe('addSortEventListener', () => {
  const grades = [14, 9, 13, 15, 18]
  const sortSelect = document.querySelector('#sort')

  it('should sort grades in ascending when "asc" is selected', () => {
    addSortEventListener(grades)

    // trigger the 'asc' option selection
    sortSelect.value = 'asc'
    sortSelect.dispatchEvent(new Event('change'))

    // check if grades are sorted in ascending order
    expect(grades.sort((a, b) => a - b)).toEqual(grades)
  })

  it('should sort grades in ascending when "desc" is selected', () => {
    addSortEventListener(grades)

    // trigger the 'desc' option selection
    sortSelect.value = 'desc'
    sortSelect.dispatchEvent(new Event('change'))

    // check if grades are sorted in ascending order
    expect(grades.sort((a, b) => b - a)).toEqual(grades)
  })
})


describe('updateGradesHistory', () => {
  let gradeList

  beforeEach(() => {
    // create mock of gradeList element
    gradeList = document.querySelector('#grade-list')
  })

  it('should update the grade list with provided grades', () => {
    const grades = [14, 9, 13, 15, 18]

    render(grades)

    updateGradesHistory(grades)

    console.log(updateGradesHistory(grades))
  })
})