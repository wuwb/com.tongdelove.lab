'use strict';

module.exports = {
  'data': {
    'encode': [{
      'params': ['abc'],
      'return': 'YWJj'
    }, {
      'params': ['pujie'],
      'return': 'cHVqaWU='
    }],
    'decode': [{
      'params': ['YWJj'],
      'return': 'abc'
    }, {
      'params': ['cHVqaWU='],
      'return': 'pujie'
    }],
  },

  'fn': {
    'file': 'base64',
    'methods': ['encode', 'decode']
  }
}