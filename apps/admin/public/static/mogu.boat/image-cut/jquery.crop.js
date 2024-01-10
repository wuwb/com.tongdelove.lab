/**
 * 图片裁剪 v0.0.4
 * by rufeng 2014-8-3
 * ========================
 * 目前支持以下功能
 * 1、正常或按比例拉伸裁剪区块
 * 2、按比例裁剪图片
 * 3、初始化裁剪区块大小
 * ========================
 * 调用方法
 * $('#img').crop({
 *
 *      // 容器宽度
 *      containerWidth: 800,
 *
 *      // 容器高度
 *      containerHeight: 500,
 *
 *      // 初始化裁剪区块宽度
 *      cropWidth: 640,
 *
 *      // 初始化裁剪区块高度
 *      cropHeight: 960,
 *
 *      // 拉伸比例
 *      aspectRatio: 2/3,
 *
 *      // 初始化完成回调
 *      initComplete: function(){
 *          console.log('裁剪初始化完成');
 *      }
 *
 *  });
 */

(function ($) {
  $.fn.extend({
    crop: function (options) {
      var // 默认参数
        defaults = {},
        // 合并参数
        options = $.extend(defaults, options),
        $elem = $(this);

      // 初始化裁剪
      var crop = new Crop($elem, options);
      crop.init();
    },
  });

  // 构造裁剪对象
  var Crop = function ($elem, options) {
    // 图片对象
    this.$elem = $elem;

    // 参数
    this.options = options;

    // 裁剪区块位置
    this.cropXY = {
      x: 0,
      y: 0,
    };

    // 裁剪区块大小
    this.cropWidth = 0;
    this.cropHeight = 0;

    // 是否开始裁剪
    this.startCrop = false;

    // 是否有裁剪区块
    this.isCrop = false;

    // 裁剪区块和鼠标之间的差值
    this.cropDiffXY = {};

    // 是否可以移动裁剪区块
    this.isCropMove = false;

    // 方向标识
    this.direction = 'move';

    // 是否可以调整裁剪区块
    this.isAdjustCrop = false;

    // 裁剪位置信息（中转）
    this.cropStyle = {};

    // 图片数据
    this.imgData = {};
  };

  // 初始化
  Crop.prototype.init = function () {
    var self = this;

    var src = self.$elem[0].src;
    if (!src || src == '') {
      return;
    }

    // 加载图片
    var img = new Image();
    img.onload = function () {
      // 获取图片比例缩放后的大小
      self.imgData = getZoomImage(
        this.width,
        this.height,
        self.options.containerWidth,
        self.options.containerHeight,
      );

      // 初始化移动范围（容器大小）
      self.mxRange = {
        left: 0,
        top: 0,
        right: self.imgData.zoomWidth || this.width,
        bottom: self.imgData.zoomHeight || this.height,
      };

      // 渲染视图
      self.render();

      // 初始化完成回调
      typeof self.options.initComplete == 'function' && self.options.initComplete();
    };

    img.src = self.options.src || src;
  };

  // 渲染视图
  Crop.prototype.render = function () {
    // 占位容器
    this.$holder = $('<div class="jcrop-holder">').css({
      width: this.imgData.zoomWidth || this.imgData.width,
      height: this.imgData.zoomHeight || this.imgData.height,
      position: 'relative',
      display: 'inline-block',
      'background-color': 'black',
    });

    // 遮罩
    this.$tracker = $('<div class="jcrop-tracker">').css({
      width: this.imgData.zoomWidth || this.imgData.width,
      height: this.imgData.zoomHeight || this.imgData.height,
      position: 'absolute',
      top: 0,
      left: 0,
      cursor: 'crosshair',
    });

    // 裁剪区块
    this.$crop = $('<div>').css({
      position: 'absolute',
      'z-index': 1000,
      cursor: 'move',
      left: 0,
      top: 0,
    });

    this.$cropBox = $('<div>').css({
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    });

    this.$img = $('<img>')
      .attr('src', this.$elem[0].src)
      .css({
        width: this.imgData.zoomWidth || this.imgData.width,
        height: this.imgData.zoomHeight || this.imgData.height,
      });

    this.$cropImg = this.$img.clone().css({ position: 'absolute' });
    this.$cropBox.append(this.$cropImg);

    // 虚线
    var line = {
        position: 'absolute',
        opactiy: 0.4,
        background:
          '#FFF url(http://s6.mogucdn.com/pic/140725/sp1ku_ieydomrrguygimrumiytambqgyyde_8x8.gif)',
        'font-size': 0,
      },
      tline = $.extend({}, line, {
        height: '1px',
        width: '100%',
      }),
      bline = $.extend({}, line, {
        height: '1px',
        width: '100%',
        bottom: 0,
      }),
      lline = $.extend({}, line, {
        width: '1px',
        height: '100%',
      }),
      rline = $.extend({}, line, {
        width: '1px',
        height: '100%',
        right: 0,
      });

    this.$tline = $('<div>').css(tline); // 上虚线
    this.$bline = $('<div>').css(bline); // 下虚线
    this.$lline = $('<div>').css(lline); // 左虚线
    this.$rline = $('<div>').css(rline); // 右虚线

    // 添加虚线
    this.$cropBox.append(this.$tline).append(this.$rline).append(this.$bline).append(this.$lline);

    // 显示数据容器
    this.$data = $('<div>').css({
      position: 'absolute',
      top: '-18px',
      left: 0,
      background: '#ddd',
      color: '#000',
      width: '66px',
      opacity: 0.7,
      'text-align': 'center',
      'border-radius': '2px',
      'font-size': '12px',
      height: '16px',
      'line-height': '16px',
      'font-family': 'Microsoft YaHei',
      display: 'none',
    });

    // 添加数据容器
    this.$width = $('<span>');
    this.$height = $('<span>');
    this.$data.append(this.$width).append(' * ').append(this.$height);

    // 添加裁剪容器
    this.$crop.append(this.$cropBox).append(this.$data);

    // 渲染视图
    this.$holder.append(this.$crop).append(this.$tracker).append(this.$img.clone());

    // 隐藏原始元素，追加占位节点
    this.$elem.hide().after(this.$holder);

    // 如果初始化有裁剪大小参数
    if (this.options.cropWidth && this.options.cropHeight) {
      this.initCrop();
    }

    // 监听事件
    this.domEvent();
  };

  // 监听事件
  Crop.prototype.domEvent = function () {
    var self = this;

    // 监听占位容器
    $(document)
      // 按下
      .mousedown(function (event) {
        // 裁剪区块正在移动 || 正在拉伸 || 鼠标不在容器内
        if (self.isCropMove || self.isAdjustCrop || !self.isMouseContainer()) {
          return;
        }

        // 获取鼠标相对容器位置，初始化裁剪区块位置
        self.cropXY = getRelativeXY(self.$holder[0]);

        // 如果有裁剪区块
        if (self.isCrop) {
          // 如果鼠标不在裁剪区块内
          if (!self.isMouseCrop()) {
            self.resetCrop();
          }
        } else {
          // 渲染裁剪区块
          self.$crop.css({
            left: self.cropXY.x,
            top: self.cropXY.y,
          });

          self.$cropImg.css({
            position: 'absolute',
            left: -self.cropXY.x,
            top: -self.cropXY.y,
          });

          // 显示遮罩
          self.$tracker.css({
            'background-color': 'black',
            opacity: 0.5,
          });

          // 裁剪开始
          self.startCrop = true;

          // 有裁剪区块
          self.isCrop = true;

          // 绑定事件
          $(document)
            .on('mousemove', function () {
              self.drawCrop();
              self.mouseMove();
            })
            .on('mouseup', function () {
              self.mouseUp();
            });
        }
      });

    // 监听裁剪区块
    self.$crop

      // 按下
      .mousedown(function (event) {
        // 阻止默认事件
        event.preventDefault();

        // 获取鼠标相对容器位置
        self.cropDiffXY = getRelativeXY(self.$crop[0]);

        // 拉伸方向
        self.mouseEdge({
          w: function () {
            self.direction = 'w';
          },
          e: function () {
            self.direction = 'e';
          },
          n: function () {
            self.direction = 'n';
          },
          s: function () {
            self.direction = 's';
          },
          nw: function () {
            self.direction = 'nw';
          },
          sw: function () {
            self.direction = 'sw';
          },
          ne: function () {
            self.direction = 'ne';
          },
          se: function () {
            self.direction = 'se';
          },
          move: function () {
            self.direction = 'move';
          },
        });

        // 根据方向标识，执行对应的动作
        if (self.direction != 'move') {
          self.isAdjustCrop = true;
          self.isCropMove = false;
        } else {
          self.isAdjustCrop = false;
          self.isCropMove = true;
        }
      });
  };

  // 初始化裁剪区块
  Crop.prototype.initCrop = function () {
    var self = this;

    // 初始化裁剪区块位置
    self.cropStyle['left'] = self.cropXY.x;
    self.cropStyle['top'] = self.cropXY.y;

    // 初始化裁剪区块
    self.cropWidth = self.options.cropWidth / self.imgData.ratio;
    self.cropHeight = self.options.cropHeight / self.imgData.ratio;

    // 渲染裁剪区块
    self.$crop.css({
      width: self.cropWidth,
      height: self.cropHeight,
    });

    self.$cropImg.css({
      position: 'absolute',
      left: -self.cropXY.x,
      top: -self.cropXY.y,
    });

    // 显示遮罩
    self.$tracker.css({
      'background-color': 'black',
      opacity: 0.5,
    });

    self.isCrop = true;

    // 绑定事件
    $(document)
      .on('mousemove', function () {
        self.mouseMove();
      })
      .on('mouseup', function () {
        self.mouseUp();
      });

    // 设置数据，方便提交
    self.setData(self.cropXY.x, self.cropXY.y, self.cropWidth, self.cropHeight);

    // 显示数据
    self.showData(self.options.cropWidth, self.options.cropHeight);
  };

  Crop.prototype.mouseMove = function () {
    var self = this;

    // 如果没有裁剪区块
    if (!self.isCrop) {
      return;
    }

    // 显示鼠标手势
    self.mouseGesture();

    // 如果可以拉伸裁剪区块
    if (self.isAdjustCrop) {
      self.adjustCrop();
    }

    // 如果可以移动裁剪区块
    if (self.isCropMove) {
      self.moveCrop();
    }
  };

  Crop.prototype.mouseUp = function () {
    var self = this;

    // 如果裁剪宽度 || 裁剪高度不够时
    if (self.cropWidth <= 0 || self.cropHeight <= 0) {
      self.resetCrop();
      return;
    }

    // 重置起始位置和裁剪区块大小
    self.cropXY.x =
      typeof self.cropStyle.left !== 'undefined' ? self.cropStyle.left : self.cropXY.x;
    self.cropXY.y = typeof self.cropStyle.top !== 'undefined' ? self.cropStyle.top : self.cropXY.y;
    self.cropWidth =
      typeof self.cropStyle.width !== 'undefined' ? self.cropStyle.width : self.cropWidth;
    self.cropHeight =
      typeof self.cropStyle.height !== 'undefined' ? self.cropStyle.height : self.cropHeight;

    // 设置数据，方便提交
    self.setData(self.cropXY.x, self.cropXY.y, self.cropWidth, self.cropHeight);

    // 裁剪结束
    self.startCrop = false;

    // 不能拉伸裁剪区块
    self.isAdjustCrop = false;

    // 裁剪区块移动结束
    self.isCropMove = false;
  };

  // 绘制裁剪区块
  Crop.prototype.drawCrop = function (event) {
    var self = this;

    // 如果没有开始裁剪
    if (!self.startCrop) {
      return;
    }

    var // 获取鼠标相对容器位置
      relativeXY = getRelativeXY(self.$holder[0]),
      // 裁剪区块横坐标
      sx = self.cropXY.x,
      // 裁剪区块纵坐标
      sy = self.cropXY.y,
      // 最大拉伸宽度，最大拉伸高度
      maxExWidth,
      maxExHeight;

    // 记录裁剪大小
    self.cropWidth = Math.min(relativeXY.x, self.mxRange.right) - sx;
    self.cropHeight = Math.min(relativeXY.y, self.mxRange.bottom) - sy;

    // 裁剪区块位置
    self.cropStyle['left'] = self.cropXY.x;
    self.cropStyle['top'] = self.cropXY.y;

    // 如果有拉伸比例
    if (self.options.aspectRatio) {
      var aspectRatio = self.options.aspectRatio;

      // 如果宽度小于高度
      if (self.options.aspectRatio < 1) {
        self.cropWidth = self.cropHeight * aspectRatio;
      } else {
        self.cropHeight = self.cropWidth * aspectRatio;
      }

      // 最大拉伸宽度 ＝ Math.min((下边界 - 裁剪区块纵坐标) * 拉伸比例, 右边界 - 裁剪区块横坐标);
      maxExWidth = Math.min((self.mxRange.bottom - sy) * aspectRatio, self.mxRange.right - sx);

      // 最大拉伸高度 ＝ Math.min((右边界 - 裁剪区块横坐标) / 拉伸比例, 下边界 - 裁剪区块纵坐标);
      maxExHeight = Math.min((self.mxRange.right - sx) / aspectRatio, self.mxRange.bottom - sy);
    } else {
      maxExWidth = self.mxRange.right - sx;
      maxExHeight = self.mxRange.bottom - sy;
    }

    // 设置裁剪区块大小
    self.$crop.css({
      width: Math.min(self.cropWidth, maxExWidth),
      height: Math.min(self.cropHeight, maxExHeight),
    });

    // 显示裁剪区块
    self.$crop.show();

    // 显示数据
    self.showData(self.cropWidth, self.cropHeight, self.imgData.ratio);
  };

  // 移动裁剪区块
  Crop.prototype.moveCrop = function () {
    var self = this;

    // 获取鼠标相对容器位置
    relativeXY = getRelativeXY(self.$holder[0]);

    // 获取元素位置
    cropDragXY = getDragXY(relativeXY, self.cropDiffXY);

    // 移动过快，防卡处理
    (self.cropStyle['left'] = Math.max(
      Math.min(cropDragXY.x, self.mxRange.right - self.cropWidth),
      self.mxRange.left,
    )),
      (self.cropStyle['top'] = Math.max(
        Math.min(cropDragXY.y, self.mxRange.bottom - self.cropHeight),
        self.mxRange.top,
      ));

    // 移动裁剪区块
    self.$crop.css({
      top: self.cropStyle.top,
      left: self.cropStyle.left,
    });

    self.$cropImg.css({
      top: -self.cropStyle.top,
      left: -self.cropStyle.left,
    });
  };

  // 拉伸裁剪区块
  Crop.prototype.adjustCrop = function () {
    var self = this,
      // 获取鼠标相对容器位置
      relativeXY = getRelativeXY(self.$holder[0]);

    // 鼠标位置
    (x = Math.min(relativeXY.x, self.mxRange.right)),
      (y = Math.min(relativeXY.y, self.mxRange.bottom)),
      // 裁剪区块大小
      (w = self.cropWidth),
      (h = self.cropHeight),
      // 裁剪区块位置
      (sx = self.cropXY.x),
      (sy = self.cropXY.y),
      (cropImgStyle = {});

    // 如果有拉伸比例
    if (self.options.aspectRatio) {
      var aspectRatio = self.options.aspectRatio;

      // 根据方向标识拉伸裁剪区块
      switch (self.direction) {
        // 左拉伸
        case 'w':

        // 左下拉伸
        case 'sw':
          // 最大拉伸宽度 ＝ 拉伸的最大高度 * 拉伸比例;
          var maxExWidth = (self.mxRange.bottom - sy) * aspectRatio;

          // 拉伸宽度 ＝ Math.min(裁剪区块宽度 + (裁剪区块横坐标 - 鼠标横坐标), 最大拉伸宽度);
          var exWidth = Math.min(w + (sx - x), maxExWidth);

          // 拉伸高度 ＝ Math.min(拉伸宽度 / 拉伸比例, 下边界 - 裁剪区块纵坐标 );
          var exHeight = Math.min(exWidth / aspectRatio, self.mxRange.bottom - sy);

          // 鼠标横坐标（新）＝ Math.max(鼠标横坐标, (裁剪区块横坐标 + 裁剪区块宽度) - 最大拉伸宽度);
          var x = Math.max(x, sx + w - maxExWidth);

          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          self.cropStyle['left'] = x;
          cropImgStyle['left'] = -x;
          break;

        // 右下拉伸
        case 'se':

        // 右拉伸
        case 'e':
          // 最大拉伸宽度 ＝ Math.min((下边界 - 裁剪区块纵坐标) * 拉伸比例, 右边界 - 裁剪区块横坐标);
          var maxExWidth = Math.min(
            (self.mxRange.bottom - sy) * aspectRatio,
            self.mxRange.right - sx,
          );

          // 拉伸宽度 = Math.min(鼠标横坐标 - 裁剪区块横坐标, 最大拉伸宽度);
          var exWidth = Math.min(x - sx, maxExWidth);

          // 拉伸高度 = Math.min(拉伸宽度 / 拉伸比例, 下边界 - 裁剪区块纵坐标);
          var exHeight = Math.min(exWidth / aspectRatio, self.mxRange.bottom - sy);

          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          break;

        // 下拉伸
        case 's':
          // 最大拉伸宽度 ＝ Math.min((下边界 - 裁剪区块纵坐标) * 拉伸比例, 右边界 - 裁剪区块横坐标);
          var maxExWidth = Math.min(
            (self.mxRange.bottom - sy) * aspectRatio,
            self.mxRange.right - sx,
          );

          // 最大拉伸高度 ＝ Math.min((右边界 - 裁剪区块横坐标) / 拉伸比例, 下边界 - 裁剪区块纵坐标);
          var maxExHeight = Math.min(
            (self.mxRange.right - sx) / aspectRatio,
            self.mxRange.bottom - sy,
          );

          // 拉伸高度 = Math.min(鼠标纵坐标 - 裁剪区块纵坐标, 最大拉伸高度);
          var exHeight = Math.min(y - sy, maxExHeight);

          // 拉伸宽度 ＝ Math.min(拉伸高度 * 拉伸比例, 最大拉伸宽度);
          var exWidth = Math.min(exHeight * aspectRatio, maxExWidth);

          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          break;

        // 右上拉伸
        case 'ne':

        // 上拉伸
        case 'n':
          // 最大拉伸宽度 ＝ Math.min((裁剪区块高度 + 裁剪区块纵坐标) * 拉伸比例, 右边界 - 裁剪区块横坐标);
          var maxExWidth = Math.min((h + sy) * aspectRatio, self.mxRange.right - sx);

          // 最大拉伸高度 ＝ Math.min((右边界 - 裁剪区块横坐标) / 拉伸比例, 裁剪区块高度 + 裁剪区块纵坐标);
          var maxExHeight = Math.min((self.mxRange.right - sx) / aspectRatio, h + sy);

          // 拉伸高度 = Math.min(裁剪区块高度 + (裁剪区块纵坐标 - 鼠标纵坐标), 最大拉伸高度);
          var exHeight = Math.min(h + (sy - y), maxExHeight);

          // 拉伸宽度 ＝ Math.min(裁剪区块高度 * 拉伸比例, 最大拉伸宽度);
          var exWidth = Math.min(exHeight * aspectRatio, maxExWidth);

          // 鼠标纵坐标（新） ＝ Math.max(鼠标纵坐标, (裁剪区块纵坐标 + 裁剪区块高度) - 最大拉伸高度);
          var y = Math.max(y, sy + h - maxExHeight);

          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          self.cropStyle['top'] = y;
          cropImgStyle['top'] = -y;
          break;

        // 左上拉伸
        case 'nw':
          // 最大拉伸宽度 ＝ Math.min((裁剪区块高度 + 裁剪区块纵坐标) * 拉伸比例, 裁剪区块宽度 + 裁剪区块横坐标);
          var maxExWidth = Math.min((h + sy) * aspectRatio, w + sx);

          // 最大拉伸高度 ＝ Math.min((裁剪区块宽度 + 裁剪区块横坐标) / 拉伸比例, 裁剪区块高度 + 裁剪区块纵坐标);
          var maxExHeight = Math.min((w + sx) / aspectRatio, h + sy);

          // 拉伸高度 = Math.min(裁剪区块高度 + (裁剪区块纵坐标 + 鼠标纵坐标), 最大拉伸高度);
          var exHeight = Math.min(h + (sy - y), maxExHeight);

          // 拉伸宽度 ＝ Math.min(裁剪区块高度 * 拉伸比例, 最大拉伸宽度);
          var exWidth = Math.min(exHeight * aspectRatio, maxExWidth);

          // 鼠标纵坐标（新）＝ Math.max(鼠标纵坐标, (裁剪区块高度 + 裁剪区块纵坐标) - 最大拉伸高度);
          var y = Math.max(y, h + sy - maxExHeight);

          // 鼠标横坐标（新）＝ Math.min(Math.max(鼠标横坐标, 最大拉伸宽度), (裁剪区块宽度 + 裁剪区块横坐标) - 拉伸宽度);
          var x = Math.min(Math.max(x, maxExWidth), w + sx - exWidth);

          self.cropStyle['left'] = x;
          self.cropStyle['top'] = y;
          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          cropImgStyle['left'] = -x;
          cropImgStyle['top'] = -y;
          break;
      }
    } else {
      // 根据方向标识拉伸裁剪区块
      switch (self.direction) {
        // 左拉伸
        case 'w':
          // 拉伸宽度 ＝ Math.min(裁剪区块宽度 + (裁剪区块横坐标 - 鼠标横坐标), 裁剪区块横坐标 + 裁剪区块宽度);
          var exWidth = Math.min(w + (sx - x), sx + w);

          // 鼠标横坐标（新）= Math.max(鼠标横坐标，左边界);
          var x = Math.max(x, self.mxRange.left);

          self.cropStyle['width'] = exWidth;
          self.cropStyle['left'] = x;
          cropImgStyle['left'] = -x;
          break;

        // 右拉伸
        case 'e':
          // 拉伸宽度 ＝ Math.min(鼠标横坐标 - 裁剪区块横坐标, 右边界 - 裁剪区块横坐标);
          var exWidth = Math.min(x - sx, self.mxRange.right - sx);
          self.cropStyle['width'] = exWidth;
          break;

        // 上拉伸
        case 'n':
          // 拉伸高度 ＝ 裁剪区块高度 + (裁剪区块横坐标 - 鼠标横坐标);
          var exHeight = Math.min(h + (sy - y), sy + h);

          // 鼠标纵坐标（新）= Math.max(鼠标纵坐标，上边界);
          var y = Math.max(y, self.mxRange.top);

          self.cropStyle['height'] = exHeight;
          self.cropStyle['top'] = y;
          cropImgStyle['top'] = -y;
          break;

        // 下拉伸
        case 's':
          // 拉伸高度 ＝ Math.min(鼠标纵坐标 - 裁剪区块纵坐标, 下边界 - 裁剪区块纵坐标);
          var exHeight = Math.min(y - sy, self.mxRange.bottom - sy);
          self.cropStyle['height'] = exHeight;
          break;

        // 左上拉伸
        case 'nw':
          // 拉伸宽度 ＝ Math.min(裁剪区块宽度 + (裁剪区块横坐标 - 鼠标横坐标), 裁剪区块横坐标 + 裁剪区块宽度);
          var exWidth = Math.min(w + (sx - x), sx + w);

          // 拉伸高度 ＝ Math.min(裁剪区块高度 + (裁剪区块横坐标 - 鼠标横坐标), 裁剪区块纵坐标 + 裁剪区块高度);
          var exHeight = Math.min(h + (sy - y), sy + h);

          // 鼠标横坐标（新）= Math.max(鼠标横坐标，左边界);
          var x = Math.max(x, self.mxRange.left);

          // 鼠标纵坐标（新）= Math.max(鼠标纵坐标，上边界);
          var y = Math.max(y, self.mxRange.top);

          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          self.cropStyle['left'] = x;
          self.cropStyle['top'] = y;
          cropImgStyle['left'] = -x;
          cropImgStyle['top'] = -y;
          break;

        // 左下拉伸
        case 'sw':
          // 拉伸宽度 ＝ Math.min(裁剪区块宽度 + (裁剪区块横坐标 - 鼠标横坐标), 裁剪区块横坐标 + 裁剪区块宽度);
          var exWidth = Math.min(w + (sx - x), sx + w);

          // 拉伸高度 ＝ Math.min(鼠标纵坐标 - 裁剪区块纵坐标, 下边界 - 裁剪区块纵坐标);
          var exHeight = Math.min(y - sy, self.mxRange.bottom - sy);

          // 鼠标横坐标（新）= Math.max(鼠标横坐标，左边界);
          var x = Math.max(x, self.mxRange.left);

          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          self.cropStyle['left'] = x;
          cropImgStyle['left'] = -x;
          break;

        // 右上拉伸
        case 'ne':
          // 拉伸宽度 ＝ Math.min(鼠标横坐标 - 裁剪区块横坐标, 右边界 - 裁剪区块横坐标);
          var exWidth = Math.min(x - sx, self.mxRange.right - sx);

          // 拉伸高度 ＝ Math.min(裁剪区块高度 + (裁剪区块横坐标 - 鼠标横坐标), 裁剪区块纵坐标 + 裁剪区块高度);
          var exHeight = Math.min(h + (sy - y), sy + h);

          // 鼠标纵坐标（新）= Math.max(鼠标纵坐标，上边界);
          var y = Math.max(y, self.mxRange.top);

          self.cropStyle['top'] = y;
          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          cropImgStyle['top'] = -y;
          break;

        // 右下拉伸
        case 'se':
          // 拉伸宽度 ＝ Math.min(鼠标横坐标 - 裁剪区块横坐标, 右边界 - 裁剪区块横坐标);
          var exWidth = Math.min(x - sx, self.mxRange.right - sx);

          // 拉伸高度 ＝ Math.min(鼠标纵坐标 - 裁剪区块纵坐标, 下边界 - 裁剪区块纵坐标);
          var exHeight = Math.min(y - sy, self.mxRange.bottom - sy);

          self.cropStyle['width'] = exWidth;
          self.cropStyle['height'] = exHeight;
          break;
      }
    }

    // 渲染裁剪区块
    self.$crop.css(self.cropStyle);
    self.$cropImg.css(cropImgStyle);

    // 显示数据
    self.showData(self.cropStyle.width, self.cropStyle.height, self.imgData.ratio);
  };

  // 显示鼠标各种手势
  Crop.prototype.mouseGesture = function () {
    var self = this,
      style = {};

    self.mouseEdge({
      w: function () {
        style['cursor'] = 'w-resize';
      },
      e: function () {
        style['cursor'] = 'e-resize';
      },
      n: function () {
        style['cursor'] = 'n-resize';
      },
      s: function () {
        style['cursor'] = 's-resize';
      },
      nw: function () {
        style['cursor'] = 'nw-resize';
      },
      sw: function () {
        style['cursor'] = 'sw-resize';
      },
      ne: function () {
        style['cursor'] = 'ne-resize';
      },
      se: function () {
        style['cursor'] = 'se-resize';
      },
      move: function () {
        style['cursor'] = 'move';
      },
    });

    self.$crop.css(style);
  };

  // 判断鼠标是否在裁剪区块内
  Crop.prototype.isMouseCrop = function () {
    var self = this,
      // 获取鼠标相对容器位置
      relativeXY = getRelativeXY(self.$holder[0]);

    if (
      relativeXY.x > self.cropXY.x &&
      relativeXY.x < self.cropXY.x + self.cropWidth &&
      relativeXY.y > self.cropXY.y &&
      relativeXY.y < self.cropXY.y + self.cropHeight
    ) {
      return true;
    } else {
      return false;
    }
  };

  // 判断鼠标是否在容器内
  Crop.prototype.isMouseContainer = function () {
    var self = this,
      // 获取鼠标相对容器位置
      relativeXY = getRelativeXY(self.$holder[0]);

    if (
      relativeXY.x > self.mxRange.left &&
      relativeXY.x < self.mxRange.right &&
      relativeXY.y > self.mxRange.top &&
      relativeXY.y < self.mxRange.bottom
    ) {
      return true;
    } else {
      return false;
    }
  };

  // 鼠标悬浮边缘处理
  Crop.prototype.mouseEdge = function (obj) {
    var self = this,
      // 获取鼠标相对容器位置
      relativeXY = getRelativeXY(self.$holder[0]),
      // 偏移量（四个方向）
      offset = {
        left: relativeXY.x - self.cropXY.x,
        right: relativeXY.x - (self.cropXY.x + self.cropWidth),
        top: relativeXY.y - self.cropXY.y,
        bottom: relativeXY.y - (self.cropXY.y + self.cropHeight),
      },
      // 方向标识
      direction = '';

    // 左边界
    if (offset.left >= 0 && offset.left <= 10) {
      direction = 'w';

      // 左上角
      if (offset.top >= 0 && offset.top <= 10) {
        direction = 'nw';
      }

      // 左下角
      if (offset.bottom >= -5 && offset.bottom <= 5) {
        direction = 'sw';
      }

      // 右边界
    } else if (offset.right >= -5 && offset.right <= 5) {
      direction = 'e';

      // 右上角
      if (offset.top >= 0 && offset.top <= 10) {
        direction = 'ne';
      }

      // 右下角
      if (offset.bottom >= -8 && offset.bottom <= 5) {
        direction = 'se';
      }

      // 上边界
    } else if (offset.top >= 0 && offset.top <= 5) {
      direction = 'n';

      // 下边界
    } else if (offset.bottom >= -8 && offset.bottom <= 0) {
      direction = 's';

      // 移动
    } else {
      direction = 'move';
    }

    obj[direction]();
  };

  // 设置数据，方便提交
  Crop.prototype.setData = function (x, y, w, h) {
    this.$elem.attr('data-pos', [x, y, w, h]);
    this.imgData.ratio && this.$elem.attr('data-ratio', this.imgData.ratio.toFixed(2));
  };

  // 显示数据
  Crop.prototype.showData = function (w, h, ratio) {
    w && this.$width.text(~~(w * (ratio || 1)));
    h && this.$height.text(~~(h * (ratio || 1)));
    this.$data.show();
  };

  // 重置裁剪效果
  Crop.prototype.resetCrop = function () {
    // 重置裁剪效果
    this.$crop.hide();
    this.$tracker.css({
      opactiy: 1,
      'background-color': 'transparent',
    });

    // 裁剪区块位置
    this.cropXY = {};

    // 裁剪区块大小
    this.cropWidth = 0;
    this.cropHeight = 0;

    // 是否开始裁剪
    this.startCrop = false;

    // 是否有裁剪区块
    this.isCrop = false;

    // 裁剪区块和鼠标之间的差值
    this.cropDiffXY = {};

    // 裁剪区块是否正在移动
    this.isCropMove = false;

    // 方向标识
    this.direction = 'move';

    // 是否可以调整裁剪区块
    this.isAdjustCrop = false;

    // 裁剪位置信息（中转）
    this.cropStyle = {};

    // 清除数据
    this.$elem.removeAttr('data-pos');

    // 注销事件
    $(document).off('mousemove');
    $(document).off('mouseup');
  };

  // 获取鼠标相对容器位置
  var getRelativeXY = function (obj) {
    var // 获取鼠标位置
      pageXY = getPageXY(event),
      offsetXY = getAbsPos(obj);

    return {
      x: pageXY.x - offsetXY.x,
      y: pageXY.y - offsetXY.y,
    };
  };

  // 获取事件对象
  var getEvent = function (event) {
    return event ? event : window.event;
  };

  // 获取滚动条的距离
  var getScrollXY = function () {
    return {
      x: document.body.scrollLeft || document.documentElement.scrollLeft,
      y: document.body.scrollTop || document.documentElement.scrollTop,
    };
  };

  // 获取鼠标位置
  var getPageXY = function (event) {
    var event = getEvent(event),
      pageX = event.pageX,
      pageY = event.pageY,
      scrollXY = getScrollXY();

    if (pageX === undefined) {
      pageX = event.clientX + scrollXY.x;
      pageY = event.clientY + scrollXY.y;
    }
    return { x: pageX, y: pageY };
  };

  // 获取元素跟随鼠标的位置
  var getDragXY = function (pageXY, diffXY) {
    return { x: pageXY.x - diffXY.x, y: pageXY.y - diffXY.y };
  };

  // 获取元素相对视窗的绝对位置
  var getAbsPos = function (obj) {
    var offsetX = obj.offsetLeft,
      offsetY = obj.offsetTop,
      current = obj.offsetParent;
    while (current !== null) {
      offsetX += current.offsetLeft;
      offsetY += current.offsetTop;
      current = current.offsetParent;
    }
    return { x: offsetX, y: offsetY };
  };

  /**
   * 获取等比例缩放后的图片大小
   * @param  {Number} imgWidth        图片宽度
   * @param  {Number} imgHeight       图片高度
   * @param  {Number} containerWidth  容器宽度
   * @param  {Number} containerHeight 容器高度
   * @return {Object}                 缩放后的图片宽度，高度，比例
   */
  var getZoomImage = function (imgWidth, imgHeight, containerWidth, containerHeight) {
    var width, height, ratio;
    if (imgWidth > 0 && imgHeight > 0) {
      // 如果图片的宽高比大于等于容器的宽高比
      if (imgWidth / imgHeight >= containerWidth / containerHeight) {
        if (imgWidth > containerWidth) {
          width = containerWidth;
          height = (imgHeight * containerWidth) / imgWidth;
          ratio = imgWidth / containerWidth;
        } else {
          width = imgWidth;
          height = imgHeight;
        }
      } else {
        if (imgHeight > containerHeight) {
          height = containerHeight;
          width = (imgWidth * containerHeight) / imgHeight;
          ratio = imgHeight / containerHeight;
        } else {
          width = imgWidth;
          height = imgHeight;
        }
      }
    }

    return {
      zoomWidth: Math.round(width),
      zoomHeight: Math.round(height),
      ratio: ratio,
    };
  };
})(jQuery);
