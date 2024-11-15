import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
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
