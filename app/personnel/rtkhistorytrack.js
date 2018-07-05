// 在线轨迹地图UI的交互JS文件
// modify xiaojing 2017年11月6日 14:40:46

// 计算轨迹点距离
function rad(d) {
  return d * Math.PI / 180.0;
}

function lonlatDistance(lon1, lat1, lon2, lat2) {
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lon1) - rad(lon2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10;
  return s;
}

// 天地图
var tianDiTuMapLayer = new ol.layer.Tile({
  title: '天地图路网',
  preload: Infinity,
  source: new ol.source.XYZ({
    url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}'
  })
});
var tianDiTuAnnotation = new ol.layer.Tile({
  title: '天地图文字标注',
  source: new ol.source.XYZ({
    url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
  })
});

// 地图中心调用函数
function mapCenter(position, zoom) {
  olMap.getView().animate({
    center: position,
    zoom: zoom,
    duration: 0
  });
}
var map_to_line = false;
var history_point_vector_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON()
  }),
  style: function (feature, resolution) {
    return pointStyle;
  }
});

var custom_layer = new ol.layer.Vector({
  source: new ol.source.Vector()
});

var lineGeometry = null;
function initHistoryVecrtorLayer(pointUrl, lineUrl, deviceId, beginTime, endTime, trackAnalyseId) {
  custom_layer.getSource().clear();
  history_point_vector_layer.getSource().clear();
  history_line_vertor_layer.getSource().clear();
  map_to_line = false;
  var params = '&viewparams=machineId:' + deviceId + ';beginTime:' + beginTime + ';endTime:' + endTime;
  var thePointUrl = pointUrl + params;
  history_point_vector_layer.setSource(
    new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: thePointUrl,
      loader: function (extent, resolution, projection) {
        var proj = projection.getCode();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', thePointUrl);
        var onError = function () {
          history_point_vector_layer.getSource().removeLoadedExtent(extent);
        };
        xhr.onerror = onError;
        xhr.onload = function () {
          if (xhr.status == 200) {
            history_point_vector_layer.getSource().addFeatures(history_point_vector_layer.getSource().getFormat().readFeatures(xhr.responseText));
          } else {
            onError();
          }
        };
        xhr.send();
      }
    })
  );
  history_line_vertor_layer.setSource(
    new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: lineUrl + '&viewparams=trackAnalyseId:' + trackAnalyseId
    })
  );

  history_line_vertor_layer.getSource().once('change', function (e) {
    if (history_line_vertor_layer.getSource().getState() === 'ready') {
      lineGeometry = history_line_vertor_layer.getSource().getFeatures()[0].getGeometry();
      if (!lineGeometry) {
        history_point_vector_layer.getSource().once('change', function (e) {
          var onePoint = lineGeometry = history_point_vector_layer.getSource().getFeatures()[0].getGeometry();
          mapCenter(onePoint.getCoordinates(), 18);
          mui.toast('此轨迹只有一个点!');
        });
      } else {
        addPositionsToHistoryVertoryLayer(lineGeometry.getCoordinates());
        // move_Trial(lineGeometry.getCoordinates());
        var extent = ol.extent.boundingExtent(lineGeometry.getCoordinates());
        olMap.getView().fit(extent, olMap.getSize());
        olMap.updateSize();
        olMap.render();
      }
    }
  });
}

var style = [
  new ol.style.Style({
    fill: new ol.style.Fill({
      color: '#0044CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#0044CC',
      width: 4
    })
  })
];

var history_line_vertor_layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON()
  }),
  style: style
});

// 自定义样式
var lineBlue = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'blue',
    width: 2
  })
});
var lineRed = new ol.style.Style({
  stroke: new ol.style.Stroke({
    lineDash: [1, 2, 3, 4, 5, 6],
    color: 'red',
    width: 2
  })
});
var highAlpColor = ol.color.asArray('#1fca04');
highAlpColor = highAlpColor.slice();
highAlpColor[3] = 0.9;
var pointStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 3,
    fill: new ol.style.Fill({
      color: highAlpColor
    })
  })
});
var pointSelectStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 8,
    fill: new ol.style.Fill({
      color: 'yellow'
    })
  })
});

// 地图初始化, 天地图 + 自定义线图层 + 自定义点图层
var olMap = new ol.Map({
  layers: [
    tianDiTuMapLayer, tianDiTuAnnotation, history_line_vertor_layer, history_point_vector_layer, custom_layer
  ],
  target: 'map',
  interactions: ol.interaction.defaults({ altShiftDragRotate: false, pinchRotate: false, doubleClickZoom: false }),
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    }),
    attribution: false,
    rotate: false,
    zoom: false
  }).extend([
    new ol.control.ScaleLine()
  ]),
  view: new ol.View({
    // 指定投影使用EPSG:4326
    projection: 'EPSG:4326',
    constrainRotation: false,
    enableRotation: false,
    center: [113.2652664185, 23.1349929688],
    zoom: 12,
    minZoom: 0,
    maxZoom: 24
  })
});

// 监听地图层级变化, 根据地图的放大级数不同, 修改点图标的大小, 大于指定级数, 才能看见点图层
// modify xiaojing 2017年11月6日 14:37:45
olMap.getView().on('change:resolution', function () {
  /* pointStyle.getImage().setRadius(this.getZoom() > 10 ? (this.getZoom() / 5) * 2.0 : 0); */
  pointStyle.getImage().setRadius(this.getZoom() >= 18 ? 10 : 3);
  if (this.getZoom() >= 14) {
    olMap.addInteraction(pointLayerSelect);
  } else {
    olMap.removeInteraction(pointLayerSelect);
  }
});

// 根据返回的历史轨迹点生成线, historyLineTracklayers
// modify xiaojing 2017年11月6日 14:08:22
function addPositionsToHistoryVertoryLayer(trackPointInfoArray) {
  var trackPointInfoArrayTemp = [];
  for (var i = 0; i < trackPointInfoArray.length; i++) {
    var trackPointInfo = trackPointInfoArray[i];
    if (trackPointInfoArrayTemp.length === 0) {
      trackPointInfoArrayTemp.push(trackPointInfo);
    } else {
      /* 计算2点之间的距离, 根据是否大于指定的值, 绘制不同颜色的线 */
      var distance = lonlatDistance(
        trackPointInfoArrayTemp[trackPointInfoArrayTemp.length - 1][0], trackPointInfoArrayTemp[trackPointInfoArrayTemp.length - 1][1], trackPointInfo[0], trackPointInfo[1]);
      if (distance > 100) {
        if (trackPointInfoArrayTemp.length === 1) {
          /* 绘制红线 */
          var redLinePostions = [
            [trackPointInfoArrayTemp[trackPointInfoArrayTemp.length - 1][0],
              trackPointInfoArrayTemp[trackPointInfoArrayTemp.length - 1][1]],
            [trackPointInfo[0], trackPointInfo[1]]
          ];
          var redLineFeature = new ol.Feature({
            geometry: new ol.geom.LineString(redLinePostions, 'XY')
          });
          redLineFeature.setStyle(lineRed);
          history_line_vertor_layer.getSource().addFeature(redLineFeature);
          /* 清空数据元素 */
          trackPointInfoArrayTemp = [];
          /* 增加一个尾部元素 */
          trackPointInfoArrayTemp.push(trackPointInfo);
        } else {
          /* 添加蓝线 */
          var coordinateArray = [];
          for (var index = 0; index < trackPointInfoArrayTemp.length; index++) coordinateArray.push([trackPointInfoArrayTemp[index][0], trackPointInfoArrayTemp[index][1]]);
          var blueLineFeature = new ol.Feature({
            geometry: new ol.geom.LineString(coordinateArray, 'XY')
          });
          blueLineFeature.setStyle(lineBlue);
          history_line_vertor_layer.getSource().addFeature(blueLineFeature);
          /* 绘制红线 */
          var redLinePostions = [[trackPointInfoArrayTemp[trackPointInfoArrayTemp.length - 1][0], trackPointInfoArrayTemp[trackPointInfoArrayTemp.length - 1][1]], [trackPointInfo[0], trackPointInfo[1]]];
          var redLineFeature = new ol.Feature({
            geometry: new ol.geom.LineString(redLinePostions, 'XY')
          });
          redLineFeature.setStyle(lineRed);
          history_line_vertor_layer.getSource().addFeature(redLineFeature);
          /* 清空数据元素 */
          trackPointInfoArrayTemp = [];
          /* 增加一个尾部元素 */
          trackPointInfoArrayTemp.push(trackPointInfo);
        }
      } else {
        trackPointInfoArrayTemp.push(trackPointInfo);
      }
    }
  }
  if (trackPointInfoArrayTemp.length > 1) {
    /* 常规数据, 绘制蓝线 */
    var coordinateArray = [];
    for (var index = 0; index < trackPointInfoArrayTemp.length; index++) {
      coordinateArray.push([trackPointInfoArrayTemp[index][0], trackPointInfoArrayTemp[index][1]]);
    }
    var blueLineFeature = new ol.Feature({
      geometry: new ol.geom.LineString(coordinateArray, 'XY')
    });
    blueLineFeature.setStyle(lineBlue);
    history_line_vertor_layer.getSource().addFeature(blueLineFeature);
  }
  /* 添加所有点至图层 */
  var endFeature, startFeature;
  for (var i = 0; i < trackPointInfoArray.length; i++) {
    if (i != 0 && i != trackPointInfoArray.length - 1) continue;
    var trackPointInfo = trackPointInfoArray[i];
    var pointFeature = new ol.Feature({
      geometry: new ol.geom.Point([trackPointInfo[0], trackPointInfo[1]], 'XY')
    });
    if (i === 0) {
      pointFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
          src: '../../public/img/start.png',
          anchor: [0.5, 0.9]
        })
      }));
      endFeature = pointFeature;
      continue;
    } else if (i === trackPointInfoArray.length - 1) {
      pointFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
          src: '../../public/img/end.png',
          anchor: [0.5, 0.9]
        })
      }));
      startFeature = pointFeature;
      continue;
    }
  }
  custom_layer.getSource().addFeature(endFeature);
  custom_layer.getSource().addFeature(startFeature);
}

// 关键： 设置过了条件，可以用feature来写过滤，也可以用layer来写过滤
// modify xiaojing 2017年11月6日 14:35:06
var pointLayerSelect = new ol.interaction.Select({
  filter: function (feature, layer) {
    return layer === history_point_vector_layer;
  },
  condition: ol.events.condition.click,
  style: pointSelectStyle
});

olMap.on('singleclick', function (evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = olMap.getEventPixel(evt.originalEvent);
  var feature = olMap.forEachFeatureAtPixel(pixel, function (feature, layer) {
    return feature;
  });
  if (feature === null || feature === undefined) return;
  var pointInfo = feature.getProperties();
  getPointInfo(pointInfo.rand_uuid);
}, pointLayerSelect);

/* var moveFeature;
var speed = 1;
function move_Trial(thePoints) {
  var now;
  olMap.un('postcompose', moveFeature); // 切换日期时清除上一个移动的点
  var routeLen = thePoints.length;
  var geoMarker = new ol.Feature({
    type: 'geoMarker',
    geometry: new ol.geom.Point(thePoints[0])
  });
  var styles = {
    'geoMarker': new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        snapToPixel: false,
        fill: new ol.style.Fill({ color: 'blue' }),
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 3
        })
      })
    })
  }; // 设置移动点的样式
  var animating = false;
  moveFeature = function (event) {
    var vectorContext = event.vectorContext;
    var frameState = event.frameState;
    if (animating) {
      var elapsedTime = frameState.time - now;
      var index = Math.round(speed * elapsedTime / 1000);
      if (index >= routeLen) {
        startAnimation();
      }
      var currentPoint = new ol.geom.Point(thePoints[index]);
      var feature = new ol.Feature(currentPoint);
      vectorContext.drawFeature(feature, styles.geoMarker); // 动画
    }
    olMap.render();
  };
  startAnimation();

  function startAnimation() {
    animating = true;
    now = new Date().getTime();
    // geoMarker.setStyle(null);
    olMap.on('postcompose', moveFeature);
    olMap.render();
  }
} */

function transSolution(val) {
  if (!val) return '-';
  var solutionValue = '';
  switch (val) {
    case 'ST_INVALID_FIX':
      solutionValue = '无效解';
      break;
    case 'ST_GPS_FIX':
      solutionValue = '单点解';
      break;
    case 'ST_DGPS_FIX':
      solutionValue = '差分3D';
      break;
    case 'ST_RTK_FIX':
      solutionValue = '固定解';
      break;
    case 'ST_FRTK_FIX':
      solutionValue = '浮点解';
      break;
    case 'ST_FIXEDPOS_FIX':
      solutionValue = '基站';
      break;
  }
  return solutionValue;
}
