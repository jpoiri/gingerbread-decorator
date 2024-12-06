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


class GameScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
	constructor() {
		super('game');
	}

	preload() {
        this.load.image('gingerbread-man', 'assets/img/gingerbread-man.png');
        this.load.image('eraser-icon', 'assets/img/eraser.png');
        this.load.image('stamp-icon', 'assets/img/stamp.png');
        this.load.image('candy-cane', 'assets/img/candy-cane.png');
        this.load.image('gummy-bear', 'assets/img/gummy-bear.png');
        this.load.image('sweets', 'assets/img/sweets.png');
        this.load.image('mint', 'assets/img/mint.png');
        this.load.image('candy', 'assets/img/candy.png');
        this.load.image('chocolate', 'assets/img/chocolate.png');
	}

	create() {
        this.brushWidth = 15;
		this.brushHeight = 15;
		this.brushRadius = 7;
		this.brushColor = 0xff0000;
        this.brush = 'circle';
        this.stamp = null;
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
        const {width, height} = this.sys.game.canvas;
        const toolbarSize = 160;
        const stage = this.add.rectangle(160, 45, width - (toolbarSize * 2), height - 90);
        stage.setOrigin(0, 0);
        stage.setStrokeStyle(4, 0x000000);
        return stage;
    }

    createStageImage(stage) {
        return this.add.image(this.stage.x + (this.stage.width / 2), this.stage.y + (this.stage.height / 2), 'gingerbread-man');
    }

	createColorToolbar() {
		const width = 50;
        const height = 50;
		const x = 50;
		const y = 350;
		const offset = 55;
        const colors = [0xff0000, 0xff7878,  0x146b3a, 0x74d680, 0x8cd4ff, 0xc6efff, 0xfac711, 0xffffff ];

        this.add.text(50, 300, 'Colors', {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE,
            color: '#000000'            
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
				this.selectedColorRectangle = this.add.rectangle(colorRectangle.x, colorRectangle.y, 50, 50);
				this.selectedColorRectangle.setStrokeStyle(3, 0x000000);
                this.brushColor = colors[i];
            });
            if (this.brushColor === colors[i]) {
				this.selectedColorRectangle = this.add.rectangle(colorRectangle.x, colorRectangle.y, 50, 50);
				this.selectedColorRectangle.setStrokeStyle(3, 0x000000);
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
            {
                imageKey: 'candy-cane',
                scale: 0.08
            }, 
            {
                imageKey: 'gummy-bear',
                scale: 0.08
            }, 
            {
                imageKey: 'sweets',
                scale: 0.08
            },
            {
                imageKey: 'mint',
                scale: 0.08
            },
            {
                imageKey: 'candy',
                scale: 0.08
            },
            {
                imageKey: 'chocolate',
                scale: 0.08
            },
            {
                imageKey: 'hat',
                scale: 0.05
            },
            {
                imageKey: 'lolipop1',
                scale: 0.06
            },
            {
                imageKey: 'lolipop2',
                scale: 0.06
            },
            {
                imageKey: 'ribbon',
                scale: 0.08
            },
            {
                imageKey: 'ring-tree',
                scale: 0.05
            },
            {
                imageKey: 'sleigh-bells',
                scale: 0.065
            },
            {
                imageKey: 'socks',
                scale: 0.08
            },
            {
                imageKey: 'star',
                scale: 0.08
            },
        ];

        this.add.text(914, 40, 'Stamps', {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE,
            color: '#000000'            
        });

        for (let i = 0, rows = 0, len = stamps.length; i < len; i++) {
			if (i > 0 && i % 2 === 0) {
				rows++;
            }
            const stampRectangle = this.add.rectangle(i % 2 === 0 ? x : x + offset, offset * rows + y, width, height, 0xd3d3d3);

            const stampImage = this.add.image(stampRectangle.x, stampRectangle.y, stamps[i].imageKey);
            stampImage.setScale(stamps[i].scale);

			stampRectangle.setInteractive();
			stampRectangle.on('pointerdown', () => {
				if (this.selectedStampRectangle) {
					this.selectedStampRectangle.destroy();
				}
				this.selectedStampRectangle = this.add.rectangle(stampRectangle.x, stampRectangle.y, 50, 50);
				this.selectedStampRectangle.setStrokeStyle(3, 0x000000);
                this.selectedStamp = stamps[i];
            });
            if (this.selectedStamp === stamps[i]) {
				this.selectedStampRectangle = this.add.rectangle(stampRectangle.x, stampRectangle.y, 50, 50);
				this.selectedStampRectangle.setStrokeStyle(3, 0x000000);
            }
		}
    }

    createStampSizeToolbar() {
        this.add.text(890, 485, 'Stamp sizes', {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE,
            color: '#000000'    
        });

        this.createStampSizeOption(945, 535, 'Small', 920, 525, 0.5);
        this.createStampSizeOption(945, 590, 'Normal', 913, 580, 1);
        this.createStampSizeOption(945, 645, 'Large', 920, 635, 2);
        this.createStampSizeOption(945, 700, 'X-Large', 910, 687, 3);
    }

    createStampSizeOption(x, y, text, textX, textY, multiplier) {
        const rectangle = this.add.rectangle(x, y, 105, 50, 0xd3d3d3);

        this.add.text(textX, textY, text, {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE,
            color: '#000000'
        });
        rectangle.setInteractive();
        rectangle.on('pointerdown', () => {
            if (this.selectedStampSizeRectangle) {
                this.selectedStampSizeRectangle.destroy();
            }
            this.selectedStampSizeRectangle = this.add.rectangle(rectangle.x, rectangle.y, 105, 50);
            this.selectedStampSizeRectangle.setStrokeStyle(3, 0x000000);
            this.stampSizeMultiplier =  multiplier;
        });
        if (this.stampSizeMultiplier === multiplier) {
            this.selectedStampSizeRectangle = this.add.rectangle(rectangle.x, rectangle.y, 105, 50);
            this.selectedStampSizeRectangle.setStrokeStyle(3, 0x000000);
        }
    }

	createToolToolbar() {
        this.add.text(50, 40, 'Tools', {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE,
            color: '#000000'            
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
        const brushRectangle = this.add.rectangle(x, y, width, height, 0xd3d3d3);
		this.createToolIcon(brush, x, y);
        brushRectangle.setInteractive();
        brushRectangle.on('pointerdown', () => {
			if (this.selectedBrushRectangle) {
				this.selectedBrushRectangle.destroy();
			}
			this.selectedBrushRectangle = this.add.rectangle(brushRectangle.x, brushRectangle.y, 50, 50);
			this.selectedBrushRectangle.setStrokeStyle(3, 0x000000);
			this.brush = brush;
        });
        if (this.brush === brush) {
            this.selectedBrushRectangle = this.add.rectangle(brushRectangle.x, brushRectangle.y, 50, 50);
			this.selectedBrushRectangle.setStrokeStyle(3, 0x000000);
        }
    }

    createToolIcon(brush, x, y) {
        let icon = null;
        switch(brush) {
            case 'square':
                icon = this.add.rectangle(x, y, 25, 25, 0x000000);
                icon.setStrokeStyle(3, 0x000000);
                break;
            case 'stroke-square':
                icon = this.add.rectangle(x, y, 25, 25, 0xFFFFFF);
                icon.setStrokeStyle(3, 0x000000);
                break;
            case 'circle':
                icon = this.add.circle(x, y, 15, 0x000000);
                icon.setStrokeStyle(3, 0x000000);
                break;
            case 'stroke-circle':
                icon = this.add.circle(x, y, 15, 0xFFFFFF);
                icon.setStrokeStyle(3, 0x000000);
                break
            case 'star':
                icon = this.add.star(x, y, 5, 9, 18, 0x000000);
                icon.setStrokeStyle(3, 0x000000);
                break;
            case 'stroke-star': 
                icon = this.add.star(x, y, 5, 9, 18, 0xFFFFFF);
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
        const clearAllButton = this.add.rectangle(80, (this.stage.y + this.stage.height) - 80, 105, 50, 0xd3d3d3);

        this.add.text(42, (this.stage.y + this.stage.height) - 90 , 'Clear All', {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE,
            color: '#000000'            
        });

        clearAllButton.setInteractive();
        clearAllButton.on('pointerdown', () => {
            this.clearAll();
        });

        const exportButton = this.add.rectangle(80, (this.stage.y + this.stage.height) - 25, 105, 50, 0xd3d3d3);

        this.add.text(50, (this.stage.y + this.stage.height) - 35 , 'Export', {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE,
            color: '#000000'            
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
        return pointer.isDown && this.stage.getBounds().contains(pointer.x - (this.brushWidth / 2), pointer.y - this.brushHeight);
    }

	update() {
        const pointer = this.input.activePointer;
        let shape = null;
        if (this.canDraw(pointer)) {
			switch (this.brush) {
				case 'square':
                    shape = this.add.rectangle(pointer.x, pointer.y, this.brushWidth, this.brushHeight, this.brushColor);
                    shape.setOrigin(0.5, 0.5);
					break;
				case 'stroke-square':
                    shape = this.add.rectangle(pointer.x, pointer.y, this.brushWidth, this.brushHeight);
                    shape.setOrigin(0.5, 0.5);
                    shape.setStrokeStyle(3,this.brushColor);
					break;
				case 'circle':
                    shape = this.add.circle(pointer.x, pointer.y, this.brushRadius, this.brushColor);
                    shape.setOrigin(0.5, 0.5);
					break;
				case 'stroke-circle':
                    shape = this.add.circle(pointer.x, pointer.y, this.brushRadius);
                    shape.setOrigin(0.5, 0.5);
                    shape.setStrokeStyle(3, this.brushColor);
                    break;
                case 'star': 
                    shape = this.add.star(pointer.x, pointer.y, 5, 5, 10, this.brushColor);
                    shape.setOrigin(0.5, 0.5);
                    break;
                case 'stroke-star': 
                    shape = this.add.star(pointer.x, pointer.y, 5, 5, 10);
                    shape.setOrigin(0.5, 0.5);
                    shape.setStrokeStyle(3, this.brushColor);
                    break;
                case 'stamp':
                    if (this.selectedStamp) {
                        shape = this.add.image(pointer.x, pointer.y, this.selectedStamp.imageKey);
                        shape.setOrigin(0.5, 0.5);
                        const scale = this.selectedStamp.scale * this.stampSizeMultiplier
                        shape.setScale(scale);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDSjtBQUN0QztBQUNBO0FBQ0EsT0FBTyxzREFBYTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCLG9CQUFvQixxREFBWTtBQUNoQztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsRUFBRTtBQUNGLFNBQVMsb0RBQVM7QUFDbEI7QUFDQTtBQUNBLGlCQUFpQixvREFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLHdCQUF3QixxREFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsaURBQWlELFNBQVM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVEQUF1RCxTQUFTO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsU0FBUztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLFNBQVM7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMvWUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yLy4vc3JjL3NjZW5lcy9HYW1lLmpzIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaGFzZXIsIHsgVGV4dHVyZXMgfSBmcm9tICdwaGFzZXInO1xyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gJy4vc2NlbmVzL0dhbWUnO1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG5cdHR5cGU6IFBoYXNlci5DQU5WQVMsXHJcblx0YmFja2dyb3VuZENvbG9yOiAnI0ZGRkZGRicsXHJcblx0ZGVidWc6IHRydWUsXHJcblx0c2NhbGU6IHtcclxuXHRcdG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcbiAgICAgICAgYXV0b0NlbnRlcjogUGhhc2VyLlNjYWxlLkNFTlRFUl9CT1RILFxyXG5cdFx0d2lkdGg6IDEwMjQsXHJcblx0XHRoZWlnaHQ6IDc2OFxyXG5cdH0sXHJcblx0cGh5c2ljczoge1xyXG5cdFx0ZGVmYXVsdDogJ2FyY2FkZScsXHJcblx0XHRhcmNhZGU6IHtcclxuXHRcdFx0ZGVidWc6IHRydWUsXHJcblx0XHRcdGdyYXZpdHk6IHsgeTogMjAwIH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdHNjZW5lOiBbR2FtZVNjZW5lXVxyXG59O1xyXG5cclxuY29uc3QgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShjb25maWcpO1xyXG4iLCJpbXBvcnQgUGhhc2VyIGZyb20gJ3BoYXNlcic7XHJcblxyXG5jb25zdCBGT05UX0ZBTUlMWSA9ICdhcmlhbCc7XHJcbmNvbnN0IEZPTlRfU0laRSA9ICcyMHB4JztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoJ2dhbWUnKTtcclxuXHR9XHJcblxyXG5cdHByZWxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdnaW5nZXJicmVhZC1tYW4nLCAnYXNzZXRzL2ltZy9naW5nZXJicmVhZC1tYW4ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdlcmFzZXItaWNvbicsICdhc3NldHMvaW1nL2VyYXNlci5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0YW1wLWljb24nLCAnYXNzZXRzL2ltZy9zdGFtcC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2NhbmR5LWNhbmUnLCAnYXNzZXRzL2ltZy9jYW5keS1jYW5lLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZ3VtbXktYmVhcicsICdhc3NldHMvaW1nL2d1bW15LWJlYXIucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzd2VldHMnLCAnYXNzZXRzL2ltZy9zd2VldHMucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdtaW50JywgJ2Fzc2V0cy9pbWcvbWludC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2NhbmR5JywgJ2Fzc2V0cy9pbWcvY2FuZHkucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdjaG9jb2xhdGUnLCAnYXNzZXRzL2ltZy9jaG9jb2xhdGUucG5nJyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5icnVzaFdpZHRoID0gMTU7XHJcblx0XHR0aGlzLmJydXNoSGVpZ2h0ID0gMTU7XHJcblx0XHR0aGlzLmJydXNoUmFkaXVzID0gNztcclxuXHRcdHRoaXMuYnJ1c2hDb2xvciA9IDB4ZmYwMDAwO1xyXG4gICAgICAgIHRoaXMuYnJ1c2ggPSAnY2lyY2xlJztcclxuICAgICAgICB0aGlzLnN0YW1wID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YW1wU2l6ZU11bHRpcGxpZXIgPSAxO1xyXG4gICAgICAgIHRoaXMuZHJhd25TaGFwZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0YWdlID0gdGhpcy5jcmVhdGVTdGFnZSgpO1xyXG5cdFx0dGhpcy5zdGFnZUltYWdlID0gdGhpcy5jcmVhdGVTdGFnZUltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb2xvclRvb2xiYXIoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0YW1wVG9vbGJhcigpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RhbXBTaXplVG9vbGJhcigpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbFRvb2xiYXIoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlU3RhZ2UoKSB7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5zeXMuZ2FtZS5jYW52YXM7XHJcbiAgICAgICAgY29uc3QgdG9vbGJhclNpemUgPSAxNjA7XHJcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSB0aGlzLmFkZC5yZWN0YW5nbGUoMTYwLCA0NSwgd2lkdGggLSAodG9vbGJhclNpemUgKiAyKSwgaGVpZ2h0IC0gOTApO1xyXG4gICAgICAgIHN0YWdlLnNldE9yaWdpbigwLCAwKTtcclxuICAgICAgICBzdGFnZS5zZXRTdHJva2VTdHlsZSg0LCAweDAwMDAwMCk7XHJcbiAgICAgICAgcmV0dXJuIHN0YWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVN0YWdlSW1hZ2Uoc3RhZ2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGQuaW1hZ2UodGhpcy5zdGFnZS54ICsgKHRoaXMuc3RhZ2Uud2lkdGggLyAyKSwgdGhpcy5zdGFnZS55ICsgKHRoaXMuc3RhZ2UuaGVpZ2h0IC8gMiksICdnaW5nZXJicmVhZC1tYW4nKTtcclxuICAgIH1cclxuXHJcblx0Y3JlYXRlQ29sb3JUb29sYmFyKCkge1xyXG5cdFx0Y29uc3Qgd2lkdGggPSA1MDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSA1MDtcclxuXHRcdGNvbnN0IHggPSA1MDtcclxuXHRcdGNvbnN0IHkgPSAzNTA7XHJcblx0XHRjb25zdCBvZmZzZXQgPSA1NTtcclxuICAgICAgICBjb25zdCBjb2xvcnMgPSBbMHhmZjAwMDAsIDB4ZmY3ODc4LCAgMHgxNDZiM2EsIDB4NzRkNjgwLCAweDhjZDRmZiwgMHhjNmVmZmYsIDB4ZmFjNzExLCAweGZmZmZmZiBdO1xyXG5cclxuICAgICAgICB0aGlzLmFkZC50ZXh0KDUwLCAzMDAsICdDb2xvcnMnLCB7XHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogRk9OVF9TSVpFLFxyXG4gICAgICAgICAgICBjb2xvcjogJyMwMDAwMDAnICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblx0XHRmb3IgKGxldCBpID0gMCwgcm93cyA9IDAsIGxlbiA9IGNvbG9ycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAoaSA+IDAgJiYgaSAlIDIgPT09IDApIHtcclxuXHRcdFx0XHRyb3dzKys7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgY29sb3JSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoaSAlIDIgPT09IDAgPyB4IDogeCArIG9mZnNldCwgb2Zmc2V0ICogcm93cyArIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yc1tpXSk7XHJcblx0XHRcdGNvbG9yUmVjdGFuZ2xlLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRcdGNvbG9yUmVjdGFuZ2xlLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5zZWxlY3RlZENvbG9yUmVjdGFuZ2xlKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoY29sb3JSZWN0YW5nbGUueCwgY29sb3JSZWN0YW5nbGUueSwgNTAsIDUwKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icnVzaENvbG9yID0gY29sb3JzW2ldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYnJ1c2hDb2xvciA9PT0gY29sb3JzW2ldKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZENvbG9yUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKGNvbG9yUmVjdGFuZ2xlLngsIGNvbG9yUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZENvbG9yUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVTdGFtcFRvb2xiYXIoKSB7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSA1MDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSA1MDtcclxuXHRcdGNvbnN0IHggPSA5MTk7XHJcblx0XHRjb25zdCB5ID0gOTA7XHJcblx0XHRjb25zdCBvZmZzZXQgPSA1NTtcclxuICAgICAgICBjb25zdCBzdGFtcHMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGltYWdlS2V5OiAnY2FuZHktY2FuZScsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4wOFxyXG4gICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdndW1teS1iZWFyJyxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjA4XHJcbiAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ3N3ZWV0cycsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4wOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ21pbnQnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdjYW5keScsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4wOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ2Nob2NvbGF0ZScsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4wOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ2hhdCcsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4wNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ2xvbGlwb3AxJyxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjA2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGltYWdlS2V5OiAnbG9saXBvcDInLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdyaWJib24nLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdyaW5nLXRyZWUnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdzbGVpZ2gtYmVsbHMnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDY1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGltYWdlS2V5OiAnc29ja3MnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdzdGFyJyxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjA4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg5MTQsIDQwLCAnU3RhbXBzJywge1xyXG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05UX0ZBTUlMWSxcclxuICAgICAgICAgICAgZm9udFNpemU6IEZPTlRfU0laRSxcclxuICAgICAgICAgICAgY29sb3I6ICcjMDAwMDAwJyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgcm93cyA9IDAsIGxlbiA9IHN0YW1wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAoaSA+IDAgJiYgaSAlIDIgPT09IDApIHtcclxuXHRcdFx0XHRyb3dzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3RhbXBSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoaSAlIDIgPT09IDAgPyB4IDogeCArIG9mZnNldCwgb2Zmc2V0ICogcm93cyArIHksIHdpZHRoLCBoZWlnaHQsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YW1wSW1hZ2UgPSB0aGlzLmFkZC5pbWFnZShzdGFtcFJlY3RhbmdsZS54LCBzdGFtcFJlY3RhbmdsZS55LCBzdGFtcHNbaV0uaW1hZ2VLZXkpO1xyXG4gICAgICAgICAgICBzdGFtcEltYWdlLnNldFNjYWxlKHN0YW1wc1tpXS5zY2FsZSk7XHJcblxyXG5cdFx0XHRzdGFtcFJlY3RhbmdsZS5zZXRJbnRlcmFjdGl2ZSgpO1xyXG5cdFx0XHRzdGFtcFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRTdGFtcFJlY3RhbmdsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlLmRlc3Ryb3koKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHN0YW1wUmVjdGFuZ2xlLngsIHN0YW1wUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdGFtcCA9IHN0YW1wc1tpXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkU3RhbXAgPT09IHN0YW1wc1tpXSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShzdGFtcFJlY3RhbmdsZS54LCBzdGFtcFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcFJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTdGFtcFNpemVUb29sYmFyKCkge1xyXG4gICAgICAgIHRoaXMuYWRkLnRleHQoODkwLCA0ODUsICdTdGFtcCBzaXplcycsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBGT05UX1NJWkUsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RhbXBTaXplT3B0aW9uKDk0NSwgNTM1LCAnU21hbGwnLCA5MjAsIDUyNSwgMC41KTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDU5MCwgJ05vcm1hbCcsIDkxMywgNTgwLCAxKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDY0NSwgJ0xhcmdlJywgOTIwLCA2MzUsIDIpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RhbXBTaXplT3B0aW9uKDk0NSwgNzAwLCAnWC1MYXJnZScsIDkxMCwgNjg3LCAzKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTdGFtcFNpemVPcHRpb24oeCwgeSwgdGV4dCwgdGV4dFgsIHRleHRZLCBtdWx0aXBsaWVyKSB7XHJcbiAgICAgICAgY29uc3QgcmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDEwNSwgNTAsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCh0ZXh0WCwgdGV4dFksIHRleHQsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBGT05UX1NJWkUsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICByZWN0YW5nbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShyZWN0YW5nbGUueCwgcmVjdGFuZ2xlLnksIDEwNSwgNTApO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFtcFNpemVNdWx0aXBsaWVyID0gIG11bHRpcGxpZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhbXBTaXplTXVsdGlwbGllciA9PT0gbXVsdGlwbGllcikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHJlY3RhbmdsZS54LCByZWN0YW5nbGUueSwgMTA1LCA1MCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdGFtcFNpemVSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblx0Y3JlYXRlVG9vbFRvb2xiYXIoKSB7XHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg1MCwgNDAsICdUb29scycsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBGT05UX1NJWkUsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2NpcmNsZScsIDUwLCA5MCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1jaXJjbGUnLCAxMDUsIDkwLCA1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3F1YXJlJywgNTAsIDE0NSwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1zcXVhcmUnLCAxMDUsIDE0NSwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0YXInLCA1MCwgMjAwLCA1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3Ryb2tlLXN0YXInLCAxMDUsIDIwMCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2VyYXNlcicsIDUwLCAyNTUsIDUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sT3B0aW9uKCdzdGFtcCcsIDEwNSwgMjU1LCA1MCwgNTApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVUb29sT3B0aW9uKGJydXNoLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgYnJ1c2hSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgMHhkM2QzZDMpO1xyXG5cdFx0dGhpcy5jcmVhdGVUb29sSWNvbihicnVzaCwgeCwgeSk7XHJcbiAgICAgICAgYnJ1c2hSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICBicnVzaFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShicnVzaFJlY3RhbmdsZS54LCBicnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHR0aGlzLmJydXNoID0gYnJ1c2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuYnJ1c2ggPT09IGJydXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShicnVzaFJlY3RhbmdsZS54LCBicnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUb29sSWNvbihicnVzaCwgeCwgeSkge1xyXG4gICAgICAgIGxldCBpY29uID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2goYnJ1c2gpIHtcclxuICAgICAgICAgICAgY2FzZSAnc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMjUsIDI1LCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHJva2Utc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMjUsIDI1LCAweEZGRkZGRik7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjaXJjbGUnOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLmNpcmNsZSh4LCB5LCAxNSwgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3Ryb2tlLWNpcmNsZSc6XHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQuY2lyY2xlKHgsIHksIDE1LCAweEZGRkZGRik7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0YXInOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLnN0YXIoeCwgeSwgNSwgOSwgMTgsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cm9rZS1zdGFyJzogXHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQuc3Rhcih4LCB5LCA1LCA5LCAxOCwgMHhGRkZGRkYpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZXJhc2VyJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5pbWFnZSh4LCB5LCAnZXJhc2VyLWljb24nKTtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0U2NhbGUoMC4wNywgMC4wNyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RhbXAnOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLmltYWdlKHgsIHksICdzdGFtcC1pY29uJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFNjYWxlKDAuMDcsIDAuMDcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjcmVhdGVCdXR0b25zKCkge1xyXG4gICAgICAgIGNvbnN0IGNsZWFyQWxsQnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKDgwLCAodGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQpIC0gODAsIDEwNSwgNTAsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg0MiwgKHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0KSAtIDkwICwgJ0NsZWFyIEFsbCcsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBGT05UX1NJWkUsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2xlYXJBbGxCdXR0b24uc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICBjbGVhckFsbEJ1dHRvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJBbGwoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXhwb3J0QnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKDgwLCAodGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQpIC0gMjUsIDEwNSwgNTAsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg1MCwgKHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0KSAtIDM1ICwgJ0V4cG9ydCcsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBGT05UX1NJWkUsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZXhwb3J0QnV0dG9uLnNldEludGVyYWN0aXZlKCk7XHJcbiAgICAgICAgZXhwb3J0QnV0dG9uLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xyXG4gICAgICAgICAgICBjb25zdCBzYXZlQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIHNhdmVDYW52YXMud2lkdGggPSA3MDA7XHJcbiAgICAgICAgICAgIHNhdmVDYW52YXMuaGVpZ2h0ID0gNjUwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3R4ID0gc2F2ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGNhbnZhcywgMTY1LCA1MCwgNjkwLCA2NTAsIDAsIDAsIDcwMCwgNjUwKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhVVJMID0gc2F2ZUNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRvd25sb2FkSGVscGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICBkb3dubG9hZEhlbHBlci5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ2Rvd25sb2FkLnBuZycpO1xyXG4gICAgICAgICAgICBkb3dubG9hZEhlbHBlci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBkYXRhVVJMKTtcclxuICAgICAgICAgICAgZG93bmxvYWRIZWxwZXIuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckFsbCgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5kcmF3blNoYXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXduU2hhcGVzW2ldLmRlc3Ryb3koKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZHJhd25TaGFwZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5EcmF3KHBvaW50ZXIpIHtcclxuICAgICAgICByZXR1cm4gcG9pbnRlci5pc0Rvd24gJiYgdGhpcy5zdGFnZS5nZXRCb3VuZHMoKS5jb250YWlucyhwb2ludGVyLnggLSAodGhpcy5icnVzaFdpZHRoIC8gMiksIHBvaW50ZXIueSAtIHRoaXMuYnJ1c2hIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuXHR1cGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuaW5wdXQuYWN0aXZlUG9pbnRlcjtcclxuICAgICAgICBsZXQgc2hhcGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbkRyYXcocG9pbnRlcikpIHtcclxuXHRcdFx0c3dpdGNoICh0aGlzLmJydXNoKSB7XHJcblx0XHRcdFx0Y2FzZSAnc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5icnVzaFdpZHRoLCB0aGlzLmJydXNoSGVpZ2h0LCB0aGlzLmJydXNoQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldE9yaWdpbigwLjUsIDAuNSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzdHJva2Utc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5icnVzaFdpZHRoLCB0aGlzLmJydXNoSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldFN0cm9rZVN0eWxlKDMsdGhpcy5icnVzaENvbG9yKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ2NpcmNsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmFkZC5jaXJjbGUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMuYnJ1c2hSYWRpdXMsIHRoaXMuYnJ1c2hDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3N0cm9rZS1jaXJjbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gdGhpcy5hZGQuY2lyY2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLmJydXNoUmFkaXVzKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldFN0cm9rZVN0eWxlKDMsIHRoaXMuYnJ1c2hDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFyJzogXHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmFkZC5zdGFyKHBvaW50ZXIueCwgcG9pbnRlci55LCA1LCA1LCAxMCwgdGhpcy5icnVzaENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3Ryb2tlLXN0YXInOiBcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLnN0YXIocG9pbnRlci54LCBwb2ludGVyLnksIDUsIDUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldFN0cm9rZVN0eWxlKDMsIHRoaXMuYnJ1c2hDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFtcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTdGFtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLmltYWdlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLnNlbGVjdGVkU3RhbXAuaW1hZ2VLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IHRoaXMuc2VsZWN0ZWRTdGFtcC5zY2FsZSAqIHRoaXMuc3RhbXBTaXplTXVsdGlwbGllclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRTY2FsZShzY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJhc2VyJzpcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5kcmF3blNoYXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3blNoYXBlc1tpXS5nZXRCb3VuZHMoKS5jb250YWlucyhwb2ludGVyLngsIHBvaW50ZXIueSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd25TaGFwZXNbaV0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2hhcGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3blNoYXBlcy5wdXNoKHNoYXBlKTtcclxuICAgICAgICB9XHJcblx0fVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnaW5nZXJicmVhZF9kZWNvcmF0b3JcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZ2luZ2VyYnJlYWRfZGVjb3JhdG9yXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==