import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.tilemapTiledJSON('tilemap', 'assets/json/escape-room-map.json');
		this.load.image('cavern_ruins', 'assets/img/cavern_ruins.png');
		this.load.spritesheet('chest', 'assets/img/chest.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('door', 'assets/img/door.png', { frameWidth: 24, frameHeight: 32 });
		this.load.spritesheet('combolock', 'assets/img/combolock.png', { frameWidth: 32, frameHeight: 40 });
	}

	create() {
		const layers = this.createLayers();
		this.createChests(layers.objectsLayer);
		this.createDoor(layers.objectsLayer);
		this.createDialogs(layers.objectsLayer);
		this.createCombolocks(layers.objectsLayer);
	}

	createLayers() {
		const tileMap = this.make.tilemap({ key: 'tilemap' });
		const tileset = tileMap.addTilesetImage('cavern_ruins', 'cavern_ruins');
		const backgroundLayer = tileMap.createLayer('background', tileset);
		const foregroundLayer = tileMap.createLayer('foreground', tileset);
		const objectsLayer = tileMap.getObjectLayer('objects');

		return { backgroundLayer, foregroundLayer, objectsLayer };
	}

	createDialogs(objectsLayer) {
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.name === 'dialog') {
				const dialog = this.add.sprite(spawnObject.x, spawnObject.y);
				dialog.setInteractive();
				const text = spawnObject.properties.find((property) => property.name === 'text');
				dialog.on('pointerdown', () => {
					console.log(text.value);
				});
			}
		});
	}

	createCombolocks(objectsLayer) {
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.name === 'combolock') {
				const chest = this.add.sprite(spawnObject.x, spawnObject.y, 'combolock', 12);
				chest.setInteractive();
				chest.on('pointerdown', () => {
					chest.play('combolock-open');
				});
			}
		});
		this.anims.create({
			key: 'combolock-open',
			frames: this.anims.generateFrameNumbers('combolock', { frames: [13] }),
			frameRate: 4
		});
	}

	createDoor(objectsLayer) {
		const doorSpawnPoint = objectsLayer.objects.find((spawnObject) => {
			return spawnObject.name === 'door';
		});
		const door = this.add.sprite(doorSpawnPoint.x, doorSpawnPoint.y, 'door', 10);
		door.setInteractive();
		door.setScale(2);
		door.on('pointerdown', () => {
			door.play('door-open');
		});
		this.anims.create({
			key: 'door-open',
			frames: this.anims.generateFrameNumbers('door', { frames: [5, 0] }),
			frameRate: 4
		});
	}

	createChests(objectsLayer) {
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.name === 'chest') {
				const chest = this.add.sprite(spawnObject.x, spawnObject.y, 'chest');
				chest.setInteractive();
				chest.on('pointerdown', () => {
					chest.play('chest-open');
				});
			}
		});
		this.anims.create({
			key: 'chest-open',
			frames: this.anims.generateFrameNumbers('chest', { frames: [1] }),
			frameRate: 8,
			repeat: -1
		});
	}

	update() {}
}
