import Faker from 'faker'

export const successMock = {
  authToken: (Math.random() * 1e32).toString(36),
  userId: (Math.random() * 1e32).toString(36),
  userName: Faker.internet.userName()
}

export const server = 'https://pmft01.medopadapi.com'

export const errorMocks = {
  400: {
    response: {
      status: 400
    }
  },
  401: {
    response: {
      status: 401
    }
  }
}
