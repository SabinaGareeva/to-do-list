/**
 * @jest-environment jsdom
 */

import { initButton } from '../../js/tests-example/button'

describe('Button', () => {
  let button
  let message

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="myButton">Click Me</button>
      <div id="message" style="display: none;">Hello, World!</div>
    `

    button = document.getElementById('myButton')
    message = document.getElementById('message')

    initButton()
  })

  it('показать сообщение при клике', () => {
    expect(message.style.display).toBe('none')

    button.click()

    expect(message.style.display).toBe('block')
  })
})
