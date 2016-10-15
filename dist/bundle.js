/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Engin = __webpack_require__(1);

	var _Engin2 = _interopRequireDefault(_Engin);

	var _Circle = __webpack_require__(2);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _DrawLayout = __webpack_require__(3);

	var _DrawLayout2 = _interopRequireDefault(_DrawLayout);

	var _Bitmap = __webpack_require__(4);

	var _Bitmap2 = _interopRequireDefault(_Bitmap);

	var _MovieClip = __webpack_require__(5);

	var _MovieClip2 = _interopRequireDefault(_MovieClip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.getElementById("can");
	var eng = new _Engin2.default(canvas);

	var circle1 = new _Circle2.default(canvas, 100, 250, 40);
	var circle2 = new _Circle2.default(canvas, 500, 150, 40);
	var circle3 = new _Circle2.default(canvas, 0, 400, 40);

	eng.addChild(circle1);
	eng.addChild(circle2);
	eng.addChild(circle3);

	//
	var drawLayout = new _DrawLayout2.default(canvas);
	drawLayout.init();
	eng.addChild(drawLayout);

	var bmp = null;

	var img = new Image();
	img.src = "assets/images/pic.jpg";
	img.onload = function () {
		bmp = new _Bitmap2.default(canvas, img, 200, 300);
		eng.addChild(bmp);
	};

	function go() {
		circle3.x = circle3.x + 1;
		if (circle3.x > 800) circle3.x = 0;i;
		if (bmp) {
			bmp.y += 1;
			if (bmp.y > 600) bmp.y = 100;
		}
		eng.update();
		requestAnimationFrame(go);
	}

	requestAnimationFrame(go);

	var imgArr = [];

	for (var i = 1; i <= 35; i++) {
		var img2 = new Image();
		img2.onload = function () {
			imgArr.push(this);
			if (imgArr.length == 35) {
				console.log('ok..');

				var mc = new _MovieClip2.default(canvas, imgArr, 0, 0, 0);
				mc.play();
				eng.addChild(mc);
			}
		};
		if (i < 10) {
			img2.src = "assets/images/frame/movie000" + i + ".png";
		} else if (i >= 10 && i < 100) {
			img2.src = "assets/images/frame/movie00" + i + ".png";
		} else {
			img2.src = "assets/images/frame/movie0" + i + ".png";
		}
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Engin = function () {
		function Engin(canvas) {
			var _this = this;

			_classCallCheck(this, Engin);

			this.displayObject = new Array();
			this.ctx = canvas.getContext('2d');

			//获取canvas边距
			this.canvasPosition = { x: canvas.offsetLeft, y: canvas.offsetTop };

			this.isSupportTouch = "ontouchend" in document ? true : false;
			this.eventName = this.isSupportTouch ? 'touchstart' : 'click';

			canvas.addEventListener(this.eventName, function (e) {
				_this.touchStartHandler(e);
			});
		}

		//整个canvas点击处理


		_createClass(Engin, [{
			key: 'touchStartHandler',
			value: function touchStartHandler(e) {
				var position = this.getPosition(e);
				for (var i = 0; i < this.displayObject.length; i++) {
					var hitTest = this.displayObject[i].handleClick(position);
					console.log(this.displayObject[i].x, this.displayObject[i].y, position.x, position.y);
					if (hitTest) {
						//这里抛出事件，传出被点击的对象
						alert("点了" + this.displayObject[i].toString());
					}
				}
				/*对游戏对象数组进行排序,从最顶层开始往下找 碰撞gameObject(x, y, zIndex, width, height) 
	   for (var i=0; i < sortedGameObjectArray.length; i++) { 
	   	var hitTest = sortedGameObjectArray[i].onclick(mouse); 			
	   	// stop as soon as one hit test succeeds 
	   	if (hitTest) { 
	   		break; // break out of the hit test 
	   	} 
	   }*/
				return false;
			}

			//规范化鼠标和触摸事件

		}, {
			key: 'getPosition',
			value: function getPosition(e) {
				var position = { x: null, y: null };
				if (this.isSupportTouch) {
					if (e.touches && e.touches.length > 0) {
						position.x = e.touches[0].pageX - this.canvasPosition.x;
						position.y = e.touches[0].pageY - this.canvasPosition.y;
					}
				} else {
					position.x = e.pageX - this.canvasPosition.x;
					position.y = e.pageY - this.canvasPosition.y;
				}
				return position;
			}
		}, {
			key: 'addChild',
			value: function addChild(obj) {
				this.displayObject.push(obj);
			}
		}, {
			key: 'removeChild',
			value: function removeChild() {}
		}, {
			key: 'update',
			value: function update() {
				this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
				for (var i in this.displayObject) {
					//刷新所有显示对象,暂无深度概念		
					this.displayObject[i].draw();

					//console.log(this.displayObject[i]);
				}
			}
		}, {
			key: 'toString',
			value: function toString() {
				return "[Engin]";
			}
		}]);

		return Engin;
	}();

	exports.default = Engin;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Circle = function () {
	  function Circle(canvas, x, y, radius) {
	    _classCallCheck(this, Circle);

	    this.ctx = canvas.getContext('2d');
	    this._x = x;
	    this._y = y;
	    this.radius = radius;

	    //这里的占位矩形，自行计算
	    this.rectangle = { x: x, y: y, width: radius * 2, height: radius * 2 };
	  }

	  _createClass(Circle, [{
	    key: 'draw',
	    value: function draw() {
	      this.ctx.beginPath();
	      //this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	      //这里使用圆的左上角作为 0点坐标，而不使用中心
	      this.ctx.arc(this._x + this.radius, this._y + this.radius, this.radius, 0, Math.PI * 2, true);
	      this.ctx.closePath();
	      this.ctx.fillStyle = 'green';
	      this.ctx.fill();
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick(mouse) {
	      if (this.rectangle.x < mouse.x && this.rectangle.x + this.rectangle.width > mouse.x && this.rectangle.y < mouse.y && this.rectangle.y + this.rectangle.height > mouse.y) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return "[Circle]";
	    }
	  }, {
	    key: 'x',
	    get: function get() {
	      return this._x;
	    },
	    set: function set(val) {
	      this._x = this.rectangle.x = val;
	    }
	  }, {
	    key: 'y',
	    get: function get() {
	      return this._y;
	    },
	    set: function set(val) {
	      this._y = this.rectangle.y = val;
	    }
	  }]);

	  return Circle;
	}();

	exports.default = Circle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DrawLayout = function () {
		function DrawLayout(canvas) {
			_classCallCheck(this, DrawLayout);

			this.ctx = canvas.getContext('2d');
			this.canvas = canvas;

			this.isDraw = false;
			this.lastX = 0;
			this.lastY = 0;
			this.x = 0;
			this.y = 0;

			this.temp = new Array();

			this.graphicsData = new Array();
		}

		_createClass(DrawLayout, [{
			key: 'init',
			value: function init() {
				var _this = this;

				this.graphicsData = new Array();
				this.canvas.addEventListener('touchstart', function (e) {
					e.preventDefault();
					_this.touchStart(e);
				}, false);
				this.canvas.addEventListener('touchmove', function (e) {
					e.preventDefault();
					_this.touchMove(e);
				}, false);
				this.canvas.addEventListener('touchEnd', function (e) {
					e.preventDefault();
					_this.touchEnd(e);
				}, false);
			}
		}, {
			key: 'touchStart',
			value: function touchStart(e) {
				this.isDraw = true;
				this.temp = new Array();
				this.temp.push({ x: e.touches[0].clientX - $(this.canvas).offset().left, y: e.touches[0].clientY - $(this.canvas).offset().top });
				this.graphicsData.push(this.temp);
			}
		}, {
			key: 'touchMove',
			value: function touchMove(e) {
				if (this.isDraw) {
					this.temp.push({ x: e.touches[0].clientX - $(this.canvas).offset().left, y: e.touches[0].clientY - $(this.canvas).offset().top });
				}
			}
		}, {
			key: 'touchEnd',
			value: function touchEnd(e) {
				this.isDraw = false;
			}
		}, {
			key: 'draw',
			value: function draw() {
				for (var i = 0; i < this.graphicsData.length; i++) {
					for (var j = 0; j < this.graphicsData[i].length; j++) {
						if (j > 0) {
							this.ctx.beginPath();
							this.ctx.strokeStyle = "red";
							this.ctx.lineWidth = 2;
							this.ctx.lineJoin = "round";

							this.ctx.moveTo(this.lastX, this.lastY);
							this.ctx.lineTo(this.graphicsData[i][j].x, this.graphicsData[i][j].y);
							this.ctx.closePath();
							this.ctx.stroke();
						}
						this.lastX = this.graphicsData[i][j].x;
						this.lastY = this.graphicsData[i][j].y;
					}
				}
			}
		}, {
			key: 'handleClick',
			value: function handleClick(mouse) {
				return false;
			}
		}]);

		return DrawLayout;
	}();

	exports.default = DrawLayout;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bitmap = function () {
	  function Bitmap(canvas, img, x, y) {
	    _classCallCheck(this, Bitmap);

	    this.ctx = canvas.getContext('2d');
	    this.img = img;
	    this._x = x;
	    this._y = y;

	    //这里的占位矩形，自行计算
	    this.rectangle = { x: x, y: y, width: img.width, height: img.height };
	  }

	  _createClass(Bitmap, [{
	    key: "draw",
	    value: function draw() {
	      this.ctx.drawImage(this.img, this._x, this._y);
	      //drawImage(image, dx, dy);
	      //drawImage(image, dx, dy, dw, dh);
	      //drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
	    }
	  }, {
	    key: "handleClick",
	    value: function handleClick(mouse) {
	      if (this.rectangle.x < mouse.x && this.rectangle.x + this.rectangle.width > mouse.x && this.rectangle.y < mouse.y && this.rectangle.y + this.rectangle.height > mouse.y) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: "toString",
	    value: function toString() {
	      return "[Bitmap]";
	    }
	  }, {
	    key: "x",
	    get: function get() {
	      return this._x;
	    },
	    set: function set(val) {
	      this._x = this.rectangle.x = val;
	    }
	  }, {
	    key: "y",
	    get: function get() {
	      return this._y;
	    },
	    set: function set(val) {
	      this._y = this.rectangle.y = val;
	    }
	  }]);

	  return Bitmap;
	}();

	exports.default = Bitmap;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MovieClip = function () {

		/*
	 canvas     画布
	 imgArr     img数组
	 x
	 y
	 rotation   旋转
	 loopCount  循环次数
	 callBack   播放完成回调
	 */
		function MovieClip(canvas, imgArr, x, y, rotation, loopCount, callBack) {
			_classCallCheck(this, MovieClip);

			this.ctx = canvas.getContext('2d');
			this._img_arr = imgArr;
			this.x = x;
			this.y = y;
			this.rotation = rotation;

			this._tempTimer = 0;
			this._isPlaying = false;
			this._frameId = 0;

			this.loopCount = loopCount || -1; //循环次数
			this._tempCount = 0; //当前的循环次数，用来计数
			this._callBackFun = callBack || null;

			//这里的占位矩形，自行计算
			this.rectangle = { x: x, y: y, width: this._img_arr[0].width, height: this._img_arr[0].height };
		}

		//播放方法			


		_createClass(MovieClip, [{
			key: "play",
			value: function play() {
				this._isPlaying = true;
			}
			//停止

		}, {
			key: "stop",
			value: function stop() {
				this._isPlaying = false;
			}

			//循环绘制图片

		}, {
			key: "draw",
			value: function draw() {
				if (this._isPlaying) {
					if (this._tempTimer++ > 1) {
						this._tempTimer = 0;
					}
					if (this._tempTimer == 0) {
						//console.log("draw",this._tempTimer);	
						if (this._frameId < this._img_arr.length - 1) {
							this._frameId++;
						} else {
							this._tempCount++;
							this._frameId = 0;
						}
					}
				}

				this.ctx.save(); //保存状态
				this.ctx.translate(this.x, this.y); //设置画布上的(0,0)位置，也就是旋转的中心点
				this.ctx.rotate(this.rotation * Math.PI / 180);

				var pic = this._img_arr[this._frameId];
				this.ctx.drawImage(pic, 0, 0); //上面translate坐标了，这里就直接00就好了
				//this.ctx.drawImage(pic, this.x, this.y);	
				this.ctx.scale(3, 3);
				this.ctx.restore(); //恢复状态

				//完成播放动作判断
				if (this.loopCount != -1 && this._tempCount == this.loopCount) {
					this._tempCount = 0;
					this.stop();
					typeof this._callBackFun == "function" && this._callBackFun();
				}
			}

			//这个简易点击不支持旋转

		}, {
			key: "handleClick",
			value: function handleClick(mouse) {
				if (this.rectangle.x < mouse.x && this.rectangle.x + this.rectangle.width > mouse.x && this.rectangle.y < mouse.y && this.rectangle.y + this.rectangle.height > mouse.y) {
					return true;
				}
				return false;
			}
		}]);

		return MovieClip;
	}();

	exports.default = MovieClip;

/***/ }
/******/ ]);