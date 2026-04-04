(function () {
  function mountVideoHero() {
    var header = document.querySelector('#page-header.full_page');
    if (!header || header.querySelector('.video-hero')) return;

    var nav = header.querySelector('#nav');
    if (!nav) return;

    var hero = document.createElement('div');
    hero.className = 'video-hero';
    hero.innerHTML =
      '<img class="video-hero__bg" src="/img/converted.gif" alt="">' +
      '<div class="video-hero__overlay"></div>';

    header.insertAdjacentElement('afterbegin', hero);
  }

  document.addEventListener('DOMContentLoaded', mountVideoHero);
  document.addEventListener('pjax:complete', mountVideoHero);
})();
