import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {

    constructor() {
    }

    create() {
        this.add.text(500, 500, 'Game over');
    }

}