/**
 * @jest-environment jsdom
 */

import SimpleComponent from '../../js/tests-example/simple'

describe('SimpleComponent', () => {
  let simpleComponent

  beforeEach(() => {
    simpleComponent = new SimpleComponent()
    simpleComponent.create() // Создаем DOM-элемент перед каждым тестом
  })

  afterEach(() => {
    simpleComponent.destroy() // Удаляем DOM-элемент после каждого теста
  })

  it('должен добавлять класс', () => {
    simpleComponent.addClass('test-class')
    expect(simpleComponent.element.classList.contains('test-class')).toBe(true)
  })

  it('должен удалять класс', () => {
    simpleComponent.addClass('test-class')
    simpleComponent.removeClass('test-class')
    expect(simpleComponent.element.classList.contains('test-class')).toBe(false)
  })
})
