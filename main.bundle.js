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
		// get random gingerbread house to load.
		let houseNumber = Math.floor(Math.random() * 6) + 1;

		console.log(houseNumber);

		const previousHouseNumber = localStorage.getItem('houseNumber');

		console.log(previousHouseNumber);

		while(houseNumber === parseInt(previousHouseNumber, 10)) {
			houseNumber = Math.floor(Math.random() * 6) + 1;
			console.log(houseNumber);
		}
		localStorage.setItem('houseNumber', houseNumber);

		this.load.image('house', `assets/img/house${houseNumber}.png`);
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
		this.load.image('gingerbread-man', 'assets/img/gingerbread-man.png');
	}

	create() {
		this.brushColor = 0xff0000;
		this.brush = 'circle';
		this.stamp = 'candy-cane';
		this.stampSizeMultiplier = 1;
		this.drawnShapes = [];
		this.stage = this.createStage();
		this.createStageImage();
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
		this.add.image(this.stage.x + this.stage.width / 2, this.stage.y + this.stage.height / 2, 'house');
	}

	createColorToolbar() {
		const width = 50;
		const height = 50;
		const x = 50;
		const y = 350;
		const offset = 55;
		const colors = [0xff0000, 0xff7878, 0x146b3a, 0x74d680, 0x8cd4ff, 0xc6efff, 0xfac711, 0xeef6f2];

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
			'gingerbread-man'
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

		const changeHouse = this.add.rectangle(80, this.stage.y + this.stage.height - 135, 105, 50, BUTTON_BACKGROUND_COLOR);

		this.add.text(60, this.stage.y + this.stage.height - 145, 'New', {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});

		changeHouse.setInteractive();
		changeHouse.on('pointerdown', () => {
			location.reload();
		})

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
			ctx.drawImage(canvas, 165, 50, 695, 650, 0, 0, 695, 650);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDSjtBQUN0QztBQUNBO0FBQ0EsT0FBTyxzREFBYTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCLG9CQUFvQixxREFBWTtBQUNoQztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsRUFBRTtBQUNGLFNBQVMsb0RBQVM7QUFDbEI7QUFDQTtBQUNBLGlCQUFpQixvREFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2Usd0JBQXdCLHFEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsWUFBWTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsU0FBUztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFNBQVM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3YUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yLy4vc3JjL3NjZW5lcy9HYW1lLmpzIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaGFzZXIsIHsgVGV4dHVyZXMgfSBmcm9tICdwaGFzZXInO1xyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gJy4vc2NlbmVzL0dhbWUnO1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG5cdHR5cGU6IFBoYXNlci5DQU5WQVMsXHJcblx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRicsXHJcblx0ZGVidWc6IHRydWUsXHJcblx0c2NhbGU6IHtcclxuXHRcdG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcbiAgICAgICAgYXV0b0NlbnRlcjogUGhhc2VyLlNjYWxlLkNFTlRFUl9CT1RILFxyXG5cdFx0d2lkdGg6IDEwMjQsXHJcblx0XHRoZWlnaHQ6IDc2OFxyXG5cdH0sXHJcblx0cGh5c2ljczoge1xyXG5cdFx0ZGVmYXVsdDogJ2FyY2FkZScsXHJcblx0XHRhcmNhZGU6IHtcclxuXHRcdFx0ZGVidWc6IHRydWUsXHJcblx0XHRcdGdyYXZpdHk6IHsgeTogMjAwIH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdHNjZW5lOiBbR2FtZVNjZW5lXVxyXG59O1xyXG5cclxuY29uc3QgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShjb25maWcpO1xyXG4iLCJpbXBvcnQgUGhhc2VyIGZyb20gJ3BoYXNlcic7XHJcblxyXG5jb25zdCBGT05UX0ZBTUlMWSA9ICdhcmlhbCc7XHJcbmNvbnN0IEZPTlRfU0laRSA9ICcyMHB4JztcclxuY29uc3QgVEVYVF9DT0xPUiA9ICcjMDAwMDAwJztcclxuXHJcbmNvbnN0IEJVVFRPTl9CQUNLR1JPVU5EX0NPTE9SID0gMHhkM2QzZDM7XHJcblxyXG5jb25zdCBTVEFNUF9TQ0FMRSA9IDAuMDg7XHJcblxyXG5jb25zdCBTUVVBUkVfQlJVU0hfU0laRSA9IDE1O1xyXG5jb25zdCBDSVJDTEVfQlJVU0hfUkFESVVTID0gNztcclxuY29uc3QgU1RBUl9CUlVTSF9OVU1CRVJfT0ZfUE9JTlRTID0gNTtcclxuY29uc3QgU1RBUl9CUlVTSF9JTk5FUl9SQURJVVMgPSA1O1xyXG5jb25zdCBTVEFSX0JSVVNIX09VVEVSX1JBRElVUyA9IDEwO1xyXG5jb25zdCBCUlVTSF9MSU5FX1dJRFRIID0gMztcclxuXHJcbmNvbnN0IENFTlRFUl9YID0gMC41O1xyXG5jb25zdCBDRU5URVJfWSA9IDAuNTtcclxuXHJcbmNvbnN0IFRPT0xCQVJfV0lEVEggPSAxNjA7XHJcblxyXG5jb25zdCBPUFRJT05fV0lESFQgPSA1MDtcclxuY29uc3QgT1BUSU9OX0hFSUdIVCA9IDUwO1xyXG5cclxuY29uc3QgU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEggPSAzO1xyXG5jb25zdCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUiA9IDB4MDAwMDAwO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCdnYW1lJyk7XHJcblx0fVxyXG5cclxuXHRwcmVsb2FkKCkge1xyXG5cdFx0Ly8gZ2V0IHJhbmRvbSBnaW5nZXJicmVhZCBob3VzZSB0byBsb2FkLlxyXG5cdFx0bGV0IGhvdXNlTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKGhvdXNlTnVtYmVyKTtcclxuXHJcblx0XHRjb25zdCBwcmV2aW91c0hvdXNlTnVtYmVyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hvdXNlTnVtYmVyJyk7XHJcblxyXG5cdFx0Y29uc29sZS5sb2cocHJldmlvdXNIb3VzZU51bWJlcik7XHJcblxyXG5cdFx0d2hpbGUoaG91c2VOdW1iZXIgPT09IHBhcnNlSW50KHByZXZpb3VzSG91c2VOdW1iZXIsIDEwKSkge1xyXG5cdFx0XHRob3VzZU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcclxuXHRcdFx0Y29uc29sZS5sb2coaG91c2VOdW1iZXIpO1xyXG5cdFx0fVxyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hvdXNlTnVtYmVyJywgaG91c2VOdW1iZXIpO1xyXG5cclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnaG91c2UnLCBgYXNzZXRzL2ltZy9ob3VzZSR7aG91c2VOdW1iZXJ9LnBuZ2ApO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdlcmFzZXItaWNvbicsICdhc3NldHMvaW1nL2VyYXNlci5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnc3RhbXAtaWNvbicsICdhc3NldHMvaW1nL3N0YW1wLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdjYW5keS1jYW5lJywgJ2Fzc2V0cy9pbWcvY2FuZHktY2FuZS5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnZ3VtbXktYmVhcicsICdhc3NldHMvaW1nL2d1bW15LWJlYXIucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ3N3ZWV0cycsICdhc3NldHMvaW1nL3N3ZWV0cy5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnbWludCcsICdhc3NldHMvaW1nL21pbnQucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2NhbmR5JywgJ2Fzc2V0cy9pbWcvY2FuZHkucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2Nob2NvbGF0ZScsICdhc3NldHMvaW1nL2Nob2NvbGF0ZS5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgncGVwcGVybWludCcsICdhc3NldHMvaW1nL3BlcHBlcm1pbnQucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2NhbmR5MicsICdhc3NldHMvaW1nL2NhbmR5Mi5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnZ3VtJywgJ2Fzc2V0cy9pbWcvZ3VtLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCd0cnVmZmxlJywgJ2Fzc2V0cy9pbWcvdHJ1ZmZsZS5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnamVsbHktYmVhbnMnLCAnYXNzZXRzL2ltZy9qZWxseS1iZWFucy5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnc3ByaW5rbGVzJywgJ2Fzc2V0cy9pbWcvc3ByaW5rbGVzLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdsb2xsaXBvcCcsICdhc3NldHMvaW1nL2xvbGxpcG9wLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCdnaW5nZXJicmVhZC1tYW4nLCAnYXNzZXRzL2ltZy9naW5nZXJicmVhZC1tYW4ucG5nJyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGUoKSB7XHJcblx0XHR0aGlzLmJydXNoQ29sb3IgPSAweGZmMDAwMDtcclxuXHRcdHRoaXMuYnJ1c2ggPSAnY2lyY2xlJztcclxuXHRcdHRoaXMuc3RhbXAgPSAnY2FuZHktY2FuZSc7XHJcblx0XHR0aGlzLnN0YW1wU2l6ZU11bHRpcGxpZXIgPSAxO1xyXG5cdFx0dGhpcy5kcmF3blNoYXBlcyA9IFtdO1xyXG5cdFx0dGhpcy5zdGFnZSA9IHRoaXMuY3JlYXRlU3RhZ2UoKTtcclxuXHRcdHRoaXMuY3JlYXRlU3RhZ2VJbWFnZSgpO1xyXG5cdFx0dGhpcy5jcmVhdGVDb2xvclRvb2xiYXIoKTtcclxuXHRcdHRoaXMuY3JlYXRlU3RhbXBUb29sYmFyKCk7XHJcblx0XHR0aGlzLmNyZWF0ZVN0YW1wU2l6ZVRvb2xiYXIoKTtcclxuXHRcdHRoaXMuY3JlYXRlVG9vbFRvb2xiYXIoKTtcclxuXHRcdHRoaXMuY3JlYXRlQnV0dG9ucygpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3RhZ2UoKSB7XHJcblx0XHRjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuc3lzLmdhbWUuY2FudmFzO1xyXG5cdFx0Y29uc3Qgc3RhZ2UgPSB0aGlzLmFkZC5yZWN0YW5nbGUoMTYwLCA0NSwgd2lkdGggLSBUT09MQkFSX1dJRFRIICogMiwgaGVpZ2h0IC0gOTApO1xyXG5cdFx0c3RhZ2Uuc2V0T3JpZ2luKDAsIDApO1xyXG5cdFx0c3RhZ2Uuc2V0U3Ryb2tlU3R5bGUoNCwgMHgwMDAwMDApO1xyXG5cdFx0cmV0dXJuIHN0YWdlO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3RhZ2VJbWFnZShzdGFnZSkge1xyXG5cdFx0dGhpcy5hZGQuaW1hZ2UodGhpcy5zdGFnZS54ICsgdGhpcy5zdGFnZS53aWR0aCAvIDIsIHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0IC8gMiwgJ2hvdXNlJyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb2xvclRvb2xiYXIoKSB7XHJcblx0XHRjb25zdCB3aWR0aCA9IDUwO1xyXG5cdFx0Y29uc3QgaGVpZ2h0ID0gNTA7XHJcblx0XHRjb25zdCB4ID0gNTA7XHJcblx0XHRjb25zdCB5ID0gMzUwO1xyXG5cdFx0Y29uc3Qgb2Zmc2V0ID0gNTU7XHJcblx0XHRjb25zdCBjb2xvcnMgPSBbMHhmZjAwMDAsIDB4ZmY3ODc4LCAweDE0NmIzYSwgMHg3NGQ2ODAsIDB4OGNkNGZmLCAweGM2ZWZmZiwgMHhmYWM3MTEsIDB4ZWVmNmYyXTtcclxuXHJcblx0XHR0aGlzLmFkZC50ZXh0KDUwLCAzMDAsICdDb2xvcnMnLCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblx0XHRmb3IgKGxldCBpID0gMCwgcm93cyA9IDAsIGxlbiA9IGNvbG9ycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAoaSA+IDAgJiYgaSAlIDIgPT09IDApIHtcclxuXHRcdFx0XHRyb3dzKys7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgY29sb3JSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoaSAlIDIgPT09IDAgPyB4IDogeCArIG9mZnNldCwgb2Zmc2V0ICogcm93cyArIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yc1tpXSk7XHJcblx0XHRcdGNvbG9yUmVjdGFuZ2xlLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRcdGNvbG9yUmVjdGFuZ2xlLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5zZWxlY3RlZENvbG9yUmVjdGFuZ2xlKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoY29sb3JSZWN0YW5nbGUueCwgY29sb3JSZWN0YW5nbGUueSwgT1BUSU9OX1dJREhULCBPUFRJT05fSEVJR0hUKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEgsIFNFTEVDVEVEX09QVElPTl9MSU5FX0NPTE9SKTtcclxuXHRcdFx0XHR0aGlzLmJydXNoQ29sb3IgPSBjb2xvcnNbaV07XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAodGhpcy5icnVzaENvbG9yID09PSBjb2xvcnNbaV0pIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoY29sb3JSZWN0YW5nbGUueCwgY29sb3JSZWN0YW5nbGUueSwgT1BUSU9OX1dJREhULCBPUFRJT05fSEVJR0hUKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEgsIFNFTEVDVEVEX09QVElPTl9MSU5FX0NPTE9SKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3RhbXBUb29sYmFyKCkge1xyXG5cdFx0Y29uc3Qgd2lkdGggPSA1MDtcclxuXHRcdGNvbnN0IGhlaWdodCA9IDUwO1xyXG5cdFx0Y29uc3QgeCA9IDkxOTtcclxuXHRcdGNvbnN0IHkgPSA5MDtcclxuXHRcdGNvbnN0IG9mZnNldCA9IDU1O1xyXG5cdFx0Y29uc3Qgc3RhbXBzID0gW1xyXG5cdFx0XHQnY2FuZHktY2FuZScsXHJcblx0XHRcdCdndW1teS1iZWFyJyxcclxuXHRcdFx0J3N3ZWV0cycsXHJcblx0XHRcdCdtaW50JyxcclxuXHRcdFx0J2NhbmR5JyxcclxuXHRcdFx0J2Nob2NvbGF0ZScsXHJcblx0XHRcdCdwZXBwZXJtaW50JyxcclxuXHRcdFx0J2NhbmR5MicsXHJcblx0XHRcdCdndW0nLFxyXG5cdFx0XHQndHJ1ZmZsZScsXHJcblx0XHRcdCdqZWxseS1iZWFucycsXHJcblx0XHRcdCdzcHJpbmtsZXMnLFxyXG5cdFx0XHQnbG9sbGlwb3AnLFxyXG5cdFx0XHQnZ2luZ2VyYnJlYWQtbWFuJ1xyXG5cdFx0XTtcclxuXHJcblx0XHR0aGlzLmFkZC50ZXh0KDkxNCwgNDAsICdTdGFtcHMnLCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IDAsIHJvd3MgPSAwLCBsZW4gPSBzdGFtcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKGkgPiAwICYmIGkgJSAyID09PSAwKSB7XHJcblx0XHRcdFx0cm93cysrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IHN0YW1wUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKFxyXG5cdFx0XHRcdGkgJSAyID09PSAwID8geCA6IHggKyBvZmZzZXQsXHJcblx0XHRcdFx0b2Zmc2V0ICogcm93cyArIHksXHJcblx0XHRcdFx0d2lkdGgsXHJcblx0XHRcdFx0aGVpZ2h0LFxyXG5cdFx0XHRcdEJVVFRPTl9CQUNLR1JPVU5EX0NPTE9SXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRjb25zdCBzdGFtcEltYWdlID0gdGhpcy5hZGQuaW1hZ2Uoc3RhbXBSZWN0YW5nbGUueCwgc3RhbXBSZWN0YW5nbGUueSwgc3RhbXBzW2ldKTtcclxuXHRcdFx0c3RhbXBJbWFnZS5zZXRTY2FsZShTVEFNUF9TQ0FMRSk7XHJcblxyXG5cdFx0XHRzdGFtcFJlY3RhbmdsZS5zZXRJbnRlcmFjdGl2ZSgpO1xyXG5cdFx0XHRzdGFtcFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRTdGFtcFJlY3RhbmdsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlLmRlc3Ryb3koKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHN0YW1wUmVjdGFuZ2xlLngsIHN0YW1wUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHRcdFx0dGhpcy5zdGFtcCA9IHN0YW1wc1tpXTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICh0aGlzLnN0YW1wID09PSBzdGFtcHNbaV0pIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoc3RhbXBSZWN0YW5nbGUueCwgc3RhbXBSZWN0YW5nbGUueSwgNTAsIDUwKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEgsIFNFTEVDVEVEX09QVElPTl9MSU5FX0NPTE9SKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3RhbXBTaXplVG9vbGJhcigpIHtcclxuXHRcdHRoaXMuYWRkLnRleHQoODkwLCA0ODUsICdTdGFtcCBzaXplcycsIHtcclxuXHRcdFx0Zm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcblx0XHRcdGZvbnRTaXplOiBGT05UX1NJWkUsXHJcblx0XHRcdGNvbG9yOiBURVhUX0NPTE9SXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDUzNSwgJ1NtYWxsJywgOTIwLCA1MjUsIDAuNSk7XHJcblx0XHR0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDU5MCwgJ05vcm1hbCcsIDkxMywgNTgwLCAxKTtcclxuXHRcdHRoaXMuY3JlYXRlU3RhbXBTaXplT3B0aW9uKDk0NSwgNjQ1LCAnTGFyZ2UnLCA5MjAsIDYzNSwgMik7XHJcblx0XHR0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDcwMCwgJ1gtTGFyZ2UnLCA5MTAsIDY4NywgMyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTdGFtcFNpemVPcHRpb24oeCwgeSwgdGV4dCwgdGV4dFgsIHRleHRZLCBtdWx0aXBsaWVyKSB7XHJcblx0XHRjb25zdCByZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMTA1LCA1MCwgQlVUVE9OX0JBQ0tHUk9VTkRfQ09MT1IpO1xyXG5cclxuXHRcdHRoaXMuYWRkLnRleHQodGV4dFgsIHRleHRZLCB0ZXh0LCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblx0XHRyZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdHJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZS5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShyZWN0YW5nbGUueCwgcmVjdGFuZ2xlLnksIDEwNSwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHRcdHRoaXMuc3RhbXBTaXplTXVsdGlwbGllciA9IG11bHRpcGxpZXI7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLnN0YW1wU2l6ZU11bHRpcGxpZXIgPT09IG11bHRpcGxpZXIpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShyZWN0YW5nbGUueCwgcmVjdGFuZ2xlLnksIDEwNSwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVUb29sVG9vbGJhcigpIHtcclxuXHRcdHRoaXMuYWRkLnRleHQoNTAsIDQwLCAnVG9vbHMnLCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2NpcmNsZScsIDUwLCA5MCwgNTAsIDUwKTtcclxuXHRcdHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3Ryb2tlLWNpcmNsZScsIDEwNSwgOTAsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3NxdWFyZScsIDUwLCAxNDUsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1zcXVhcmUnLCAxMDUsIDE0NSwgNTAsIDUwKTtcclxuXHRcdHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3RhcicsIDUwLCAyMDAsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1zdGFyJywgMTA1LCAyMDAsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2VyYXNlcicsIDUwLCAyNTUsIDUwLCA1MCk7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0YW1wJywgMTA1LCAyNTUsIDUwLCA1MCk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVUb29sT3B0aW9uKGJydXNoLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcblx0XHRjb25zdCBicnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBCVVRUT05fQkFDS0dST1VORF9DT0xPUik7XHJcblx0XHR0aGlzLmNyZWF0ZVRvb2xJY29uKGJydXNoLCB4LCB5KTtcclxuXHRcdGJydXNoUmVjdGFuZ2xlLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRicnVzaFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShicnVzaFJlY3RhbmdsZS54LCBicnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEgsIFNFTEVDVEVEX09QVElPTl9MSU5FX0NPTE9SKTtcclxuXHRcdFx0dGhpcy5icnVzaCA9IGJydXNoO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy5icnVzaCA9PT0gYnJ1c2gpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKGJydXNoUmVjdGFuZ2xlLngsIGJydXNoUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZShTRUxFQ1RFRF9PUFRJT05fTElORV9XSURUSCwgU0VMRUNURURfT1BUSU9OX0xJTkVfQ09MT1IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlVG9vbEljb24oYnJ1c2gsIHgsIHkpIHtcclxuXHRcdGxldCBpY29uID0gbnVsbDtcclxuXHRcdHN3aXRjaCAoYnJ1c2gpIHtcclxuXHRcdFx0Y2FzZSAnc3F1YXJlJzpcclxuXHRcdFx0XHRpY29uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDI1LCAyNSwgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdHJva2Utc3F1YXJlJzpcclxuXHRcdFx0XHRpY29uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDI1LCAyNSwgMHhmZmZmZmYpO1xyXG5cdFx0XHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaXJjbGUnOlxyXG5cdFx0XHRcdGljb24gPSB0aGlzLmFkZC5jaXJjbGUoeCwgeSwgMTUsIDB4MDAwMDAwKTtcclxuXHRcdFx0XHRpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnc3Ryb2tlLWNpcmNsZSc6XHJcblx0XHRcdFx0aWNvbiA9IHRoaXMuYWRkLmNpcmNsZSh4LCB5LCAxNSwgMHhmZmZmZmYpO1xyXG5cdFx0XHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdGFyJzpcclxuXHRcdFx0XHRpY29uID0gdGhpcy5hZGQuc3Rhcih4LCB5LCA1LCA5LCAxOCwgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdHJva2Utc3Rhcic6XHJcblx0XHRcdFx0aWNvbiA9IHRoaXMuYWRkLnN0YXIoeCwgeSwgNSwgOSwgMTgsIDB4ZmZmZmZmKTtcclxuXHRcdFx0XHRpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZXJhc2VyJzpcclxuXHRcdFx0XHRpY29uID0gdGhpcy5hZGQuaW1hZ2UoeCwgeSwgJ2VyYXNlci1pY29uJyk7XHJcblx0XHRcdFx0aWNvbi5zZXRTY2FsZSgwLjA3LCAwLjA3KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnc3RhbXAnOlxyXG5cdFx0XHRcdGljb24gPSB0aGlzLmFkZC5pbWFnZSh4LCB5LCAnc3RhbXAtaWNvbicpO1xyXG5cdFx0XHRcdGljb24uc2V0U2NhbGUoMC4wNywgMC4wNyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVCdXR0b25zKCkge1xyXG5cclxuXHRcdGNvbnN0IGNoYW5nZUhvdXNlID0gdGhpcy5hZGQucmVjdGFuZ2xlKDgwLCB0aGlzLnN0YWdlLnkgKyB0aGlzLnN0YWdlLmhlaWdodCAtIDEzNSwgMTA1LCA1MCwgQlVUVE9OX0JBQ0tHUk9VTkRfQ09MT1IpO1xyXG5cclxuXHRcdHRoaXMuYWRkLnRleHQoNjAsIHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0IC0gMTQ1LCAnTmV3Jywge1xyXG5cdFx0XHRmb250RmFtaWx5OiBGT05UX0ZBTUlMWSxcclxuXHRcdFx0Zm9udFNpemU6IEZPTlRfU0laRSxcclxuXHRcdFx0Y29sb3I6IFRFWFRfQ09MT1JcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNoYW5nZUhvdXNlLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRjaGFuZ2VIb3VzZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0fSlcclxuXHJcblx0XHRjb25zdCBjbGVhckFsbEJ1dHRvbiA9IHRoaXMuYWRkLnJlY3RhbmdsZSg4MCwgdGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQgLSA4MCwgMTA1LCA1MCwgQlVUVE9OX0JBQ0tHUk9VTkRfQ09MT1IpO1xyXG5cclxuXHRcdHRoaXMuYWRkLnRleHQoNDIsIHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0IC0gOTAsICdDbGVhciBBbGwnLCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y2xlYXJBbGxCdXR0b24uc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdGNsZWFyQWxsQnV0dG9uLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcclxuXHRcdFx0dGhpcy5jbGVhckFsbCgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgZXhwb3J0QnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKDgwLCB0aGlzLnN0YWdlLnkgKyB0aGlzLnN0YWdlLmhlaWdodCAtIDI1LCAxMDUsIDUwLCBCVVRUT05fQkFDS0dST1VORF9DT0xPUik7XHJcblxyXG5cdFx0dGhpcy5hZGQudGV4dCg1MCwgdGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQgLSAzNSwgJ0V4cG9ydCcsIHtcclxuXHRcdFx0Zm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcblx0XHRcdGZvbnRTaXplOiBGT05UX1NJWkUsXHJcblx0XHRcdGNvbG9yOiBURVhUX0NPTE9SXHJcblx0XHR9KTtcclxuXHJcblx0XHRleHBvcnRCdXR0b24uc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdGV4cG9ydEJ1dHRvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcclxuXHRcdFx0Y29uc3Qgc2F2ZUNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5cdFx0XHRzYXZlQ2FudmFzLndpZHRoID0gNzAwO1xyXG5cdFx0XHRzYXZlQ2FudmFzLmhlaWdodCA9IDY1MDtcclxuXHJcblx0XHRcdGNvbnN0IGN0eCA9IHNhdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRcdFx0Y3R4LmRyYXdJbWFnZShjYW52YXMsIDE2NSwgNTAsIDY5NSwgNjUwLCAwLCAwLCA2OTUsIDY1MCk7XHJcblxyXG5cdFx0XHRsZXQgZGF0YVVSTCA9IHNhdmVDYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcclxuXHJcblx0XHRcdGxldCBkb3dubG9hZEhlbHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0ZG93bmxvYWRIZWxwZXIuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICdkb3dubG9hZC5wbmcnKTtcclxuXHRcdFx0ZG93bmxvYWRIZWxwZXIuc2V0QXR0cmlidXRlKCdocmVmJywgZGF0YVVSTCk7XHJcblx0XHRcdGRvd25sb2FkSGVscGVyLmNsaWNrKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNsZWFyQWxsKCkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuZHJhd25TaGFwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0dGhpcy5kcmF3blNoYXBlc1tpXS5kZXN0cm95KCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmRyYXduU2hhcGVzID0gW107XHJcblx0fVxyXG5cclxuXHRjYW5EcmF3KHBvaW50ZXIpIHtcclxuXHRcdHJldHVybiBwb2ludGVyLmlzRG93biAmJiB0aGlzLnN0YWdlLmdldEJvdW5kcygpLmNvbnRhaW5zKHBvaW50ZXIueCAtIFNRVUFSRV9CUlVTSF9TSVpFIC8gMiwgcG9pbnRlci55IC0gU1FVQVJFX0JSVVNIX1NJWkUpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKCkge1xyXG5cdFx0Y29uc3QgcG9pbnRlciA9IHRoaXMuaW5wdXQuYWN0aXZlUG9pbnRlcjtcclxuXHRcdGxldCBzaGFwZSA9IG51bGw7XHJcblx0XHRpZiAodGhpcy5jYW5EcmF3KHBvaW50ZXIpKSB7XHJcblx0XHRcdHN3aXRjaCAodGhpcy5icnVzaCkge1xyXG5cdFx0XHRcdGNhc2UgJ3NxdWFyZSc6XHJcblx0XHRcdFx0XHRzaGFwZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShwb2ludGVyLngsIHBvaW50ZXIueSwgU1FVQVJFX0JSVVNIX1NJWkUsIFNRVUFSRV9CUlVTSF9TSVpFLCB0aGlzLmJydXNoQ29sb3IpO1xyXG5cdFx0XHRcdFx0c2hhcGUuc2V0T3JpZ2luKENFTlRFUl9YLCBDRU5URVJfWSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzdHJva2Utc3F1YXJlJzpcclxuXHRcdFx0XHRcdHNoYXBlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCBTUVVBUkVfQlJVU0hfU0laRSwgU1FVQVJFX0JSVVNIX1NJWkUpO1xyXG5cdFx0XHRcdFx0c2hhcGUuc2V0T3JpZ2luKENFTlRFUl9YLCBDRU5URVJfWSk7XHJcblx0XHRcdFx0XHRzaGFwZS5zZXRTdHJva2VTdHlsZShCUlVTSF9MSU5FX1dJRFRILCB0aGlzLmJydXNoQ29sb3IpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnY2lyY2xlJzpcclxuXHRcdFx0XHRcdHNoYXBlID0gdGhpcy5hZGQuY2lyY2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCBDSVJDTEVfQlJVU0hfUkFESVVTLCB0aGlzLmJydXNoQ29sb3IpO1xyXG5cdFx0XHRcdFx0c2hhcGUuc2V0T3JpZ2luKENFTlRFUl9YLCBDRU5URVJfWSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzdHJva2UtY2lyY2xlJzpcclxuXHRcdFx0XHRcdHNoYXBlID0gdGhpcy5hZGQuY2lyY2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCBDSVJDTEVfQlJVU0hfUkFESVVTKTtcclxuXHRcdFx0XHRcdHNoYXBlLnNldE9yaWdpbihDRU5URVJfWCwgQ0VOVEVSX1kpO1xyXG5cdFx0XHRcdFx0c2hhcGUuc2V0U3Ryb2tlU3R5bGUoQlJVU0hfTElORV9XSURUSCwgdGhpcy5icnVzaENvbG9yKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3N0YXInOlxyXG5cdFx0XHRcdFx0c2hhcGUgPSB0aGlzLmFkZC5zdGFyKFxyXG5cdFx0XHRcdFx0XHRwb2ludGVyLngsXHJcblx0XHRcdFx0XHRcdHBvaW50ZXIueSxcclxuXHRcdFx0XHRcdFx0U1RBUl9CUlVTSF9OVU1CRVJfT0ZfUE9JTlRTLFxyXG5cdFx0XHRcdFx0XHRTVEFSX0JSVVNIX0lOTkVSX1JBRElVUyxcclxuXHRcdFx0XHRcdFx0U1RBUl9CUlVTSF9PVVRFUl9SQURJVVMsXHJcblx0XHRcdFx0XHRcdHRoaXMuYnJ1c2hDb2xvclxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdHNoYXBlLnNldE9yaWdpbihDRU5URVJfWCwgQ0VOVEVSX1kpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnc3Ryb2tlLXN0YXInOlxyXG5cdFx0XHRcdFx0c2hhcGUgPSB0aGlzLmFkZC5zdGFyKFxyXG5cdFx0XHRcdFx0XHRwb2ludGVyLngsXHJcblx0XHRcdFx0XHRcdHBvaW50ZXIueSxcclxuXHRcdFx0XHRcdFx0U1RBUl9CUlVTSF9OVU1CRVJfT0ZfUE9JTlRTLFxyXG5cdFx0XHRcdFx0XHRTVEFSX0JSVVNIX0lOTkVSX1JBRElVUyxcclxuXHRcdFx0XHRcdFx0U1RBUl9CUlVTSF9PVVRFUl9SQURJVVNcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRzaGFwZS5zZXRPcmlnaW4oQ0VOVEVSX1gsIENFTlRFUl9ZKTtcclxuXHRcdFx0XHRcdHNoYXBlLnNldFN0cm9rZVN0eWxlKEJSVVNIX0xJTkVfV0lEVEgsIHRoaXMuYnJ1c2hDb2xvcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzdGFtcCc6XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdGFtcCkge1xyXG5cdFx0XHRcdFx0XHRzaGFwZSA9IHRoaXMuYWRkLmltYWdlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLnN0YW1wKTtcclxuXHRcdFx0XHRcdFx0c2hhcGUuc2V0T3JpZ2luKENFTlRFUl9YLCBDRU5URVJfWSk7XHJcblx0XHRcdFx0XHRcdHNoYXBlLnNldFNjYWxlKFNUQU1QX1NDQUxFICogdGhpcy5zdGFtcFNpemVNdWx0aXBsaWVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ2VyYXNlcic6XHJcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5kcmF3blNoYXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5kcmF3blNoYXBlc1tpXS5nZXRCb3VuZHMoKS5jb250YWlucyhwb2ludGVyLngsIHBvaW50ZXIueSkpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRyYXduU2hhcGVzW2ldLmRlc3Ryb3koKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2hhcGUpIHtcclxuXHRcdFx0dGhpcy5kcmF3blNoYXBlcy5wdXNoKHNoYXBlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2dpbmdlcmJyZWFkX2RlY29yYXRvclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnaW5nZXJicmVhZF9kZWNvcmF0b3JcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9