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

	var cats = __webpack_require__(1);
	console.log(cats());

	var LLAnimation = __webpack_require__(2);

	var obj1 = LLAnimation.init();

	obj1.animate({
	    options: { duration: 500, ease: [0.89, 0.1, 0.99, 0.12] },
	    run: function run(rate) {
	        console.log(rate);
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var cats = ['dave', 'henry', 'martha'];

	var returnCats = function returnCats() {
	  return cats;
	};

	module.exports = returnCats;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var BezierEasing = __webpack_require__(3);

	var _requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	var LLAnimation = {};

	LLAnimation.init = function (item) {

	  return Object.assign({}, LLAnimation);
	};

	LLAnimation.animate = function (item) {
	  var _this = this;

	  var self = this;

	  this.options = {
	    duration: 500,
	    ease: false,
	    bezier: null,
	    waiting: false,
	    delay: false
	  };

	  this.prevPromise = this.prevPromise || null;

	  var promise = new Promise(function (resolve, reject) {
	    return self.resolve = resolve;
	  });

	  Object.assign(self.options, item.options);

	  if (_typeof(this.options.ease) === "object") {
	    var _options$ease = _slicedToArray(this.options.ease, 4);

	    var a = _options$ease[0];
	    var b = _options$ease[1];
	    var c = _options$ease[2];
	    var d = _options$ease[3];

	    this.options.bezier = BezierEasing(a, b, c, d);
	  }

	  this.step = function () {

	    var current = +new Date(),
	        remaining = self.end - current;

	    if (remaining < 50) {

	      item.run(1); //1 = progress is at 100%
	      self.resolve();
	      return;
	    } else {

	      var rate = remaining / self.options.duration;

	      if (typeof _this.options.bezier === "function") {
	        rate = _this.options.bezier(1 - rate);
	      } else if (self.options.ease) {
	        rate = Math.sqrt((1 - rate) * (2 - (1 - rate)));
	      } else {
	        rate = 1 - rate;
	      }

	      item.run(rate);
	    }

	    _requestAnimationFrame(self.step);
	  };

	  this.start = function () {

	    if (self.options.delay) {

	      setTimeout(function () {
	        self.end = +new Date() + _this.options.duration;
	        self.step();
	      }, self.options.delay);
	    } else {

	      self.end = +new Date() + _this.options.duration;
	      self.step();
	    }
	  };

	  if (self.prevPromise) {

	    if (self.options.waiting) {

	      self.prevPromise.then(function () {
	        return self.start();
	      });
	    } else {

	      self.start();
	    }
	  } else {

	    self.start();
	  }

	  var nextAnimation = Object.assign({}, LLAnimation);
	  nextAnimation.prevPromise = promise;

	  return nextAnimation;
	};

	LLAnimation.scrollTo = function (item) {

	  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

	  var scrollBy = item.to.getBoundingClientRect().top;

	  var options = {
	    duration: 500,
	    ease: false
	  };

	  Object.assign(options, item.options);

	  LLAnimation.animate({
	    options: options,
	    run: function run(rate) {
	      window.scrollTo(0, scrollTop + scrollBy * rate);
	    }
	  });
	};

	LLAnimation.animateStaggered = function (items) {

	  var obj = Object.assign({}, LLAnimation);

	  [].forEach.call(items.elements, function (el) {

	    obj = obj.animate({
	      options: items.options,
	      run: function run(rate) {
	        el.style[items.attribute] = 1 - rate;
	      }
	    });
	  });

	  return obj;
	};

	// var objScrollAni = LLAnimation.init();

	// setTimeout(function() { 
	//   objScrollAni.scrollTo({
	//      options : { duration : 400, ease : true },
	//      to : document.querySelector("#two")
	//   });
	// }, 1000);

	// setTimeout(function() {

	//   var obj1 = LLAnimation.init();
	//   var obj2 = LLAnimation.init();
	//   obj1.animate({
	//     options : { duration : 500, ease : false },
	//     run: function(rate) { 
	//           document.querySelector("h1").style.transform = "translateY("+ (100 * rate) + "px)";
	//       }
	//     }).animate({
	//     options : { duration : 500, ease : true, waiting : true },
	//     run: function(rate) { 
	//           document.querySelector("h1").style.transform = "translateY(100px) translateX("+ (100 * rate) + "px)";
	//       }
	//     }).animate({
	//     options : { duration : 500, ease : true, delay : 500 },
	//     run: function(rate) { 
	//           document.querySelector("h1").style.opacity = 1-rate;
	//       }
	//   });

	//   obj2.animateStaggered({
	//     options : { duration : 200, ease : true, delay : 500, waiting : true },
	//     elements : document.querySelectorAll("p"), 
	//     attribute : "opacity"
	//   }).animate({
	//     options : { duration : 500, ease : false, waiting : true },
	//     run: function(rate) { 
	//           document.querySelector("h1").style.opacity = rate;
	//       }
	//   });  

	// },1000);

	module.exports = LLAnimation;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * https://github.com/gre/bezier-easing
	 * BezierEasing - use bezier curve for transition easing function
	 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
	 */

	var BezierEasing = function () {

	  var NEWTON_ITERATIONS = 4;
	  var NEWTON_MIN_SLOPE = 0.001;
	  var SUBDIVISION_PRECISION = 0.0000001;
	  var SUBDIVISION_MAX_ITERATIONS = 10;

	  var kSplineTableSize = 11;
	  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

	  var float32ArraySupported = typeof Float32Array === 'function';

	  function A(aA1, aA2) {
	    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
	  }
	  function B(aA1, aA2) {
	    return 3.0 * aA2 - 6.0 * aA1;
	  }
	  function C(aA1) {
	    return 3.0 * aA1;
	  }

	  function calcBezier(aT, aA1, aA2) {
	    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
	  }

	  function getSlope(aT, aA1, aA2) {
	    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	  }

	  function binarySubdivide(aX, aA, aB, mX1, mX2) {
	    var currentX,
	        currentT,
	        i = 0;
	    do {
	      currentT = aA + (aB - aA) / 2.0;
	      currentX = calcBezier(currentT, mX1, mX2) - aX;
	      if (currentX > 0.0) {
	        aB = currentT;
	      } else {
	        aA = currentT;
	      }
	    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
	    return currentT;
	  }

	  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
	    for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
	      var currentSlope = getSlope(aGuessT, mX1, mX2);
	      if (currentSlope === 0.0) {
	        return aGuessT;
	      }
	      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	      aGuessT -= currentX / currentSlope;
	    }
	    return aGuessT;
	  }

	  return function (mX1, mY1, mX2, mY2) {
	    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
	      throw new Error('bezier x values must be in [0, 1] range');
	    }

	    var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
	    if (mX1 !== mY1 || mX2 !== mY2) {
	      for (var i = 0; i < kSplineTableSize; ++i) {
	        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	      }
	    }

	    function getTForX(aX) {
	      var intervalStart = 0.0;
	      var currentSample = 1;
	      var lastSample = kSplineTableSize - 1;

	      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
	        intervalStart += kSampleStepSize;
	      }
	      --currentSample;

	      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
	      var guessForT = intervalStart + dist * kSampleStepSize;

	      var initialSlope = getSlope(guessForT, mX1, mX2);
	      if (initialSlope >= NEWTON_MIN_SLOPE) {
	        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
	      } else if (initialSlope === 0.0) {
	        return guessForT;
	      } else {
	        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
	      }
	    }

	    return function BezierEasing(x) {
	      if (mX1 === mY1 && mX2 === mY2) {
	        return x;
	      }
	      if (x === 0) {
	        return 0;
	      }
	      if (x === 1) {
	        return 1;
	      }
	      return calcBezier(getTForX(x), mY1, mY2);
	    };
	  };
	}();

	module.exports = BezierEasing;

/***/ }
/******/ ]);