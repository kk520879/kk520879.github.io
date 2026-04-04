(function () {
  function mountVideoHero() {
    var header = document.querySelector('#page-header.full_page');
    if (!header || header.querySelector('.video-hero')) return;

    var nav = header.querySelector('#nav');
    if (!nav) return;

    var hero = document.createElement('div');
    hero.className = 'video-hero';
    hero.innerHTML =
      '<video class="video-hero__bg" autoplay muted loop playsinline preload="auto">' +
      '<source src="/img/4month4day.mp4" type="video/mp4">' +
      '</video>' +
      '<div class="video-hero__overlay"></div>';

    header.insertAdjacentElement('afterbegin', hero);
  }

  document.addEventListener('DOMContentLoaded', mountVideoHero);
  document.addEventListener('pjax:complete', mountVideoHero);
})();
