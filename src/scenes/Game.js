import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        // add preload logic
    }

    create() {
        this.graphics = this.add.graphics({
            lineStyle: {
                width: 1,
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
        this.radius = 10;
        this.shape = 'stroke-rectangle';
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
                
            }
        }

        // add update logic
    }

}