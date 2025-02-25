// 设置访问令牌
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZTZkMGNlNi04MDMxLTRiZDYtYWI3ZS1mYmZmNTYxZDdlNGUiLCJpZCI6Mjc1NjkxLCJpYXQiOjE3Mzk0OTY2OTV9.dEPYv5swofreRUSaYDc_wH0qTw2eiMhmy1_MzbQesl0';

// 初始化查看器
const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayer: undefined, // 移除默认地形图层
  baseLayerPicker: false,
  geocoder: false,
  navigationHelpButton: false,
  sceneModePicker: false,
  homeButton: false,
  animation: false,
  timeline: false,
  fullscreenButton: false,
});

// 移除版权信息
viewer._cesiumWidget._creditContainer.style.display = 'none';

// 设置地球显示效果
viewer.scene.globe.show = true; // 确保地球可见
viewer.scene.globe.baseColor = Cesium.Color.BLUE;
viewer.scene.globe.enableLighting = false;
viewer.scene.skyAtmosphere.show = true;

// 设置背景为黑色
viewer.scene.backgroundColor = Cesium.Color.BLACK;

// 关闭不需要的效果
viewer.scene.fog.enabled = false;
viewer.scene.globe.translucency.enabled = false;

// 确保地形显示
viewer.scene.globe.terrainExaggeration = 1.0;
viewer.scene.globe.enableLighting = false;
viewer.scene.globe.atmosphereLightIntensity = 5.0;

// 优化性能设置
viewer.scene.globe.enableLighting = false;
viewer.scene.fog.enabled = false;
viewer.scene.skyAtmosphere.show = false;
viewer.scene.globe.maximumScreenSpaceError = 2; // 降低分辨率以提高性能
viewer.scene.globe.tileCacheSize = 1000; // 增加缓存大小
viewer.scene.requestRenderMode = true; // 按需渲染
viewer.scene.maximumRenderTimeChange = Infinity;

// 优化默认视图设置
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 6000; // 限制最小缩放距离
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000000; // 限制最大缩放距离
viewer.scene.screenSpaceCameraController.enableTilt = false; // 禁用倾斜，保持俯视视角

// 添加进度条控制
let initialTileCount = -1;
let currentTileCount = 0;

function updateLoadingStatus(remaining) {
    // 首次获取总数
    if (initialTileCount === -1 && remaining > 0) {
        initialTileCount = remaining;
    }

    // 计算加载进度
    if (initialTileCount > 0) {
        currentTileCount = initialTileCount - remaining;
        const progress = Math.min(100, Math.round((currentTileCount / initialTileCount) * 100));
        document.getElementById('loadingStatus').style.width = `${progress}%`;
        document.getElementById('loadingText').textContent = `${progress}%`;
        
        // 当加载完成时
        if (remaining === 0) {
            setTimeout(() => {
                document.getElementById('loadingOverlay').style.display = 'none';
            }, 500);
        }
    }
}

viewer.scene.globe.tileLoadProgressEvent.addEventListener((remaining) => {
    updateLoadingStatus(remaining);
    
    if (remaining === 0) {
        // 设置视图
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 10000000),
            orientation: {
                heading: 0.0,
                pitch: -Cesium.Math.PI_OVER_TWO,
                roll: 0.0
            },
            duration: 2
        });
    }
});

// 示例点位数据
const points = [
  { name: '北京', lon: 116.4074, lat: 39.9042 },
  { name: '上海', lon: 121.4737, lat: 31.2304 },
  { name: '广州', lon: 113.2644, lat: 23.1291 },
];

// 添加点位标记
points.forEach((point) => {
  viewer.entities.add({
    name: point.name,
    position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat),
    billboard: {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg',
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scale: 0.5,
    },
    label: {
      text: point.name,
      font: '14pt monospace',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -9),
    },
  });
});

// 修改点击事件处理
viewer.screenSpaceEventHandler.setInputAction(function (click) {
    const pickedObject = viewer.scene.pick(click.position);
    if (Cesium.defined(pickedObject) && pickedObject.id) {
        const entity = pickedObject.id;
        const position = entity.position.getValue();
        
        // 使用更平滑的相机移动
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
                Cesium.Math.toDegrees(position.x),
                Cesium.Math.toDegrees(position.y),
                100000.0
            ),
            duration: 1.5,
            complete: function() {
                // 使用非阻塞的提示方式
                const toast = document.createElement('div');
                toast.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 4px;
                    z-index: 1000;
                `;
                toast.textContent = `当前位置: ${entity.name}`;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            }
        });
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
