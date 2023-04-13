// 设置场景
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 100, 1000);
controls = new THREE.DeviceOrientationControls(camera);

var sides = [
  {
    url: 'assets/images/posx.jpg',
    position: [-512, 0, 0],
    rotation: [0, Math.PI / 2, 0],
  },
  {
    url: 'assets/images/negx.jpg',
    position: [512, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    url: 'assets/images/posy.jpg',
    position: [0, 512, 0],
    rotation: [Math.PI / 2, 0, Math.PI],
  },
  {
    url: 'assets/images/negy.jpg',
    position: [0, -512, 0],
    rotation: [-Math.PI / 2, 0, Math.PI],
  },
  {
    url: 'assets/images/posz.jpg',
    position: [0, 0, 512],
    rotation: [0, Math.PI, 0],
  },
  {
    url: 'assets/images/negz.jpg',
    position: [0, 0, -512],
    rotation: [0, 0, 0],
  },
];

var cube = new THREE.Object3D();
scene.add(cube);

for (var i = 0; i < sides.length; i++) {
  var side = sides[i];

  var element = document.createElement('section');
  element.id = 'section_' + i;
  var imgElement = document.createElement('img');
  imgElement.width = 1026; // 2 pixels extra to close the gap.
  imgElement.src = side.url;
  element.appendChild(imgElement);

  var object = new THREE.CSS3DObject(element);
  object.position.fromArray(side.position);
  object.rotation.fromArray(side.rotation);
  scene.add(object);
}

// 设置渲染器
renderer = new THREE.CSS3DRenderer();
// 设置尺寸
renderer.setSize(window.innerWidth, window, innerHeight);

// 将场景加入页面
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize, false);

lon = 0;
lat = 0;
target = {
  x: 0,
  y: 0,
};
// Render loop
var animate = function () {
  requestAnimationFrame(animate);
  controls.update();

  //lon = Math.max(-180, Math.min(180, lon));//限制固定角度内旋转
  //lon += 0.1;//自动旋转
  lon += 0;
  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);
  target.x = Math.sin(phi) * Math.cos(theta);
  target.y = Math.cos(phi);
  target.z = Math.sin(phi) * Math.sin(theta);
  camera.lookAt(target);
  renderer.render(scene, camera);
};
animate();

//为每个面构建空间的图标物件
function addIcon() {
  var imgIcon = document.createElement('img');
  imgIcon.src = '../static/img/arrow_right.png';
  imgIcon.classList.add('icon');
  document.getElementById('section_4').appendChild(imgIcon);
}
addIcon();

//监听触摸事件
function onDocumentTouchStart(event) {
  event.preventDefault();
  var touch = event.touches[0];
  touchX = touch.screenX;
  touchY = touch.screenY;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
  event.preventDefault();
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
}

function onDocumentMouseMove(event) {
  var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
  var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  lon -= movementX * 0.1;
  lat += movementY * 0.1;
}

function onDocumentMouseUp(event) {
  document.removeEventListener('mousemove', onDocumentMouseMove);
  document.removeEventListener('mouseup', onDocumentMouseUp);
}

// 鼠标滚轮改变相机焦距
function onDocumentMouseWheel(event) {
  camera.fov -= event.wheelDeltaY * 0.05;
  camera.updateProjectionMatrix();
}

function onDocumentTouchStart(event) {
  event.preventDefault();
  var touch = event.touches[0];
  touchX = touch.screenX;
  touchY = touch.screenY;
}

function onDocumentTouchMove(event) {
  event.preventDefault();
  var touch = event.touches[0];
  lon -= (touch.screenX - touchX) * 0.1;
  lat += (touch.screenY - touchY) * 0.1;
  touchX = touch.screenX;
  touchY = touch.screenY;
}
