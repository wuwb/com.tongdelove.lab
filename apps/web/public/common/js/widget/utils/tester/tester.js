'use strict';

var should = require('chai').should()
var requirejs = require('requirejs')

var settings = require('./settings.js')

// requirejs配置
requirejs.config({
  baseUrl: '.',
  nodeRequire: require
})

// 启动测试用例
function run(runingData) {
  var testFile = runingData['fn']['file'];
  
  describe(testFile, function() {
    var testMod

    // load test function
    before(function(done) {
      requirejs([testFile], function(mod) {
        testMod = mod
        done()
      })
    })

    // subMethod
    if (!runingData['fn']['methods']) { // single function

      var testData = runingData['data'];

      it(testFile + ' check', function() {
        for (var j = 0, l = testData.length; j < l; j++) {
          if (typeof testData[j]['return'] === 'object') {
            testMod.apply(testMod, testData[j]['params']).should.deep.equal(testData[j]['return'])
          } else {
            testMod.apply(testMod, testData[j]['params']).should.equal(testData[j]['return'])
          }
        }
      })

    } else if (typeof runingData['fn']['methods'] === 'object'
      && runingData['fn']['methods'].length > 0) { // object function

      for (var i = 0, len = runingData['fn']['methods'].length; i < len; i++) {

        (function(subMethod) {
          describe('#' + subMethod + '()', function() {
            var testData = runingData['data'][subMethod];
            it(testFile + ' ' + subMethod + ' check', function() {
              for (var j = 0, l = testData.length; j < l; j++) {
                if (typeof testData[j]['return'] === 'object') {
                  testMod[subMethod].apply(testMod, testData[j]['params']).should.deep.equal(testData[j]['return'])
                } else {
                  testMod[subMethod].apply(testMod, testData[j]['params']).should.equal(testData[j]['return'])
                }
              }
            })
          })
        }(runingData['fn']['methods'][i]))

      }

    }

  })
}

for (var test in settings) {
  run(settings[test])
}
