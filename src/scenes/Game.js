import Phaser from 'phaser';

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

export default class GameScene extends Phaser.Scene {
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
