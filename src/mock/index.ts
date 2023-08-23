import Mock from 'mockjs'

export function getPieData() {
  return Mock.mock({
    'list': [{
      'value': Mock.Random.integer(20, 700),
      'name': Mock.Random.word(5)
    },
    {
      'value': Mock.Random.integer(20, 700),
      'name': Mock.Random.word(5)
    }, {
      'value': Mock.Random.integer(20, 700),
      'name': Mock.Random.word(5)
    }, {
      'value': Mock.Random.integer(20, 700),
      'name': Mock.Random.word(5)
    }, {
      'value': Mock.Random.integer(20, 700),
      'name': Mock.Random.word(5)
    }]
  }).list
}

export function getWordCloudData() {
  return Mock.mock({
    'list|1-4': [
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
      [Mock.Random.word(2, 10), Mock.Random.integer(10, 30)],
    ]
  }).list
}