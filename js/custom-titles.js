// 修改首页中间标题和导航栏左上角标题
document.addEventListener('DOMContentLoaded', function () {
  // 首页中间大标题
  var siteTitle = document.getElementById('site-title');
  if (siteTitle) siteTitle.textContent = '《夜的第七章》';

  // 导航栏左上角站点名称
  var navTitle = document.querySelector('.nav-site-title .site-name');
  if (navTitle) navTitle.textContent = 'Un';
});

// 兼容 pjax 跳转后重新执行
document.addEventListener('pjax:complete', function () {
  var siteTitle = document.getElementById('site-title');
  if (siteTitle) siteTitle.textContent = '《夜的第七章》';

  var navTitle = document.querySelector('.nav-site-title .site-name');
  if (navTitle) navTitle.textContent = 'Un';
});
