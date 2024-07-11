'use strict';

module.exports = {
  'data': {
    'validSmsCode': [{
      'params': ['YWJj'],
      'return': false
    }, {
      'params': ['cHVqaWU'],
      'return': false
    }, {
      'params': ['5231'],
      'return': true
    }, {
      'params': ['12321'],
      'return': true
    }, {
      'params': ['123211'],
      'return': true
    }, {
      'params': ['123'],
      'return': false
    }, {
      'params': ['1231221'],
      'return': false
    }],
    'validMobile': [{
      'params': ['13291919291'],
      'return': true
    }, {
      'params': ['18291919191'],
      'return': true
    }, {
      'params': ['18291919191a'],
      'return': false
    }, {
      'params': ['182919191914'],
      'return': false
    }, {
      'params': ['08291919191'],
      'return': false
    }, {
      'params': ['13892929919'],
      'return': true
    }, {
      'params': ['17792991929'],
      'return': true
    }, {
      'params': ['16029291929'],
      'return': false
    }, {
      'params': ['12319199191'],
      'return': false
    }, {
      'params': ['abaadfassad'],
      'return': false
    }],
    'validName': [{
      'params': ['扑街'],
      'return': true
    }, {
      'params': ['啊啊·啊啊啊'],
      'return': true
    }, {
      'params': ['xxxx'],
      'return': false
    }, {
      'params': ['陈大发'],
      'return': true
    }, {
      'params': ['·······'],
      'return': false
    }, {
      'params': ['小苹果'],
      'return': true
    }, {
      'params': ['军爷'],
      'return': true
    }],
    'validIDCard': [{
      'params': ['110101201401019959'],
      'return': true
    }, {
      'params': ['360701200110062046'],
      'return': true
    }, {
      'params': ['54242419770215391X'],
      'return': true
    }, {
      'params': ['650204198008108758'],
      'return': true
    }, {
      'params': ['372718198002197712'],
      'return': false
    }, {
      'params': ['54242419770215391A'],
      'return': false
    }, {
      'params': ['37271819800219771'],
      'return': false
    }, {
      'params': ['3727181980021977111'],
      'return': false
    }]
  },

  'fn': {
    'file': 'verify',
    'methods': ['validSmsCode', 'validMobile', 'validName', 'validIDCard'],
  }
}