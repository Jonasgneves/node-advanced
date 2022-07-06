class LoginController {
  async handle (httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The field token is Required')
    }
  }
}

type HttpResponse = {
  statusCode: number
  data: any
}

describe('LoginController', () => {
  it('should return 400 if token is empty', async () => {
    const sut = new LoginController()

    const httpResponse = await sut.handle({ token: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is Required')
    })
  })

  it('should return 400 if token is null', async () => {
    const sut = new LoginController()

    const httpResponse = await sut.handle({ token: null })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is Required')
    })
  })

  it('should return 400 if token is undefined', async () => {
    const sut = new LoginController()

    const httpResponse = await sut.handle({ token: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is Required')
    })
  })
})
