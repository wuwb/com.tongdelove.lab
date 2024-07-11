/**
 * Miller同学发现的IE6 bug：如以下代码，点击textarea时，引发window的blur，导致focus与blur配对混乱：
 * 上网查也没查出关于这个bug的官方说明与推荐解决方案，只好自己生更的实现一个解决方案。
 */
(function(){
  var focusTimer = 0;
  function myBlur(){
    document.title= 'blur:' + Math.random() ;
  }
  function myFocus(){
    clearTimeout(focusTimer);
    focusTimer = setTimeout(function(){
      document.title = 'focus:' + Math.random() ;
    },10);
  }
  window.onfocus = document.body.onfocusin = myFocus;
  window.onblur = document.body.onfocusout = myBlur;
}());
