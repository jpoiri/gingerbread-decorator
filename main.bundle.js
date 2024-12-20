/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: () => (/* binding */ Color),
/* harmony export */   Key: () => (/* binding */ Key),
/* harmony export */   StampSize: () => (/* binding */ StampSize),
/* harmony export */   TextureKey: () => (/* binding */ TextureKey),
/* harmony export */   Tool: () => (/* binding */ Tool)
/* harmony export */ });
const Color = Object.freeze({
	RED: 0xff0000,
	PINK: 0xff7878,
	GREEN: 0x146b3a,
	PALE_GREEN: 0x74d680,
	BLUE: 0x8cd4ff,
	PALE_BLUE: 0xc6efff,
	YELLOW: 0xfac711,
	OFF_WHITE: 0xeef6f2,
	WHITE: 0xFFFFFF,
    BLACK: 0x000000,
    GRAY: 0xd3d3d3
});

const Key = Object.freeze({
    HOUSE_NUMBER: 'house-number',
    HOUSE: 'house',
    ERASER_ICON: 'eraser-icon',
    STAMP_ICON: 'stamp-icon',
});

const TextureKey = Object.freeze({
    CANDY_CANE: 'candy-cane',
    GUMMY_BEAR: 'gummy-bear',
    SWEETS: 'sweets',
    MINT: 'mint',
    CANDY: 'candy',
    CHOCOLATE: 'chocolate',
    PEPPERMINT: 'peppermint',
    CANDY_2: 'candy2',
    GUM: 'gum',
    TRUFFLE: 'truffle',
    JELLY_BEANS: 'jelly-beans',
    SPRINKLES: 'sprinkles',
    LOLLIPOP: 'lollipop',
    GINGERBREAD_MAN: 'gingerbread-man',
    ERASER_ICON: 'eraser-icon',
    STAMP_ICON: 'stamp-icon',
    HOUSE: 'house'
});

const StampSize = Object.freeze({
    SMALL: 0.5,
    NORMAL: 1,
    LARGE: 2,
    EXTRA_LARGE: 3
});

const Tool = Object.freeze({
    CIRCLE: 'circle',
    STROKE_CIRCLE: 'stroke-circle',
    SQUARE: 'square',
    STROKE_SQUARE: 'stroke-square',
    STAR: 'star',
    STROKE_STAR: 'stroke-star',
    ERASER: 'eraser',
    STAMP: 'stamp'
});

 

/***/ }),

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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");



const FONT_FAMILY = 'arial';
const FONT_SIZE = '20px';
const TEXT_COLOR = '#000000';

const STAMP_SCALE = 0.08;

const SQUARE_BRUSH_SIZE = 15;
const CIRCLE_BRUSH_RADIUS = 7;
const STAR_BRUSH_NUMBER_OF_POINTS = 5;
const STAR_BRUSH_INNER_RADIUS = 5;
const STAR_BRUSH_OUTER_RADIUS = 10;
const BRUSH_LINE_WIDTH = 3;

const CENTER_X = 0.5;
const CENTER_Y = 0.5;
const LEFT_X = 0;
const TOP_Y = 0;

const TOOLBAR_WIDTH = 160;

const LARGE_OPTION_WIDTH = 105;
const OPTION_WIDTH = 50;
const OPTION_HEIGHT = 50;
const OPTION_OFFSET = 55;
const OPTION_BACKGROUND_COLOR = _constants__WEBPACK_IMPORTED_MODULE_1__.Color.GRAY;

const SELECTED_OPTION_LINE_WIDTH = 3;
const SELECTED_OPTION_LINE_COLOR = _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLACK;

const DEFAULT_BRUSH_COLOR = _constants__WEBPACK_IMPORTED_MODULE_1__.Color.RED;
const DEFAULT_BRUSH = 'circle';
const DEFAULT_STAMP = _constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CANDY_CANE;
const DEFAULT_STAMP_SIZE = _constants__WEBPACK_IMPORTED_MODULE_1__.StampSize.NORMAL;

const STAGE_LINE_WIDTH = 4;
const STAGE_LINE_COLOR = _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLACK;

const SQUARE_ICON_WIDTH = 25;
const SQUARE_ICON_HEIGHT = 25;
const CIRCLE_ICON_RADIUS = 15;
const STAR_ICON_POINTS = 5;
const STAR_ICON_INNER_RADIUS = 9;
const STAR_ICON_OUTER_RADIUS = 18;
const IMAGE_ICON_SCALE = 0.07;
const ICON_LINE_WIDTH = 3;

const EXPORT_IMAGE_WIDTH = 695;
const EXPORT_IMAGE_HEIGHT = 650;
const EXPORT_IMAGE_NAME = 'gingerbread-house.png';

class GameScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
	constructor() {
		super('game');
	}

	preload() {
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.HOUSE, this.getHouseImage());
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.ERASER_ICON, 'assets/img/eraser.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.STAMP_ICON, 'assets/img/stamp.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CANDY_CANE, 'assets/img/candy-cane.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.GUMMY_BEAR, 'assets/img/gummy-bear.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.SWEETS, 'assets/img/sweets.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.MINT, 'assets/img/mint.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CANDY, 'assets/img/candy.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CHOCOLATE, 'assets/img/chocolate.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.PEPPERMINT, 'assets/img/peppermint.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CANDY_2, 'assets/img/candy2.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.GUM, 'assets/img/gum.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.TRUFFLE, 'assets/img/truffle.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.JELLY_BEANS, 'assets/img/jelly-beans.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.SPRINKLES, 'assets/img/sprinkles.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.LOLLIPOP, 'assets/img/lollipop.png');
		this.load.image(_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.GINGERBREAD_MAN, 'assets/img/gingerbread-man.png');
	}

	create() {
		this.brushColor = DEFAULT_BRUSH_COLOR;
		this.brush = DEFAULT_BRUSH;
		this.stampTextureKey = DEFAULT_STAMP;
		this.stampSize = DEFAULT_STAMP_SIZE;
		this.drawnShapes = [];
		this.stage = this.addStage();
		this.addStageImage();
		this.addColorToolbar();
		this.addStampToolbar();
		this.addStampSizeToolbar();
		this.addToolToolbar();
		this.addButtons();
	}

	getHouseImage() {
		return `assets/img/house${this.getHouseNumber()}.png`;
	}

	getHouseNumber() {
		let houseNumber = this.getRandomHouseNumber();
		const previousHouseNumber = localStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_1__.Key.HOUSE_NUMBER);
		while (houseNumber === parseInt(previousHouseNumber, 10)) {
			houseNumber = this.getRandomHouseNumber();
		}
		localStorage.setItem(_constants__WEBPACK_IMPORTED_MODULE_1__.Key.HOUSE_NUMBER, houseNumber);
		return houseNumber;
	}

	getRandomHouseNumber() {
		return Math.floor(Math.random() * 6) + 1;
	}

	addStage() {
		const { width, height } = this.sys.game.canvas;
		return this.add
			.rectangle(160, 45, width - TOOLBAR_WIDTH * 2, height - 90)
			.setOrigin(LEFT_X, TOP_Y)
			.setStrokeStyle(STAGE_LINE_WIDTH, STAGE_LINE_COLOR);
	}

	addStageImage() {
		this.add.image(this.stage.x + this.stage.width / 2, this.stage.y + this.stage.height / 2, _constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.HOUSE);
	}

	addText(x, y, text) {
		this.add.text(x, y, text, {
			fontFamily: FONT_FAMILY,
			fontSize: FONT_SIZE,
			color: TEXT_COLOR
		});
	}

	getOptionX(x, i) {
		return i % 2 === 0 ? x : x + OPTION_OFFSET;
	}

	getOptionY(y, rows) {
		return OPTION_OFFSET * rows + y;
	}

	addColorToolbar() {
		const x = 50;
		const y = 350;
		const colors = [_constants__WEBPACK_IMPORTED_MODULE_1__.Color.RED, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.PINK, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.GREEN, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.PALE_GREEN, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLUE, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.PALE_BLUE, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.YELLOW, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.OFF_WHITE];

		this.addText(50, 300, 'Colors');

		for (let i = 0, rows = 0, len = colors.length; i < len; i++) {
			if (i > 0 && i % 2 === 0) {
				rows++;
			}
			this.addColorOption(this.getOptionX(x, i), this.getOptionY(y, rows), colors[i]);
		}
	}

	addColorOption(x, y, color) {
		const option = this.add.rectangle(x, y, OPTION_WIDTH, OPTION_HEIGHT, color);
		option.setInteractive();
		option.on('pointerdown', () => {
			if (this.selectedColorOption) {
				this.selectedColorOption.destroy();
			}
			this.selectedColorOption = this.add.rectangle(option.x, option.y, OPTION_WIDTH, OPTION_HEIGHT);
			this.selectedColorOption.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
			this.brushColor = color;
		});
		if (this.brushColor === color) {
			this.selectedColorOption = this.add.rectangle(option.x, option.y, OPTION_WIDTH, OPTION_HEIGHT);
			this.selectedColorOption.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
		}
	}

	addStampToolbar() {
		const x = 919;
		const y = 90;
		const stampTextureKeys = [
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CANDY_CANE,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.GUMMY_BEAR,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.SWEETS,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.MINT,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CANDY,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CHOCOLATE,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.PEPPERMINT,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.CANDY_2,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.GUM,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.TRUFFLE,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.JELLY_BEANS,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.SPRINKLES,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.LOLLIPOP,
			_constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.GINGERBREAD_MAN
		];
		this.addText(914, 40, 'Stamps');

		for (let i = 0, rows = 0, len = stampTextureKeys.length; i < len; i++) {
			if (i > 0 && i % 2 === 0) {
				rows++;
			}
			this.addStampOption(this.getOptionX(x, i), this.getOptionY(y, rows), stampTextureKeys[i]);
		}
	}

	addStampOption(x, y, stampTextureKey) {
		const option = this.add.rectangle(x, y, OPTION_WIDTH, OPTION_HEIGHT, OPTION_BACKGROUND_COLOR);
		option.setInteractive();
		option.on('pointerdown', () => {
			if (this.selectedStampOption) {
				this.selectedStampOption.destroy();
			}
			this.selectedStampOption = this.add.rectangle(option.x, option.y, OPTION_WIDTH, OPTION_HEIGHT);
			this.selectedStampOption.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
			this.stampTextureKey = stampTextureKey;
		});
		if (this.stampTextureKey === stampTextureKey) {
			this.selectedStampOption = this.add.rectangle(option.x, option.y, OPTION_WIDTH, OPTION_HEIGHT);
			this.selectedStampOption.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
		}
		this.add.image(option.x, option.y, stampTextureKey).setScale(STAMP_SCALE);
	}

	addStampSizeToolbar() {
		this.addText(890, 485, 'Stamp sizes');
		this.addStampSizeOption(945, 535, 'Small', 920, 525, _constants__WEBPACK_IMPORTED_MODULE_1__.StampSize.SMALL);
		this.addStampSizeOption(945, 590, 'Normal', 913, 580, _constants__WEBPACK_IMPORTED_MODULE_1__.StampSize.NORMAL);
		this.addStampSizeOption(945, 645, 'Large', 920, 635, _constants__WEBPACK_IMPORTED_MODULE_1__.StampSize.LARGE);
		this.addStampSizeOption(945, 700, 'X-Large', 910, 687, _constants__WEBPACK_IMPORTED_MODULE_1__.StampSize.EXTRA_LARGE);
	}

	addStampSizeOption(x, y, text, textX, textY, multiplier) {
		const option = this.add.rectangle(x, y, LARGE_OPTION_WIDTH, OPTION_HEIGHT, OPTION_BACKGROUND_COLOR);
		option.setInteractive();
		option.on('pointerdown', () => {
			if (this.selectedStampSizeRectangle) {
				this.selectedStampSizeRectangle.destroy();
			}
			this.selectedStampSizeRectangle = this.add.rectangle(option.x, option.y, LARGE_OPTION_WIDTH, OPTION_HEIGHT);
			this.selectedStampSizeRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
			this.stampSize = multiplier;
		});
		if (this.stampSize === multiplier) {
			this.selectedStampSizeRectangle = this.add.rectangle(option.x, option.y, LARGE_OPTION_WIDTH, OPTION_HEIGHT);
			this.selectedStampSizeRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
		}
		this.addText(textX, textY, text);
	}

	addToolToolbar() {
		this.addText(50, 40, 'Tools');
		const x = 50;
		const y = 90;
		const tools = [
			_constants__WEBPACK_IMPORTED_MODULE_1__.Tool.CIRCLE,
			_constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_CIRCLE,
			_constants__WEBPACK_IMPORTED_MODULE_1__.Tool.SQUARE,
			_constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_SQUARE,
			_constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STAR,
			_constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_STAR,
			_constants__WEBPACK_IMPORTED_MODULE_1__.Tool.ERASER,
			_constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STAMP
		];
		for (let i = 0, len = tools.length, rows = 0; i < len; i++) {
			if (i > 0 && i % 2 === 0) {
				rows++;
			}
			this.addToolOption(this.getOptionX(x, i), this.getOptionY(y, rows), tools[i]);
		}
	}

	addToolOption(x, y, brush) {
		const option = this.add.rectangle(x, y, OPTION_WIDTH, OPTION_HEIGHT, OPTION_BACKGROUND_COLOR);
		option.setInteractive();
		option.on('pointerdown', () => {
			if (this.selectedBrushRectangle) {
				this.selectedBrushRectangle.destroy();
			}
			this.selectedBrushRectangle = this.add.rectangle(option.x, option.y, OPTION_WIDTH, OPTION_HEIGHT);
			this.selectedBrushRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
			this.brush = brush;
		});
		if (this.brush === brush) {
			this.selectedBrushRectangle = this.add.rectangle(option.x, option.y, OPTION_WIDTH, OPTION_HEIGHT);
			this.selectedBrushRectangle.setStrokeStyle(SELECTED_OPTION_LINE_WIDTH, SELECTED_OPTION_LINE_COLOR);
		}
		this.addToolIcon(brush, x, y);
	}

	addToolIcon(brush, x, y) {
		switch (brush) {
			case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.SQUARE:
				this.addSquareIcon(x, y, false);
				break;
			case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_SQUARE:
				this.addSquareIcon(x, y, true);
				break;
			case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.CIRCLE:
				this.addCircleIcon(x, y, false);
				break;
			case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_CIRCLE:
				this.addCircleIcon(x, y, true);
				break;
			case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STAR:
				this.addStarIcon(x, y, false);
				break;
			case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_STAR:
				this.addStarIcon(x, y, true);
				break;
			case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.ERASER:
				this.addImageIcon(x, y, _constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.ERASER_ICON);
				break;
			case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STAMP:
				this.addImageIcon(x, y, _constants__WEBPACK_IMPORTED_MODULE_1__.TextureKey.STAMP_ICON);
				break;
		}
	}

	addSquareIcon(x, y, isStroke) {
		const icon = this.add.rectangle(x, y, SQUARE_ICON_WIDTH, SQUARE_ICON_HEIGHT, isStroke ? _constants__WEBPACK_IMPORTED_MODULE_1__.Color.WHITE : _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLACK);
		icon.setStrokeStyle(ICON_LINE_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLACK);
	}

	addCircleIcon(x, y, isStroke) {
		const icon = this.add.circle(x, y, CIRCLE_ICON_RADIUS, isStroke ? _constants__WEBPACK_IMPORTED_MODULE_1__.Color.WHITE : _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLACK);
		icon.setStrokeStyle(ICON_LINE_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLACK);
	}

	addStarIcon(x, y, isStroke) {
		const icon = this.add.star(
			x,
			y,
			STAR_ICON_POINTS,
			STAR_ICON_INNER_RADIUS,
			STAR_ICON_OUTER_RADIUS,
			isStroke ? _constants__WEBPACK_IMPORTED_MODULE_1__.Color.WHITE : _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLACK
		);
		icon.setStrokeStyle(ICON_LINE_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_1__.Color.BLACK);
	}

	addImageIcon(x, y, imageName) {
		const icon = this.add.image(x, y, imageName);
		icon.setScale(IMAGE_ICON_SCALE);
	}

	addButtons() {
		this.addButton(80, 588, 'New', 60, 578, () => {
			location.reload();
		});
		this.addButton(80, 643, 'Clear All', 42, 633, () => {
			this.clearAll();
		});
		this.addButton(80, 698, 'Export', 50, 688, () => {
			const canvas = document.querySelector('canvas');
			const saveCanvas = document.createElement('canvas');
			saveCanvas.width = EXPORT_IMAGE_WIDTH;
			saveCanvas.height = EXPORT_IMAGE_HEIGHT;

			const ctx = saveCanvas.getContext('2d');
			ctx.drawImage(canvas, 160, 50, EXPORT_IMAGE_WIDTH, EXPORT_IMAGE_HEIGHT, 0, 0, EXPORT_IMAGE_WIDTH, EXPORT_IMAGE_HEIGHT);

			let dataURL = saveCanvas.toDataURL('image/png');

			let downloadHelper = document.createElement('a');
			downloadHelper.setAttribute('download', EXPORT_IMAGE_NAME);
			downloadHelper.setAttribute('href', dataURL);
			downloadHelper.click();
		});
	}

	addButton(x, y, text, textX, textY, callback) {
		const button = this.add.rectangle(x, y, LARGE_OPTION_WIDTH, OPTION_HEIGHT, OPTION_BACKGROUND_COLOR);
		this.addText(textX, textY, text);
		button.setInteractive();
		button.on('pointerdown', callback);
	}

	clearAll() {
		for (let i = 0, len = this.drawnShapes.length; i < len; i++) {
			this.drawnShapes[i].destroy();
		}
		this.drawnShapes = [];
	}

	update() {
		const pointer = this.input.activePointer;
		let shape = null;
		if (pointer.isDown) {
			switch (this.brush) {
				case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.SQUARE:
					shape = this.drawSquare(pointer.x, pointer.y, this.brushColor, false);
					break;
				case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_SQUARE:
					shape = this.drawSquare(pointer.x, pointer.y, this.brushColor, true);
					break;
				case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.CIRCLE:
					shape = this.drawCircle(pointer.x, pointer.y, this.brushColor, false);
					break;
				case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_CIRCLE:
					shape = this.drawCircle(pointer.x, pointer.y, this.brushColor, true);
					break;
				case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STAR:
					shape = this.drawStar(pointer.x, pointer.y, this.brushColor, false);
					break;
				case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STROKE_STAR:
					shape = this.drawStar(pointer.x, pointer.y, this.brushColor, true);
					break;
				case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.STAMP:
					shape = this.drawStamp(pointer.x, pointer.y, this.stampTextureKey, this.stampSize);
					break;
				case _constants__WEBPACK_IMPORTED_MODULE_1__.Tool.ERASER:
					this.erase(pointer.x, pointer.y, this.drawnShapes);
					break;
			}
		}
		if (shape) {
			this.drawnShapes.push(shape);
		}
	}

	canDrawSquare(x, y, width, height) {
		if (
			this.stage.x < x - width / 2 &&
			this.stage.width + this.stage.x > x + width / 2 &&
			this.stage.y < y - height / 2 &&
			this.stage.height + this.stage.y > y + height / 2
		) {
			return true;
		}
		return false;
	}

	canDrawCircle(x, y, radius) {
		if (
			this.stage.x < x - radius &&
			this.stage.width + this.stage.x > x + radius &&
			this.stage.y < y - radius &&
			this.stage.height + this.stage.y > y + radius
		) {
			return true;
		}
		return false;
	}

	drawSquare(x, y, color, isStroke) {
		let square = null;
		if (isStroke && this.canDrawSquare(x, y, SQUARE_BRUSH_SIZE, SQUARE_BRUSH_SIZE)) {
			square = this.add.rectangle(x, y, SQUARE_BRUSH_SIZE, SQUARE_BRUSH_SIZE);
			square.setStrokeStyle(BRUSH_LINE_WIDTH, color);
			square.setOrigin(CENTER_X, CENTER_Y);
		} else if (this.canDrawSquare(x, y, SQUARE_BRUSH_SIZE, SQUARE_BRUSH_SIZE)) {
			square = this.add.rectangle(x, y, SQUARE_BRUSH_SIZE, SQUARE_BRUSH_SIZE, color);
			square.setOrigin(CENTER_X, CENTER_Y);
		}
		return square;
	}

	drawCircle(x, y, color, isStroke) {
		let circle = null;
		if (isStroke && this.canDrawCircle(x, y, CIRCLE_BRUSH_RADIUS)) {
			circle = this.add.circle(x, y, CIRCLE_BRUSH_RADIUS);
			circle.setStrokeStyle(BRUSH_LINE_WIDTH, color);
			circle.setOrigin(CENTER_X, CENTER_Y);
		} else if (this.canDrawCircle(x, y, CIRCLE_BRUSH_RADIUS)) {
			circle = this.add.circle(x, y, CIRCLE_BRUSH_RADIUS, color);
			circle.setOrigin(CENTER_X, CENTER_Y);
		}
		return circle;
	}

	drawStar(x, y, color, isStroke) {
		let star = null;
		if (isStroke && this.canDrawCircle(x, y, STAR_BRUSH_OUTER_RADIUS)) {
			star = this.add.star(x, y, STAR_BRUSH_NUMBER_OF_POINTS, STAR_BRUSH_INNER_RADIUS, STAR_BRUSH_OUTER_RADIUS);
			star.setStrokeStyle(BRUSH_LINE_WIDTH, color);
			star.setOrigin(CENTER_X, CENTER_Y);
		} else if (this.canDrawCircle(x, y, STAR_BRUSH_OUTER_RADIUS)) {
			star = this.add.star(x, y, STAR_BRUSH_NUMBER_OF_POINTS, STAR_BRUSH_INNER_RADIUS, STAR_BRUSH_OUTER_RADIUS, color);
			star.setOrigin(CENTER_X, CENTER_Y);
		}
		return star;
	}

	drawStamp(x, y, imageKey, imageSize) {
		const stampImage = this.textures.get(imageKey).getSourceImage();
		let image = null;
		const stampWidth = stampImage?.width * STAMP_SCALE * imageSize;
		const stampHeight = stampImage?.height * STAMP_SCALE * imageSize;
		if (stampImage && this.canDrawSquare(x, y, stampWidth, stampHeight)) {
			image = this.add.image(x, y, imageKey);
			image.setOrigin(CENTER_X, CENTER_Y);
			image.setScale(STAMP_SCALE * imageSize);
		}
		return image;
	}

	erase(x, y, shapes) {
		shapes.filter((shape) => {
			return shape.getBounds().contains(x, y);
		}).forEach((shape) => {
			shape.destroy();
		});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci8uL3NyYy9zY2VuZXMvR2FtZS5qcyIsIndlYnBhY2s6Ly9naW5nZXJicmVhZC1kZWNvcmF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2dpbmdlcmJyZWFkLWRlY29yYXRvci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2luZ2VyYnJlYWQtZGVjb3JhdG9yL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDb2xvciA9IE9iamVjdC5mcmVlemUoe1xyXG5cdFJFRDogMHhmZjAwMDAsXHJcblx0UElOSzogMHhmZjc4NzgsXHJcblx0R1JFRU46IDB4MTQ2YjNhLFxyXG5cdFBBTEVfR1JFRU46IDB4NzRkNjgwLFxyXG5cdEJMVUU6IDB4OGNkNGZmLFxyXG5cdFBBTEVfQkxVRTogMHhjNmVmZmYsXHJcblx0WUVMTE9XOiAweGZhYzcxMSxcclxuXHRPRkZfV0hJVEU6IDB4ZWVmNmYyLFxyXG5cdFdISVRFOiAweEZGRkZGRixcclxuICAgIEJMQUNLOiAweDAwMDAwMCxcclxuICAgIEdSQVk6IDB4ZDNkM2QzXHJcbn0pO1xyXG5cclxuY29uc3QgS2V5ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBIT1VTRV9OVU1CRVI6ICdob3VzZS1udW1iZXInLFxyXG4gICAgSE9VU0U6ICdob3VzZScsXHJcbiAgICBFUkFTRVJfSUNPTjogJ2VyYXNlci1pY29uJyxcclxuICAgIFNUQU1QX0lDT046ICdzdGFtcC1pY29uJyxcclxufSk7XHJcblxyXG5jb25zdCBUZXh0dXJlS2V5ID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBDQU5EWV9DQU5FOiAnY2FuZHktY2FuZScsXHJcbiAgICBHVU1NWV9CRUFSOiAnZ3VtbXktYmVhcicsXHJcbiAgICBTV0VFVFM6ICdzd2VldHMnLFxyXG4gICAgTUlOVDogJ21pbnQnLFxyXG4gICAgQ0FORFk6ICdjYW5keScsXHJcbiAgICBDSE9DT0xBVEU6ICdjaG9jb2xhdGUnLFxyXG4gICAgUEVQUEVSTUlOVDogJ3BlcHBlcm1pbnQnLFxyXG4gICAgQ0FORFlfMjogJ2NhbmR5MicsXHJcbiAgICBHVU06ICdndW0nLFxyXG4gICAgVFJVRkZMRTogJ3RydWZmbGUnLFxyXG4gICAgSkVMTFlfQkVBTlM6ICdqZWxseS1iZWFucycsXHJcbiAgICBTUFJJTktMRVM6ICdzcHJpbmtsZXMnLFxyXG4gICAgTE9MTElQT1A6ICdsb2xsaXBvcCcsXHJcbiAgICBHSU5HRVJCUkVBRF9NQU46ICdnaW5nZXJicmVhZC1tYW4nLFxyXG4gICAgRVJBU0VSX0lDT046ICdlcmFzZXItaWNvbicsXHJcbiAgICBTVEFNUF9JQ09OOiAnc3RhbXAtaWNvbicsXHJcbiAgICBIT1VTRTogJ2hvdXNlJ1xyXG59KTtcclxuXHJcbmNvbnN0IFN0YW1wU2l6ZSA9IE9iamVjdC5mcmVlemUoe1xyXG4gICAgU01BTEw6IDAuNSxcclxuICAgIE5PUk1BTDogMSxcclxuICAgIExBUkdFOiAyLFxyXG4gICAgRVhUUkFfTEFSR0U6IDNcclxufSk7XHJcblxyXG5jb25zdCBUb29sID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICBDSVJDTEU6ICdjaXJjbGUnLFxyXG4gICAgU1RST0tFX0NJUkNMRTogJ3N0cm9rZS1jaXJjbGUnLFxyXG4gICAgU1FVQVJFOiAnc3F1YXJlJyxcclxuICAgIFNUUk9LRV9TUVVBUkU6ICdzdHJva2Utc3F1YXJlJyxcclxuICAgIFNUQVI6ICdzdGFyJyxcclxuICAgIFNUUk9LRV9TVEFSOiAnc3Ryb2tlLXN0YXInLFxyXG4gICAgRVJBU0VSOiAnZXJhc2VyJyxcclxuICAgIFNUQU1QOiAnc3RhbXAnXHJcbn0pO1xyXG5cclxuZXhwb3J0IHsgQ29sb3IsIEtleSwgVGV4dHVyZUtleSwgU3RhbXBTaXplLCBUb29sIH0gIiwiaW1wb3J0IFBoYXNlciwgeyBUZXh0dXJlcyB9IGZyb20gJ3BoYXNlcic7XHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSAnLi9zY2VuZXMvR2FtZSc7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcblx0dHlwZTogUGhhc2VyLkNBTlZBUyxcclxuXHRiYWNrZ3JvdW5kQ29sb3I6ICcjRkZGRkZGJyxcclxuXHRkZWJ1ZzogdHJ1ZSxcclxuXHRzY2FsZToge1xyXG5cdFx0bW9kZTogUGhhc2VyLlNjYWxlLkZJVCxcclxuICAgICAgICBhdXRvQ2VudGVyOiBQaGFzZXIuU2NhbGUuQ0VOVEVSX0JPVEgsXHJcblx0XHR3aWR0aDogMTAyNCxcclxuXHRcdGhlaWdodDogNzY4XHJcblx0fSxcclxuXHRwaHlzaWNzOiB7XHJcblx0XHRkZWZhdWx0OiAnYXJjYWRlJyxcclxuXHRcdGFyY2FkZToge1xyXG5cdFx0XHRkZWJ1ZzogdHJ1ZSxcclxuXHRcdFx0Z3Jhdml0eTogeyB5OiAyMDAgfVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2NlbmU6IFtHYW1lU2NlbmVdXHJcbn07XHJcblxyXG5jb25zdCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKGNvbmZpZyk7XHJcbiIsImltcG9ydCBQaGFzZXIgZnJvbSAncGhhc2VyJztcclxuaW1wb3J0IHsgQ29sb3IsIEtleSwgVGV4dHVyZUtleSwgU3RhbXBTaXplLCBUb29sIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuXHJcbmNvbnN0IEZPTlRfRkFNSUxZID0gJ2FyaWFsJztcclxuY29uc3QgRk9OVF9TSVpFID0gJzIwcHgnO1xyXG5jb25zdCBURVhUX0NPTE9SID0gJyMwMDAwMDAnO1xyXG5cclxuY29uc3QgU1RBTVBfU0NBTEUgPSAwLjA4O1xyXG5cclxuY29uc3QgU1FVQVJFX0JSVVNIX1NJWkUgPSAxNTtcclxuY29uc3QgQ0lSQ0xFX0JSVVNIX1JBRElVUyA9IDc7XHJcbmNvbnN0IFNUQVJfQlJVU0hfTlVNQkVSX09GX1BPSU5UUyA9IDU7XHJcbmNvbnN0IFNUQVJfQlJVU0hfSU5ORVJfUkFESVVTID0gNTtcclxuY29uc3QgU1RBUl9CUlVTSF9PVVRFUl9SQURJVVMgPSAxMDtcclxuY29uc3QgQlJVU0hfTElORV9XSURUSCA9IDM7XHJcblxyXG5jb25zdCBDRU5URVJfWCA9IDAuNTtcclxuY29uc3QgQ0VOVEVSX1kgPSAwLjU7XHJcbmNvbnN0IExFRlRfWCA9IDA7XHJcbmNvbnN0IFRPUF9ZID0gMDtcclxuXHJcbmNvbnN0IFRPT0xCQVJfV0lEVEggPSAxNjA7XHJcblxyXG5jb25zdCBMQVJHRV9PUFRJT05fV0lEVEggPSAxMDU7XHJcbmNvbnN0IE9QVElPTl9XSURUSCA9IDUwO1xyXG5jb25zdCBPUFRJT05fSEVJR0hUID0gNTA7XHJcbmNvbnN0IE9QVElPTl9PRkZTRVQgPSA1NTtcclxuY29uc3QgT1BUSU9OX0JBQ0tHUk9VTkRfQ09MT1IgPSBDb2xvci5HUkFZO1xyXG5cclxuY29uc3QgU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEggPSAzO1xyXG5jb25zdCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUiA9IENvbG9yLkJMQUNLO1xyXG5cclxuY29uc3QgREVGQVVMVF9CUlVTSF9DT0xPUiA9IENvbG9yLlJFRDtcclxuY29uc3QgREVGQVVMVF9CUlVTSCA9ICdjaXJjbGUnO1xyXG5jb25zdCBERUZBVUxUX1NUQU1QID0gVGV4dHVyZUtleS5DQU5EWV9DQU5FO1xyXG5jb25zdCBERUZBVUxUX1NUQU1QX1NJWkUgPSBTdGFtcFNpemUuTk9STUFMO1xyXG5cclxuY29uc3QgU1RBR0VfTElORV9XSURUSCA9IDQ7XHJcbmNvbnN0IFNUQUdFX0xJTkVfQ09MT1IgPSBDb2xvci5CTEFDSztcclxuXHJcbmNvbnN0IFNRVUFSRV9JQ09OX1dJRFRIID0gMjU7XHJcbmNvbnN0IFNRVUFSRV9JQ09OX0hFSUdIVCA9IDI1O1xyXG5jb25zdCBDSVJDTEVfSUNPTl9SQURJVVMgPSAxNTtcclxuY29uc3QgU1RBUl9JQ09OX1BPSU5UUyA9IDU7XHJcbmNvbnN0IFNUQVJfSUNPTl9JTk5FUl9SQURJVVMgPSA5O1xyXG5jb25zdCBTVEFSX0lDT05fT1VURVJfUkFESVVTID0gMTg7XHJcbmNvbnN0IElNQUdFX0lDT05fU0NBTEUgPSAwLjA3O1xyXG5jb25zdCBJQ09OX0xJTkVfV0lEVEggPSAzO1xyXG5cclxuY29uc3QgRVhQT1JUX0lNQUdFX1dJRFRIID0gNjk1O1xyXG5jb25zdCBFWFBPUlRfSU1BR0VfSEVJR0hUID0gNjUwO1xyXG5jb25zdCBFWFBPUlRfSU1BR0VfTkFNRSA9ICdnaW5nZXJicmVhZC1ob3VzZS5wbmcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCdnYW1lJyk7XHJcblx0fVxyXG5cclxuXHRwcmVsb2FkKCkge1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFRleHR1cmVLZXkuSE9VU0UsIHRoaXMuZ2V0SG91c2VJbWFnZSgpKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShUZXh0dXJlS2V5LkVSQVNFUl9JQ09OLCAnYXNzZXRzL2ltZy9lcmFzZXIucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoVGV4dHVyZUtleS5TVEFNUF9JQ09OLCAnYXNzZXRzL2ltZy9zdGFtcC5wbmcnKTtcclxuXHRcdHRoaXMubG9hZC5pbWFnZShUZXh0dXJlS2V5LkNBTkRZX0NBTkUsICdhc3NldHMvaW1nL2NhbmR5LWNhbmUucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoVGV4dHVyZUtleS5HVU1NWV9CRUFSLCAnYXNzZXRzL2ltZy9ndW1teS1iZWFyLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFRleHR1cmVLZXkuU1dFRVRTLCAnYXNzZXRzL2ltZy9zd2VldHMucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoVGV4dHVyZUtleS5NSU5ULCAnYXNzZXRzL2ltZy9taW50LnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFRleHR1cmVLZXkuQ0FORFksICdhc3NldHMvaW1nL2NhbmR5LnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFRleHR1cmVLZXkuQ0hPQ09MQVRFLCAnYXNzZXRzL2ltZy9jaG9jb2xhdGUucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoVGV4dHVyZUtleS5QRVBQRVJNSU5ULCAnYXNzZXRzL2ltZy9wZXBwZXJtaW50LnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFRleHR1cmVLZXkuQ0FORFlfMiwgJ2Fzc2V0cy9pbWcvY2FuZHkyLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFRleHR1cmVLZXkuR1VNLCAnYXNzZXRzL2ltZy9ndW0ucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoVGV4dHVyZUtleS5UUlVGRkxFLCAnYXNzZXRzL2ltZy90cnVmZmxlLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFRleHR1cmVLZXkuSkVMTFlfQkVBTlMsICdhc3NldHMvaW1nL2plbGx5LWJlYW5zLnBuZycpO1xyXG5cdFx0dGhpcy5sb2FkLmltYWdlKFRleHR1cmVLZXkuU1BSSU5LTEVTLCAnYXNzZXRzL2ltZy9zcHJpbmtsZXMucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoVGV4dHVyZUtleS5MT0xMSVBPUCwgJ2Fzc2V0cy9pbWcvbG9sbGlwb3AucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoVGV4dHVyZUtleS5HSU5HRVJCUkVBRF9NQU4sICdhc3NldHMvaW1nL2dpbmdlcmJyZWFkLW1hbi5wbmcnKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZSgpIHtcclxuXHRcdHRoaXMuYnJ1c2hDb2xvciA9IERFRkFVTFRfQlJVU0hfQ09MT1I7XHJcblx0XHR0aGlzLmJydXNoID0gREVGQVVMVF9CUlVTSDtcclxuXHRcdHRoaXMuc3RhbXBUZXh0dXJlS2V5ID0gREVGQVVMVF9TVEFNUDtcclxuXHRcdHRoaXMuc3RhbXBTaXplID0gREVGQVVMVF9TVEFNUF9TSVpFO1xyXG5cdFx0dGhpcy5kcmF3blNoYXBlcyA9IFtdO1xyXG5cdFx0dGhpcy5zdGFnZSA9IHRoaXMuYWRkU3RhZ2UoKTtcclxuXHRcdHRoaXMuYWRkU3RhZ2VJbWFnZSgpO1xyXG5cdFx0dGhpcy5hZGRDb2xvclRvb2xiYXIoKTtcclxuXHRcdHRoaXMuYWRkU3RhbXBUb29sYmFyKCk7XHJcblx0XHR0aGlzLmFkZFN0YW1wU2l6ZVRvb2xiYXIoKTtcclxuXHRcdHRoaXMuYWRkVG9vbFRvb2xiYXIoKTtcclxuXHRcdHRoaXMuYWRkQnV0dG9ucygpO1xyXG5cdH1cclxuXHJcblx0Z2V0SG91c2VJbWFnZSgpIHtcclxuXHRcdHJldHVybiBgYXNzZXRzL2ltZy9ob3VzZSR7dGhpcy5nZXRIb3VzZU51bWJlcigpfS5wbmdgO1xyXG5cdH1cclxuXHJcblx0Z2V0SG91c2VOdW1iZXIoKSB7XHJcblx0XHRsZXQgaG91c2VOdW1iZXIgPSB0aGlzLmdldFJhbmRvbUhvdXNlTnVtYmVyKCk7XHJcblx0XHRjb25zdCBwcmV2aW91c0hvdXNlTnVtYmVyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oS2V5LkhPVVNFX05VTUJFUik7XHJcblx0XHR3aGlsZSAoaG91c2VOdW1iZXIgPT09IHBhcnNlSW50KHByZXZpb3VzSG91c2VOdW1iZXIsIDEwKSkge1xyXG5cdFx0XHRob3VzZU51bWJlciA9IHRoaXMuZ2V0UmFuZG9tSG91c2VOdW1iZXIoKTtcclxuXHRcdH1cclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEtleS5IT1VTRV9OVU1CRVIsIGhvdXNlTnVtYmVyKTtcclxuXHRcdHJldHVybiBob3VzZU51bWJlcjtcclxuXHR9XHJcblxyXG5cdGdldFJhbmRvbUhvdXNlTnVtYmVyKCkge1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcclxuXHR9XHJcblxyXG5cdGFkZFN0YWdlKCkge1xyXG5cdFx0Y29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnN5cy5nYW1lLmNhbnZhcztcclxuXHRcdHJldHVybiB0aGlzLmFkZFxyXG5cdFx0XHQucmVjdGFuZ2xlKDE2MCwgNDUsIHdpZHRoIC0gVE9PTEJBUl9XSURUSCAqIDIsIGhlaWdodCAtIDkwKVxyXG5cdFx0XHQuc2V0T3JpZ2luKExFRlRfWCwgVE9QX1kpXHJcblx0XHRcdC5zZXRTdHJva2VTdHlsZShTVEFHRV9MSU5FX1dJRFRILCBTVEFHRV9MSU5FX0NPTE9SKTtcclxuXHR9XHJcblxyXG5cdGFkZFN0YWdlSW1hZ2UoKSB7XHJcblx0XHR0aGlzLmFkZC5pbWFnZSh0aGlzLnN0YWdlLnggKyB0aGlzLnN0YWdlLndpZHRoIC8gMiwgdGhpcy5zdGFnZS55ICsgdGhpcy5zdGFnZS5oZWlnaHQgLyAyLCBUZXh0dXJlS2V5LkhPVVNFKTtcclxuXHR9XHJcblxyXG5cdGFkZFRleHQoeCwgeSwgdGV4dCkge1xyXG5cdFx0dGhpcy5hZGQudGV4dCh4LCB5LCB0ZXh0LCB7XHJcblx0XHRcdGZvbnRGYW1pbHk6IEZPTlRfRkFNSUxZLFxyXG5cdFx0XHRmb250U2l6ZTogRk9OVF9TSVpFLFxyXG5cdFx0XHRjb2xvcjogVEVYVF9DT0xPUlxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRPcHRpb25YKHgsIGkpIHtcclxuXHRcdHJldHVybiBpICUgMiA9PT0gMCA/IHggOiB4ICsgT1BUSU9OX09GRlNFVDtcclxuXHR9XHJcblxyXG5cdGdldE9wdGlvblkoeSwgcm93cykge1xyXG5cdFx0cmV0dXJuIE9QVElPTl9PRkZTRVQgKiByb3dzICsgeTtcclxuXHR9XHJcblxyXG5cdGFkZENvbG9yVG9vbGJhcigpIHtcclxuXHRcdGNvbnN0IHggPSA1MDtcclxuXHRcdGNvbnN0IHkgPSAzNTA7XHJcblx0XHRjb25zdCBjb2xvcnMgPSBbQ29sb3IuUkVELCBDb2xvci5QSU5LLCBDb2xvci5HUkVFTiwgQ29sb3IuUEFMRV9HUkVFTiwgQ29sb3IuQkxVRSwgQ29sb3IuUEFMRV9CTFVFLCBDb2xvci5ZRUxMT1csIENvbG9yLk9GRl9XSElURV07XHJcblxyXG5cdFx0dGhpcy5hZGRUZXh0KDUwLCAzMDAsICdDb2xvcnMnKTtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMCwgcm93cyA9IDAsIGxlbiA9IGNvbG9ycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAoaSA+IDAgJiYgaSAlIDIgPT09IDApIHtcclxuXHRcdFx0XHRyb3dzKys7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5hZGRDb2xvck9wdGlvbih0aGlzLmdldE9wdGlvblgoeCwgaSksIHRoaXMuZ2V0T3B0aW9uWSh5LCByb3dzKSwgY29sb3JzW2ldKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFkZENvbG9yT3B0aW9uKHgsIHksIGNvbG9yKSB7XHJcblx0XHRjb25zdCBvcHRpb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgT1BUSU9OX1dJRFRILCBPUFRJT05fSEVJR0hULCBjb2xvcik7XHJcblx0XHRvcHRpb24uc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdG9wdGlvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQ29sb3JPcHRpb24pIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkQ29sb3JPcHRpb24uZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvck9wdGlvbiA9IHRoaXMuYWRkLnJlY3RhbmdsZShvcHRpb24ueCwgb3B0aW9uLnksIE9QVElPTl9XSURUSCwgT1BUSU9OX0hFSUdIVCk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRDb2xvck9wdGlvbi5zZXRTdHJva2VTdHlsZShTRUxFQ1RFRF9PUFRJT05fTElORV9XSURUSCwgU0VMRUNURURfT1BUSU9OX0xJTkVfQ09MT1IpO1xyXG5cdFx0XHR0aGlzLmJydXNoQ29sb3IgPSBjb2xvcjtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuYnJ1c2hDb2xvciA9PT0gY29sb3IpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZENvbG9yT3B0aW9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKG9wdGlvbi54LCBvcHRpb24ueSwgT1BUSU9OX1dJRFRILCBPUFRJT05fSEVJR0hUKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZENvbG9yT3B0aW9uLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhZGRTdGFtcFRvb2xiYXIoKSB7XHJcblx0XHRjb25zdCB4ID0gOTE5O1xyXG5cdFx0Y29uc3QgeSA9IDkwO1xyXG5cdFx0Y29uc3Qgc3RhbXBUZXh0dXJlS2V5cyA9IFtcclxuXHRcdFx0VGV4dHVyZUtleS5DQU5EWV9DQU5FLFxyXG5cdFx0XHRUZXh0dXJlS2V5LkdVTU1ZX0JFQVIsXHJcblx0XHRcdFRleHR1cmVLZXkuU1dFRVRTLFxyXG5cdFx0XHRUZXh0dXJlS2V5Lk1JTlQsXHJcblx0XHRcdFRleHR1cmVLZXkuQ0FORFksXHJcblx0XHRcdFRleHR1cmVLZXkuQ0hPQ09MQVRFLFxyXG5cdFx0XHRUZXh0dXJlS2V5LlBFUFBFUk1JTlQsXHJcblx0XHRcdFRleHR1cmVLZXkuQ0FORFlfMixcclxuXHRcdFx0VGV4dHVyZUtleS5HVU0sXHJcblx0XHRcdFRleHR1cmVLZXkuVFJVRkZMRSxcclxuXHRcdFx0VGV4dHVyZUtleS5KRUxMWV9CRUFOUyxcclxuXHRcdFx0VGV4dHVyZUtleS5TUFJJTktMRVMsXHJcblx0XHRcdFRleHR1cmVLZXkuTE9MTElQT1AsXHJcblx0XHRcdFRleHR1cmVLZXkuR0lOR0VSQlJFQURfTUFOXHJcblx0XHRdO1xyXG5cdFx0dGhpcy5hZGRUZXh0KDkxNCwgNDAsICdTdGFtcHMnKTtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMCwgcm93cyA9IDAsIGxlbiA9IHN0YW1wVGV4dHVyZUtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKGkgPiAwICYmIGkgJSAyID09PSAwKSB7XHJcblx0XHRcdFx0cm93cysrO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuYWRkU3RhbXBPcHRpb24odGhpcy5nZXRPcHRpb25YKHgsIGkpLCB0aGlzLmdldE9wdGlvblkoeSwgcm93cyksIHN0YW1wVGV4dHVyZUtleXNbaV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkU3RhbXBPcHRpb24oeCwgeSwgc3RhbXBUZXh0dXJlS2V5KSB7XHJcblx0XHRjb25zdCBvcHRpb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgT1BUSU9OX1dJRFRILCBPUFRJT05fSEVJR0hULCBPUFRJT05fQkFDS0dST1VORF9DT0xPUik7XHJcblx0XHRvcHRpb24uc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdG9wdGlvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkU3RhbXBPcHRpb24pIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBPcHRpb24uZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcE9wdGlvbiA9IHRoaXMuYWRkLnJlY3RhbmdsZShvcHRpb24ueCwgb3B0aW9uLnksIE9QVElPTl9XSURUSCwgT1BUSU9OX0hFSUdIVCk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcE9wdGlvbi5zZXRTdHJva2VTdHlsZShTRUxFQ1RFRF9PUFRJT05fTElORV9XSURUSCwgU0VMRUNURURfT1BUSU9OX0xJTkVfQ09MT1IpO1xyXG5cdFx0XHR0aGlzLnN0YW1wVGV4dHVyZUtleSA9IHN0YW1wVGV4dHVyZUtleTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuc3RhbXBUZXh0dXJlS2V5ID09PSBzdGFtcFRleHR1cmVLZXkpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wT3B0aW9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKG9wdGlvbi54LCBvcHRpb24ueSwgT1BUSU9OX1dJRFRILCBPUFRJT05fSEVJR0hUKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZFN0YW1wT3B0aW9uLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHR9XHJcblx0XHR0aGlzLmFkZC5pbWFnZShvcHRpb24ueCwgb3B0aW9uLnksIHN0YW1wVGV4dHVyZUtleSkuc2V0U2NhbGUoU1RBTVBfU0NBTEUpO1xyXG5cdH1cclxuXHJcblx0YWRkU3RhbXBTaXplVG9vbGJhcigpIHtcclxuXHRcdHRoaXMuYWRkVGV4dCg4OTAsIDQ4NSwgJ1N0YW1wIHNpemVzJyk7XHJcblx0XHR0aGlzLmFkZFN0YW1wU2l6ZU9wdGlvbig5NDUsIDUzNSwgJ1NtYWxsJywgOTIwLCA1MjUsIFN0YW1wU2l6ZS5TTUFMTCk7XHJcblx0XHR0aGlzLmFkZFN0YW1wU2l6ZU9wdGlvbig5NDUsIDU5MCwgJ05vcm1hbCcsIDkxMywgNTgwLCBTdGFtcFNpemUuTk9STUFMKTtcclxuXHRcdHRoaXMuYWRkU3RhbXBTaXplT3B0aW9uKDk0NSwgNjQ1LCAnTGFyZ2UnLCA5MjAsIDYzNSwgU3RhbXBTaXplLkxBUkdFKTtcclxuXHRcdHRoaXMuYWRkU3RhbXBTaXplT3B0aW9uKDk0NSwgNzAwLCAnWC1MYXJnZScsIDkxMCwgNjg3LCBTdGFtcFNpemUuRVhUUkFfTEFSR0UpO1xyXG5cdH1cclxuXHJcblx0YWRkU3RhbXBTaXplT3B0aW9uKHgsIHksIHRleHQsIHRleHRYLCB0ZXh0WSwgbXVsdGlwbGllcikge1xyXG5cdFx0Y29uc3Qgb3B0aW9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIExBUkdFX09QVElPTl9XSURUSCwgT1BUSU9OX0hFSUdIVCwgT1BUSU9OX0JBQ0tHUk9VTkRfQ09MT1IpO1xyXG5cdFx0b3B0aW9uLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRvcHRpb24ub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZFN0YW1wU2l6ZVJlY3RhbmdsZSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcFNpemVSZWN0YW5nbGUuZGVzdHJveSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcFNpemVSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUob3B0aW9uLngsIG9wdGlvbi55LCBMQVJHRV9PUFRJT05fV0lEVEgsIE9QVElPTl9IRUlHSFQpO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHRcdHRoaXMuc3RhbXBTaXplID0gbXVsdGlwbGllcjtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuc3RhbXBTaXplID09PSBtdWx0aXBsaWVyKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRTdGFtcFNpemVSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUob3B0aW9uLngsIG9wdGlvbi55LCBMQVJHRV9PUFRJT05fV0lEVEgsIE9QVElPTl9IRUlHSFQpO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkU3RhbXBTaXplUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHR9XHJcblx0XHR0aGlzLmFkZFRleHQodGV4dFgsIHRleHRZLCB0ZXh0KTtcclxuXHR9XHJcblxyXG5cdGFkZFRvb2xUb29sYmFyKCkge1xyXG5cdFx0dGhpcy5hZGRUZXh0KDUwLCA0MCwgJ1Rvb2xzJyk7XHJcblx0XHRjb25zdCB4ID0gNTA7XHJcblx0XHRjb25zdCB5ID0gOTA7XHJcblx0XHRjb25zdCB0b29scyA9IFtcclxuXHRcdFx0VG9vbC5DSVJDTEUsXHJcblx0XHRcdFRvb2wuU1RST0tFX0NJUkNMRSxcclxuXHRcdFx0VG9vbC5TUVVBUkUsXHJcblx0XHRcdFRvb2wuU1RST0tFX1NRVUFSRSxcclxuXHRcdFx0VG9vbC5TVEFSLFxyXG5cdFx0XHRUb29sLlNUUk9LRV9TVEFSLFxyXG5cdFx0XHRUb29sLkVSQVNFUixcclxuXHRcdFx0VG9vbC5TVEFNUFxyXG5cdFx0XTtcclxuXHRcdGZvciAobGV0IGkgPSAwLCBsZW4gPSB0b29scy5sZW5ndGgsIHJvd3MgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKGkgPiAwICYmIGkgJSAyID09PSAwKSB7XHJcblx0XHRcdFx0cm93cysrO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuYWRkVG9vbE9wdGlvbih0aGlzLmdldE9wdGlvblgoeCwgaSksIHRoaXMuZ2V0T3B0aW9uWSh5LCByb3dzKSwgdG9vbHNbaV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkVG9vbE9wdGlvbih4LCB5LCBicnVzaCkge1xyXG5cdFx0Y29uc3Qgb3B0aW9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIE9QVElPTl9XSURUSCwgT1BUSU9OX0hFSUdIVCwgT1BUSU9OX0JBQ0tHUk9VTkRfQ09MT1IpO1xyXG5cdFx0b3B0aW9uLnNldEludGVyYWN0aXZlKCk7XHJcblx0XHRvcHRpb24ub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlLmRlc3Ryb3koKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUgPSB0aGlzLmFkZC5yZWN0YW5nbGUob3B0aW9uLngsIG9wdGlvbi55LCBPUFRJT05fV0lEVEgsIE9QVElPTl9IRUlHSFQpO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQnJ1c2hSZWN0YW5nbGUuc2V0U3Ryb2tlU3R5bGUoU0VMRUNURURfT1BUSU9OX0xJTkVfV0lEVEgsIFNFTEVDVEVEX09QVElPTl9MSU5FX0NPTE9SKTtcclxuXHRcdFx0dGhpcy5icnVzaCA9IGJydXNoO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy5icnVzaCA9PT0gYnJ1c2gpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlID0gdGhpcy5hZGQucmVjdGFuZ2xlKG9wdGlvbi54LCBvcHRpb24ueSwgT1BUSU9OX1dJRFRILCBPUFRJT05fSEVJR0hUKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEJydXNoUmVjdGFuZ2xlLnNldFN0cm9rZVN0eWxlKFNFTEVDVEVEX09QVElPTl9MSU5FX1dJRFRILCBTRUxFQ1RFRF9PUFRJT05fTElORV9DT0xPUik7XHJcblx0XHR9XHJcblx0XHR0aGlzLmFkZFRvb2xJY29uKGJydXNoLCB4LCB5KTtcclxuXHR9XHJcblxyXG5cdGFkZFRvb2xJY29uKGJydXNoLCB4LCB5KSB7XHJcblx0XHRzd2l0Y2ggKGJydXNoKSB7XHJcblx0XHRcdGNhc2UgVG9vbC5TUVVBUkU6XHJcblx0XHRcdFx0dGhpcy5hZGRTcXVhcmVJY29uKHgsIHksIGZhbHNlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBUb29sLlNUUk9LRV9TUVVBUkU6XHJcblx0XHRcdFx0dGhpcy5hZGRTcXVhcmVJY29uKHgsIHksIHRydWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFRvb2wuQ0lSQ0xFOlxyXG5cdFx0XHRcdHRoaXMuYWRkQ2lyY2xlSWNvbih4LCB5LCBmYWxzZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgVG9vbC5TVFJPS0VfQ0lSQ0xFOlxyXG5cdFx0XHRcdHRoaXMuYWRkQ2lyY2xlSWNvbih4LCB5LCB0cnVlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBUb29sLlNUQVI6XHJcblx0XHRcdFx0dGhpcy5hZGRTdGFySWNvbih4LCB5LCBmYWxzZSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgVG9vbC5TVFJPS0VfU1RBUjpcclxuXHRcdFx0XHR0aGlzLmFkZFN0YXJJY29uKHgsIHksIHRydWUpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFRvb2wuRVJBU0VSOlxyXG5cdFx0XHRcdHRoaXMuYWRkSW1hZ2VJY29uKHgsIHksIFRleHR1cmVLZXkuRVJBU0VSX0lDT04pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFRvb2wuU1RBTVA6XHJcblx0XHRcdFx0dGhpcy5hZGRJbWFnZUljb24oeCwgeSwgVGV4dHVyZUtleS5TVEFNUF9JQ09OKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFkZFNxdWFyZUljb24oeCwgeSwgaXNTdHJva2UpIHtcclxuXHRcdGNvbnN0IGljb24gPSB0aGlzLmFkZC5yZWN0YW5nbGUoeCwgeSwgU1FVQVJFX0lDT05fV0lEVEgsIFNRVUFSRV9JQ09OX0hFSUdIVCwgaXNTdHJva2UgPyBDb2xvci5XSElURSA6IENvbG9yLkJMQUNLKTtcclxuXHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoSUNPTl9MSU5FX1dJRFRILCBDb2xvci5CTEFDSyk7XHJcblx0fVxyXG5cclxuXHRhZGRDaXJjbGVJY29uKHgsIHksIGlzU3Ryb2tlKSB7XHJcblx0XHRjb25zdCBpY29uID0gdGhpcy5hZGQuY2lyY2xlKHgsIHksIENJUkNMRV9JQ09OX1JBRElVUywgaXNTdHJva2UgPyBDb2xvci5XSElURSA6IENvbG9yLkJMQUNLKTtcclxuXHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoSUNPTl9MSU5FX1dJRFRILCBDb2xvci5CTEFDSyk7XHJcblx0fVxyXG5cclxuXHRhZGRTdGFySWNvbih4LCB5LCBpc1N0cm9rZSkge1xyXG5cdFx0Y29uc3QgaWNvbiA9IHRoaXMuYWRkLnN0YXIoXHJcblx0XHRcdHgsXHJcblx0XHRcdHksXHJcblx0XHRcdFNUQVJfSUNPTl9QT0lOVFMsXHJcblx0XHRcdFNUQVJfSUNPTl9JTk5FUl9SQURJVVMsXHJcblx0XHRcdFNUQVJfSUNPTl9PVVRFUl9SQURJVVMsXHJcblx0XHRcdGlzU3Ryb2tlID8gQ29sb3IuV0hJVEUgOiBDb2xvci5CTEFDS1xyXG5cdFx0KTtcclxuXHRcdGljb24uc2V0U3Ryb2tlU3R5bGUoSUNPTl9MSU5FX1dJRFRILCBDb2xvci5CTEFDSyk7XHJcblx0fVxyXG5cclxuXHRhZGRJbWFnZUljb24oeCwgeSwgaW1hZ2VOYW1lKSB7XHJcblx0XHRjb25zdCBpY29uID0gdGhpcy5hZGQuaW1hZ2UoeCwgeSwgaW1hZ2VOYW1lKTtcclxuXHRcdGljb24uc2V0U2NhbGUoSU1BR0VfSUNPTl9TQ0FMRSk7XHJcblx0fVxyXG5cclxuXHRhZGRCdXR0b25zKCkge1xyXG5cdFx0dGhpcy5hZGRCdXR0b24oODAsIDU4OCwgJ05ldycsIDYwLCA1NzgsICgpID0+IHtcclxuXHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYWRkQnV0dG9uKDgwLCA2NDMsICdDbGVhciBBbGwnLCA0MiwgNjMzLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuY2xlYXJBbGwoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hZGRCdXR0b24oODAsIDY5OCwgJ0V4cG9ydCcsIDUwLCA2ODgsICgpID0+IHtcclxuXHRcdFx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XHJcblx0XHRcdGNvbnN0IHNhdmVDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHRcdFx0c2F2ZUNhbnZhcy53aWR0aCA9IEVYUE9SVF9JTUFHRV9XSURUSDtcclxuXHRcdFx0c2F2ZUNhbnZhcy5oZWlnaHQgPSBFWFBPUlRfSU1BR0VfSEVJR0hUO1xyXG5cclxuXHRcdFx0Y29uc3QgY3R4ID0gc2F2ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cdFx0XHRjdHguZHJhd0ltYWdlKGNhbnZhcywgMTYwLCA1MCwgRVhQT1JUX0lNQUdFX1dJRFRILCBFWFBPUlRfSU1BR0VfSEVJR0hULCAwLCAwLCBFWFBPUlRfSU1BR0VfV0lEVEgsIEVYUE9SVF9JTUFHRV9IRUlHSFQpO1xyXG5cclxuXHRcdFx0bGV0IGRhdGFVUkwgPSBzYXZlQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XHJcblxyXG5cdFx0XHRsZXQgZG93bmxvYWRIZWxwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdGRvd25sb2FkSGVscGVyLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBFWFBPUlRfSU1BR0VfTkFNRSk7XHJcblx0XHRcdGRvd25sb2FkSGVscGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGRhdGFVUkwpO1xyXG5cdFx0XHRkb3dubG9hZEhlbHBlci5jbGljaygpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhZGRCdXR0b24oeCwgeSwgdGV4dCwgdGV4dFgsIHRleHRZLCBjYWxsYmFjaykge1xyXG5cdFx0Y29uc3QgYnV0dG9uID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIExBUkdFX09QVElPTl9XSURUSCwgT1BUSU9OX0hFSUdIVCwgT1BUSU9OX0JBQ0tHUk9VTkRfQ09MT1IpO1xyXG5cdFx0dGhpcy5hZGRUZXh0KHRleHRYLCB0ZXh0WSwgdGV4dCk7XHJcblx0XHRidXR0b24uc2V0SW50ZXJhY3RpdmUoKTtcclxuXHRcdGJ1dHRvbi5vbigncG9pbnRlcmRvd24nLCBjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHRjbGVhckFsbCgpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmRyYXduU2hhcGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdHRoaXMuZHJhd25TaGFwZXNbaV0uZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5kcmF3blNoYXBlcyA9IFtdO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKCkge1xyXG5cdFx0Y29uc3QgcG9pbnRlciA9IHRoaXMuaW5wdXQuYWN0aXZlUG9pbnRlcjtcclxuXHRcdGxldCBzaGFwZSA9IG51bGw7XHJcblx0XHRpZiAocG9pbnRlci5pc0Rvd24pIHtcclxuXHRcdFx0c3dpdGNoICh0aGlzLmJydXNoKSB7XHJcblx0XHRcdFx0Y2FzZSBUb29sLlNRVUFSRTpcclxuXHRcdFx0XHRcdHNoYXBlID0gdGhpcy5kcmF3U3F1YXJlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLmJydXNoQ29sb3IsIGZhbHNlKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgVG9vbC5TVFJPS0VfU1FVQVJFOlxyXG5cdFx0XHRcdFx0c2hhcGUgPSB0aGlzLmRyYXdTcXVhcmUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMuYnJ1c2hDb2xvciwgdHJ1ZSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIFRvb2wuQ0lSQ0xFOlxyXG5cdFx0XHRcdFx0c2hhcGUgPSB0aGlzLmRyYXdDaXJjbGUocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMuYnJ1c2hDb2xvciwgZmFsc2UpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBUb29sLlNUUk9LRV9DSVJDTEU6XHJcblx0XHRcdFx0XHRzaGFwZSA9IHRoaXMuZHJhd0NpcmNsZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5icnVzaENvbG9yLCB0cnVlKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgVG9vbC5TVEFSOlxyXG5cdFx0XHRcdFx0c2hhcGUgPSB0aGlzLmRyYXdTdGFyKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLmJydXNoQ29sb3IsIGZhbHNlKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgVG9vbC5TVFJPS0VfU1RBUjpcclxuXHRcdFx0XHRcdHNoYXBlID0gdGhpcy5kcmF3U3Rhcihwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5icnVzaENvbG9yLCB0cnVlKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgVG9vbC5TVEFNUDpcclxuXHRcdFx0XHRcdHNoYXBlID0gdGhpcy5kcmF3U3RhbXAocG9pbnRlci54LCBwb2ludGVyLnksIHRoaXMuc3RhbXBUZXh0dXJlS2V5LCB0aGlzLnN0YW1wU2l6ZSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIFRvb2wuRVJBU0VSOlxyXG5cdFx0XHRcdFx0dGhpcy5lcmFzZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5kcmF3blNoYXBlcyk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKHNoYXBlKSB7XHJcblx0XHRcdHRoaXMuZHJhd25TaGFwZXMucHVzaChzaGFwZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjYW5EcmF3U3F1YXJlKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuXHRcdGlmIChcclxuXHRcdFx0dGhpcy5zdGFnZS54IDwgeCAtIHdpZHRoIC8gMiAmJlxyXG5cdFx0XHR0aGlzLnN0YWdlLndpZHRoICsgdGhpcy5zdGFnZS54ID4geCArIHdpZHRoIC8gMiAmJlxyXG5cdFx0XHR0aGlzLnN0YWdlLnkgPCB5IC0gaGVpZ2h0IC8gMiAmJlxyXG5cdFx0XHR0aGlzLnN0YWdlLmhlaWdodCArIHRoaXMuc3RhZ2UueSA+IHkgKyBoZWlnaHQgLyAyXHJcblx0XHQpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRjYW5EcmF3Q2lyY2xlKHgsIHksIHJhZGl1cykge1xyXG5cdFx0aWYgKFxyXG5cdFx0XHR0aGlzLnN0YWdlLnggPCB4IC0gcmFkaXVzICYmXHJcblx0XHRcdHRoaXMuc3RhZ2Uud2lkdGggKyB0aGlzLnN0YWdlLnggPiB4ICsgcmFkaXVzICYmXHJcblx0XHRcdHRoaXMuc3RhZ2UueSA8IHkgLSByYWRpdXMgJiZcclxuXHRcdFx0dGhpcy5zdGFnZS5oZWlnaHQgKyB0aGlzLnN0YWdlLnkgPiB5ICsgcmFkaXVzXHJcblx0XHQpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRkcmF3U3F1YXJlKHgsIHksIGNvbG9yLCBpc1N0cm9rZSkge1xyXG5cdFx0bGV0IHNxdWFyZSA9IG51bGw7XHJcblx0XHRpZiAoaXNTdHJva2UgJiYgdGhpcy5jYW5EcmF3U3F1YXJlKHgsIHksIFNRVUFSRV9CUlVTSF9TSVpFLCBTUVVBUkVfQlJVU0hfU0laRSkpIHtcclxuXHRcdFx0c3F1YXJlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIFNRVUFSRV9CUlVTSF9TSVpFLCBTUVVBUkVfQlJVU0hfU0laRSk7XHJcblx0XHRcdHNxdWFyZS5zZXRTdHJva2VTdHlsZShCUlVTSF9MSU5FX1dJRFRILCBjb2xvcik7XHJcblx0XHRcdHNxdWFyZS5zZXRPcmlnaW4oQ0VOVEVSX1gsIENFTlRFUl9ZKTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5jYW5EcmF3U3F1YXJlKHgsIHksIFNRVUFSRV9CUlVTSF9TSVpFLCBTUVVBUkVfQlJVU0hfU0laRSkpIHtcclxuXHRcdFx0c3F1YXJlID0gdGhpcy5hZGQucmVjdGFuZ2xlKHgsIHksIFNRVUFSRV9CUlVTSF9TSVpFLCBTUVVBUkVfQlJVU0hfU0laRSwgY29sb3IpO1xyXG5cdFx0XHRzcXVhcmUuc2V0T3JpZ2luKENFTlRFUl9YLCBDRU5URVJfWSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3F1YXJlO1xyXG5cdH1cclxuXHJcblx0ZHJhd0NpcmNsZSh4LCB5LCBjb2xvciwgaXNTdHJva2UpIHtcclxuXHRcdGxldCBjaXJjbGUgPSBudWxsO1xyXG5cdFx0aWYgKGlzU3Ryb2tlICYmIHRoaXMuY2FuRHJhd0NpcmNsZSh4LCB5LCBDSVJDTEVfQlJVU0hfUkFESVVTKSkge1xyXG5cdFx0XHRjaXJjbGUgPSB0aGlzLmFkZC5jaXJjbGUoeCwgeSwgQ0lSQ0xFX0JSVVNIX1JBRElVUyk7XHJcblx0XHRcdGNpcmNsZS5zZXRTdHJva2VTdHlsZShCUlVTSF9MSU5FX1dJRFRILCBjb2xvcik7XHJcblx0XHRcdGNpcmNsZS5zZXRPcmlnaW4oQ0VOVEVSX1gsIENFTlRFUl9ZKTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5jYW5EcmF3Q2lyY2xlKHgsIHksIENJUkNMRV9CUlVTSF9SQURJVVMpKSB7XHJcblx0XHRcdGNpcmNsZSA9IHRoaXMuYWRkLmNpcmNsZSh4LCB5LCBDSVJDTEVfQlJVU0hfUkFESVVTLCBjb2xvcik7XHJcblx0XHRcdGNpcmNsZS5zZXRPcmlnaW4oQ0VOVEVSX1gsIENFTlRFUl9ZKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBjaXJjbGU7XHJcblx0fVxyXG5cclxuXHRkcmF3U3Rhcih4LCB5LCBjb2xvciwgaXNTdHJva2UpIHtcclxuXHRcdGxldCBzdGFyID0gbnVsbDtcclxuXHRcdGlmIChpc1N0cm9rZSAmJiB0aGlzLmNhbkRyYXdDaXJjbGUoeCwgeSwgU1RBUl9CUlVTSF9PVVRFUl9SQURJVVMpKSB7XHJcblx0XHRcdHN0YXIgPSB0aGlzLmFkZC5zdGFyKHgsIHksIFNUQVJfQlJVU0hfTlVNQkVSX09GX1BPSU5UUywgU1RBUl9CUlVTSF9JTk5FUl9SQURJVVMsIFNUQVJfQlJVU0hfT1VURVJfUkFESVVTKTtcclxuXHRcdFx0c3Rhci5zZXRTdHJva2VTdHlsZShCUlVTSF9MSU5FX1dJRFRILCBjb2xvcik7XHJcblx0XHRcdHN0YXIuc2V0T3JpZ2luKENFTlRFUl9YLCBDRU5URVJfWSk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuY2FuRHJhd0NpcmNsZSh4LCB5LCBTVEFSX0JSVVNIX09VVEVSX1JBRElVUykpIHtcclxuXHRcdFx0c3RhciA9IHRoaXMuYWRkLnN0YXIoeCwgeSwgU1RBUl9CUlVTSF9OVU1CRVJfT0ZfUE9JTlRTLCBTVEFSX0JSVVNIX0lOTkVSX1JBRElVUywgU1RBUl9CUlVTSF9PVVRFUl9SQURJVVMsIGNvbG9yKTtcclxuXHRcdFx0c3Rhci5zZXRPcmlnaW4oQ0VOVEVSX1gsIENFTlRFUl9ZKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdGFyO1xyXG5cdH1cclxuXHJcblx0ZHJhd1N0YW1wKHgsIHksIGltYWdlS2V5LCBpbWFnZVNpemUpIHtcclxuXHRcdGNvbnN0IHN0YW1wSW1hZ2UgPSB0aGlzLnRleHR1cmVzLmdldChpbWFnZUtleSkuZ2V0U291cmNlSW1hZ2UoKTtcclxuXHRcdGxldCBpbWFnZSA9IG51bGw7XHJcblx0XHRjb25zdCBzdGFtcFdpZHRoID0gc3RhbXBJbWFnZT8ud2lkdGggKiBTVEFNUF9TQ0FMRSAqIGltYWdlU2l6ZTtcclxuXHRcdGNvbnN0IHN0YW1wSGVpZ2h0ID0gc3RhbXBJbWFnZT8uaGVpZ2h0ICogU1RBTVBfU0NBTEUgKiBpbWFnZVNpemU7XHJcblx0XHRpZiAoc3RhbXBJbWFnZSAmJiB0aGlzLmNhbkRyYXdTcXVhcmUoeCwgeSwgc3RhbXBXaWR0aCwgc3RhbXBIZWlnaHQpKSB7XHJcblx0XHRcdGltYWdlID0gdGhpcy5hZGQuaW1hZ2UoeCwgeSwgaW1hZ2VLZXkpO1xyXG5cdFx0XHRpbWFnZS5zZXRPcmlnaW4oQ0VOVEVSX1gsIENFTlRFUl9ZKTtcclxuXHRcdFx0aW1hZ2Uuc2V0U2NhbGUoU1RBTVBfU0NBTEUgKiBpbWFnZVNpemUpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGltYWdlO1xyXG5cdH1cclxuXHJcblx0ZXJhc2UoeCwgeSwgc2hhcGVzKSB7XHJcblx0XHRzaGFwZXMuZmlsdGVyKChzaGFwZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gc2hhcGUuZ2V0Qm91bmRzKCkuY29udGFpbnMoeCwgeSk7XHJcblx0XHR9KS5mb3JFYWNoKChzaGFwZSkgPT4ge1xyXG5cdFx0XHRzaGFwZS5kZXN0cm95KCk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2dpbmdlcmJyZWFkX2RlY29yYXRvclwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtnaW5nZXJicmVhZF9kZWNvcmF0b3JcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9