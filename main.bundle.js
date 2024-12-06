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


class GameScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
	constructor() {
		super('game');
	}

	preload() {
        this.load.image('gingerbread-man', 'assets/img/gingerbread-man.png');
        this.load.image('eraser-icon', 'assets/img/eraser.png');
        this.load.image('stamp-icon', 'assets/img/stamp.png');
        this.load.image('bells', 'assets/img/bells.png');
        this.load.image('blue', 'assets/img/blue.png');
        this.load.image('yellow', 'assets/img/yellow.png');
        this.load.image('green', 'assets/img/green.png');
        this.load.image('red', 'assets/img/red.png');
        this.load.image('cherry', 'assets/img/cherry.png');
        this.load.image('hat', 'assets/img/hat.png');
        this.load.image('lolipop1', 'assets/img/lolipop.png');
        this.load.image('lolipop2', 'assets/img/lolipop2.png');
        this.load.image('ribbon', 'assets/img/ribbon.png');
        this.load.image('ring-tree', 'assets/img/ring tree.png');
        this.load.image('sleigh-bells', 'assets/img/sleigh bells.png');
        this.load.image('socks', 'assets/img/socks.png');
        this.load.image('star', 'assets/img/star.png');
        this.load.image('tree', 'assets/img/tree.png');
	}

	create() {
        this.brushWidth = 15;
		this.brushHeight = 15;
		this.brushRadius = 7;
		this.brushColor = 0xff0000;
        this.brush = 'square';
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
            fontSize: '20px',
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
                imageKey: 'blue',
                scale: 0.15
            }, 
            {
                imageKey: 'red',
                scale: 0.15
            }, 
            {
                imageKey: 'yellow',
                scale: 0.15
            },
            {
                imageKey: 'green',
                scale: 0.15
            },
            {
                imageKey: 'bells',
                scale: 0.075
            },
            {
                imageKey: 'cherry',
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
            fontSize: '20px',
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
        this.add.text(890, 487, 'Stamp sizes', {
            fontFamily: FONT_FAMILY,
            fontSize: '20px',
            color: '#000000'    
        });

        this.createStampSizeOption(945, 537, 'Small', 920, 525, 0.5);
        this.createStampSizeOption(945, 592, 'Normal', 913, 580, 1);
        this.createStampSizeOption(945, 647, 'Large', 920, 635, 2);
        this.createStampSizeOption(945, 700, 'X-Large', 910, 687, 3);
    }

    createStampSizeOption(x, y, text, textX, textY, multiplier) {
        const rectangle = this.add.rectangle(x, y, 105, 50, 0xd3d3d3);

        this.add.text(textX, textY, text, {
            fontFamily: FONT_FAMILY,
            fontSize: '20px',
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
            fontSize: '20px',
            color: '#000000'            
        });
        this.createToolOption('square', 50, 90, 50, 50);
        this.createToolOption('stroke-square', 105, 90, 50, 50);
        this.createToolOption('circle', 50, 145, 50, 50);
        this.createToolOption('stroke-circle', 105, 145, 50, 50);
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
            fontSize: '20px',
            color: '#000000'            
        });

        clearAllButton.setInteractive();
        clearAllButton.on('pointerdown', () => {
            this.clearAll();
        });

        const exportButton = this.add.rectangle(80, (this.stage.y + this.stage.height) - 25, 105, 50, 0xd3d3d3);

        this.add.text(50, (this.stage.y + this.stage.height) - 35 , 'Export', {
            fontFamily: FONT_FAMILY,
            fontSize: '20px',
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
                        console.log('scale')
                        console.log(scale);
                        shape.setScale(scale);
                    }
                    break;
                case 'eraser':
                    for (let i = 0, len = this.drawnShapes.length; i < len; i++) {
                        if (this.drawnShapes[i].getBounds().contains(pointer.x, pointer.y)) {
                            this.drawnShapes[i].destroy();
                            console.log(this.drawnShapes.length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDSjtBQUN0QztBQUNBO0FBQ0EsT0FBTyxzREFBYTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCLG9CQUFvQixxREFBWTtBQUNoQztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsRUFBRTtBQUNGLFNBQVMsb0RBQVM7QUFDbEI7QUFDQTtBQUNBLGlCQUFpQixvREFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDZSx3QkFBd0IscURBQVk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1REFBdUQsU0FBUztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFNBQVM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsU0FBUztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMVpBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci8uL3NyYy9zY2VuZXMvR2FtZS5qcyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGhhc2VyLCB7IFRleHR1cmVzIH0gZnJvbSAncGhhc2VyJztcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tICcuL3NjZW5lcy9HYW1lJztcclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuXHR0eXBlOiBQaGFzZXIuQ0FOVkFTLFxyXG5cdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnLFxyXG5cdGRlYnVnOiB0cnVlLFxyXG5cdHNjYWxlOiB7XHJcblx0XHRtb2RlOiBQaGFzZXIuU2NhbGUuRklULFxyXG4gICAgICAgIGF1dG9DZW50ZXI6IFBoYXNlci5TY2FsZS5DRU5URVJfQk9USCxcclxuXHRcdHdpZHRoOiAxMDI0LFxyXG5cdFx0aGVpZ2h0OiA3NjhcclxuXHR9LFxyXG5cdHBoeXNpY3M6IHtcclxuXHRcdGRlZmF1bHQ6ICdhcmNhZGUnLFxyXG5cdFx0YXJjYWRlOiB7XHJcblx0XHRcdGRlYnVnOiB0cnVlLFxyXG5cdFx0XHRncmF2aXR5OiB7IHk6IDIwMCB9XHJcblx0XHR9XHJcblx0fSxcclxuXHRzY2VuZTogW0dhbWVTY2VuZV1cclxufTtcclxuXHJcbmNvbnN0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoY29uZmlnKTtcclxuIiwiaW1wb3J0IFBoYXNlciBmcm9tICdwaGFzZXInO1xyXG5cclxuY29uc3QgRk9OVF9GQU1JTFkgPSAnYXJpYWwnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcignZ2FtZScpO1xyXG5cdH1cclxuXHJcblx0cHJlbG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2dpbmdlcmJyZWFkLW1hbicsICdhc3NldHMvaW1nL2dpbmdlcmJyZWFkLW1hbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2VyYXNlci1pY29uJywgJ2Fzc2V0cy9pbWcvZXJhc2VyLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RhbXAtaWNvbicsICdhc3NldHMvaW1nL3N0YW1wLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmVsbHMnLCAnYXNzZXRzL2ltZy9iZWxscy5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JsdWUnLCAnYXNzZXRzL2ltZy9ibHVlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgneWVsbG93JywgJ2Fzc2V0cy9pbWcveWVsbG93LnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZ3JlZW4nLCAnYXNzZXRzL2ltZy9ncmVlbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3JlZCcsICdhc3NldHMvaW1nL3JlZC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2NoZXJyeScsICdhc3NldHMvaW1nL2NoZXJyeS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2hhdCcsICdhc3NldHMvaW1nL2hhdC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xvbGlwb3AxJywgJ2Fzc2V0cy9pbWcvbG9saXBvcC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xvbGlwb3AyJywgJ2Fzc2V0cy9pbWcvbG9saXBvcDIucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdyaWJib24nLCAnYXNzZXRzL2ltZy9yaWJib24ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdyaW5nLXRyZWUnLCAnYXNzZXRzL2ltZy9yaW5nIHRyZWUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzbGVpZ2gtYmVsbHMnLCAnYXNzZXRzL2ltZy9zbGVpZ2ggYmVsbHMucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzb2NrcycsICdhc3NldHMvaW1nL3NvY2tzLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RhcicsICdhc3NldHMvaW1nL3N0YXIucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0cmVlJywgJ2Fzc2V0cy9pbWcvdHJlZS5wbmcnKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmJydXNoV2lkdGggPSAxNTtcclxuXHRcdHRoaXMuYnJ1c2hIZWlnaHQgPSAxNTtcclxuXHRcdHRoaXMuYnJ1c2hSYWRpdXMgPSA3O1xyXG5cdFx0dGhpcy5icnVzaENvbG9yID0gMHhmZjAwMDA7XHJcbiAgICAgICAgdGhpcy5icnVzaCA9ICdzcXVhcmUnO1xyXG4gICAgICAgIHRoaXMuc3RhbXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhbXBTaXplTXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgdGhpcy5kcmF3blNoYXBlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UgPSB0aGlzLmNyZWF0ZVN0YWdlKCk7XHJcblx0XHR0aGlzLnN0YWdlSW1hZ2UgPSB0aGlzLmNyZWF0ZVN0YWdlSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbG9yVG9vbGJhcigpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RhbXBUb29sYmFyKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVTdGFtcFNpemVUb29sYmFyKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sVG9vbGJhcigpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9ucygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVTdGFnZSgpIHtcclxuICAgICAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSB0aGlzLnN5cy5nYW1lLmNhbnZhcztcclxuICAgICAgICBjb25zdCB0b29sYmFyU2l6ZSA9IDE2MDtcclxuICAgICAgICBjb25zdCBzdGFnZSA9IHRoaXMuYWRkLnJlY3RhbmdsZSgxNjAsIDQ1LCB3aWR0aCAtICh0b29sYmFyU2l6ZSAqIDIpLCBoZWlnaHQgLSA5MCk7XHJcbiAgICAgICAgc3RhZ2Uuc2V0T3JpZ2luKDAsIDApO1xyXG4gICAgICAgIHN0YWdlLnNldFN0cm9rZVN0eWxlKDQsIDB4MDAwMDAwKTtcclxuICAgICAgICByZXR1cm4gc3RhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3RhZ2VJbWFnZShzdGFnZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZC5pbWFnZSh0aGlzLnN0YWdlLnggKyAodGhpcy5zdGFnZS53aWR0aCAvIDIpLCB0aGlzLnN0YWdlLnkgKyAodGhpcy5zdGFnZS5oZWlnaHQgLyAyKSwgJ2dpbmdlcmJyZWFkLW1hbicpO1xyXG4gICAgfVxyXG5cclxuXHRjcmVhdGVDb2xvclRvb2xiYXIoKSB7XHJcblx0XHRjb25zdCB3aWR0aCA9IDUwO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDUwO1xyXG5cdFx0Y29uc3QgeCA9IDUwO1xyXG5cdFx0Y29uc3QgeSA9IDM1MDtcclxuXHRcdGNvbnN0IG9mZnNldCA9IDU1O1xyXG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IFsweGZmMDAwMCwgMHhmZjc4NzgsICAweDE0NmIzYSwgMHg3NGQ2ODAsIDB4OGNkNGZmLCAweGM2ZWZmZiwgMHhmYWM3MTEsIDB4ZmZmZmZmIF07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkLnRleHQoNTAsIDMwMCwgJ0NvbG9ycycsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHRcdGZvciAobGV0IGkgPSAwLCByb3dzID0gMCwgbGVuID0gY29sb3JzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGlmIChpID4gMCAmJiBpICUgMiA9PT0gMCkge1xyXG5cdFx0XHRcdHJvd3MrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBjb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShpICUgMiA9PT0gMCA/IHggOiB4ICsgb2Zmc2V0LCBvZmZzZXQgKiByb3dzICsgeSwgd2lkdGgsIGhlaWdodCwgY29sb3JzW2ldKTtcclxuXHRcdFx0Y29sb3JSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdFx0Y29sb3JSZWN0YW5nbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5kZXN0cm95KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShjb2xvclJlY3RhbmdsZS54LCBjb2xvclJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJydXNoQ29sb3IgPSBjb2xvcnNbaV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5icnVzaENvbG9yID09PSBjb2xvcnNbaV0pIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoY29sb3JSZWN0YW5nbGUueCwgY29sb3JSZWN0YW5nbGUueSwgNTAsIDUwKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZVN0YW1wVG9vbGJhcigpIHtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IDUwO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDUwO1xyXG5cdFx0Y29uc3QgeCA9IDkxOTtcclxuXHRcdGNvbnN0IHkgPSA5MDtcclxuXHRcdGNvbnN0IG9mZnNldCA9IDU1O1xyXG4gICAgICAgIGNvbnN0IHN0YW1wcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdibHVlJyxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjE1XHJcbiAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ3JlZCcsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4xNVxyXG4gICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICd5ZWxsb3cnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMTVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdncmVlbicsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4xNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ2JlbGxzJyxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjA3NVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ2NoZXJyeScsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4wOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ2hhdCcsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogMC4wNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUtleTogJ2xvbGlwb3AxJyxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjA2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGltYWdlS2V5OiAnbG9saXBvcDInLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdyaWJib24nLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdyaW5nLXRyZWUnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdzbGVpZ2gtYmVsbHMnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDY1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGltYWdlS2V5OiAnc29ja3MnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDAuMDhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VLZXk6ICdzdGFyJyxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAwLjA4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg5MTQsIDQwLCAnU3RhbXBzJywge1xyXG4gICAgICAgICAgICBmb250RmFtaWx5OiBGT05UX0ZBTUlMWSxcclxuICAgICAgICAgICAgZm9udFNpemU6ICcyMHB4JyxcclxuICAgICAgICAgICAgY29sb3I6ICcjMDAwMDAwJyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgcm93cyA9IDAsIGxlbiA9IHN0YW1wcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAoaSA+IDAgJiYgaSAlIDIgPT09IDApIHtcclxuXHRcdFx0XHRyb3dzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3RhbXBSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoaSAlIDIgPT09IDAgPyB4IDogeCArIG9mZnNldCwgb2Zmc2V0ICogcm93cyArIHksIHdpZHRoLCBoZWlnaHQsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YW1wSW1hZ2UgPSB0aGlzLmFkZC5pbWFnZShzdGFtcFJlY3RhbmdsZS54LCBzdGFtcFJlY3RhbmdsZS55LCBzdGFtcHNbaV0uaW1hZ2VLZXkpO1xyXG4gICAgICAgICAgICBzdGFtcEltYWdlLnNldFNjYWxlKHN0YW1wc1tpXS5zY2FsZSk7XHJcblxyXG5cdFx0XHRzdGFtcFJlY3RhbmdsZS5zZXRJbnRlcmFjdGl2ZSgpO1xyXG5cdFx0XHRzdGFtcFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRTdGFtcFJlY3RhbmdsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlLmRlc3Ryb3koKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHN0YW1wUmVjdGFuZ2xlLngsIHN0YW1wUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdGFtcCA9IHN0YW1wc1tpXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkU3RhbXAgPT09IHN0YW1wc1tpXSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShzdGFtcFJlY3RhbmdsZS54LCBzdGFtcFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcFJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTdGFtcFNpemVUb29sYmFyKCkge1xyXG4gICAgICAgIHRoaXMuYWRkLnRleHQoODkwLCA0ODcsICdTdGFtcCBzaXplcycsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RhbXBTaXplT3B0aW9uKDk0NSwgNTM3LCAnU21hbGwnLCA5MjAsIDUyNSwgMC41KTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDU5MiwgJ05vcm1hbCcsIDkxMywgNTgwLCAxKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0YW1wU2l6ZU9wdGlvbig5NDUsIDY0NywgJ0xhcmdlJywgOTIwLCA2MzUsIDIpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RhbXBTaXplT3B0aW9uKDk0NSwgNzAwLCAnWC1MYXJnZScsIDkxMCwgNjg3LCAzKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTdGFtcFNpemVPcHRpb24oeCwgeSwgdGV4dCwgdGV4dFgsIHRleHRZLCBtdWx0aXBsaWVyKSB7XHJcbiAgICAgICAgY29uc3QgcmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDEwNSwgNTAsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCh0ZXh0WCwgdGV4dFksIHRleHQsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICByZWN0YW5nbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShyZWN0YW5nbGUueCwgcmVjdGFuZ2xlLnksIDEwNSwgNTApO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFtcFNpemVNdWx0aXBsaWVyID0gIG11bHRpcGxpZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhbXBTaXplTXVsdGlwbGllciA9PT0gbXVsdGlwbGllcikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHJlY3RhbmdsZS54LCByZWN0YW5nbGUueSwgMTA1LCA1MCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdGFtcFNpemVSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblx0Y3JlYXRlVG9vbFRvb2xiYXIoKSB7XHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg1MCwgNDAsICdUb29scycsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3NxdWFyZScsIDUwLCA5MCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1zcXVhcmUnLCAxMDUsIDkwLCA1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbE9wdGlvbignY2lyY2xlJywgNTAsIDE0NSwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1jaXJjbGUnLCAxMDUsIDE0NSwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0YXInLCA1MCwgMjAwLCA1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3Ryb2tlLXN0YXInLCAxMDUsIDIwMCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2VyYXNlcicsIDUwLCAyNTUsIDUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sT3B0aW9uKCdzdGFtcCcsIDEwNSwgMjU1LCA1MCwgNTApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVUb29sT3B0aW9uKGJydXNoLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgYnJ1c2hSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgMHhkM2QzZDMpO1xyXG5cdFx0dGhpcy5jcmVhdGVUb29sSWNvbihicnVzaCwgeCwgeSk7XHJcbiAgICAgICAgYnJ1c2hSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICBicnVzaFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShicnVzaFJlY3RhbmdsZS54LCBicnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHR0aGlzLmJydXNoID0gYnJ1c2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuYnJ1c2ggPT09IGJydXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShicnVzaFJlY3RhbmdsZS54LCBicnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUb29sSWNvbihicnVzaCwgeCwgeSkge1xyXG4gICAgICAgIGxldCBpY29uID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2goYnJ1c2gpIHtcclxuICAgICAgICAgICAgY2FzZSAnc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMjUsIDI1LCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHJva2Utc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMjUsIDI1LCAweEZGRkZGRik7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjaXJjbGUnOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLmNpcmNsZSh4LCB5LCAxNSwgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3Ryb2tlLWNpcmNsZSc6XHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQuY2lyY2xlKHgsIHksIDE1LCAweEZGRkZGRik7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0YXInOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLnN0YXIoeCwgeSwgNSwgOSwgMTgsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cm9rZS1zdGFyJzogXHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQuc3Rhcih4LCB5LCA1LCA5LCAxOCwgMHhGRkZGRkYpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZXJhc2VyJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5pbWFnZSh4LCB5LCAnZXJhc2VyLWljb24nKTtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0U2NhbGUoMC4wNywgMC4wNyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RhbXAnOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLmltYWdlKHgsIHksICdzdGFtcC1pY29uJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFNjYWxlKDAuMDcsIDAuMDcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjcmVhdGVCdXR0b25zKCkge1xyXG4gICAgICAgIGNvbnN0IGNsZWFyQWxsQnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKDgwLCAodGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQpIC0gODAsIDEwNSwgNTAsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg0MiwgKHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0KSAtIDkwICwgJ0NsZWFyIEFsbCcsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2xlYXJBbGxCdXR0b24uc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICBjbGVhckFsbEJ1dHRvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJBbGwoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXhwb3J0QnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKDgwLCAodGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQpIC0gMjUsIDEwNSwgNTAsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg1MCwgKHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0KSAtIDM1ICwgJ0V4cG9ydCcsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogRk9OVF9GQU1JTFksXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZXhwb3J0QnV0dG9uLnNldEludGVyYWN0aXZlKCk7XHJcbiAgICAgICAgZXhwb3J0QnV0dG9uLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xyXG4gICAgICAgICAgICBjb25zdCBzYXZlQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIHNhdmVDYW52YXMud2lkdGggPSA3MDA7XHJcbiAgICAgICAgICAgIHNhdmVDYW52YXMuaGVpZ2h0ID0gNjUwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3R4ID0gc2F2ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGNhbnZhcywgMTY1LCA1MCwgNjkwLCA2NTAsIDAsIDAsIDcwMCwgNjUwKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhVVJMID0gc2F2ZUNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRvd25sb2FkSGVscGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICBkb3dubG9hZEhlbHBlci5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ2Rvd25sb2FkLnBuZycpO1xyXG4gICAgICAgICAgICBkb3dubG9hZEhlbHBlci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBkYXRhVVJMKTtcclxuICAgICAgICAgICAgZG93bmxvYWRIZWxwZXIuY2xpY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckFsbCgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5kcmF3blNoYXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXduU2hhcGVzW2ldLmRlc3Ryb3koKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZHJhd25TaGFwZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5EcmF3KHBvaW50ZXIpIHtcclxuICAgICAgICByZXR1cm4gcG9pbnRlci5pc0Rvd24gJiYgdGhpcy5zdGFnZS5nZXRCb3VuZHMoKS5jb250YWlucyhwb2ludGVyLnggLSAodGhpcy5icnVzaFdpZHRoIC8gMiksIHBvaW50ZXIueSAtIHRoaXMuYnJ1c2hIZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuXHR1cGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IHRoaXMuaW5wdXQuYWN0aXZlUG9pbnRlcjtcclxuICAgICAgICBsZXQgc2hhcGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbkRyYXcocG9pbnRlcikpIHtcclxuXHRcdFx0c3dpdGNoICh0aGlzLmJydXNoKSB7XHJcblx0XHRcdFx0Y2FzZSAnc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5icnVzaFdpZHRoLCB0aGlzLmJydXNoSGVpZ2h0LCB0aGlzLmJydXNoQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldE9yaWdpbigwLjUsIDAuNSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzdHJva2Utc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5icnVzaFdpZHRoLCB0aGlzLmJydXNoSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldFN0cm9rZVN0eWxlKDMsdGhpcy5icnVzaENvbG9yKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ2NpcmNsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmFkZC5jaXJjbGUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMuYnJ1c2hSYWRpdXMsIHRoaXMuYnJ1c2hDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3N0cm9rZS1jaXJjbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gdGhpcy5hZGQuY2lyY2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLmJydXNoUmFkaXVzKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldFN0cm9rZVN0eWxlKDMsIHRoaXMuYnJ1c2hDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFyJzogXHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmFkZC5zdGFyKHBvaW50ZXIueCwgcG9pbnRlci55LCA1LCA1LCAxMCwgdGhpcy5icnVzaENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3Ryb2tlLXN0YXInOiBcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLnN0YXIocG9pbnRlci54LCBwb2ludGVyLnksIDUsIDUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldFN0cm9rZVN0eWxlKDMsIHRoaXMuYnJ1c2hDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFtcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRTdGFtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLmltYWdlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLnNlbGVjdGVkU3RhbXAuaW1hZ2VLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IHRoaXMuc2VsZWN0ZWRTdGFtcC5zY2FsZSAqIHRoaXMuc3RhbXBTaXplTXVsdGlwbGllclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2NhbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldFNjYWxlKHNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlcmFzZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmRyYXduU2hhcGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXduU2hhcGVzW2ldLmdldEJvdW5kcygpLmNvbnRhaW5zKHBvaW50ZXIueCwgcG9pbnRlci55KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3blNoYXBlc1tpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRyYXduU2hhcGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaGFwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXduU2hhcGVzLnB1c2goc2hhcGUpO1xyXG4gICAgICAgIH1cclxuXHR9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2dpbmdlcmJyZWFkX2RlY29yYXRvclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnaW5nZXJicmVhZF9kZWNvcmF0b3JcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9