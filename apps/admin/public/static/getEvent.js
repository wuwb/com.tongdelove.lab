/**
 * 获得event对象
 * @param {event} event    (Optional)event对象 默认为调用位置所在宿主的event
 * @param {element} element (Optional)任意element对象 element对象所在宿主的event
 * @return {event} event对象
 */
function getEvent(event, element) {
  if (event) {
    return event;
  } else if (element) {
    if (element.document) {
      return element.document.parentWindow.event;
    }
    if (element.parentWindow) {
      return element.parentWindow.event;
    }
  }

  if (window.event) {
    return window.event;
  } else {
    var f = arguments.callee;
    do {
      if (/Event/.test(f.arguments[0])) {
        return f.arguments[0];
      }
    } while ((f = f.caller));
  }
}
