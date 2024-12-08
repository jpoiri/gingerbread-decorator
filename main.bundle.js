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
	type: (phaser__WEBPACK_IMPORTED_MODULE_0___default().CANVAS),
	backgroundColor: '#FFFFFF',
	debug: true,
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


const FONT_FAMILY = 'arial';
const FONT_SIZE = '20px';
const TEXT_COLOR = '#000000';

const BUTTON_BACKGROUND_COLOR = 0xd3d3d3;

const STAMP_SCALE = 0.08;

const SQUARE_BRUSH_SIZE = 15;
const CIRCLE_BRUSH_RADIUS = 7;
const STAR_BRUSH_NUMBER_OF_POINTS = 5;
const STAR_BRUSH_INNER_RADIUS = 5;
const STAR_BRUSH_OUTER_RADIUS = 10;
const BRUSH_LINE_WIDTH = 3;

const CENTER_X = 0.5;
const CENTER_Y = 0.5;

const TOOLBAR_WIDTH = 160;

const OPTION_WIDHT = 50;
const OPTION_HEIGHT = 50;

const SELECTED_OPTION_LINE_WIDTH = 3;
const SELECTED_OPTION_LINE_COLOR = 0x000000;

class GameScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
	constructor() {
		super('game');
	}

	preload() {
		this.load.image('house', 'assets/img/house.png');
		this.load.image('eraser-icon', 'assets/img/eraser.png');
		this.load.image('stamp-icon', 'assets/img/stamp.png');
		this.load.image('candy-cane', 'assets/img/candy-cane.png');
		this.load.image('gummy-bear', 'assets/img/gummy-bear.png');
		this.load.image('sweets', 'assets/img/sweets.png');
		this.load.image('mint', 'assets/img/mint.png');
		this.load.image('candy', 'assets/img/candy.png');
		this.load.image('chocolate', 'assets/img/chocolate.png');
		this.load.image('peppermint', 'assets/img/peppermint.png');
		this.load.image('candy2', 'assets/img/candy2.png');
		this.load.image('gum', 'assets/img/gum.png');
		this.load.image('truffle', 'assets/img/truffle.png');
		this.load.image('jelly-beans', 'assets/img/jelly-beans.png');
		this.load.image('sprinkles', 'assets/img/sprinkles.png');
		this.load.image('lollipop', 'assets/img/lollipop.png');
		this.load.image('food', 'assets/img/food.png');
	}

	create() {
		this.brushColor = 0xff0000;
		this.brush = 'circle';
		this.stamp = 'candy-cane';
		this.stampSizeMultiplier = 1;
		this.drawnShapes = [];
		this.stage = this.createStage();
		this.stageImage = this.createStageImage();
		this.createColorToolbar();
		this.createStampToolbar();
		this.createStampSizeToolbar();
		this.createToolToolbar();
		this.createButtons();
	}

	createStage() {
		const { width, height } = this.sys.game.canvas;
		const stage = this.add.rectangle(160, 45, width - TOOLBAR_WIDTH * 2, height - 90);
		stage.setOrigin(0, 0);
		stage.setStrokeStyle(4, 0x000000);
		return stage;
	}

	createStageImage(stage) {
		return this.add.image(this.stage.x + this.stage.width / 2, this.stage.y + this.stage.height / 2, 'house');
	}

	createColorToolbar() {
		const width = 50;
		const height = 50;
		const x = 50;
		const y = 350;
		const offset = 55;
		const colors = [0xff0000, 0xff7878, 0x146b3a, 0x74d680, 0x8cd4ff, 0xc6efff, 0xfac711, 0xeef6f2, 0x533225, 0xca936d];

		this.add.text(50, 300, 'Colors', {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});
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
				this.selectedColorRectangle = this.add.rectangle(colorRectangle.x, colorRectangle.y, OPTION_WIDHT, OPTION_HEIGHT);
				this.selectedColorRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
				this.brushColor = colors[i];
			});
			if (this.brushColor === colors[i]) {
				this.selectedColorRectangle = this.add.rectangle(colorRectangle.x, colorRectangle.y, OPTION_WIDHT, OPTION_HEIGHT);
				this.selectedColorRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
			}
		}
	}

	createStampToolbar() {
		const width = 50;
		const height = 50;
		const x = 919;
		const y = 90;
		const offset = 55;
		const stamps = [
			'candy-cane',
			'gummy-bear',
			'sweets',
			'mint',
			'candy',
			'chocolate',
			'peppermint',
			'candy2',
			'gum',
			'truffle',
			'jelly-beans',
			'sprinkles',
			'lollipop',
			'food'
		];

		this.add.text(914, 40, 'Stamps', {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});

		for (let i = 0, rows = 0, len = stamps.length; i < len; i++) {
			if (i > 0 && i % 2 === 0) {
				rows++;
			}
			const stampRectangle = this.add.rectangle(
				i % 2 === 0 ? x : x + offset,
				offset * rows + y,
				width,
				height,
				BUTTON_BACKGROUND_COLOR
			);

			const stampImage = this.add.image(stampRectangle.x, stampRectangle.y, stamps[i]);
			stampImage.setScale(STAMP_SCALE);

			stampRectangle.setInteractive();
			stampRectangle.on('pointerdown', () => {
				if (this.selectedStampRectangle) {
					this.selectedStampRectangle.destroy();
				}
				this.selectedStampRectangle = this.add.rectangle(stampRectangle.x, stampRectangle.y, 50, 50);
				this.selectedStampRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
				this.stamp = stamps[i];
			});
			if (this.stamp === stamps[i]) {
				this.selectedStampRectangle = this.add.rectangle(stampRectangle.x, stampRectangle.y, 50, 50);
				this.selectedStampRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
			}
		}
	}

	createStampSizeToolbar() {
		this.add.text(890, 485, 'Stamp sizes', {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});

		this.createStampSizeOption(945, 535, 'Small', 920, 525, 0.5);
		this.createStampSizeOption(945, 590, 'Normal', 913, 580, 1);
		this.createStampSizeOption(945, 645, 'Large', 920, 635, 2);
		this.createStampSizeOption(945, 700, 'X-Large', 910, 687, 3);
	}

	createStampSizeOption(x, y, text, textX, textY, multiplier) {
		const rectangle = this.add.rectangle(x, y, 105, 50, BUTTON_BACKGROUND_COLOR);

		this.add.text(textX, textY, text, {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});
		rectangle.setInteractive();
		rectangle.on('pointerdown', () => {
			if (this.selectedStampSizeRectangle) {
				this.selectedStampSizeRectangle.destroy();
			}
			this.selectedStampSizeRectangle = this.add.rectangle(rectangle.x, rectangle.y, 105, 50);
			this.selectedStampSizeRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
			this.stampSizeMultiplier = multiplier;
		});
		if (this.stampSizeMultiplier === multiplier) {
			this.selectedStampSizeRectangle = this.add.rectangle(rectangle.x, rectangle.y, 105, 50);
			this.selectedStampSizeRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
		}
	}

	createToolToolbar() {
		this.add.text(50, 40, 'Tools', {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});
		this.createToolOption('circle', 50, 90, 50, 50);
		this.createToolOption('stroke-circle', 105, 90, 50, 50);
		this.createToolOption('square', 50, 145, 50, 50);
		this.createToolOption('stroke-square', 105, 145, 50, 50);
		this.createToolOption('star', 50, 200, 50, 50);
		this.createToolOption('stroke-star', 105, 200, 50, 50);
		this.createToolOption('eraser', 50, 255, 50, 50);
		this.createToolOption('stamp', 105, 255, 50, 50);
	}

	createToolOption(brush, x, y, width, height) {
		const brushRectangle = this.add.rectangle(x, y, width, height, BUTTON_BACKGROUND_COLOR);
		this.createToolIcon(brush, x, y);
		brushRectangle.setInteractive();
		brushRectangle.on('pointerdown', () => {
			if (this.selectedBrushRectangle) {
				this.selectedBrushRectangle.destroy();
			}
			this.selectedBrushRectangle = this.add.rectangle(brushRectangle.x, brushRectangle.y, 50, 50);
			this.selectedBrushRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
			this.brush = brush;
		});
		if (this.brush === brush) {
			this.selectedBrushRectangle = this.add.rectangle(brushRectangle.x, brushRectangle.y, 50, 50);
			this.selectedBrushRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
		}
	}

	createToolIcon(brush, x, y) {
		let icon = null;
		switch (brush) {
			case 'square':
				icon = this.add.rectangle(x, y, 25, 25, 0x000000);
				icon.setStrokeStyle(3, 0x000000);
				break;
			case 'stroke-square':
				icon = this.add.rectangle(x, y, 25, 25, 0xffffff);
				icon.setStrokeStyle(3, 0x000000);
				break;
			case 'circle':
				icon = this.add.circle(x, y, 15, 0x000000);
				icon.setStrokeStyle(3, 0x000000);
				break;
			case 'stroke-circle':
				icon = this.add.circle(x, y, 15, 0xffffff);
				icon.setStrokeStyle(3, 0x000000);
				break;
			case 'star':
				icon = this.add.star(x, y, 5, 9, 18, 0x000000);
				icon.setStrokeStyle(3, 0x000000);
				break;
			case 'stroke-star':
				icon = this.add.star(x, y, 5, 9, 18, 0xffffff);
				icon.setStrokeStyle(3, 0x000000);
				break;
			case 'eraser':
				icon = this.add.image(x, y, 'eraser-icon');
				icon.setScale(0.07, 0.07);
				break;
			case 'stamp':
				icon = this.add.image(x, y, 'stamp-icon');
				icon.setScale(0.07, 0.07);
				break;
		}
	}

	createButtons() {
		const clearAllButton = this.add.rectangle(80, this.stage.y + this.stage.height - 80, 105, 50, BUTTON_BACKGROUND_COLOR);

		this.add.text(42, this.stage.y + this.stage.height - 90, 'Clear All', {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});

		clearAllButton.setInteractive();
		clearAllButton.on('pointerdown', () => {
			this.clearAll();
		});

		const exportButton = this.add.rectangle(80, this.stage.y + this.stage.height - 25, 105, 50, BUTTON_BACKGROUND_COLOR);

		this.add.text(50, this.stage.y + this.stage.height - 35, 'Export', {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});

		exportButton.setInteractive();
		exportButton.on('pointerdown', () => {
			let canvas = document.querySelector('canvas');
			const saveCanvas = document.createElement('canvas');
			saveCanvas.width = 700;
			saveCanvas.height = 650;

			const ctx = saveCanvas.getContext('2d');
			ctx.drawImage(canvas, 165, 50, 690, 650, 0, 0, 700, 650);

			let dataURL = saveCanvas.toDataURL('image/png');

			let downloadHelper = document.createElement('a');
			downloadHelper.setAttribute('download', 'download.png');
			downloadHelper.setAttribute('href', dataURL);
			downloadHelper.click();
		});
	}

	clearAll() {
		for (let i = 0, len = this.drawnShapes.length; i < len; i++) {
			this.drawnShapes[i].destroy();
		}
		this.drawnShapes = [];
	}

	canDraw(pointer) {
		return pointer.isDown && this.stage.getBounds().contains(pointer.x - SQUARE_BRUSH_SIZE / 2, pointer.y - SQUARE_BRUSH_SIZE);
	}

	update() {
		const pointer = this.input.activePointer;
		let shape = null;
		if (this.canDraw(pointer)) {
			switch (this.brush) {
				case 'square':
					shape = this.add.rectangle(pointer.x, pointer.y, SQUARE_BRUSH_SIZE, SQUARE_BRUSH_SIZE, this.brushColor);
					shape.setOrigin(CENTER_X, CENTER_Y);
					break;
				case 'stroke-square':
					shape = this.add.rectangle(pointer.x, pointer.y, SQUARE_BRUSH_SIZE, SQUARE_BRUSH_SIZE);
					shape.setOrigin(CENTER_X, CENTER_Y);
					shape.setStrokeStyle(BRUSH_LINE_WIDTH, this.brushColor);
					break;
				case 'circle':
					shape = this.add.circle(pointer.x, pointer.y, CIRCLE_BRUSH_RADIUS, this.brushColor);
					shape.setOrigin(CENTER_X, CENTER_Y);
					break;
				case 'stroke-circle':
					shape = this.add.circle(pointer.x, pointer.y, CIRCLE_BRUSH_RADIUS);
					shape.setOrigin(CENTER_X, CENTER_Y);
					shape.setStrokeStyle(BRUSH_LINE_WIDTH, this.brushColor);
					break;
				case 'star':
					shape = this.add.star(
						pointer.x,
						pointer.y,
						STAR_BRUSH_NUMBER_OF_POINTS,
						STAR_BRUSH_INNER_RADIUS,
						STAR_BRUSH_OUTER_RADIUS,
						this.brushColor
					);
					shape.setOrigin(CENTER_X, CENTER_Y);
					break;
				case 'stroke-star':
					shape = this.add.star(
						pointer.x,
						pointer.y,
						STAR_BRUSH_NUMBER_OF_POINTS,
						STAR_BRUSH_INNER_RADIUS,
						STAR_BRUSH_OUTER_RADIUS
					);
					shape.setOrigin(CENTER_X, CENTER_Y);
					shape.setStrokeStyle(BRUSH_LINE_WIDTH, this.brushColor);
					break;
				case 'stamp':
					if (this.stamp) {
						shape = this.add.image(pointer.x, pointer.y, this.stamp);
						shape.setOrigin(CENTER_X, CENTER_Y);
						shape.setScale(STAMP_SCALE * this.stampSizeMultiplier);
					}
					break;
				case 'eraser':
					for (let i = 0, len = this.drawnShapes.length; i < len; i++) {
						if (this.drawnShapes[i].getBounds().contains(pointer.x, pointer.y)) {
							this.drawnShapes[i].destroy();
						}
					}
					break;
			}
		}

		if (shape) {
			this.drawnShapes.push(shape);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDSjtBQUN0QztBQUNBO0FBQ0EsT0FBTyxzREFBYTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCLG9CQUFvQixxREFBWTtBQUNoQztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsRUFBRTtBQUNGLFNBQVMsb0RBQVM7QUFDbEI7QUFDQTtBQUNBLGlCQUFpQixvREFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2Usd0JBQXdCLHFEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsU0FBUztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFNBQVM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNoWkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yLy4vc3JjL3NjZW5lcy9HYW1lLmpzIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaGFzZXIsIHsgVGV4dHVyZXMgfSBmcm9tICdwaGFzZXInO1xyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gJy4vc2NlbmVzL0dhbWUnO1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG5cdHR5cGU6IFBoYXNlci5DQU5WQVMsXHJcblx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRicsXHJcblx0ZGVidWc6IHRydWUsXHJcblx0c2NhbGU6IHtcclxuXHRcdG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcbiAgICAgICAgYXV0b0NlbnRlcjogUGhhc2VyLlNjYWxlLkNFTlRFUl9CT1RILFxyXG5cdFx0d2lkdGg6IDEwMjQsXHJcblx0XHRoZWlnaHQ6IDc2OFxyXG5cdH0sXHJcblx0cGh5c2ljczoge1xyXG5cdFx0ZGVmYXVsdDogJ2FyY2FkZScsXHJcblx0XHRhcmNhZGU6IHtcclxuXHRcdFx0ZGVidWc6IHRydWUsXHJcblx0XHRcdGdyYXZpdHk6IHsgeTogMjAwIH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdHNjZW5lOiBbR2FtZVNjZW5lXVxyXG59O1xyXG5cclxuY29uc3QgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShjb25maWcpO1xyXG4iLCJpbXBvcnQgUGhhc2VyIGZyb20gJ3BoYXNlcic7XHJcblxyXG5jb25zdCBGT05UX0ZBTUlMWSA9ICdhcmlhbCc7XHJcbmNvbnN0IEZPTlRfU0laRSA9ICcyMHB4JztcclxuY29uc3QgVEVYVF9DT0xPUiA9ICcjMDAwMDAwJztcclxuXHJcbmNvbnN0IEJVVFRPTl9CQUNLR1JPVU5EX0NPTE9SID0gMHhkM2QzZDM7XHJcblxyXG5jb25zdCBTVEFNUF9TQ0FMRSA9IDAuMDg7XHJcblxyXG5jb25zdCBTUVVBUkVfQlJVU0hfU0laRSA9IDE1O1xyXG5jb25zdCBDSVJDTEVfQlJVU0hfUkFESVVTID0gNztcclxuY29uc3QgU1RBUl9CUlVTSF9OVU1CRVJfT0ZfUE9JTlRTID0gNTtcclxuY29uc3QgU1RBUl9CUlVTSF9JTk5FUl9SQURJVVMgPSA1O1xyXG5jb25zdCBTVEFSX0JSVVNIX09VVEVSX1JBRElVUyA9IDEwO1xyXG5jb25zdCBCUlVTSF9MSU5FX1dJRFRIID0gMztcclxuXHJcbmNvbnN0IENFTlRFUl9YID0gMC41O1xyXG5jb25zdCBDRU5URVJfWSA9IDAuNTtcclxuXHJcbmNvbnN0IFRPT0xCQVJfV0lEVEggPSAxNjA7XHJcblxyXG5jb25zdCBPUFRJT05fV0lESFQgPSA1MDtcclxuY29uc3QgT1BUSU9OX0hFSUdIVCA9IDUwO1xyXG5cclxuY29uc3QgU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEggPSAzO1xyXG5jb25zdCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUiA9IDB4MDAwMDAwO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCdnYW1lJyk7XHJcblx0fVxyXG5cclxuXHRwcmVsb2FkKCkge1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdob3VzZScsICdhc3NldHMvaW1nL2hvdXNlLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdlcmFzZXItaWNvbicsICdhc3NldHMvaW1nL2VyYXNlci5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnc3RhbXAtaWNvbicsICdhc3NldHMvaW1nL3N0YW1wLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdjYW5keS1jYW5lJywgJ2Fzc2V0cy9pbWcvY2FuZHktY2FuZS5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnZ3VtbXktYmVhcicsICdhc3NldHMvaW1nL2d1bW15LWJlYXIucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ3N3ZWV0cycsICdhc3NldHMvaW1nL3N3ZWV0cy5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnbWludCcsICdhc3NldHMvaW1nL21pbnQucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2NhbmR5JywgJ2Fzc2V0cy9pbWcvY2FuZHkucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2Nob2NvbGF0ZScsICdhc3NldHMvaW1nL2Nob2NvbGF0ZS5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgncGVwcGVybWludCcsICdhc3NldHMvaW1nL3BlcHBlcm1pbnQucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2NhbmR5MicsICdhc3NldHMvaW1nL2NhbmR5Mi5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnZ3VtJywgJ2Fzc2V0cy9pbWcvZ3VtLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCd0cnVmZmxlJywgJ2Fzc2V0cy9pbWcvdHJ1ZmZsZS5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnamVsbHktYmVhbnMnLCAnYXNzZXRzL2ltZy9qZWxseS1iZWFucy5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnc3ByaW5rbGVzJywgJ2Fzc2V0cy9pbWcvc3ByaW5rbGVzLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdsb2xsaXBvcCcsICdhc3NldHMvaW1nL2xvbGxpcG9wLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdmb29kJywgJ2Fzc2V0cy9pbWcvZm9vZC5wbmcnKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZSgpIHtcclxuXHRcdHRoaXMuYnJ1c2hDb2xvciA9IDB4ZmYwMDAwO1xyXG5cdFx0dGhpcy5icnVzaCA9ICdjaXJjbGUnO1xyXG5cdFx0dGhpcy5zdGFtcCA9ICdjYW5keS1jYW5lJztcclxuXHRcdHRoaXMuc3RhbXBTaXplTXVsdGlwbGllciA9IDE7XHJcblx0XHR0aGlzLmRyYXduU2hhcGVzID0gW107XHJcblx0XHR0aGlzLnN0YWdlID0gdGhpcy5jcmVhdGVTdGFnZSgpO1xyXG5cdFx0dGhpcy5zdGFnZUltYWdlID0gdGhpcy5jcmVhdGVTdGFnZUltYWdlKCk7XHJcblx0XHR0aGlzLmNyZWF0ZUNvbG9yVG9vbGJhcigpO1xyXG5cdFx0dGhpcy5jcmVhdGVTdGFtcFRvb2xiYXIoKTtcclxuXHRcdHRoaXMuY3JlYXRlU3RhbXBTaXplVG9vbGJhcigpO1xyXG5cdFx0dGhpcy5jcmVhdGVUb29sVG9vbGJhcigpO1xyXG5cdFx0dGhpcy5jcmVhdGVCdXR0b25zKCk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTdGFnZSgpIHtcclxuXHRcdGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zeXMuZ2FtZS5jYW52YXM7XHJcblx0XHRjb25zdCBzdGFnZSA9IHRoaXMuYWRkLnJlY3RhbmdsZSgxNjAsIDQ1LCB3aWR0aCAtIFRPT0xCQVJfV0lEVEggKiAyLCBoZWlnaHQgLSA5MCk7XHJcblx0XHRzdGFnZS5zZXRPcmlnaW4oMCwgMCk7XHJcblx0XHRzdGFnZS5zZXRTdHJva2VTdHlsZSg0LCAweDAwMDAwMCk7XHJcblx0XHRyZXR1cm4gc3RhZ2U7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTdGFnZUltYWdlKHN0YWdlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hZGQuaW1hZ2UodGhpcy5zdGFnZS54ICsgdGhpcy5zdGFnZS53aWR0aCAvIDIsIHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0IC8gMiwgJ2hvdXNlJyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb2xvclRvb2xiYXIoKSB7XHJcblx0XHRjb25zdCB3aWR0aCA9IDUwO1xyXG5cdFx0Y29uc3QgaGVpZ2h0ID0gNTA7XHJcblx0XHRjb25zdCB4ID0gNTA7XHJcblx0XHRjb25zdCB5ID0gMzUwO1xyXG5cdFx0Y29uc3Qgb2Zmc2V0ID0gNTU7XHJcblx0XHRjb25zdCBjb2xvcnMgPSBbMHhmZjAwMDAsIDB4ZmY3ODc4LCAweDE0NmIzYSwgMHg3NGQ2ODAsIDB4OGNkNGZmLCAweGM2ZWZmZiwgMHhmYWM3MTEsIDB4ZWVmNmYyLCAweDUzMzIyNSwgMHhjYTkzNmRdO1xyXG5cclxuXHRcdHRoaXMuYWRkLnRleHQoNTAsIDMwMCwgJ0NvbG9ycycsIHtcclxuXHRcdFx0Zm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcblx0XHRcdGZvbnRTaXplOiBGT05UX1NJWkUsXHJcblx0XHRcdGNvbG9yOiBURVhUX0NPTE9SXHJcblx0XHR9KTtcclxuXHRcdGZvciAobGV0IGkgPSAwLCByb3dzID0gMCwgbGVuID0gY29sb3JzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGlmIChpID4gMCAmJiBpICUgMiA9PT0gMCkge1xyXG5cdFx0XHRcdHJvd3MrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBjb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShpICUgMiA9PT0gMCA/IHggOiB4ICsgb2Zmc2V0LCBvZmZzZXQgKiByb3dzICsgeSwgd2lkdGgsIGhlaWdodCwgY29sb3JzW2ldKTtcclxuXHRcdFx0Y29sb3JSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdFx0Y29sb3JSZWN0YW5nbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5kZXN0cm95KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShjb2xvclJlY3RhbmdsZS54LCBjb2xvclJlY3RhbmdsZS55LCBPUFRJT05fV0lESFQsIE9QVElPTl9IRUlHSFQpO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZShTRUxFQ1RFRF9PUFRJT05fTElORV9XSURUSCwgU0VMRUNURURfT1BUSU9OX0xJTkVfQ09MT1IpO1xyXG5cdFx0XHRcdHRoaXMuYnJ1c2hDb2xvciA9IGNvbG9yc1tpXTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICh0aGlzLmJydXNoQ29sb3IgPT09IGNvbG9yc1tpXSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShjb2xvclJlY3RhbmdsZS54LCBjb2xvclJlY3RhbmdsZS55LCBPUFRJT05fV0lESFQsIE9QVElPTl9IRUlHSFQpO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZShTRUxFQ1RFRF9PUFRJT05fTElORV9XSURUSCwgU0VMRUNURURfT1BUSU9OX0xJTkVfQ09MT1IpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTdGFtcFRvb2xiYXIoKSB7XHJcblx0XHRjb25zdCB3aWR0aCA9IDUwO1xyXG5cdFx0Y29uc3QgaGVpZ2h0ID0gNTA7XHJcblx0XHRjb25zdCB4ID0gOTE5O1xyXG5cdFx0Y29uc3QgeSA9IDkwO1xyXG5cdFx0Y29uc3Qgb2Zmc2V0ID0gNTU7XHJcblx0XHRjb25zdCBzdGFtcHMgPSBbXHJcblx0XHRcdCdjYW5keS1jYW5lJyxcclxuXHRcdFx0J2d1bW15LWJlYXInLFxyXG5cdFx0XHQnc3dlZXRzJyxcclxuXHRcdFx0J21pbnQnLFxyXG5cdFx0XHQnY2FuZHknLFxyXG5cdFx0XHQnY2hvY29sYXRlJyxcclxuXHRcdFx0J3BlcHBlcm1pbnQnLFxyXG5cdFx0XHQnY2FuZHkyJyxcclxuXHRcdFx0J2d1bScsXHJcblx0XHRcdCd0cnVmZmxlJyxcclxuXHRcdFx0J2plbGx5LWJlYW5zJyxcclxuXHRcdFx0J3Nwcmlua2xlcycsXHJcblx0XHRcdCdsb2xsaXBvcCcsXHJcblx0XHRcdCdmb29kJ1xyXG5cdFx0XTtcclxuXHJcblx0XHR0aGlzLmFkZC50ZXh0KDkxNCwgNDAsICdTdGFtcHMnLCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDAsIHJvd3MgPSAwLCBsZW4gPSBzdGFtcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKGkgPiAwICYmIGkgJSAyID09PSAwKSB7XHJcblx0XHRcdFx0cm93cysrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IHN0YW1wUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKFxyXG5cdFx0XHRcdGkgJSAyID09PSAwID8geCA6IHggKyBvZmZzZXQsXHJcblx0XHRcdFx0b2Zmc2V0ICogcm93cyArIHksXHJcblx0XHRcdFx0d2lkdGgsXHJcblx0XHRcdFx0aGVpZ2h0LFxyXG5cdFx0XHRcdEJVVFRPTl9CQUNLR1JPVU5EX0NPTE9SXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRjb25zdCBzdGFtcEltYWdlID0gdGhpcy5hZGQuaW1hZ2Uoc3RhbXBSZWN0YW5nbGUueCwgc3RhbXBSZWN0YW5nbGUueSwgc3RhbXBzW2ldKTtcclxuXHRcdFx0c3RhbXBJbWFnZS5zZXRTY2FsZShTVEFNUF9TQ0FMRSk7XHJcblxyXG5cdFx0XHRzdGFtcFJlY3RhbmdsZS5zZXRJbnRlcmFjdGl2ZSgpO1xyXG5cdFx0XHRzdGFtcFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRTdGFtcFJlY3RhbmdsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlLmRlc3Ryb3koKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHN0YW1wUmVjdGFuZ2xlLngsIHN0YW1wUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHRcdFx0dGhpcy5zdGFtcCA9IHN0YW1wc1tpXTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICh0aGlzLnN0YW1wID09PSBzdGFtcHNbaV0pIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoc3RhbXBSZWN0YW5nbGUueCwgc3RhbXBSZWN0YW5nbGUueSwgNTAsIDUwKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEgsIFNFTEVDVEVEX09QVElPTl9MSU5FX0NPTE9SKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3RhbXBTaXplVG9vbGJhcigpIHtcclxuXHRcdHRoaXMuYWRkLnRleHQoODkwLCA0ODUsICdTdGFtcCBzaXplcycsIHtcclxuXHRcdFx0Zm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcblx0XHRcdGZvbnRTaXplOiBGT05UX1NJWkUsXHJcblx0XHRcdGNvbG9yOiBURVhUX0NPTE9SXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDUzNSwgJ1NtYWxsJywgOTIwLCA1MjUsIDAuNSk7XHJcblx0XHR0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDU5MCwgJ05vcm1hbCcsIDkxMywgNTgwLCAxKTtcclxuXHRcdHRoaXMuY3JlYXRlU3RhbXBTaXplT3B0aW9uKDk0NSwgNjQ1LCAnTGFyZ2UnLCA5MjAsIDYzNSwgMik7XHJcblx0XHR0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDcwMCwgJ1gtTGFyZ2UnLCA5MTAsIDY4NywgMyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTdGFtcFNpemVPcHRpb24oeCwgeSwgdGV4dCwgdGV4dFgsIHRleHRZLCBtdWx0aXBsaWVyKSB7XHJcblx0XHRjb25zdCByZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMTA1LCA1MCwgQlVUVE9OX0JBQ0tHUk9VTkRfQ09MT1IpO1xyXG5cclxuXHRcdHRoaXMuYWRkLnRleHQodGV4dFgsIHRleHRZLCB0ZXh0LCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblx0XHRyZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdHJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZS5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShyZWN0YW5nbGUueCwgcmVjdGFuZ2xlLnksIDEwNSwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHRcdHRoaXMuc3RhbXBTaXplTXVsdGlwbGllciA9IG11bHRpcGxpZXI7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLnN0YW1wU2l6ZU11bHRpcGxpZXIgPT09IG11bHRpcGxpZXIpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShyZWN0YW5nbGUueCwgcmVjdGFuZ2xlLnksIDEwNSwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVUb29sVG9vbGJhcigpIHtcclxuXHRcdHRoaXMuYWRkLnRleHQoNTAsIDQwLCAnVG9vbHMnLCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2NpcmNsZScsIDUwLCA5MCwgNTAsIDUwKTtcclxuXHRcdHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3Ryb2tlLWNpcmNsZScsIDEwNSwgOTAsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3NxdWFyZScsIDUwLCAxNDUsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1zcXVhcmUnLCAxMDUsIDE0NSwgNTAsIDUwKTtcclxuXHRcdHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3RhcicsIDUwLCAyMDAsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1zdGFyJywgMTA1LCAyMDAsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2VyYXNlcicsIDUwLCAyNTUsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0YW1wJywgMTA1LCAyNTUsIDUwLCA1MCk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVUb29sT3B0aW9uKGJydXNoLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblx0XHRjb25zdCBicnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBCVVRUT05fQkFDS0dST1VORF9DT0xPUik7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xJY29uKGJydXNoLCB4LCB5KTtcclxuXHRcdGJydXNoUmVjdGFuZ2xlLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRicnVzaFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShicnVzaFJlY3RhbmdsZS54LCBicnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEgsIFNFTEVDVEVEX09QVElPTl9MSU5FX0NPTE9SKTtcclxuXHRcdFx0dGhpcy5icnVzaCA9IGJydXNoO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy5icnVzaCA9PT0gYnJ1c2gpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKGJydXNoUmVjdGFuZ2xlLngsIGJydXNoUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZShTRUxFQ1RFRF9PUFRJT05fTElORV9XSURUSCwgU0VMRUNURURfT1BUSU9OX0xJTkVfQ09MT1IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlVG9vbEljb24oYnJ1c2gsIHgsIHkpIHtcclxuXHRcdGxldCBpY29uID0gbnVsbDtcclxuXHRcdHN3aXRjaCAoYnJ1c2gpIHtcclxuXHRcdFx0Y2FzZSAnc3F1YXJlJzpcclxuXHRcdFx0XHRpY29uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDI1LCAyNSwgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdHJva2Utc3F1YXJlJzpcclxuXHRcdFx0XHRpY29uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDI1LCAyNSwgMHhmZmZmZmYpO1xyXG5cdFx0XHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaXJjbGUnOlxyXG5cdFx0XHRcdGljb24gPSB0aGlzLmFkZC5jaXJjbGUoeCwgeSwgMTUsIDB4MDAwMDAwKTtcclxuXHRcdFx0XHRpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnc3Ryb2tlLWNpcmNsZSc6XHJcblx0XHRcdFx0aWNvbiA9IHRoaXMuYWRkLmNpcmNsZSh4LCB5LCAxNSwgMHhmZmZmZmYpO1xyXG5cdFx0XHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdGFyJzpcclxuXHRcdFx0XHRpY29uID0gdGhpcy5hZGQuc3Rhcih4LCB5LCA1LCA5LCAxOCwgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdHJva2Utc3Rhcic6XHJcblx0XHRcdFx0aWNvbiA9IHRoaXMuYWRkLnN0YXIoeCwgeSwgNSwgOSwgMTgsIDB4ZmZmZmZmKTtcclxuXHRcdFx0XHRpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZXJhc2VyJzpcclxuXHRcdFx0XHRpY29uID0gdGhpcy5hZGQuaW1hZ2UoeCwgeSwgJ2VyYXNlci1pY29uJyk7XHJcblx0XHRcdFx0aWNvbi5zZXRTY2FsZSgwLjA3LCAwLjA3KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnc3RhbXAnOlxyXG5cdFx0XHRcdGljb24gPSB0aGlzLmFkZC5pbWFnZSh4LCB5LCAnc3RhbXAtaWNvbicpO1xyXG5cdFx0XHRcdGljb24uc2V0U2NhbGUoMC4wNywgMC4wNyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVCdXR0b25zKCkge1xyXG5cdFx0Y29uc3QgY2xlYXJBbGxCdXR0b24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoODAsIHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0IC0gODAsIDEwNSwgNTAsIEJVVFRPTl9CQUNLR1JPVU5EX0NPTE9SKTtcclxuXHJcblx0XHR0aGlzLmFkZC50ZXh0KDQyLCB0aGlzLnN0YWdlLnkgKyB0aGlzLnN0YWdlLmhlaWdodCAtIDkwLCAnQ2xlYXIgQWxsJywge1xyXG5cdFx0XHRmb250RmFtaWx5OiBGT05UX0ZBTUlMWSxcclxuXHRcdFx0Zm9udFNpemU6IEZPTlRfU0laRSxcclxuXHRcdFx0Y29sb3I6IFRFWFRfQ09MT1JcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNsZWFyQWxsQnV0dG9uLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRjbGVhckFsbEJ1dHRvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuY2xlYXJBbGwoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IGV4cG9ydEJ1dHRvbiA9IHRoaXMuYWRkLnJlY3RhbmdsZSg4MCwgdGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQgLSAyNSwgMTA1LCA1MCwgQlVUVE9OX0JBQ0tHUk9VTkRfQ09MT1IpO1xyXG5cclxuXHRcdHRoaXMuYWRkLnRleHQoNTAsIHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0IC0gMzUsICdFeHBvcnQnLCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZXhwb3J0QnV0dG9uLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRleHBvcnRCdXR0b24ub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRsZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XHJcblx0XHRcdGNvbnN0IHNhdmVDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHRcdFx0c2F2ZUNhbnZhcy53aWR0aCA9IDcwMDtcclxuXHRcdFx0c2F2ZUNhbnZhcy5oZWlnaHQgPSA2NTA7XHJcblxyXG5cdFx0XHRjb25zdCBjdHggPSBzYXZlQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0XHRcdGN0eC5kcmF3SW1hZ2UoY2FudmFzLCAxNjUsIDUwLCA2OTAsIDY1MCwgMCwgMCwgNzAwLCA2NTApO1xyXG5cclxuXHRcdFx0bGV0IGRhdGFVUkwgPSBzYXZlQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XHJcblxyXG5cdFx0XHRsZXQgZG93bmxvYWRIZWxwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdGRvd25sb2FkSGVscGVyLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnZG93bmxvYWQucG5nJyk7XHJcblx0XHRcdGRvd25sb2FkSGVscGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGRhdGFVUkwpO1xyXG5cdFx0XHRkb3dubG9hZEhlbHBlci5jbGljaygpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjbGVhckFsbCgpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmRyYXduU2hhcGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdHRoaXMuZHJhd25TaGFwZXNbaV0uZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5kcmF3blNoYXBlcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0Y2FuRHJhdyhwb2ludGVyKSB7XHJcblx0XHRyZXR1cm4gcG9pbnRlci5pc0Rvd24gJiYgdGhpcy5zdGFnZS5nZXRCb3VuZHMoKS5jb250YWlucyhwb2ludGVyLnggLSBTUVVBUkVfQlJVU0hfU0laRSAvIDIsIHBvaW50ZXIueSAtIFNRVUFSRV9CUlVTSF9TSVpFKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpIHtcclxuXHRcdGNvbnN0IHBvaW50ZXIgPSB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXI7XHJcblx0XHRsZXQgc2hhcGUgPSBudWxsO1xyXG5cdFx0aWYgKHRoaXMuY2FuRHJhdyhwb2ludGVyKSkge1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXMuYnJ1c2gpIHtcclxuXHRcdFx0XHRjYXNlICdzcXVhcmUnOlxyXG5cdFx0XHRcdFx0c2hhcGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUocG9pbnRlci54LCBwb2ludGVyLnksIFNRVUFSRV9CUlVTSF9TSVpFLCBTUVVBUkVfQlJVU0hfU0laRSwgdGhpcy5icnVzaENvbG9yKTtcclxuXHRcdFx0XHRcdHNoYXBlLnNldE9yaWdpbihDRU5URVJfWCwgQ0VOVEVSX1kpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnc3Ryb2tlLXNxdWFyZSc6XHJcblx0XHRcdFx0XHRzaGFwZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShwb2ludGVyLngsIHBvaW50ZXIueSwgU1FVQVJFX0JSVVNIX1NJWkUsIFNRVUFSRV9CUlVTSF9TSVpFKTtcclxuXHRcdFx0XHRcdHNoYXBlLnNldE9yaWdpbihDRU5URVJfWCwgQ0VOVEVSX1kpO1xyXG5cdFx0XHRcdFx0c2hhcGUuc2V0U3Ryb2tlU3R5bGUoQlJVU0hfTElORV9XSURUSCwgdGhpcy5icnVzaENvbG9yKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ2NpcmNsZSc6XHJcblx0XHRcdFx0XHRzaGFwZSA9IHRoaXMuYWRkLmNpcmNsZShwb2ludGVyLngsIHBvaW50ZXIueSwgQ0lSQ0xFX0JSVVNIX1JBRElVUywgdGhpcy5icnVzaENvbG9yKTtcclxuXHRcdFx0XHRcdHNoYXBlLnNldE9yaWdpbihDRU5URVJfWCwgQ0VOVEVSX1kpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnc3Ryb2tlLWNpcmNsZSc6XHJcblx0XHRcdFx0XHRzaGFwZSA9IHRoaXMuYWRkLmNpcmNsZShwb2ludGVyLngsIHBvaW50ZXIueSwgQ0lSQ0xFX0JSVVNIX1JBRElVUyk7XHJcblx0XHRcdFx0XHRzaGFwZS5zZXRPcmlnaW4oQ0VOVEVSX1gsIENFTlRFUl9ZKTtcclxuXHRcdFx0XHRcdHNoYXBlLnNldFN0cm9rZVN0eWxlKEJSVVNIX0xJTkVfV0lEVEgsIHRoaXMuYnJ1c2hDb2xvcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzdGFyJzpcclxuXHRcdFx0XHRcdHNoYXBlID0gdGhpcy5hZGQuc3RhcihcclxuXHRcdFx0XHRcdFx0cG9pbnRlci54LFxyXG5cdFx0XHRcdFx0XHRwb2ludGVyLnksXHJcblx0XHRcdFx0XHRcdFNUQVJfQlJVU0hfTlVNQkVSX09GX1BPSU5UUyxcclxuXHRcdFx0XHRcdFx0U1RBUl9CUlVTSF9JTk5FUl9SQURJVVMsXHJcblx0XHRcdFx0XHRcdFNUQVJfQlJVU0hfT1VURVJfUkFESVVTLFxyXG5cdFx0XHRcdFx0XHR0aGlzLmJydXNoQ29sb3JcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRzaGFwZS5zZXRPcmlnaW4oQ0VOVEVSX1gsIENFTlRFUl9ZKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3N0cm9rZS1zdGFyJzpcclxuXHRcdFx0XHRcdHNoYXBlID0gdGhpcy5hZGQuc3RhcihcclxuXHRcdFx0XHRcdFx0cG9pbnRlci54LFxyXG5cdFx0XHRcdFx0XHRwb2ludGVyLnksXHJcblx0XHRcdFx0XHRcdFNUQVJfQlJVU0hfTlVNQkVSX09GX1BPSU5UUyxcclxuXHRcdFx0XHRcdFx0U1RBUl9CUlVTSF9JTk5FUl9SQURJVVMsXHJcblx0XHRcdFx0XHRcdFNUQVJfQlJVU0hfT1VURVJfUkFESVVTXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0c2hhcGUuc2V0T3JpZ2luKENFTlRFUl9YLCBDRU5URVJfWSk7XHJcblx0XHRcdFx0XHRzaGFwZS5zZXRTdHJva2VTdHlsZShCUlVTSF9MSU5FX1dJRFRILCB0aGlzLmJydXNoQ29sb3IpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnc3RhbXAnOlxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhbXApIHtcclxuXHRcdFx0XHRcdFx0c2hhcGUgPSB0aGlzLmFkZC5pbWFnZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5zdGFtcCk7XHJcblx0XHRcdFx0XHRcdHNoYXBlLnNldE9yaWdpbihDRU5URVJfWCwgQ0VOVEVSX1kpO1xyXG5cdFx0XHRcdFx0XHRzaGFwZS5zZXRTY2FsZShTVEFNUF9TQ0FMRSAqIHRoaXMuc3RhbXBTaXplTXVsdGlwbGllcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdlcmFzZXInOlxyXG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuZHJhd25TaGFwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZHJhd25TaGFwZXNbaV0uZ2V0Qm91bmRzKCkuY29udGFpbnMocG9pbnRlci54LCBwb2ludGVyLnkpKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kcmF3blNoYXBlc1tpXS5kZXN0cm95KCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNoYXBlKSB7XHJcblx0XHRcdHRoaXMuZHJhd25TaGFwZXMucHVzaChzaGFwZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnaW5nZXJicmVhZF9kZWNvcmF0b3JcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZ2luZ2VyYnJlYWRfZGVjb3JhdG9yXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==