import { App } from '@app'

describe('App Express', () => {
  const app = new App().core
  it('should to be able created a app typeof express', () => {
    expect(app).toBeDefined()
  })
})
