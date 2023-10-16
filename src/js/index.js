import { Modal } from './components/modal'
import { format } from 'date-fns'
// Модалка формы (первый параметр - какая модалка должна открываться, второй параметр кнопка по клику на которую модалка открывается)
const modalForm = new Modal('#modal', '#signup')
// Модалка навигации в мобилке
const modalNav = new Modal('#modal-nav', '.burger-menu')
// const panel = new Sidebar('#sidebar', '#show-history')
const caseForm = document.querySelector('#case-form') //получение доступа к форме ввода данных
const yourAssignments = document.querySelector('#your-assignments') //получение доступа к вводимому значению
const toDoList = document.querySelector('#to-do-list') //получение доступа к списку дел
const prioritySelect = document.querySelector('#sort') //получение доступа к select
let priority = 'low'

let arrayOfCasses = []
if (localStorage.getItem('arrayOfCasses')) {
  arrayOfCasses = JSON.parse(localStorage.getItem('arrayOfCasses'))
  updateToDoList(arrayOfCasses)
}

prioritySelect.addEventListener('change', () => {
  const selectedValue = prioritySelect.value

  if (selectedValue === 'high') {
    priority = 'high'
  } else if (selectedValue === 'medium') {
    priority = 'medium'
  } else if (selectedValue === 'low') {
    priority = 'low'
  }
})
// Функция для отрисовки данных
function updateToDoList(arrayOfCasses) {
  if (arrayOfCasses) {
    toDoList.innerHTML = ''

    arrayOfCasses.forEach((arrayOfCasses, index) => {
      const priorityClass = getPriorityClass(arrayOfCasses.priority)
      const doneClass = getDoneClass(arrayOfCasses.done)
      const listItemHTML = `
<li class='my-li'>
<div class="card flex ${priorityClass}">
  <span class="grade ${doneClass}">${arrayOfCasses.text}. Создано :${arrayOfCasses.date}</span>
  <div class="btn-icon" data-variant="mark" data-index="${index}">
    <div data-icon="icon">
    <svg width="16" height="16" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 8.99997L0 4.49997L0.707 3.79297L4.5 7.58547L11.293 0.792969L12 1.49997L4.5 8.99997Z" fill="#161616"/>
    </svg>

    </div>
  </div>
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
  </div>
</li>
`
      toDoList.insertAdjacentHTML('beforeend', listItemHTML)
      const crossoutButtons = document.querySelectorAll('[data-variant="mark"]')
      crossoutButtons.forEach((button) => {
        button.addEventListener('click', handleCroseoutButtons)
      })
      const editButtons = document.querySelectorAll('[data-variant="ghost"]')
      editButtons.forEach((button) => {
        button.addEventListener('click', handleEditButtons)
      })
      const deleteButtons = document.querySelectorAll('[data-variant="danger-ghost"]')
      deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteButtons)
      })
    })
  }
}
function getPriorityClass(priority) {
  switch (priority) {
    case 'high':
      return 'card-high-priority'
    case 'medium':
      return 'card-medium-priority'
    case 'low':
      return 'card-low-priority'
    default:
      return ''
  }
}
function getDoneClass(done) {
  switch (done) {
    case true:
      return 'task-title--done'
    case false:
      return ''
  }
}
//кнопка зачеркнуть дело
function handleCroseoutButtons(event) {
  const index = event.currentTarget.dataset.index
  arrayOfCasses[index].done = !arrayOfCasses[index].done
  saveToLocalStorage()
  updateToDoList(arrayOfCasses)
}
// кнопки изменения
function handleEditButtons(event) {
  const index = event.currentTarget.dataset.index
  const newCase = prompt('Enter new value:')
  if (newCase !== null && newCase !== '') {
    arrayOfCasses[index].text = newCase
    saveToLocalStorage()
    updateToDoList(arrayOfCasses)
  }
}
// кнопки удаления
function handleDeleteButtons(event) {
  const index = event.currentTarget.dataset.index
  const isConfirmed = confirm('Are you sure you want to delete')
  if (isConfirmed) {
    arrayOfCasses.splice(index, 1)
    saveToLocalStorage()
    updateToDoList(arrayOfCasses)
  }
}
if (caseForm) {
  caseForm.addEventListener('submit', (event) => {
    event.preventDefault()
    arrayOfCasses = addItem(arrayOfCasses, yourAssignments.value, priority, 'dd.MM.yyyy HH:mm', false)
    yourAssignments.value = ''
    saveToLocalStorage()
    updateToDoList(arrayOfCasses)
  })
}
// Добавление объекта в массив данных
function addItem(items, text, priority, dateFormat, done) {
  const newitem = {
    text,
    date: formatDate(new Date(), dateFormat),
    priority,
    done,
  }
  items.push(newitem)

  return items
}

function formatDate(date, dateFormat) {
  return format(date, dateFormat)
}
function saveToLocalStorage() {
  localStorage.setItem('arrayOfCasses', JSON.stringify(arrayOfCasses))
}
