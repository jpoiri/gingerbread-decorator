import Phaser, { Textures } from 'phaser';
import GameScene from './scenes/Game';

const config = {
	type: Phaser.CANVAS,
	backgroundColor: '#FFFFFF',
	debug: true,
	scale: {
		mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
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
	scene: [GameScene]
};

const game = new Phaser.Game(config);
