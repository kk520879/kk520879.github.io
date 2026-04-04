(function () {
  function mountVideoHero() {
    var header = document.querySelector('#page-header.full_page');
    if (!header || header.querySelector('.video-hero')) return;

    var nav = header.querySelector('#nav');
    if (!nav) return;

    var hero = document.createElement('div');
    hero.className = 'video-hero';
    hero.innerHTML =
      '<video class="video-hero__bg" autoplay muted loop playsinline preload="metadata" poster="/img/Undoom.png">' +
      '<source src="/img/mc-snow-spruce.mp4" type="video/mp4">' +
      '</video>' +
      '<div class="video-hero__overlay"></div>' +
      '<div class="video-hero__text"><h2>雪落云杉，欢迎来到我的博客</h2><p>将这段视频作为首页开场封面</p></div>';

    header.insertAdjacentElement('afterbegin', hero);
  }

  document.addEventListener('DOMContentLoaded', mountVideoHero);
  document.addEventListener('pjax:complete', mountVideoHero);
})();
