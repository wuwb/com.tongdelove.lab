/**
 * 判断form的内容是否有改变
 * @method    isFormChanged
 * @param    {element}    el            form对象
 * @param    {string}    filter    (Optional)    过滤函数,会被循环调用传递给item作参数要求返回布尔值判断是否过滤
 * @return    {bool}                    是否改变
 */
var isFormChanged = function (el, filter) {
  el = g(el);
  filter =
    filter ||
    function (el) {
      return false;
    };

  var els = el.elements,
    l = els.length,
    i = 0,
    j = 0,
    el,
    opts;

  for (; i < l; ++i, j = 0) {
    el = els[i];

    switch (el.type) {
      case 'text':
      case 'hidden':
      case 'password':
      case 'textarea':
        if (filter(el)) break;
        if (el.defaultValue != el.value) return true;
        break;
      case 'radio':
      case 'checkbox':
        if (filter(el)) break;
        if (el.defaultChecked != el.checked) return true;
        break;
      case 'select-one':
        j = 1;
      case 'select-multiple':
        if (filter(el)) break;
        opts = el.options;
        for (; j < opts.length; ++j) {
          if (opts[j].defaultSelected != opts[j].selected) return true;
        }
        break;
    }
  }

  return false;
};
