/*
 * 处理编辑页面
 * rufeng 2013-12-22
 */
(function ($) {
  var $form = $(document.forms['doc']);
  $form.on('submit', function (ev) {
    ev.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/submit',
      data: $form.serializeArray(),
      success: function (data) {
        if (data._id) {
          window.location.href = '/doc/detail/' + data._id;
        } else {
          alert('都是熟人，别打我：\r\n' + JSON.stringify(data, undefined, 2));
        }
      },
    });
  });
})(jQuery);
