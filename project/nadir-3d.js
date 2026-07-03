/* <nadir-site-3d> — Three.js site model, light architectural-model look.
   Attributes: variant="utility|manufacturing|staffing" */
(function () {
  var THREE_URL = 'https://unpkg.com/three@0.152.2/build/three.min.js';
  var threeReady = null;
  function loadThree() {
    if (window.THREE) return Promise.resolve();
    if (threeReady) return threeReady;
    threeReady = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = THREE_URL;
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    return threeReady;
  }

  var RED = 0xC7452F, AMBER = 0xB47614;
  var BUILDING_TONES = [0xE4E0D8, 0xD7D2C8, 0xC9C4B9];

  var LAYOUTS = {
    utility: {
      boxes: [
        { x: -6, z: -2, w: 2.2, d: 2.2, h: 2.6 }, { x: -2.5, z: -2, w: 2.2, d: 2.2, h: 2.6 },
        { x: 1, z: -2, w: 2.2, d: 2.2, h: 2.6 }, { x: 5, z: -3, w: 4.5, d: 3, h: 1.8 },
        { x: -5, z: 3, w: 1, d: 6, h: 3.4 }, { x: -2, z: 3, w: 1, d: 6, h: 3.4 },
        { x: 1, z: 3, w: 1, d: 6, h: 3.4 }, { x: 5.5, z: 3.5, w: 2.4, d: 2.4, h: 1.2 },
      ],
      labels: [{ x: -6, z: -2, t: 'T-114' }, { x: 5, z: -3, t: 'CONTROL' }, { x: 1, z: 3, t: 'FEEDER 12' }],
      markers: [{ x: -6, z: -2, y: 3.1, c: RED }, { x: 1, z: 3, y: 3.9, c: AMBER }, { x: 5, z: -3, y: 2.3, c: AMBER }],
    },
    manufacturing: {
      boxes: [
        { x: -6, z: -3.5, w: 8, d: 1.6, h: 1.4 }, { x: -6, z: -0.5, w: 8, d: 1.6, h: 1.4 },
        { x: -6, z: 2.5, w: 8, d: 1.6, h: 1.4 }, { x: 3.5, z: -2.5, w: 3, d: 3, h: 3.2 },
        { x: 4, z: 2.5, w: 4.4, d: 3.4, h: 2.4 }, { x: -6, z: 5.5, w: 3, d: 1.6, h: 1 },
      ],
      labels: [{ x: 3.5, z: -2.5, t: 'KILN' }, { x: -6, z: 2.5, t: 'LINE 3' }, { x: 4, z: 2.5, t: 'WAREHOUSE' }],
      markers: [{ x: 3.5, z: -2.5, y: 3.7, c: RED }, { x: -6, z: 2.5, y: 1.9, c: AMBER }, { x: 4, z: 2.5, y: 2.9, c: AMBER }],
    },
    staffing: {
      boxes: [
        { x: -6.5, z: 0, w: 2, d: 2, h: 0.8 }, { x: -3.5, z: 0, w: 2, d: 2, h: 1.5 },
        { x: -0.5, z: 0, w: 2, d: 2, h: 2.3 }, { x: 2.5, z: 0, w: 2, d: 2, h: 3.1 },
        { x: 5.5, z: 0, w: 2, d: 2, h: 4 }, { x: -0.5, z: 4, w: 3, d: 2, h: 1.2 },
        { x: -0.5, z: -4, w: 3, d: 2, h: 1.2 },
      ],
      labels: [{ x: -0.5, z: 4, t: 'BACK OFFICE' }, { x: 5.5, z: 0, t: 'PLACED' }, { x: -0.5, z: -4, t: 'FINANCE' }],
      markers: [{ x: -0.5, z: 4, y: 1.7, c: RED }, { x: -0.5, z: -4, y: 1.7, c: AMBER }, { x: 5.5, z: 0, y: 4.5, c: AMBER }],
    },
  };

  function makeLabel(text, color) {
    var c = document.createElement('canvas');
    c.width = 256; c.height = 64;
    var ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.font = '600 30px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 34);
    return c;
  }

  class Nadir3D extends HTMLElement {
    static get observedAttributes() { return ['variant']; }
    connectedCallback() {
      if (this._started) return;
      this._started = true;
      this.style.display = 'block';
      this.style.position = 'relative';
      this.style.width = '100%';
      this.style.height = '100%';
      var self = this;
      loadThree().then(function () { if (self.isConnected) self._init(); })
        .catch(function () { self.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:13px monospace;color:#8a939c;">3D model unavailable offline</div>'; });
    }
    attributeChangedCallback() { if (this._scene) this._buildSite(); }
    _size() {
      var w = this.clientWidth, h = this.clientHeight;
      if (!w) w = (this.parentElement && this.parentElement.clientWidth) || 800;
      if (!h) h = (this.parentElement && this.parentElement.clientHeight) || 500;
      return [w, h];
    }
    _init() {
      var T = window.THREE;
      var sz = this._size(), w = sz[0], h = sz[1];
      this._renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
      this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this._renderer.setSize(w, h);
      this._renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;cursor:inherit;';
      this.appendChild(this._renderer.domElement);

      this._scene = new T.Scene();
      this._scene.fog = new T.Fog(0xEDEAE3, 22, 48);
      this._camera = new T.PerspectiveCamera(42, w / h, 0.1, 100);
      this._theta = 0.7; this._phi = 0.44; this._dist = 21;
      this._targetTheta = this._theta;

      this._scene.add(new T.HemisphereLight(0xffffff, 0xdedad2, 1.05));
      var dir = new T.DirectionalLight(0xffffff, 0.75);
      dir.position.set(9, 15, 7);
      this._scene.add(dir);
      var dir2 = new T.DirectionalLight(0xcfe0e4, 0.3);
      dir2.position.set(-8, 6, -6);
      this._scene.add(dir2);

      var grid = new T.GridHelper(34, 34, 0xC9C4B9, 0xDDD8CE);
      grid.position.y = 0.01;
      this._scene.add(grid);
      var ground = new T.Mesh(new T.PlaneGeometry(64, 64), new T.MeshStandardMaterial({ color: 0xEDEAE3, roughness: 1 }));
      ground.rotation.x = -Math.PI / 2;
      this._scene.add(ground);

      this._siteGroup = new T.Group();
      this._scene.add(this._siteGroup);
      this._buildSite();

      var el = this._renderer.domElement, dragging = false, lastX = 0, self = this;
      el.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; el.setPointerCapture(e.pointerId); });
      el.addEventListener('pointermove', function (e) { if (dragging) { self._targetTheta += (e.clientX - lastX) * 0.006; lastX = e.clientX; } });
      el.addEventListener('pointerup', function () { dragging = false; });
      el.addEventListener('pointercancel', function () { dragging = false; });

      this._ro = new ResizeObserver(function () {
        var s2 = self._size();
        if (!s2[0] || !s2[1]) return;
        self._camera.aspect = s2[0] / s2[1];
        self._camera.updateProjectionMatrix();
        self._renderer.setSize(s2[0], s2[1]);
      });
      this._ro.observe(this);

      var clock = new T.Clock();
      var tick = function () {
        if (!self.isConnected) return;
        self._raf = requestAnimationFrame(tick);
        var t = clock.getElapsedTime();
        if (!dragging) self._targetTheta += 0.0012;
        self._theta += (self._targetTheta - self._theta) * 0.08;
        var cx = Math.sin(self._theta) * Math.cos(self._phi) * self._dist;
        var cz = Math.cos(self._theta) * Math.cos(self._phi) * self._dist;
        var cy = Math.sin(self._phi) * self._dist;
        self._camera.position.set(cx, cy, cz);
        self._camera.lookAt(0, 0.9, 0);
        for (var i = 0; i < self._blips.length; i++) {
          var b = self._blips[i];
          var p = (t * 0.85 + b.offset) % 1;
          b.ring.scale.setScalar(0.3 + p * 2.0);
          b.ring.material.opacity = 0.7 * (1 - p);
          b.core.material.emissiveIntensity = 1.5 + Math.sin(t * 4 + b.offset * 6) * 0.7;
          if (b.label) b.label.material.rotation = 0;
        }
        if (self._labels) for (var j = 0; j < self._labels.length; j++) self._labels[j].quaternion.copy(self._camera.quaternion);
        self._renderer.render(self._scene, self._camera);
      };
      tick();
    }
    _buildSite() {
      var T = window.THREE;
      var layout = LAYOUTS[this.getAttribute('variant')] || LAYOUTS.manufacturing;
      var g = this._siteGroup;
      while (g.children.length) {
        var c = g.children[0]; g.remove(c);
        if (c.geometry) c.geometry.dispose();
        if (c.material) { if (c.material.map) c.material.map.dispose(); c.material.dispose(); }
      }
      this._blips = []; this._labels = [];
      for (var i = 0; i < layout.boxes.length; i++) {
        var b = layout.boxes[i];
        var geo = new T.BoxGeometry(b.w, b.h, b.d);
        var mesh = new T.Mesh(geo, new T.MeshStandardMaterial({ color: BUILDING_TONES[i % 3], roughness: 0.78, metalness: 0.05 }));
        mesh.position.set(b.x, b.h / 2, b.z);
        g.add(mesh);
        var edges = new T.LineSegments(new T.EdgesGeometry(geo), new T.LineBasicMaterial({ color: 0x9A968D, transparent: true, opacity: 0.55 }));
        edges.position.copy(mesh.position);
        g.add(edges);
      }
      // building labels
      for (var k = 0; k < (layout.labels || []).length; k++) {
        var lb = layout.labels[k];
        var tex = new T.CanvasTexture(makeLabel(lb.t, '#5a646e'));
        var spr = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
        spr.position.set(lb.x, 0.35, lb.z + 0.9);
        spr.scale.set(2.6, 0.65, 1);
        g.add(spr); this._labels.push(spr);
      }
      for (var j = 0; j < layout.markers.length; j++) {
        var m = layout.markers[j];
        var core = new T.Mesh(new T.SphereGeometry(0.17, 16, 16), new T.MeshStandardMaterial({ color: m.c, emissive: m.c, emissiveIntensity: 1.6 }));
        core.position.set(m.x, m.y, m.z);
        g.add(core);
        var ring = new T.Mesh(new T.RingGeometry(0.32, 0.42, 32), new T.MeshBasicMaterial({ color: m.c, transparent: true, opacity: 0.55, side: T.DoubleSide }));
        ring.rotation.x = -Math.PI / 2; ring.position.set(m.x, 0.06, m.z);
        g.add(ring);
        var beam = new T.Mesh(new T.CylinderGeometry(0.014, 0.014, m.y, 6), new T.MeshBasicMaterial({ color: m.c, transparent: true, opacity: 0.4 }));
        beam.position.set(m.x, m.y / 2, m.z);
        g.add(beam);
        this._blips.push({ core: core, ring: ring, offset: j * 0.33 });
      }
    }
    disconnectedCallback() {
      if (this._raf) cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
      if (this._renderer) this._renderer.dispose();
      this._started = false;
    }
  }
  if (!customElements.get('nadir-site-3d')) customElements.define('nadir-site-3d', Nadir3D);
})();
