import Phaser from 'phaser';

const FONT_FAMILY = 'arial';
const FONT_SIZE = '20px';


export default class GameScene extends Phaser.Scene {
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
