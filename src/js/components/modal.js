export class Modal {
  /**
   * Создает экземпляр класса Modal.
   * @param {string} modalSelector - Модальное окно.
   * @param {string} openBtnSelector - Кнопка открытия модального окна.
   * @param {string} closeBtnSelector - Кнопка закрытия модального окна.
   */
  constructor(modalSelector, openBtnSelector) {
    this.modal = document.querySelector(modalSelector)
    this.openBtn = document.querySelector(openBtnSelector)
    this.closeBtn = this.modal.querySelector('#close-modal')

    // Привязываем обработчики событий к экземпляру класса
    this.handleOpenClick = this.handleOpenClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.modal.addEventListener('click', this.closeOnBackdropClick.bind(this))

    this.attachListeners()
  }

  /**
   * Открывает модальное окно.
   */
  open() {
    this.modal.showModal()
    this.initialFormValues = this.getFormValues()
  }

  /**
   * Закрывает модальное окно и очищает поля.
   */
  close() {
    this.modal.close()
    this.clearFields()
  }

  /**
   * Добавляет обработчик события клика на фоне модального окна для закрытия модального окна.
   * Закрытие модального окна при клике на фон
   * @param {MouseEvent} event - Событие клика мыши.
   */
  closeOnBackdropClick(event) {
    const isClickedOnBackdrop = event.target === this.modal
    if (isClickedOnBackdrop) {
      this.isFormChanged() ? this.confirmCloseModal() : this.close()
    }
  }

  /**
   * Получает текущие значения полей формы.
   */
  getFormValues() {
    const formElements = this.modal.querySelectorAll('input, select, textarea')
    const values = {}
    formElements.forEach((element) => {
      values[element.name] = element.value
    })
    return values
  }

  /**
   * Проверяет, были ли изменены данные в форме.
   */
  isFormChanged() {
    const currentFormValues = this.getFormValues()
    for (const key in currentFormValues) {
      if (currentFormValues[key] !== this.initialFormValues[key]) {
        return true
      }
    }
    return false
  }

  /**
   * Очищает текстовые поля и области с текстом ошибок.
   */

  clearFields() {
    const formElementsToClear = this.modal.querySelectorAll('input, select, textarea')
    const errorFieldsToClear = this.modal.querySelectorAll('.input-error')

    if (formElementsToClear) {
      formElementsToClear.forEach((element) => {
        element.value = '' // Очищаем значение элемента формы

        if (element.tagName === 'SELECT') {
          element.selectedIndex = -1 // Сбрасываем выбор в селекте
        }
      })
    }

    if (errorFieldsToClear) {
      errorFieldsToClear.forEach((errorField) => {
        errorField.textContent = '' // Очищаем текст ошибок
      })
    }
  }

  /**
   * Прикрепляет обработчики событий.
   */
  attachListeners() {
    this.openBtn.addEventListener('click', this.handleOpenClick)
    this.closeBtn.addEventListener('click', this.handleCloseClick)
    this.modal.addEventListener('keydown', this.handleKeyDown)
  }

  /**
   * Удаляет обработчики событий.
   */
  removeListeners() {
    this.openBtn.removeEventListener('click', this.handleOpenClick)
    this.closeBtn.removeEventListener('click', this.handleCloseClick)
    this.modal.removeEventListener('keydown', this.handleKeyDown)
  }

  /**
   * Обработчик события клика на кнопке открытия.
   */
  handleOpenClick() {
    this.open()
  }

  /**
   * Отображает подтверждение закрытия модального окна.
   */
  confirmCloseModal() {
    const confirmationMessage = 'Данные были изменены. Действительно хотите закрыть модальное окно?'
    const isConfirmed = confirm(confirmationMessage)
    if (isConfirmed) {
      this.close()
    }
  }

  /**
   * Обработчик события клика на кнопке закрытия.
   */
  handleCloseClick() {
    if (this.isFormChanged()) {
      this.confirmCloseModal()
    } else {
      this.close()
    }
  }

  /**
   * Обработчик события нажатия клавиши.
   * @param {KeyboardEvent} event - Событие нажатия клавиши.
   */
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      if (this.isFormChanged()) {
        this.confirmCloseModal()
      } else {
        this.close()
      }
    }
  }
}
