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


class GameScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
	constructor() {
		super('game');
	}

	preload() {
        this.load.image('gingerbread-man', 'assets/img/gingerbread-man.png');
        this.load.image('eraser-icon', 'assets/img/eraser.png');
        this.load.image('stamp-icon', 'assets/img/stamp.png')
	}

	create() {
        this.brushWidth = 15;
		this.brushHeight = 15;
		this.brushRadius = 7;
		this.brushColor = 0xff0000;
        this.brush = 'square';
        this.drawnShapes = [];
        this.stage = this.createStage();
		this.stageImage = this.createStageImage();
		this.createColorToolbar();
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
        const stageTopX = this.stage.x + this.stage.width;
		const x = stageTopX + 55;
		const y = 90;
		const offset = 55;
        const colors = [0xff0000, 0xff7878,  0x146b3a, 0x74d680, 0x8cd4ff, 0xc6efff, 0xfac711, 0xffffff ];

        this.add.text(stageTopX + 50, 40, 'Colors', {
            fontFamily: 'arial',
            fontSize: '20px',
            color: '#000000'            
        })
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

	createToolToolbar() {
        this.add.text(50, 40, 'Tools', {
            fontFamily: 'arial',
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
            fontFamily: 'arial',
            fontSize: '20px',
            color: '#000000'            
        });

        clearAllButton.setInteractive();
        clearAllButton.on('pointerdown', () => {
            this.clearAll();
        });

        const exportButton = this.add.rectangle(80, (this.stage.y + this.stage.height) - 25, 105, 50, 0xd3d3d3);

        this.add.text(50, (this.stage.y + this.stage.height) - 35 , 'Export', {
            fontFamily: 'arial',
            fontSize: '20px',
            color: '#000000'            
        });

        exportButton.setInteractive();
        exportButton.on('pointerdown', () => {
            let canvas = document.querySelector('canvas');
            const saveCanvas = document.createElement('canvas');
            saveCanvas.width = canvas.width;
            saveCanvas.height = canvas.height;

            const ctx = saveCanvas.getContext('2d');
            ctx.drawImage(canvas, 165, 50, 700, 650, 0, 0, 700, 650);

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
                case 'eraser':
                    for (let i = 0, len = this.drawnShapes.length; i < len; i++) {
                        console.log(this.drawnShapes.length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDSjtBQUN0QztBQUNBO0FBQ0EsT0FBTyxzREFBYTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCLG9CQUFvQixxREFBWTtBQUNoQztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsRUFBRTtBQUNGLFNBQVMsb0RBQVM7QUFDbEI7QUFDQTtBQUNBLGlCQUFpQixvREFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDNUI7QUFDZSx3QkFBd0IscURBQVk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxTQUFTO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxTQUFTO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZQQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3IvLi9zcmMvc2NlbmVzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBoYXNlciwgeyBUZXh0dXJlcyB9IGZyb20gJ3BoYXNlcic7XHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSAnLi9zY2VuZXMvR2FtZSc7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcblx0dHlwZTogUGhhc2VyLkNBTlZBUyxcclxuXHRiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcclxuXHRkZWJ1ZzogdHJ1ZSxcclxuXHRzY2FsZToge1xyXG5cdFx0bW9kZTogUGhhc2VyLlNjYWxlLkZJVCxcclxuICAgICAgICBhdXRvQ2VudGVyOiBQaGFzZXIuU2NhbGUuQ0VOVEVSX0JPVEgsXHJcblx0XHR3aWR0aDogMTAyNCxcclxuXHRcdGhlaWdodDogNzY4XHJcblx0fSxcclxuXHRwaHlzaWNzOiB7XHJcblx0XHRkZWZhdWx0OiAnYXJjYWRlJyxcclxuXHRcdGFyY2FkZToge1xyXG5cdFx0XHRkZWJ1ZzogdHJ1ZSxcclxuXHRcdFx0Z3Jhdml0eTogeyB5OiAyMDAgfVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2NlbmU6IFtHYW1lU2NlbmVdXHJcbn07XHJcblxyXG5jb25zdCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKGNvbmZpZyk7XHJcbiIsImltcG9ydCBQaGFzZXIgZnJvbSAncGhhc2VyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcignZ2FtZScpO1xyXG5cdH1cclxuXHJcblx0cHJlbG9hZCgpIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2dpbmdlcmJyZWFkLW1hbicsICdhc3NldHMvaW1nL2dpbmdlcmJyZWFkLW1hbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2VyYXNlci1pY29uJywgJ2Fzc2V0cy9pbWcvZXJhc2VyLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RhbXAtaWNvbicsICdhc3NldHMvaW1nL3N0YW1wLnBuZycpXHJcblx0fVxyXG5cclxuXHRjcmVhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5icnVzaFdpZHRoID0gMTU7XHJcblx0XHR0aGlzLmJydXNoSGVpZ2h0ID0gMTU7XHJcblx0XHR0aGlzLmJydXNoUmFkaXVzID0gNztcclxuXHRcdHRoaXMuYnJ1c2hDb2xvciA9IDB4ZmYwMDAwO1xyXG4gICAgICAgIHRoaXMuYnJ1c2ggPSAnc3F1YXJlJztcclxuICAgICAgICB0aGlzLmRyYXduU2hhcGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGFnZSA9IHRoaXMuY3JlYXRlU3RhZ2UoKTtcclxuXHRcdHRoaXMuc3RhZ2VJbWFnZSA9IHRoaXMuY3JlYXRlU3RhZ2VJbWFnZSgpO1xyXG5cdFx0dGhpcy5jcmVhdGVDb2xvclRvb2xiYXIoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xUb29sYmFyKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZVN0YWdlKCkge1xyXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuc3lzLmdhbWUuY2FudmFzO1xyXG4gICAgICAgIGNvbnN0IHRvb2xiYXJTaXplID0gMTYwO1xyXG4gICAgICAgIGNvbnN0IHN0YWdlID0gdGhpcy5hZGQucmVjdGFuZ2xlKDE2MCwgNDUsIHdpZHRoIC0gKHRvb2xiYXJTaXplICogMiksIGhlaWdodCAtIDkwKTtcclxuICAgICAgICBzdGFnZS5zZXRPcmlnaW4oMCwgMCk7XHJcbiAgICAgICAgc3RhZ2Uuc2V0U3Ryb2tlU3R5bGUoNCwgMHgwMDAwMDApO1xyXG4gICAgICAgIHJldHVybiBzdGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTdGFnZUltYWdlKHN0YWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkLmltYWdlKHRoaXMuc3RhZ2UueCArICh0aGlzLnN0YWdlLndpZHRoIC8gMiksIHRoaXMuc3RhZ2UueSArICh0aGlzLnN0YWdlLmhlaWdodCAvIDIpLCAnZ2luZ2VyYnJlYWQtbWFuJyk7XHJcbiAgICB9XHJcblxyXG5cdGNyZWF0ZUNvbG9yVG9vbGJhcigpIHtcclxuXHRcdGNvbnN0IHdpZHRoID0gNTA7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNTA7XHJcbiAgICAgICAgY29uc3Qgc3RhZ2VUb3BYID0gdGhpcy5zdGFnZS54ICsgdGhpcy5zdGFnZS53aWR0aDtcclxuXHRcdGNvbnN0IHggPSBzdGFnZVRvcFggKyA1NTtcclxuXHRcdGNvbnN0IHkgPSA5MDtcclxuXHRcdGNvbnN0IG9mZnNldCA9IDU1O1xyXG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IFsweGZmMDAwMCwgMHhmZjc4NzgsICAweDE0NmIzYSwgMHg3NGQ2ODAsIDB4OGNkNGZmLCAweGM2ZWZmZiwgMHhmYWM3MTEsIDB4ZmZmZmZmIF07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkLnRleHQoc3RhZ2VUb3BYICsgNTAsIDQwLCAnQ29sb3JzJywge1xyXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnYXJpYWwnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzIwcHgnLFxyXG4gICAgICAgICAgICBjb2xvcjogJyMwMDAwMDAnICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuXHRcdGZvciAobGV0IGkgPSAwLCByb3dzID0gMCwgbGVuID0gY29sb3JzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGlmIChpID4gMCAmJiBpICUgMiA9PT0gMCkge1xyXG5cdFx0XHRcdHJvd3MrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBjb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShpICUgMiA9PT0gMCA/IHggOiB4ICsgb2Zmc2V0LCBvZmZzZXQgKiByb3dzICsgeSwgd2lkdGgsIGhlaWdodCwgY29sb3JzW2ldKTtcclxuXHRcdFx0Y29sb3JSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdFx0Y29sb3JSZWN0YW5nbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5kZXN0cm95KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShjb2xvclJlY3RhbmdsZS54LCBjb2xvclJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJydXNoQ29sb3IgPSBjb2xvcnNbaV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5icnVzaENvbG9yID09PSBjb2xvcnNbaV0pIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoY29sb3JSZWN0YW5nbGUueCwgY29sb3JSZWN0YW5nbGUueSwgNTAsIDUwKTtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVUb29sVG9vbGJhcigpIHtcclxuICAgICAgICB0aGlzLmFkZC50ZXh0KDUwLCA0MCwgJ1Rvb2xzJywge1xyXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnYXJpYWwnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzIwcHgnLFxyXG4gICAgICAgICAgICBjb2xvcjogJyMwMDAwMDAnICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sT3B0aW9uKCdzcXVhcmUnLCA1MCwgOTAsIDUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sT3B0aW9uKCdzdHJva2Utc3F1YXJlJywgMTA1LCA5MCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2NpcmNsZScsIDUwLCAxNDUsIDUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sT3B0aW9uKCdzdHJva2UtY2lyY2xlJywgMTA1LCAxNDUsIDUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sT3B0aW9uKCdzdGFyJywgNTAsIDIwMCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1zdGFyJywgMTA1LCAyMDAsIDUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sT3B0aW9uKCdlcmFzZXInLCA1MCwgMjU1LCA1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3RhbXAnLCAxMDUsIDI1NSwgNTAsIDUwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlVG9vbE9wdGlvbihicnVzaCwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGJydXNoUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQsIDB4ZDNkM2QzKTtcclxuXHRcdHRoaXMuY3JlYXRlVG9vbEljb24oYnJ1c2gsIHgsIHkpO1xyXG4gICAgICAgIGJydXNoUmVjdGFuZ2xlLnNldEludGVyYWN0aXZlKCk7XHJcbiAgICAgICAgYnJ1c2hSZWN0YW5nbGUub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlLmRlc3Ryb3koKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoYnJ1c2hSZWN0YW5nbGUueCwgYnJ1c2hSZWN0YW5nbGUueSwgNTAsIDUwKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuXHRcdFx0dGhpcy5icnVzaCA9IGJydXNoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLmJydXNoID09PSBicnVzaCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoYnJ1c2hSZWN0YW5nbGUueCwgYnJ1c2hSZWN0YW5nbGUueSwgNTAsIDUwKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVG9vbEljb24oYnJ1c2gsIHgsIHkpIHtcclxuICAgICAgICBsZXQgaWNvbiA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoKGJydXNoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NxdWFyZSc6XHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDI1LCAyNSwgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3Ryb2tlLXNxdWFyZSc6XHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIDI1LCAyNSwgMHhGRkZGRkYpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY2lyY2xlJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5jaXJjbGUoeCwgeSwgMTUsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cm9rZS1jaXJjbGUnOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLmNpcmNsZSh4LCB5LCAxNSwgMHhGRkZGRkYpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICdzdGFyJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5zdGFyKHgsIHksIDUsIDksIDE4LCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHJva2Utc3Rhcic6IFxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLnN0YXIoeCwgeSwgNSwgOSwgMTgsIDB4RkZGRkZGKTtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VyYXNlcic6XHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQuaW1hZ2UoeCwgeSwgJ2VyYXNlci1pY29uJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFNjYWxlKDAuMDcsIDAuMDcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0YW1wJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5pbWFnZSh4LCB5LCAnc3RhbXAtaWNvbicpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTY2FsZSgwLjA3LCAwLjA3KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCdXR0b25zKCkge1xyXG4gICAgICAgIGNvbnN0IGNsZWFyQWxsQnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKDgwLCAodGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQpIC0gODAsIDEwNSwgNTAsIDB4ZDNkM2QzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dCg0MiwgKHRoaXMuc3RhZ2UueSArIHRoaXMuc3RhZ2UuaGVpZ2h0KSAtIDkwICwgJ0NsZWFyIEFsbCcsIHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogJ2FyaWFsJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICcyMHB4JyxcclxuICAgICAgICAgICAgY29sb3I6ICcjMDAwMDAwJyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjbGVhckFsbEJ1dHRvbi5zZXRJbnRlcmFjdGl2ZSgpO1xyXG4gICAgICAgIGNsZWFyQWxsQnV0dG9uLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckFsbCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBleHBvcnRCdXR0b24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoODAsICh0aGlzLnN0YWdlLnkgKyB0aGlzLnN0YWdlLmhlaWdodCkgLSAyNSwgMTA1LCA1MCwgMHhkM2QzZDMpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZC50ZXh0KDUwLCAodGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQpIC0gMzUgLCAnRXhwb3J0Jywge1xyXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnYXJpYWwnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzIwcHgnLFxyXG4gICAgICAgICAgICBjb2xvcjogJyMwMDAwMDAnICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cG9ydEJ1dHRvbi5zZXRJbnRlcmFjdGl2ZSgpO1xyXG4gICAgICAgIGV4cG9ydEJ1dHRvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcclxuICAgICAgICAgICAgY29uc3Qgc2F2ZUNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgICAgICBzYXZlQ2FudmFzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgICAgICBzYXZlQ2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjdHggPSBzYXZlQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoY2FudmFzLCAxNjUsIDUwLCA3MDAsIDY1MCwgMCwgMCwgNzAwLCA2NTApO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFVUkwgPSBzYXZlQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZG93bmxvYWRIZWxwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgIGRvd25sb2FkSGVscGVyLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnZG93bmxvYWQucG5nJyk7XHJcbiAgICAgICAgICAgIGRvd25sb2FkSGVscGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGRhdGFVUkwpO1xyXG4gICAgICAgICAgICBkb3dubG9hZEhlbHBlci5jbGljaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQWxsKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmRyYXduU2hhcGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd25TaGFwZXNbaV0uZGVzdHJveSgpOyAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcmF3blNoYXBlcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkRyYXcocG9pbnRlcikge1xyXG4gICAgICAgIHJldHVybiBwb2ludGVyLmlzRG93biAmJiB0aGlzLnN0YWdlLmdldEJvdW5kcygpLmNvbnRhaW5zKHBvaW50ZXIueCAtICh0aGlzLmJydXNoV2lkdGggLyAyKSwgcG9pbnRlci55IC0gdGhpcy5icnVzaEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG5cdHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBwb2ludGVyID0gdGhpcy5pbnB1dC5hY3RpdmVQb2ludGVyO1xyXG4gICAgICAgIGxldCBzaGFwZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuRHJhdyhwb2ludGVyKSkge1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXMuYnJ1c2gpIHtcclxuXHRcdFx0XHRjYXNlICdzcXVhcmUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLmJydXNoV2lkdGgsIHRoaXMuYnJ1c2hIZWlnaHQsIHRoaXMuYnJ1c2hDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3N0cm9rZS1zcXVhcmUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLmJydXNoV2lkdGgsIHRoaXMuYnJ1c2hIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldE9yaWdpbigwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0U3Ryb2tlU3R5bGUoMyx0aGlzLmJydXNoQ29sb3IpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnY2lyY2xlJzpcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLmNpcmNsZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5icnVzaFJhZGl1cywgdGhpcy5icnVzaENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnc3Ryb2tlLWNpcmNsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmFkZC5jaXJjbGUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMuYnJ1c2hSYWRpdXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldE9yaWdpbigwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0U3Ryb2tlU3R5bGUoMywgdGhpcy5icnVzaENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXInOiBcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLnN0YXIocG9pbnRlci54LCBwb2ludGVyLnksIDUsIDUsIDEwLCB0aGlzLmJydXNoQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldE9yaWdpbigwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJva2Utc3Rhcic6IFxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gdGhpcy5hZGQuc3Rhcihwb2ludGVyLngsIHBvaW50ZXIueSwgNSwgNSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldE9yaWdpbigwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0U3Ryb2tlU3R5bGUoMywgdGhpcy5icnVzaENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VyYXNlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuZHJhd25TaGFwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kcmF3blNoYXBlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3blNoYXBlc1tpXS5nZXRCb3VuZHMoKS5jb250YWlucyhwb2ludGVyLngsIHBvaW50ZXIueSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd25TaGFwZXNbaV0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kcmF3blNoYXBlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2hhcGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3blNoYXBlcy5wdXNoKHNoYXBlKTtcclxuICAgICAgICB9XHJcblx0fVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnaW5nZXJicmVhZF9kZWNvcmF0b3JcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZ2luZ2VyYnJlYWRfZGVjb3JhdG9yXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==