import Phaser from 'phaser';
import { Color, Key, TextureKey, StampSize, Tool } from '../constants';

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
const OPTION_BACKGROUND_COLOR = Color.GRAY;

const SELECTED_OPTION_LINE_WIDTH = 3;
const SELECTED_OPTION_LINE_COLOR = Color.BLACK;

const DEFAULT_BRUSH_COLOR = Color.RED;
const DEFAULT_BRUSH = 'circle';
const DEFAULT_STAMP = TextureKey.CANDY_CANE;
const DEFAULT_STAMP_SIZE = StampSize.NORMAL;

const STAGE_LINE_WIDTH = 4;
const STAGE_LINE_COLOR = Color.BLACK;

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

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('game');
	}

	preload() {
		this.load.image(TextureKey.HOUSE, this.getHouseImage());
		this.load.image(TextureKey.ERASER_ICON, 'assets/img/eraser.png');
		this.load.image(TextureKey.STAMP_ICON, 'assets/img/stamp.png');
		this.load.image(TextureKey.CANDY_CANE, 'assets/img/candy-cane.png');
		this.load.image(TextureKey.GUMMY_BEAR, 'assets/img/gummy-bear.png');
		this.load.image(TextureKey.SWEETS, 'assets/img/sweets.png');
		this.load.image(TextureKey.MINT, 'assets/img/mint.png');
		this.load.image(TextureKey.CANDY, 'assets/img/candy.png');
		this.load.image(TextureKey.CHOCOLATE, 'assets/img/chocolate.png');
		this.load.image(TextureKey.PEPPERMINT, 'assets/img/peppermint.png');
		this.load.image(TextureKey.CANDY_2, 'assets/img/candy2.png');
		this.load.image(TextureKey.GUM, 'assets/img/gum.png');
		this.load.image(TextureKey.TRUFFLE, 'assets/img/truffle.png');
		this.load.image(TextureKey.JELLY_BEANS, 'assets/img/jelly-beans.png');
		this.load.image(TextureKey.SPRINKLES, 'assets/img/sprinkles.png');
		this.load.image(TextureKey.LOLLIPOP, 'assets/img/lollipop.png');
		this.load.image(TextureKey.GINGERBREAD_MAN, 'assets/img/gingerbread-man.png');
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
		const previousHouseNumber = localStorage.getItem(Key.HOUSE_NUMBER);
		while (houseNumber === parseInt(previousHouseNumber, 10)) {
			houseNumber = this.getRandomHouseNumber();
		}
		localStorage.setItem(Key.HOUSE_NUMBER, houseNumber);
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
		this.add.image(this.stage.x + this.stage.width / 2, this.stage.y + this.stage.height / 2, TextureKey.HOUSE);
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
		const colors = [Color.RED, Color.PINK, Color.GREEN, Color.PALE_GREEN, Color.BLUE, Color.PALE_BLUE, Color.YELLOW, Color.OFF_WHITE];

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
			TextureKey.CANDY_CANE,
			TextureKey.GUMMY_BEAR,
			TextureKey.SWEETS,
			TextureKey.MINT,
			TextureKey.CANDY,
			TextureKey.CHOCOLATE,
			TextureKey.PEPPERMINT,
			TextureKey.CANDY_2,
			TextureKey.GUM,
			TextureKey.TRUFFLE,
			TextureKey.JELLY_BEANS,
			TextureKey.SPRINKLES,
			TextureKey.LOLLIPOP,
			TextureKey.GINGERBREAD_MAN
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
		this.addStampSizeOption(945, 535, 'Small', 920, 525, StampSize.SMALL);
		this.addStampSizeOption(945, 590, 'Normal', 913, 580, StampSize.NORMAL);
		this.addStampSizeOption(945, 645, 'Large', 920, 635, StampSize.LARGE);
		this.addStampSizeOption(945, 700, 'X-Large', 910, 687, StampSize.EXTRA_LARGE);
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
			Tool.CIRCLE,
			Tool.STROKE_CIRCLE,
			Tool.SQUARE,
			Tool.STROKE_SQUARE,
			Tool.STAR,
			Tool.STROKE_STAR,
			Tool.ERASER,
			Tool.STAMP
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
			case Tool.SQUARE:
				this.addSquareIcon(x, y, false);
				break;
			case Tool.STROKE_SQUARE:
				this.addSquareIcon(x, y, true);
				break;
			case Tool.CIRCLE:
				this.addCircleIcon(x, y, false);
				break;
			case Tool.STROKE_CIRCLE:
				this.addCircleIcon(x, y, true);
				break;
			case Tool.STAR:
				this.addStarIcon(x, y, false);
				break;
			case Tool.STROKE_STAR:
				this.addStarIcon(x, y, true);
				break;
			case Tool.ERASER:
				this.addImageIcon(x, y, TextureKey.ERASER_ICON);
				break;
			case Tool.STAMP:
				this.addImageIcon(x, y, TextureKey.STAMP_ICON);
				break;
		}
	}

	addSquareIcon(x, y, isStroke) {
		const icon = this.add.rectangle(x, y, SQUARE_ICON_WIDTH, SQUARE_ICON_HEIGHT, isStroke ? Color.WHITE : Color.BLACK);
		icon.setStrokeStyle(ICON_LINE_WIDTH, Color.BLACK);
	}

	addCircleIcon(x, y, isStroke) {
		const icon = this.add.circle(x, y, CIRCLE_ICON_RADIUS, isStroke ? Color.WHITE : Color.BLACK);
		icon.setStrokeStyle(ICON_LINE_WIDTH, Color.BLACK);
	}

	addStarIcon(x, y, isStroke) {
		const icon = this.add.star(
			x,
			y,
			STAR_ICON_POINTS,
			STAR_ICON_INNER_RADIUS,
			STAR_ICON_OUTER_RADIUS,
			isStroke ? Color.WHITE : Color.BLACK
		);
		icon.setStrokeStyle(ICON_LINE_WIDTH, Color.BLACK);
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
				case Tool.SQUARE:
					shape = this.drawSquare(pointer.x, pointer.y, this.brushColor, false);
					break;
				case Tool.STROKE_SQUARE:
					shape = this.drawSquare(pointer.x, pointer.y, this.brushColor, true);
					break;
				case Tool.CIRCLE:
					shape = this.drawCircle(pointer.x, pointer.y, this.brushColor, false);
					break;
				case Tool.STROKE_CIRCLE:
					shape = this.drawCircle(pointer.x, pointer.y, this.brushColor, true);
					break;
				case Tool.STAR:
					shape = this.drawStar(pointer.x, pointer.y, this.brushColor, false);
					break;
				case Tool.STROKE_STAR:
					shape = this.drawStar(pointer.x, pointer.y, this.brushColor, true);
					break;
				case Tool.STAMP:
					shape = this.drawStamp(pointer.x, pointer.y, this.stampTextureKey, this.stampSize);
					break;
				case Tool.ERASER:
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
