import { titleFormatter } from '../../js/tests-example/index'

describe('titleFormatter', () => {
  it('форматирует заголовки', () => {
    const formattedTitle = titleFormatter(['test', 'test2'])
    expect(formattedTitle).toEqual('test — test2')
  })
})
