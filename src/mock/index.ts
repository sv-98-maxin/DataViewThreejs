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

export function scatterData() {
  return Mock.mock({
    'list': [
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
      [Mock.Random.float(0, 500), Mock.Random.integer(0, 50000)],
    ]
  }).list
}

export function barData() {
  return Mock.mock({
    'list': [
      Mock.Random.integer(0, 200),
      Mock.Random.integer(0, 200),
      Mock.Random.integer(0, 200),
      Mock.Random.integer(0, 200),
      Mock.Random.integer(0, 200),
      Mock.Random.integer(0, 200),
      Mock.Random.integer(0, 200),
    ]
  }).list
}
export function lineData() {
  return Mock.mock({
    'list': [
      Mock.Random.integer(0, 250),
      Mock.Random.integer(0, 250),
      Mock.Random.integer(0, 250),
      Mock.Random.integer(0, 250),
      Mock.Random.integer(0, 250),
      Mock.Random.integer(0, 250),
      Mock.Random.integer(0, 250),
    ]
  }).list
}

export function radarData() {
  return Mock.mock({
    'list': [
      {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2010
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2011
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2012
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2013
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2014
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2015
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2016
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2017
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2018
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2019
      }, {
        'value': [
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),
          Mock.Random.integer(0, 400),

        ],
        'name': 2020
      }
    ]
  }).list
}