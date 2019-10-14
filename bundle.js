/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.htm":
/*!***********************!*\
  !*** ./src/index.htm ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.htm";

/***/ }),

/***/ "./src/js/arrow.ts":
/*!*************************!*\
  !*** ./src/js/arrow.ts ***!
  \*************************/
/*! exports provided: Arrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Arrow", function() { return Arrow; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/js/vector.ts");
/* harmony import */ var _ray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ray */ "./src/js/ray.ts");


var Arrow = /** @class */ (function () {
    function Arrow(engine) {
        this.size = 7;
        this.speed = 100;
        this.detectionRadius = 100;
        this.engine = engine;
        this.position = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](Math.floor(Math.random() * engine.width), Math.floor(Math.random() * engine.height));
        this.direction = Math.floor(Math.random() * 360);
        this.updateDirection(this.direction);
    }
    Arrow.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.position.x + this.point1[0], this.position.y + this.point1[1]);
        ctx.lineTo(this.position.x + this.point2[0], this.position.y + this.point2[1]);
        ctx.lineTo(this.position.x + this.point3[0], this.position.y + this.point3[1]);
        ctx.fill();
    };
    Arrow.prototype.update = function (time) {
        if (this.position.x > this.engine.width)
            this.position.x -= this.engine.width;
        if (this.position.y > this.engine.height)
            this.position.y -= this.engine.height;
        if (this.position.x < 0)
            this.position.x += this.engine.width;
        if (this.position.y < 0)
            this.position.y += this.engine.height;
        this.position.x += this.directionVector.x * this.speed * time / 1000;
        this.position.y += this.directionVector.y * this.speed * time / 1000;
        //this.direction += 1;
        //this.newDirection(this.direction);
    };
    Arrow.prototype.calcPoint = function (direction) {
        var point;
        //console.log(direction)
        point = [Math.cos(direction * Math.PI / 180) * this.size, Math.sin(direction * Math.PI / 180) * this.size];
        return point;
    };
    Arrow.prototype.calcDirectionVector = function (direction) {
        var point;
        //console.log(direction)
        point = [Math.cos(direction * Math.PI / 180), Math.sin(direction * Math.PI / 180)];
        return point;
    };
    Arrow.prototype.CheckObstacle = function (ctx) {
        var tempPos = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](this.point1[0], this.point1[1]);
        this.ray = new _ray__WEBPACK_IMPORTED_MODULE_1__["Ray"](tempPos);
        var distObstacle = this.ray.castRay(ctx, this.detectionRadius, this.directionVector);
        if (distObstacle < this.detectionRadius && distObstacle != 0) {
            this.ray.drawRay(ctx);
        }
    };
    Arrow.prototype.updateDirection = function (direction) {
        //Movement
        this.directionVector = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](this.calcDirectionVector(direction)[0], this.calcDirectionVector(direction)[1]);
        //Triangle points
        this.point1 = this.calcPoint(direction);
        this.point2 = this.calcPoint(direction + 150);
        this.point3 = this.calcPoint(direction - 150);
    };
    return Arrow;
}());



/***/ }),

/***/ "./src/js/index.ts":
/*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
/*! exports provided: Engine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Engine", function() { return Engine; });
/* harmony import */ var _arrow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrow */ "./src/js/arrow.ts");

var Engine = /** @class */ (function () {
    function Engine() {
        this.arrowAmount = 5;
        this.objects = new Array();
        this.date = new Date();
        this.timeZero = this.date.getTime();
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.drawArrow(this.arrowAmount);
        this.gameLoop();
    }
    Engine.prototype.drawArrow = function (amount) {
        for (var i = 0; i < amount; i++) {
            var arrow = new _arrow__WEBPACK_IMPORTED_MODULE_0__["Arrow"](this);
            arrow.draw(this.ctx);
            this.objects.push(arrow);
        }
    };
    Engine.prototype.gameLoop = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.date = new Date();
        this.timeNow = this.date.getTime();
        var time = this.timeNow - this.timeZero;
        this.timeZero = this.timeNow;
        this.objects.forEach(function (element) {
            element.CheckObstacle(_this.ctx);
            element.update(time);
            element.draw(_this.ctx);
        });
        window.requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Engine;
}());

new Engine();


/***/ }),

/***/ "./src/js/ray.ts":
/*!***********************!*\
  !*** ./src/js/ray.ts ***!
  \***********************/
/*! exports provided: Ray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ray", function() { return Ray; });
var Ray = /** @class */ (function () {
    function Ray(startPos) {
        this.startPos = startPos;
        this.rayPos = startPos;
    }
    Ray.prototype.castRay = function (ctx, radius, direction) {
        var count = 0;
        for (var i = 0; i < radius; i++) {
            if (this.checkObstacle(ctx))
                return count;
            this.rayPos.x += direction.x * 2;
            this.rayPos.y += direction.y * 2;
            count++;
        }
        return count;
    };
    Ray.prototype.checkObstacle = function (ctx) {
        var imgData = ctx.getImageData(this.rayPos.x, this.rayPos.y, 1, 1);
        //console.log(imgData.data);
        if (imgData.data[0] == 255 && imgData.data[1] == 255 && imgData.data[2] == 255)
            return true;
        return false;
    };
    Ray.prototype.drawRay = function (ctx) {
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.startPos.x, this.startPos.y);
        ctx.lineTo(this.rayPos.x, this.rayPos.y);
        ctx.stroke();
    };
    return Ray;
}());



/***/ }),

/***/ "./src/js/vector.ts":
/*!**************************!*\
  !*** ./src/js/vector.ts ***!
  \**************************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());



/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bundle.css";

/***/ }),

/***/ 0:
/*!**********************************************************************!*\
  !*** multi ./src/index.htm ./src/scss/styles.scss ./src/js/index.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/index.htm */"./src/index.htm");
__webpack_require__(/*! ./src/scss/styles.scss */"./src/scss/styles.scss");
module.exports = __webpack_require__(/*! ./src/js/index.ts */"./src/js/index.ts");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map