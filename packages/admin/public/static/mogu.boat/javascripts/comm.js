(function ($) {
  var comm = comm || {};

  comm.util = {
    postData: function (url, type, params, callback) {
      $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        data: params,
      })
        .done(function (data) {
          callback && callback(data);
        })
        .fail(function () {
          console.log('error');
        })
        .always(function () {
          console.log('complete');
        });
    },
  };

  comm.domEvent = (function () {
    //菜单切换
    // var switchMenu = function(){
    //     var show = false, $head = $('.head');
    //     $(document).on('click', '.menu-icon', function(){

    //         if(!show){
    //             $head.stop().animate({height: '101px'}, 'slow');
    //             show = true;
    //         }else{
    //             $head.stop().animate({height: '50px'}, 'slow');
    //             show = false;
    //         }

    //     });
    // }

    // 删除单个内容
    var delItem = function () {
      $(document).on('click', '.del', function () {
        var $this = $(this),
          $li = $this.closest('li'),
          url = $this.data('url');

        if (confirm('亲，你真的要删除吗？')) {
          comm.util.postData(url, 'post', {}, function (data) {
            if (data.code == 1001) {
              $li.animate({ height: 0 }, 'slow', function () {
                $li.remove();
              });
            }
          });
        }
      });
    };

    // 切换字体
    var changeFont = function () {
      var $modal = $('#view-mode-modal'),
        curFont = '';

      // 字体初始化 根据localstorage判断
      if (window.localStorage) {
        curFont = window.localStorage.font;
        if (curFont) {
          $('body').removeClass('font1 font2');
          $('body').addClass(curFont);

          $('.font').each(function (i, item) {
            if ($(item).data('font') == curFont) {
              $('.font').removeClass('active');
              $(item).addClass('active');
            }
          });
        }
      }

      $('.nav-bar').on('click', '.change-font', function () {
        $modal.toggleClass('hidden');
      });

      $modal.on('click', '.font', function () {
        var $this = $(this),
          $font = $this.data('font');

        $('.font').removeClass('active');
        $(this).addClass('active');

        $('body').removeClass('font1').removeClass('font2 font1');
        $('body').addClass($font);

        if (window.localStorage) {
          window.localStorage.font = $font;
        }
      });
    };

    var initialize = function () {
      // switchMenu();
      delItem();
      changeFont();
    };

    return {
      init: initialize,
    };
  })();

  $(function () {
    comm.domEvent.init();
  });
})(jQuery);
