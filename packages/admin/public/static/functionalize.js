function functionalize(fun) {
  return function () {
    return fun.call.apply(fun, arguments);
  };
}

var substr = functionalize(''.substr);
alert(substr('hello', 1, 2));
