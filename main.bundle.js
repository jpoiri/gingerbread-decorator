/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scenes_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/Game */ "./src/scenes/Game.js");



const config = {
	type: (phaser__WEBPACK_IMPORTED_MODULE_0___default().AUTO),
	backgroundColor: '#FFFFFF',
	scale: {
		mode: (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scale).FIT,
        autoCenter: (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scale).CENTER_BOTH,
		width: 1024,
		height: 768
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 200 }
		}
	},
	scene: [_scenes_Game__WEBPACK_IMPORTED_MODULE_1__["default"]]
};

const game = new (phaser__WEBPACK_IMPORTED_MODULE_0___default().Game)(config);


/***/ }),

/***/ "./src/scenes/Game.js":
/*!****************************!*\
  !*** ./src/scenes/Game.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameScene)
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);


class GameScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
	constructor() {
		super('game');
	}

	preload() {
		this.load.image('gingerbread-man', 'assets/img/gingerbread-man.png');
	}

	create() {
		this.createColorToolbar();
		this.createBrushToolbar();
		this.gingerbreadMan = this.add.image(500, 400, 'gingerbread-man');
		this.graphics = this.add.graphics({
			lineStyle: {
				width: 3,
				color: 0xffffff,
				line: 1
			},
			fillStyle: {
				width: 1,
				color: 0xffffff,
				line: 1
			}
		});
		this.width = 15;
		this.height = 15;
		this.radius = 7;
		this.brushColor = 'xFFFFFF';
		this.brushShape = 'circle';
	}

	createColorToolbar() {
		const width = 50;
		const height = 50;
		const x = 50;
		const y = 300;
		const offset = 55;
		const colors = [0xff0000, 0xff7878, 0xffffff, 0x74d680, 0xc6efff, 0x8cd4ff];
		for (let i = 0, rows = 0, len = colors.length; i < len; i++) {
			if (i > 0 && i % 2 === 0) {
				rows++;
			}
			const colorRectangle = this.add.rectangle(i % 2 === 0 ? x : x + offset, offset * rows + y, width, height, colors[i]);
			colorRectangle.setInteractive();
			colorRectangle.on('pointerdown', () => {
				if (this.selectedColorRectangle) {
					this.selectedColorRectangle.destroy();
				}
				this.selectedColorRectangle = this.add.rectangle(colorRectangle.x, colorRectangle.y, 50, 50);
				this.selectedColorRectangle.setStrokeStyle(3, 0x000000);
                this.graphics.fillStyle(colors[i]);
                this.graphics.lineStyle(3, colors[i]);
			});
		}
	}

	createBrushToolbar() {
		const squareBrushRectangle = this.add.rectangle(50, 50, 50, 50, 0xd3d3d3);
		this.add.rectangle(squareBrushRectangle.x, squareBrushRectangle.y, 25, 25, 0x000000);
		squareBrushRectangle.setInteractive();
		squareBrushRectangle.on('pointerdown', () => {
			if (this.selectedBrushRectangle) {
				this.selectedBrushRectangle.destroy();
			}
			this.selectedBrushRectangle = this.add.rectangle(squareBrushRectangle.x, squareBrushRectangle.y, 50, 50);
			this.selectedBrushRectangle.setStrokeStyle(3, 0x000000);
			this.brushShape = 'square';
		});

		const squareStrokeBrushRectangle = this.add.rectangle(105, 50, 50, 50, 0xd3d3d3);
		const squareStrokeBrushIcon = this.add.rectangle(squareStrokeBrushRectangle.x, squareStrokeBrushRectangle.y, 25, 25);
		squareStrokeBrushIcon.setStrokeStyle(3, 0x000000);

		squareStrokeBrushRectangle.setInteractive();
		squareStrokeBrushRectangle.on('pointerdown', () => {
			if (this.selectedBrushRectangle) {
				this.selectedBrushRectangle.destroy();
			}
			this.selectedBrushRectangle = this.add.rectangle(squareStrokeBrushRectangle.x, squareStrokeBrushRectangle.y, 50, 50);
			this.selectedBrushRectangle.setStrokeStyle(3, 0x000000);
			this.brushShape = 'stroke-square';
		});

		const circleBrushRectangle = this.add.rectangle(50, 105, 50, 50, 0xd3d3d3);
        const circleBrushIcon = this.add.circle(circleBrushRectangle.x, circleBrushRectangle.y, 15, 0x000000);
        circleBrushRectangle.setInteractive();
        circleBrushRectangle.on('pointerdown', () => {
			if (this.selectedBrushRectangle) {
				this.selectedBrushRectangle.destroy();
			}
			this.selectedBrushRectangle = this.add.rectangle(circleBrushRectangle.x, circleBrushRectangle.y, 50, 50);
			this.selectedBrushRectangle.setStrokeStyle(3, 0x000000);
			this.brushShape = 'circle';
		});

		const strokeCircleBrushRectangle = this.add.rectangle(105, 105, 50, 50, 0xd3d3d3);
		const strokeCircleBrushIcon = this.add.circle(strokeCircleBrushRectangle.x, strokeCircleBrushRectangle.y, 15);
        strokeCircleBrushIcon.setStrokeStyle(3, 0x000000);
        strokeCircleBrushRectangle.setInteractive();
        strokeCircleBrushRectangle.on('pointerdown', () => {
			if (this.selectedBrushRectangle) {
				this.selectedBrushRectangle.destroy();
			}
			this.selectedBrushRectangle = this.add.rectangle(strokeCircleBrushRectangle.x, strokeCircleBrushRectangle.y, 50, 50);
			this.selectedBrushRectangle.setStrokeStyle(3, 0x000000);
			this.brushShape = 'stroke-circle';
		});
	}

	update() {
		const pointer = this.input.activePointer;

		if (pointer.isDown && pointer.x > 150) {
			switch (this.brushShape) {
				case 'square':
					this.graphics.fillRect(pointer.x - this.width / 2, pointer.y - this.height / 2, this.width, this.height);
					break;
				case 'stroke-square':
					this.graphics.strokeRect(pointer.x - this.width / 2, pointer.y - this.height / 2, this.width, this.height);
					break;
				case 'circle':
					this.graphics.fillCircle(pointer.x, pointer.y, this.radius);
					break;
				case 'stroke-circle':
					this.graphics.strokeCircle(pointer.x, pointer.y, this.radius);
					break;
			}
		}
	}
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgingerbread_decorator"] = self["webpackChunkgingerbread_decorator"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWQtZGVjb3JhdG9yLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci8uL3NyYy9zY2VuZXMvR2FtZS5qcyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGhhc2VyIGZyb20gJ3BoYXNlcic7XHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSAnLi9zY2VuZXMvR2FtZSc7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcblx0dHlwZTogUGhhc2VyLkFVVE8sXHJcblx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRicsXHJcblx0c2NhbGU6IHtcclxuXHRcdG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcbiAgICAgICAgYXV0b0NlbnRlcjogUGhhc2VyLlNjYWxlLkNFTlRFUl9CT1RILFxyXG5cdFx0d2lkdGg6IDEwMjQsXHJcblx0XHRoZWlnaHQ6IDc2OFxyXG5cdH0sXHJcblx0cGh5c2ljczoge1xyXG5cdFx0ZGVmYXVsdDogJ2FyY2FkZScsXHJcblx0XHRhcmNhZGU6IHtcclxuXHRcdFx0ZGVidWc6IHRydWUsXHJcblx0XHRcdGdyYXZpdHk6IHsgeTogMjAwIH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdHNjZW5lOiBbR2FtZVNjZW5lXVxyXG59O1xyXG5cclxuY29uc3QgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShjb25maWcpO1xyXG4iLCJpbXBvcnQgUGhhc2VyIGZyb20gJ3BoYXNlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoJ2dhbWUnKTtcclxuXHR9XHJcblxyXG5cdHByZWxvYWQoKSB7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2dpbmdlcmJyZWFkLW1hbicsICdhc3NldHMvaW1nL2dpbmdlcmJyZWFkLW1hbi5wbmcnKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZSgpIHtcclxuXHRcdHRoaXMuY3JlYXRlQ29sb3JUb29sYmFyKCk7XHJcblx0XHR0aGlzLmNyZWF0ZUJydXNoVG9vbGJhcigpO1xyXG5cdFx0dGhpcy5naW5nZXJicmVhZE1hbiA9IHRoaXMuYWRkLmltYWdlKDUwMCwgNDAwLCAnZ2luZ2VyYnJlYWQtbWFuJyk7XHJcblx0XHR0aGlzLmdyYXBoaWNzID0gdGhpcy5hZGQuZ3JhcGhpY3Moe1xyXG5cdFx0XHRsaW5lU3R5bGU6IHtcclxuXHRcdFx0XHR3aWR0aDogMyxcclxuXHRcdFx0XHRjb2xvcjogMHhmZmZmZmYsXHJcblx0XHRcdFx0bGluZTogMVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmaWxsU3R5bGU6IHtcclxuXHRcdFx0XHR3aWR0aDogMSxcclxuXHRcdFx0XHRjb2xvcjogMHhmZmZmZmYsXHJcblx0XHRcdFx0bGluZTogMVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMud2lkdGggPSAxNTtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gMTU7XHJcblx0XHR0aGlzLnJhZGl1cyA9IDc7XHJcblx0XHR0aGlzLmJydXNoQ29sb3IgPSAneEZGRkZGRic7XHJcblx0XHR0aGlzLmJydXNoU2hhcGUgPSAnY2lyY2xlJztcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbG9yVG9vbGJhcigpIHtcclxuXHRcdGNvbnN0IHdpZHRoID0gNTA7XHJcblx0XHRjb25zdCBoZWlnaHQgPSA1MDtcclxuXHRcdGNvbnN0IHggPSA1MDtcclxuXHRcdGNvbnN0IHkgPSAzMDA7XHJcblx0XHRjb25zdCBvZmZzZXQgPSA1NTtcclxuXHRcdGNvbnN0IGNvbG9ycyA9IFsweGZmMDAwMCwgMHhmZjc4NzgsIDB4ZmZmZmZmLCAweDc0ZDY4MCwgMHhjNmVmZmYsIDB4OGNkNGZmXTtcclxuXHRcdGZvciAobGV0IGkgPSAwLCByb3dzID0gMCwgbGVuID0gY29sb3JzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGlmIChpID4gMCAmJiBpICUgMiA9PT0gMCkge1xyXG5cdFx0XHRcdHJvd3MrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBjb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShpICUgMiA9PT0gMCA/IHggOiB4ICsgb2Zmc2V0LCBvZmZzZXQgKiByb3dzICsgeSwgd2lkdGgsIGhlaWdodCwgY29sb3JzW2ldKTtcclxuXHRcdFx0Y29sb3JSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdFx0Y29sb3JSZWN0YW5nbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5kZXN0cm95KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShjb2xvclJlY3RhbmdsZS54LCBjb2xvclJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyYXBoaWNzLmZpbGxTdHlsZShjb2xvcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ncmFwaGljcy5saW5lU3R5bGUoMywgY29sb3JzW2ldKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVCcnVzaFRvb2xiYXIoKSB7XHJcblx0XHRjb25zdCBzcXVhcmVCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZSg1MCwgNTAsIDUwLCA1MCwgMHhkM2QzZDMpO1xyXG5cdFx0dGhpcy5hZGQucmVjdGFuZ2xlKHNxdWFyZUJydXNoUmVjdGFuZ2xlLngsIHNxdWFyZUJydXNoUmVjdGFuZ2xlLnksIDI1LCAyNSwgMHgwMDAwMDApO1xyXG5cdFx0c3F1YXJlQnJ1c2hSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdHNxdWFyZUJydXNoUmVjdGFuZ2xlLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZS5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHNxdWFyZUJydXNoUmVjdGFuZ2xlLngsIHNxdWFyZUJydXNoUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcblx0XHRcdHRoaXMuYnJ1c2hTaGFwZSA9ICdzcXVhcmUnO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3Qgc3F1YXJlU3Ryb2tlQnJ1c2hSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoMTA1LCA1MCwgNTAsIDUwLCAweGQzZDNkMyk7XHJcblx0XHRjb25zdCBzcXVhcmVTdHJva2VCcnVzaEljb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoc3F1YXJlU3Ryb2tlQnJ1c2hSZWN0YW5nbGUueCwgc3F1YXJlU3Ryb2tlQnJ1c2hSZWN0YW5nbGUueSwgMjUsIDI1KTtcclxuXHRcdHNxdWFyZVN0cm9rZUJydXNoSWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcblxyXG5cdFx0c3F1YXJlU3Ryb2tlQnJ1c2hSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdHNxdWFyZVN0cm9rZUJydXNoUmVjdGFuZ2xlLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZS5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHNxdWFyZVN0cm9rZUJydXNoUmVjdGFuZ2xlLngsIHNxdWFyZVN0cm9rZUJydXNoUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcblx0XHRcdHRoaXMuYnJ1c2hTaGFwZSA9ICdzdHJva2Utc3F1YXJlJztcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IGNpcmNsZUJydXNoUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKDUwLCAxMDUsIDUwLCA1MCwgMHhkM2QzZDMpO1xyXG4gICAgICAgIGNvbnN0IGNpcmNsZUJydXNoSWNvbiA9IHRoaXMuYWRkLmNpcmNsZShjaXJjbGVCcnVzaFJlY3RhbmdsZS54LCBjaXJjbGVCcnVzaFJlY3RhbmdsZS55LCAxNSwgMHgwMDAwMDApO1xyXG4gICAgICAgIGNpcmNsZUJydXNoUmVjdGFuZ2xlLnNldEludGVyYWN0aXZlKCk7XHJcbiAgICAgICAgY2lyY2xlQnJ1c2hSZWN0YW5nbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlLmRlc3Ryb3koKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoY2lyY2xlQnJ1c2hSZWN0YW5nbGUueCwgY2lyY2xlQnJ1c2hSZWN0YW5nbGUueSwgNTAsIDUwKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuXHRcdFx0dGhpcy5icnVzaFNoYXBlID0gJ2NpcmNsZSc7XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBzdHJva2VDaXJjbGVCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZSgxMDUsIDEwNSwgNTAsIDUwLCAweGQzZDNkMyk7XHJcblx0XHRjb25zdCBzdHJva2VDaXJjbGVCcnVzaEljb24gPSB0aGlzLmFkZC5jaXJjbGUoc3Ryb2tlQ2lyY2xlQnJ1c2hSZWN0YW5nbGUueCwgc3Ryb2tlQ2lyY2xlQnJ1c2hSZWN0YW5nbGUueSwgMTUpO1xyXG4gICAgICAgIHN0cm9rZUNpcmNsZUJydXNoSWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgc3Ryb2tlQ2lyY2xlQnJ1c2hSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICBzdHJva2VDaXJjbGVCcnVzaFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShzdHJva2VDaXJjbGVCcnVzaFJlY3RhbmdsZS54LCBzdHJva2VDaXJjbGVCcnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHR0aGlzLmJydXNoU2hhcGUgPSAnc3Ryb2tlLWNpcmNsZSc7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpIHtcclxuXHRcdGNvbnN0IHBvaW50ZXIgPSB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXI7XHJcblxyXG5cdFx0aWYgKHBvaW50ZXIuaXNEb3duICYmIHBvaW50ZXIueCA+IDE1MCkge1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXMuYnJ1c2hTaGFwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ3NxdWFyZSc6XHJcblx0XHRcdFx0XHR0aGlzLmdyYXBoaWNzLmZpbGxSZWN0KHBvaW50ZXIueCAtIHRoaXMud2lkdGggLyAyLCBwb2ludGVyLnkgLSB0aGlzLmhlaWdodCAvIDIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3N0cm9rZS1zcXVhcmUnOlxyXG5cdFx0XHRcdFx0dGhpcy5ncmFwaGljcy5zdHJva2VSZWN0KHBvaW50ZXIueCAtIHRoaXMud2lkdGggLyAyLCBwb2ludGVyLnkgLSB0aGlzLmhlaWdodCAvIDIsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ2NpcmNsZSc6XHJcblx0XHRcdFx0XHR0aGlzLmdyYXBoaWNzLmZpbGxDaXJjbGUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMucmFkaXVzKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3N0cm9rZS1jaXJjbGUnOlxyXG5cdFx0XHRcdFx0dGhpcy5ncmFwaGljcy5zdHJva2VDaXJjbGUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMucmFkaXVzKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnaW5nZXJicmVhZF9kZWNvcmF0b3JcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZ2luZ2VyYnJlYWRfZGVjb3JhdG9yXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==