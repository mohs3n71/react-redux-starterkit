import Faker from 'faker'
import cloneDeep from 'lodash/cloneDeep'
import {getTimestamp} from '../../utils/moments'

const choice = Faker.random.number({
  min: 0,
  max: 1
}) === 0 ? 'SINGLE' : 'MULTIPLE'

const formats = [
  'NUMERIC', 'TEXT',
  'TEXTCHOICE', 'BOOLEAN',
  'SCALE', 'VALUEPICKER',
  'SUBMISSIONDATE'
]

const questionMock = [
  {
    choice,
    description: Faker.lorem.sentence(),
    format: formats[Faker.random.number({min: 0, max: 6})],
    id: (Math.random() * 1e32).toString(36),
    lowerBound: Faker.random.number({
      min: 1,
      max: 13
    }),
    options: [
      Faker.lorem.words()
    ],
    order: Faker.random.number({
      min: 0,
      max: 100
    }),
    page: Faker.random.number({
      min: 0,
      max: 100
    }),
    pageText: Faker.lorem.sentence(),
    question: Faker.lorem.sentence(),
    required: Faker.random.number({
      min: 0,
      max: 1
    }),
    upperBound: Faker.random.number({
      min: 1,
      max: 13
    })
  }
]

export const questionsMock = cloneDeep(questionMock)

export const formMock = [{
  id: (Math.random() * 1e32).toString(36),
  date: getTimestamp(),
  name: Faker.name.findName(),
  questions: cloneDeep(questionMock)
}]

export const formsMock = cloneDeep(formMock)

export const errorMocks = {
  400: {
    response: {
      status: 400
    }
  },
  403: {
    response: {
      status: 403
    }
  }
}
