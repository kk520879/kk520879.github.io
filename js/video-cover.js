(function () {
  function mountVideoHero() {
    var header = document.querySelector('#page-header.full_page');
    if (!header || header.querySelector('.video-hero')) return;

    var nav = header.querySelector('#nav');
    if (!nav) return;

    if (typeof THREE === 'undefined' || typeof TweenMax === 'undefined') return;

    var hero = document.createElement('div');
    hero.className = 'video-hero';
    hero.innerHTML = '<div class="video-hero__overlay"></div>';
    header.insertAdjacentElement('afterbegin', hero);

    initThreeScene(hero);
  }

  function initThreeScene(container) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    if (window.innerWidth > 800) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.needsUpdate = true;
    }
    renderer.domElement.className = 'video-hero__canvas';
    container.insertAdjacentElement('afterbegin', renderer.domElement);

    var camera = new THREE.PerspectiveCamera(20, w / h, 1, 500);
    camera.position.set(0, 2, 14);
    var scene = new THREE.Scene();
    var city = new THREE.Object3D();
    var smoke = new THREE.Object3D();
    var town = new THREE.Object3D();
    var uSpeed = 0.001;
    var setcolor = 0xF02050;

    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(setcolor, 10, 16);

    function mathRandom(num) {
      num = (num === undefined) ? 8 : num;
      return -Math.random() * num + Math.random() * num;
    }

    var setTintNum = true;
    function setTintColor() {
      setTintNum = !setTintNum;
      return 0x000000;
    }

    function init() {
      var segments = 2;
      for (var i = 1; i < 100; i++) {
        var geometry = new THREE.CubeGeometry(1, 0, 0, segments, segments, segments);
        var material = new THREE.MeshStandardMaterial({ color: setTintColor(), wireframe: false, shading: THREE.SmoothShading, side: THREE.DoubleSide });
        var wmaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, wireframe: true, transparent: true, opacity: 0.03, side: THREE.DoubleSide });

        var cube = new THREE.Mesh(geometry, material);
        var floor = new THREE.Mesh(geometry, material);

        cube.add(new THREE.Mesh(geometry, wmaterial));
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

        floor.scale.y = 0.05;
        cube.scale.y = 0.1 + Math.abs(mathRandom(8));
        var cubeWidth = 0.9;
        cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
        cube.position.x = Math.round(mathRandom());
        cube.position.z = Math.round(mathRandom());
        floor.position.set(cube.position.x, 0, cube.position.z);

        town.add(floor);
        town.add(cube);
      }

      var gmaterial = new THREE.MeshToonMaterial({ color: 0xFFFF00, side: THREE.DoubleSide });
      var gparticular = new THREE.CircleGeometry(0.01, 3);
      for (var h = 1; h < 300; h++) {
        var particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(mathRandom(5), mathRandom(5), mathRandom(5));
        particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
        smoke.add(particular);
      }

      var pmaterial = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide, opacity: 0.9, transparent: true });
      var pgeometry = new THREE.PlaneGeometry(60, 60);
      var pelement = new THREE.Mesh(pgeometry, pmaterial);
      pelement.rotation.x = -90 * Math.PI / 180;
      pelement.position.y = -0.001;
      pelement.receiveShadow = true;
      city.add(pelement);
    }

    var mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', function (event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
    var lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
    var lightBack = new THREE.PointLight(0xFFFFFF, 0.5);

    lightFront.rotation.x = 45 * Math.PI / 180;
    lightFront.rotation.z = -45 * Math.PI / 180;
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 6000;
    lightFront.shadow.mapSize.height = 6000;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0, 6, 0);

    smoke.position.y = 2;
    scene.add(ambientLight);
    city.add(lightFront);
    scene.add(lightBack);
    scene.add(city);
    city.add(smoke);
    city.add(town);

    var gridHelper = new THREE.GridHelper(60, 120, 0xFF0000, 0x000000);
    city.add(gridHelper);

    var createCarPos = true;
    function createCars(cScale, cPos, cColor) {
      cScale = cScale || 2; cPos = cPos || 20; cColor = cColor || 0xFFFF00;
      var cMat = new THREE.MeshToonMaterial({ color: cColor, side: THREE.DoubleSide });
      var cGeo = new THREE.CubeGeometry(1, cScale / 40, cScale / 40);
      var cElem = new THREE.Mesh(cGeo, cMat);
      if (createCarPos) {
        createCarPos = false;
        cElem.position.x = -cPos;
        cElem.position.z = mathRandom(3);
        TweenMax.to(cElem.position, 3, { x: cPos, repeat: -1, yoyo: true, delay: mathRandom(3) });
      } else {
        createCarPos = true;
        cElem.position.x = mathRandom(3);
        cElem.position.z = -cPos;
        cElem.rotation.y = 90 * Math.PI / 180;
        TweenMax.to(cElem.position, 5, { z: cPos, repeat: -1, yoyo: true, delay: mathRandom(3), ease: Power1.easeInOut });
      }
      cElem.receiveShadow = true;
      cElem.castShadow = true;
      cElem.position.y = Math.abs(mathRandom(5));
      city.add(cElem);
    }

    for (var i = 0; i < 60; i++) { createCars(0.1, 20); }
    createCars(0.1, 20, 0xFFFFFF);
    init();

    function animate() {
      requestAnimationFrame(animate);
      city.rotation.y -= ((mouse.x * 8) - camera.rotation.y) * uSpeed;
      city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
      if (city.rotation.x < -0.05) city.rotation.x = -0.05;
      else if (city.rotation.x > 1) city.rotation.x = 1;
      smoke.rotation.y += 0.01;
      smoke.rotation.x += 0.01;
      camera.lookAt(city.position);
      renderer.render(scene, camera);
    }
    animate();
  }

  document.addEventListener('DOMContentLoaded', mountVideoHero);
  document.addEventListener('pjax:complete', mountVideoHero);
})();
