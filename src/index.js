import Phaser from 'phaser';
import PlayScene from './scenes/Play';
import GameOverScene  from './scenes/GameOver';
import WinScene from './scenes/Win';
import SplashScene from './scenes/Splash';

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
	scene: [SplashScene, PlayScene, GameOverScene, WinScene]
};

const game = new Phaser.Game(config);
