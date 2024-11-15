import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super('game');
	}

	preload() {
		this.load.image('gingerbread-man', 'assets/img/gingerbread-man.png');
	}

	create() {
        this.width = 15;
		this.height = 15;
		this.radius = 7;
		this.brushColor = 0xff0000;
		this.brush = 'square';
		this.createColorToolbar();
		this.createBrushToolbar();
		this.gingerbreadMan = this.add.image(500, 300, 'gingerbread-man');
	}

	createColorToolbar() {
		const width = 50;
		const height = 50;
		const x = 50;
		const y = 300;
		const offset = 55;
        const colors = [0xff0000, 0xff7878, 0xffffff, 0x74d680, 0xc6efff, 0x8cd4ff];
        this.add.text(45, 250, 'Colors', {
            fontFamily: 'arial',
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

	createBrushToolbar() {
        this.add.text(40, 40, 'Brushes', {
            fontFamily: 'arial',
            fontSize: '20px',
            color: '#000000'            
        });
        this.createBrushOption('square', 50, 90, 50, 50);
        this.createBrushOption('stroke-square', 105, 90, 50, 50);
        this.createBrushOption('circle', 50, 145, 50, 50);
        this.createBrushOption('stroke-circle', 105, 145, 50, 50);
        this.createBrushOption('star', 50, 200, 50, 50);
        this.createBrushOption('stroke-star', 105, 200, 50, 50);
    }
    
    createBrushOption(brush, x, y, width, height) {
        const brushRectangle = this.add.rectangle(x, y, width, height, 0xd3d3d3);
		this.createBrushIcon(brush, x, y);
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

    createBrushIcon(brush, x, y) {
        let brushIcon = null;
        switch(brush) {
            case 'square':
                brushIcon = this.add.rectangle(x, y, 25, 25, 0x000000);
                break;
            case 'stroke-square':
                brushIcon = this.add.rectangle(x, y, 25, 25, 0xFFFFFF);
                break;
            case 'circle':
                brushIcon = this.add.circle(x, y, 15, 0x000000);
                break;
            case 'stroke-circle':
                brushIcon = this.add.circle(x, y, 15, 0xFFFFFF);
                break
            case 'star':
                brushIcon = this.add.star(x, y, 5, 9, 18, 0x000000);
                break;
            case 'stroke-star': 
                brushIcon = this.add.star(x, y, 5, 9, 18, 0xFFFFFF);
                break;
        }
        brushIcon.setStrokeStyle(3, 0x000000);
    }

	update() {
		const pointer = this.input.activePointer;

		if (pointer.isDown && pointer.x > 150) {
			switch (this.brush) {
				case 'square':
                    this.add.rectangle(pointer.x - this.width / 2, pointer.y - this.height / 2, this.width, this.height, this.brushColor);
					break;
				case 'stroke-square':
                    const rectangle = this.add.rectangle(pointer.x - this.width / 2, pointer.y - this.height / 2, this.width, this.height);
                    rectangle.setStrokeStyle(3,this.brushColor);
					break;
				case 'circle':
					this.add.circle(pointer.x, pointer.y, this.radius, this.brushColor);
					break;
				case 'stroke-circle':
                    const circle = this.add.circle(pointer.x, pointer.y, this.radius);
                    circle.setStrokeStyle(3, this.brushColor);
                    break;
                case 'star': 
                    this.add.star(pointer.x, pointer.y, 5, 5, 10, this.brushColor);
                    break;
                case 'stroke-star': 
                    const star = this.add.star(pointer.x, pointer.y, 5, 5, 10);
                    star.setStrokeStyle(3, this.brushColor);
                    break;
            
			}
        }
    
	}
}
