import { getNumberOfGrades, getFirstGrade, getLastGrade, getAverageGrade } from './stats.js'
import { Notification } from '../components/notification.js'

const gradesForm = document.querySelector('#grades-form') // получение формы
const yourGrade = document.querySelector('#your-grade') // получение инпута
const gradeList = document.querySelector('#grade-list') // получение истории оценок
const sortSelect = document.querySelector('#sort') // получение селекта (сортировка)

const grades = [14, 9, 13, 15, 18]

export function addSortEventListener(grades) {
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const selectedValue = sortSelect.value

      if (selectedValue === 'asc') {
        grades.sort((a, b) => a - b)
      } else if (selectedValue === 'desc') {
        grades.sort((a, b) => b - a)
      }

      updateGradesHistory(grades)
    })
  }
}

addSortEventListener(grades)

/**
 *
 * Функция для отрисовки истории оценок
 * @param {array} grades - массив оценок
 */
export function updateGradesHistory(grades) {
  if (gradeList) {
    gradeList.innerHTML = ''

    grades.forEach(function (grade, index) {
      const listItemHTML = `
        <li>
          <span class="grade">${grade}</span>
          <div class="btn-icon" data-variant="ghost" data-index="${index}">
            <div data-icon="icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1 13H15V14H1V13ZM12.7 4.5C13.1 4.1 13.1 3.5 12.7 3.1L10.9 1.3C10.5 0.9 9.9 0.9 9.5 1.3L2 8.8V12H5.2L12.7 4.5ZM10.2 2L12 3.8L10.5 5.3L8.7 3.5L10.2 2ZM3 11V9.2L8 4.2L9.8 6L4.8 11H3Z" fill="#161616"/>
              </svg>
            </div>
          </div>
          <!-- Button "Danger-Ghost" icon -->
          <div class="btn-icon" data-variant="danger-ghost" data-index="${index}">
            <div data-icon="icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1H6V2H10V1ZM2 3V4H3V14C3 14.6 3.4 15 4 15H12C12.6 15 13 14.6 13 14V4H14V3H2ZM4 14V4H12V14H4ZM6 6H7V12H6V6ZM10 6H9V12H10V6Z" fill="#161616"/>
              </svg>
            </div>
          </div>
        </li>
      `
      gradeList.insertAdjacentHTML('beforeend', listItemHTML) // вставка шаблона в историю оценок

      const editButtons = document.querySelectorAll('[data-variant="ghost"]') // получение всех кнопок удаления
      const deleteButtons = document.querySelectorAll('[data-variant="danger-ghost"]') // получение всех кнопок удаления

      editButtons.forEach((button) => {
        button.addEventListener('click', handleEditClick) // подписываемся на событие для каждой кнопки
      })

      deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteClick) // подписываемся на событие для каждой кнопки
      })
    })
  }
}

// Функция редактирования оценки
function handleEditClick(event) {
  const index = event.currentTarget.dataset.index

  const newGrade = prompt('Enter you new grade:')

  if (newGrade !== null && newGrade !== '') {
    grades[index] = Number.parseInt(newGrade, 10)
    updateGradesHistory(grades) // Обновили историю
    render(grades) // показываем в таблице актуальные данные
  }
}

// Функция удаления оценки
function handleDeleteClick(event) {
  const index = event.currentTarget.dataset.index
  console.log('index', index)

  const confirmationMessage = 'Вы действительно хотите удалить оценку?'
  const isConfirmed = confirm(confirmationMessage)

  if (isConfirmed) {
    grades.splice(index, 1) // удаляем оценку по индексу в кол-ве 1 оценки

    updateGradesHistory(grades) // Обновили историю

    // notification
    const notificationInfo = new Notification({
      variant: 'yellow',
      title: 'Удаление оценки:',
      subtitle: 'оценка удалена',
    })

    console.log(notificationInfo)

    render(grades) // показываем в таблице актуальные данные
  }
}

/**
 *
 * Функция для отрисовки данных
 * @param {array} grades - массив оценок
 */
export function render(grades) {
  const tbody = document.querySelector('#stats-table tbody')

  if (tbody) {
    tbody.innerHTML = `
    <tr>
        <td>${getNumberOfGrades(grades)}</td>
        <td>${getFirstGrade(grades)}</td>
        <td>${getLastGrade(grades)}</td>
        <td>${getAverageGrade(grades)}</td>
    </tr>`

    updateGradesHistory(grades)
  }
}

if (gradesForm) {
  gradesForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newGrade = Number.parseInt(yourGrade.value, 10)

    grades.push(newGrade)
    yourGrade.value = ''
    render(grades)

    // notification
    const notificationInfo = new Notification({
      variant: 'green',
      title: 'Добавление оценки:',
      subtitle: 'оценка добавлена',
    })

    console.log(notificationInfo)
  })
}

render(grades)
