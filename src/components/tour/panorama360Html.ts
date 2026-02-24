// =============================================================================
// Panorama 360 HTML Generator
// College Visit Platform
// =============================================================================
// Generates a self-contained HTML document with an embedded Three.js 360
// panoramic viewer. The image is passed as a base64 data URI.
// =============================================================================

interface Hotspot360 {
  id: string;
  label: string;
  /** Longitude angle in degrees (0-360, horizontal position). */
  lon: number;
  /** Latitude angle in degrees (-90 to 90, vertical position). */
  lat: number;
}

/**
 * Generate a complete HTML page for the 360 panoramic viewer.
 *
 * @param imageDataUri - Base64 data URI of the equirectangular image
 * @param hotspots - Array of hotspot positions
 * @param schoolColor - Hex color for hotspot accents
 */
export function generate360Html(
  imageDataUri: string,
  hotspots: Hotspot360[] = [],
  schoolColor: string = '#3B82F6',
): string {
  const hotspotsJson = JSON.stringify(hotspots);

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { overflow: hidden; background: #0F172A; touch-action: none; }
canvas { display: block; width: 100vw; height: 100vh; }
.hotspot {
  position: absolute;
  transform: translate(-50%, -50%);
  background: ${schoolColor}CC;
  color: white;
  font-family: -apple-system, sans-serif;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  white-space: nowrap;
  pointer-events: auto;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(4px);
  z-index: 10;
}
.hotspot:active { opacity: 0.7; }
.hint {
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.6);
  color: #94A3B8;
  font-family: -apple-system, sans-serif;
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 16px;
  z-index: 20;
  pointer-events: none;
  transition: opacity 0.5s;
}
</style>
</head>
<body>
<div id="hotspot-container"></div>
<div class="hint" id="hint">Drag to look around</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
(function() {
  var camera, scene, renderer;
  var lon = 0, lat = 0;
  var touchStartX = 0, touchStartY = 0;
  var lonStart = 0, latStart = 0;
  var fov = 75;
  var isDown = false;
  var hotspots = ${hotspotsJson};
  var schoolColor = '${schoolColor}';

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1100);
    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    var texture = new THREE.TextureLoader().load('${imageDataUri}');
    texture.colorSpace = THREE.SRGBColorSpace;
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Touch handlers
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
    renderer.domElement.addEventListener('touchend', onTouchEnd, false);

    // Mouse handlers (for simulator)
    renderer.domElement.addEventListener('mousedown', onMouseDown, false);
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('mouseup', onMouseUp, false);

    window.addEventListener('resize', onResize, false);

    // Hide hint after 3s
    setTimeout(function() {
      var hint = document.getElementById('hint');
      if (hint) hint.style.opacity = '0';
    }, 3000);
  }

  function onTouchStart(e) {
    e.preventDefault();
    if (e.touches.length === 1) {
      isDown = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      lonStart = lon;
      latStart = lat;
    }
  }

  function onTouchMove(e) {
    e.preventDefault();
    if (e.touches.length === 1 && isDown) {
      lon = (touchStartX - e.touches[0].clientX) * 0.2 + lonStart;
      lat = (e.touches[0].clientY - touchStartY) * 0.2 + latStart;
    }
    if (e.touches.length === 2) {
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      var dist = Math.sqrt(dx*dx + dy*dy);
      if (!window._pinchStart) window._pinchStart = dist;
      var ratio = window._pinchStart / dist;
      fov = Math.max(30, Math.min(110, 75 * ratio));
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }

  function onTouchEnd(e) {
    isDown = false;
    window._pinchStart = null;
  }

  function onMouseDown(e) {
    isDown = true;
    touchStartX = e.clientX;
    touchStartY = e.clientY;
    lonStart = lon;
    latStart = lat;
  }

  function onMouseMove(e) {
    if (!isDown) return;
    lon = (touchStartX - e.clientX) * 0.2 + lonStart;
    lat = (e.clientY - touchStartY) * 0.2 + latStart;
  }

  function onMouseUp() { isDown = false; }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function updateHotspots() {
    var container = document.getElementById('hotspot-container');
    container.innerHTML = '';
    hotspots.forEach(function(hs) {
      var phi = THREE.MathUtils.degToRad(90 - hs.lat);
      var theta = THREE.MathUtils.degToRad(hs.lon);
      var pos = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );
      pos.project(camera);
      if (pos.z > 1) return; // behind camera
      var x = (pos.x * 0.5 + 0.5) * window.innerWidth;
      var y = (-pos.y * 0.5 + 0.5) * window.innerHeight;
      var el = document.createElement('div');
      el.className = 'hotspot';
      el.textContent = hs.label;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.addEventListener('click', function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'hotspot', id: hs.id }));
      });
      container.appendChild(el);
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    lat = Math.max(-85, Math.min(85, lat));
    var phi = THREE.MathUtils.degToRad(90 - lat);
    var theta = THREE.MathUtils.degToRad(lon);
    camera.lookAt(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta)
    );
    renderer.render(scene, camera);
    updateHotspots();
  }
})();
</script>
</body>
</html>`;
}
