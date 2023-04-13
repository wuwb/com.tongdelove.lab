function addFavorite() {
  if (document.all) {
    window.external.AddFavorite(window.location, document.title);
  } else if (window.sidebar) {
    window.sidebar.addPanel(document.title, window.location, '');
  } else if (window.opera && window.print) {
    return false;
  } else {
    alert('"抱歉！您的浏览器不支持直接加入收藏夹，请按 Ctrl + D 手动加入收藏夹');
  }
}
