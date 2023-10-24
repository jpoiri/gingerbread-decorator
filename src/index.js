import Phaser from 'phaser';
import PlayScene from './scenes/play';
import GameOverScene  from './scenes/gameover';
import WinningScene from './scenes/winning';

const config = {
	type: Phaser.AUTO,
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
	scene: [PlayScene, GameOverScene, WinningScene]
};

const game = new Phaser.Game(config);
