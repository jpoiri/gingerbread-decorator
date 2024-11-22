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
        const clearAllButton = this.add.rectangle(80, (this.stage.y + this.stage.height) - 25, 105, 50, 0xd3d3d3);

        this.add.text(42, (this.stage.y + this.stage.height) - 35 , 'Clear All', {
            fontFamily: 'arial',
            fontSize: '20px',
            color: '#000000'            
        });

        clearAllButton.setInteractive();
        clearAllButton.on('pointerdown', () => {
            this.clearAll();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDSjtBQUN0QztBQUNBO0FBQ0EsT0FBTyxvREFBVztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFZO0FBQ3BCLG9CQUFvQixxREFBWTtBQUNoQztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsRUFBRTtBQUNGLFNBQVMsb0RBQVM7QUFDbEI7QUFDQTtBQUNBLGlCQUFpQixvREFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDNUI7QUFDZSx3QkFBd0IscURBQVk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsU0FBUztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsU0FBUztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3TkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3IvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yLy4vc3JjL3NjZW5lcy9HYW1lLmpzIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaGFzZXIsIHsgVGV4dHVyZXMgfSBmcm9tICdwaGFzZXInO1xyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gJy4vc2NlbmVzL0dhbWUnO1xyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG5cdHR5cGU6IFBoYXNlci5BVVRPLFxyXG5cdGJhY2tncm91bmRDb2xvcjogJyNGRkZGRkYnLFxyXG5cdGRlYnVnOiB0cnVlLFxyXG5cdHNjYWxlOiB7XHJcblx0XHRtb2RlOiBQaGFzZXIuU2NhbGUuRklULFxyXG4gICAgICAgIGF1dG9DZW50ZXI6IFBoYXNlci5TY2FsZS5DRU5URVJfQk9USCxcclxuXHRcdHdpZHRoOiAxMDI0LFxyXG5cdFx0aGVpZ2h0OiA3NjhcclxuXHR9LFxyXG5cdHBoeXNpY3M6IHtcclxuXHRcdGRlZmF1bHQ6ICdhcmNhZGUnLFxyXG5cdFx0YXJjYWRlOiB7XHJcblx0XHRcdGRlYnVnOiB0cnVlLFxyXG5cdFx0XHRncmF2aXR5OiB7IHk6IDIwMCB9XHJcblx0XHR9XHJcblx0fSxcclxuXHRzY2VuZTogW0dhbWVTY2VuZV1cclxufTtcclxuXHJcbmNvbnN0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoY29uZmlnKTtcclxuIiwiaW1wb3J0IFBoYXNlciBmcm9tICdwaGFzZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCdnYW1lJyk7XHJcblx0fVxyXG5cclxuXHRwcmVsb2FkKCkge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZ2luZ2VyYnJlYWQtbWFuJywgJ2Fzc2V0cy9pbWcvZ2luZ2VyYnJlYWQtbWFuLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZXJhc2VyLWljb24nLCAnYXNzZXRzL2ltZy9lcmFzZXIucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzdGFtcC1pY29uJywgJ2Fzc2V0cy9pbWcvc3RhbXAucG5nJylcclxuXHR9XHJcblxyXG5cdGNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmJydXNoV2lkdGggPSAxNTtcclxuXHRcdHRoaXMuYnJ1c2hIZWlnaHQgPSAxNTtcclxuXHRcdHRoaXMuYnJ1c2hSYWRpdXMgPSA3O1xyXG5cdFx0dGhpcy5icnVzaENvbG9yID0gMHhmZjAwMDA7XHJcbiAgICAgICAgdGhpcy5icnVzaCA9ICdzcXVhcmUnO1xyXG4gICAgICAgIHRoaXMuZHJhd25TaGFwZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0YWdlID0gdGhpcy5jcmVhdGVTdGFnZSgpO1xyXG5cdFx0dGhpcy5zdGFnZUltYWdlID0gdGhpcy5jcmVhdGVTdGFnZUltYWdlKCk7XHJcblx0XHR0aGlzLmNyZWF0ZUNvbG9yVG9vbGJhcigpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbFRvb2xiYXIoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlU3RhZ2UoKSB7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5zeXMuZ2FtZS5jYW52YXM7XHJcbiAgICAgICAgY29uc3QgdG9vbGJhclNpemUgPSAxNjA7XHJcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSB0aGlzLmFkZC5yZWN0YW5nbGUoMTYwLCA0NSwgd2lkdGggLSAodG9vbGJhclNpemUgKiAyKSwgaGVpZ2h0IC0gOTApO1xyXG4gICAgICAgIHN0YWdlLnNldE9yaWdpbigwLCAwKTtcclxuICAgICAgICBzdGFnZS5zZXRTdHJva2VTdHlsZSg0LCAweDAwMDAwMCk7XHJcbiAgICAgICAgcmV0dXJuIHN0YWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVN0YWdlSW1hZ2Uoc3RhZ2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGQuaW1hZ2UodGhpcy5zdGFnZS54ICsgKHRoaXMuc3RhZ2Uud2lkdGggLyAyKSwgdGhpcy5zdGFnZS55ICsgKHRoaXMuc3RhZ2UuaGVpZ2h0IC8gMiksICdnaW5nZXJicmVhZC1tYW4nKTtcclxuICAgIH1cclxuXHJcblx0Y3JlYXRlQ29sb3JUb29sYmFyKCkge1xyXG5cdFx0Y29uc3Qgd2lkdGggPSA1MDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSA1MDtcclxuICAgICAgICBjb25zdCBzdGFnZVRvcFggPSB0aGlzLnN0YWdlLnggKyB0aGlzLnN0YWdlLndpZHRoO1xyXG5cdFx0Y29uc3QgeCA9IHN0YWdlVG9wWCArIDU1O1xyXG5cdFx0Y29uc3QgeSA9IDkwO1xyXG5cdFx0Y29uc3Qgb2Zmc2V0ID0gNTU7XHJcbiAgICAgICAgY29uc3QgY29sb3JzID0gWzB4ZmYwMDAwLCAweGZmNzg3OCwgIDB4MTQ2YjNhLCAweDc0ZDY4MCwgMHg4Y2Q0ZmYsIDB4YzZlZmZmLCAweGZhYzcxMSwgMHhmZmZmZmYgXTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudGV4dChzdGFnZVRvcFggKyA1MCwgNDAsICdDb2xvcnMnLCB7XHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdhcmlhbCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG5cdFx0Zm9yIChsZXQgaSA9IDAsIHJvd3MgPSAwLCBsZW4gPSBjb2xvcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKGkgPiAwICYmIGkgJSAyID09PSAwKSB7XHJcblx0XHRcdFx0cm93cysrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGNvbG9yUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKGkgJSAyID09PSAwID8geCA6IHggKyBvZmZzZXQsIG9mZnNldCAqIHJvd3MgKyB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcnNbaV0pO1xyXG5cdFx0XHRjb2xvclJlY3RhbmdsZS5zZXRJbnRlcmFjdGl2ZSgpO1xyXG5cdFx0XHRjb2xvclJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZENvbG9yUmVjdGFuZ2xlLmRlc3Ryb3koKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZENvbG9yUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKGNvbG9yUmVjdGFuZ2xlLngsIGNvbG9yUmVjdGFuZ2xlLnksIDUwLCA1MCk7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZENvbG9yUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJ1c2hDb2xvciA9IGNvbG9yc1tpXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJydXNoQ29sb3IgPT09IGNvbG9yc1tpXSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShjb2xvclJlY3RhbmdsZS54LCBjb2xvclJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvclJlY3RhbmdsZS5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVRvb2xUb29sYmFyKCkge1xyXG4gICAgICAgIHRoaXMuYWRkLnRleHQoNTAsIDQwLCAnVG9vbHMnLCB7XHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdhcmlhbCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3NxdWFyZScsIDUwLCA5MCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1zcXVhcmUnLCAxMDUsIDkwLCA1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbE9wdGlvbignY2lyY2xlJywgNTAsIDE0NSwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0cm9rZS1jaXJjbGUnLCAxMDUsIDE0NSwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ3N0YXInLCA1MCwgMjAwLCA1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbE9wdGlvbignc3Ryb2tlLXN0YXInLCAxMDUsIDIwMCwgNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRvb2xPcHRpb24oJ2VyYXNlcicsIDUwLCAyNTUsIDUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUb29sT3B0aW9uKCdzdGFtcCcsIDEwNSwgMjU1LCA1MCwgNTApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVUb29sT3B0aW9uKGJydXNoLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgYnJ1c2hSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgMHhkM2QzZDMpO1xyXG5cdFx0dGhpcy5jcmVhdGVUb29sSWNvbihicnVzaCwgeCwgeSk7XHJcbiAgICAgICAgYnJ1c2hSZWN0YW5nbGUuc2V0SW50ZXJhY3RpdmUoKTtcclxuICAgICAgICBicnVzaFJlY3RhbmdsZS5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShicnVzaFJlY3RhbmdsZS54LCBicnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG5cdFx0XHR0aGlzLmJydXNoID0gYnJ1c2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuYnJ1c2ggPT09IGJydXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRCcnVzaFJlY3RhbmdsZSA9IHRoaXMuYWRkLnJlY3RhbmdsZShicnVzaFJlY3RhbmdsZS54LCBicnVzaFJlY3RhbmdsZS55LCA1MCwgNTApO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUb29sSWNvbihicnVzaCwgeCwgeSkge1xyXG4gICAgICAgIGxldCBpY29uID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2goYnJ1c2gpIHtcclxuICAgICAgICAgICAgY2FzZSAnc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMjUsIDI1LCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHJva2Utc3F1YXJlJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgMjUsIDI1LCAweEZGRkZGRik7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjaXJjbGUnOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLmNpcmNsZSh4LCB5LCAxNSwgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3Ryb2tlLWNpcmNsZSc6XHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQuY2lyY2xlKHgsIHksIDE1LCAweEZGRkZGRik7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFN0cm9rZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0YXInOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLnN0YXIoeCwgeSwgNSwgOSwgMTgsIDB4MDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0U3Ryb2tlU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cm9rZS1zdGFyJzogXHJcbiAgICAgICAgICAgICAgICBpY29uID0gdGhpcy5hZGQuc3Rhcih4LCB5LCA1LCA5LCAxOCwgMHhGRkZGRkYpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRTdHJva2VTdHlsZSgzLCAweDAwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZXJhc2VyJzpcclxuICAgICAgICAgICAgICAgIGljb24gPSB0aGlzLmFkZC5pbWFnZSh4LCB5LCAnZXJhc2VyLWljb24nKTtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0U2NhbGUoMC4wNywgMC4wNyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RhbXAnOlxyXG4gICAgICAgICAgICAgICAgaWNvbiA9IHRoaXMuYWRkLmltYWdlKHgsIHksICdzdGFtcC1pY29uJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldFNjYWxlKDAuMDcsIDAuMDcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJ1dHRvbnMoKSB7XHJcbiAgICAgICAgY29uc3QgY2xlYXJBbGxCdXR0b24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoODAsICh0aGlzLnN0YWdlLnkgKyB0aGlzLnN0YWdlLmhlaWdodCkgLSAyNSwgMTA1LCA1MCwgMHhkM2QzZDMpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZC50ZXh0KDQyLCAodGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQpIC0gMzUgLCAnQ2xlYXIgQWxsJywge1xyXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnYXJpYWwnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzIwcHgnLFxyXG4gICAgICAgICAgICBjb2xvcjogJyMwMDAwMDAnICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNsZWFyQWxsQnV0dG9uLnNldEludGVyYWN0aXZlKCk7XHJcbiAgICAgICAgY2xlYXJBbGxCdXR0b24ub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJBbGwoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuZHJhd25TaGFwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3blNoYXBlc1tpXS5kZXN0cm95KCk7ICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRyYXduU2hhcGVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgY2FuRHJhdyhwb2ludGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHBvaW50ZXIuaXNEb3duICYmIHRoaXMuc3RhZ2UuZ2V0Qm91bmRzKCkuY29udGFpbnMocG9pbnRlci54IC0gKHRoaXMuYnJ1c2hXaWR0aCAvIDIpLCBwb2ludGVyLnkgLSB0aGlzLmJydXNoSGVpZ2h0KTtcclxuICAgIH1cclxuXHJcblx0dXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHBvaW50ZXIgPSB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXI7XHJcbiAgICAgICAgbGV0IHNoYXBlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5jYW5EcmF3KHBvaW50ZXIpKSB7XHJcblx0XHRcdHN3aXRjaCAodGhpcy5icnVzaCkge1xyXG5cdFx0XHRcdGNhc2UgJ3NxdWFyZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMuYnJ1c2hXaWR0aCwgdGhpcy5icnVzaEhlaWdodCwgdGhpcy5icnVzaENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRPcmlnaW4oMC41LCAwLjUpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnc3Ryb2tlLXNxdWFyZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMuYnJ1c2hXaWR0aCwgdGhpcy5icnVzaEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRTdHJva2VTdHlsZSgzLHRoaXMuYnJ1c2hDb2xvcik7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdjaXJjbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gdGhpcy5hZGQuY2lyY2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLmJydXNoUmFkaXVzLCB0aGlzLmJydXNoQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldE9yaWdpbigwLjUsIDAuNSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdzdHJva2UtY2lyY2xlJzpcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuYWRkLmNpcmNsZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5icnVzaFJhZGl1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRTdHJva2VTdHlsZSgzLCB0aGlzLmJydXNoQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3Rhcic6IFxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gdGhpcy5hZGQuc3Rhcihwb2ludGVyLngsIHBvaW50ZXIueSwgNSwgNSwgMTAsIHRoaXMuYnJ1c2hDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cm9rZS1zdGFyJzogXHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmFkZC5zdGFyKHBvaW50ZXIueCwgcG9pbnRlci55LCA1LCA1LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5zZXRTdHJva2VTdHlsZSgzLCB0aGlzLmJydXNoQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJhc2VyJzpcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5kcmF3blNoYXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRyYXduU2hhcGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXduU2hhcGVzW2ldLmdldEJvdW5kcygpLmNvbnRhaW5zKHBvaW50ZXIueCwgcG9pbnRlci55KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3blNoYXBlc1tpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRyYXduU2hhcGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaGFwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXduU2hhcGVzLnB1c2goc2hhcGUpO1xyXG4gICAgICAgIH1cclxuXHR9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2dpbmdlcmJyZWFkX2RlY29yYXRvclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnaW5nZXJicmVhZF9kZWNvcmF0b3JcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9