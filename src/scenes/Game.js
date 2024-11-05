import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        // add preload logic
    }

    create() {
        const text = this.add.text(512, 250, 'Your first Phaser.js game', {
            fontSize: '50px',
            fontFamily: 'Verdana',
            fill: '#fff'
        });
        text.setStroke('#543873', 6);
        text.setOrigin(0.5, 0.5);
        
        // add create logic
    }

    update() {
        // add update logic
    }

}