import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        this.load.image('gingerbread-man', '../assets/img/gingerbread-man.png');
    }

    create() {
        this.createColorToolbar();
        this.gingerbreadMan = this.add.image(500, 400, 'gingerbread-man');
        this.graphics = this.add.graphics({
            lineStyle: {
                width: 3,
                color: 0xFFFFFF,
                line: 1
            },
            fillStyle: {
                width: 1,
                color: 0xFFFFFF,
                line: 1
            }
        });
        this.width = 30;
        this.height = 30;
        this.radius = 7;
        this.color = 'xFFFFFF';
        this.shape = 'circle';
    }

    createColorToolbar() {
        const width = 50;
        const height = 50;
        const x = 50;
        const y = 50;
        const offset = 55;
        const colors = [
            0xFF0000, 
            0xFF7878, 
            0xFFFFFF,
            0x74D680,
            0xC6EFFF,
            0x8CD4FF
        ];
        for (let i = 0, rows = 0, len=colors.length; i < len; i++) {
            if (i > 0 && i % 2 === 0) {
                rows++;
            }
            const colorRectangle = this.add.rectangle((i % 2 === 0) ? x : x + offset, offset * rows + y, width, height, colors[i]);
            colorRectangle.setInteractive();
            colorRectangle.on('pointerdown', () => {
                if (this.selectedColorRectangle) {
                    this.selectedColorRectangle.destroy();
                }
                this.selectedColorRectangle = this.add.rectangle(colorRectangle.x, colorRectangle.y, 50, 50);
                this.selectedColorRectangle.setStrokeStyle(3, 0x000000);
                this.graphics.fillStyle(colors[i]);
            });
        }
    }

    update() {
        const pointer = this.input.activePointer;

        if (pointer.isDown) {

            switch (this.shape) {
                case 'rectangle': 
                    this.graphics.fillRect(pointer.x - (this.width / 2), pointer.y - (this.height / 2), this.width, this.height);
                    break;
                case 'stroke-rectangle':
                    this.graphics.strokeRect(pointer.x - (this.width / 2), pointer.y - (this.height / 2), this.width, this.height);
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