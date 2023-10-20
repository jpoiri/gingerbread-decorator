import Phaser from 'phaser';

const SIGN_TILE = 144;
const CLOSE_WINDOW_TILE = 258;
const OPEN_WINDOW_TILE = 235;
const COFFIN_TILES = [71, 95];
const KNIGHT_TILES = [119, 143];
const DESTROYED_KNIGHT_TILE = 96;
const GARGOYLE_TILES = [232, 233, 256, 257];
const TOMBSTONE_TILES = [333, 334, 335, 357, 358, 359];

const TOP_CHAIR_TILE = 312;
const MIDDLE_CHAIR_TILE = 336;
const BOTTOM_CHAIR_TILE = 360;
const CHAIR_TILES = [TOP_CHAIR_TILE, MIDDLE_CHAIR_TILE, BOTTOM_CHAIR_TILE];

const SMALL_PENTAGRAM_TILE = 255;
const SMALL_ACTIVE_PENTAGRAM_TILE = 234;

const SECRET_TILE_X = 5;
const SECRET_TILE_Y = 3;
const HOLE_IN_WALL_TILE = 249;

const TOP_PILLAR_TILE = 259;

export default class GameScene extends Phaser.Scene {
	dialogs = null;
	door = null;
	chests = null;
	tilemap = null;
	comboboxes = null;

	constructor() {
		super();
	}

	preload() {
		this.load.tilemapTiledJSON('tilemap', 'assets/json/escape-room-map.json');
		this.load.image('cavern_ruins', 'assets/img/cavern_ruins.png');
		this.load.image('brassy-frame', 'assets/img/brassy_frame.png');
		this.load.spritesheet('ui', 'assets/img/ui.png', { frameWidth: 32, frameHeight: 13 });
		this.load.spritesheet('chest', 'assets/img/chest.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('door', 'assets/img/door.png', { frameWidth: 24, frameHeight: 32 });
		this.load.spritesheet('combolock', 'assets/img/combolock.png', { frameWidth: 32, frameHeight: 40 });
	}

	create() {
		this.tilemap = this.createTilemap('tilemap');
		const tileset = this.createTileset(this.tilemap, 'cavern_ruins', 'cavern_ruins');
		const { objectsLayer, foregroundLayer } = this.createLayers(this.tilemap, tileset);
		this.chests = this.createChests(objectsLayer);
		this.door = this.createDoor(objectsLayer);
		this.comboboxes = this.createComboboxes(objectsLayer);
		this.dialogs = this.createDialogs(objectsLayer);
	}

	createTilemap(tilemapKey) {
		return this.make.tilemap({ key: tilemapKey });
	}

	createTileset(tilemap, tilesetKey, tilesetTextureKey) {
		return tilemap.addTilesetImage(tilesetKey, tilesetTextureKey);
	}

	createLayers(tilemap, tileset) {
		const backgroundLayer = tilemap.createLayer('background', tileset);
		const foregroundLayer = tilemap.createLayer('foreground', tileset);
		const objectsLayer = tilemap.getObjectLayer('objects');
		return { backgroundLayer, foregroundLayer, objectsLayer };
	}

	createComboboxes(objectsLayer) {
		const comboboxes = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === 'combobox') {
				const combobox = this.add.sprite(spawnObject.x, spawnObject.y, 'combolock', 12);
				const combination = spawnObject.properties.find((property) => property.name === 'combination');
				const promptMessage = spawnObject.properties.find((property) => property.name === 'promptMessage');
				combobox.setInteractive();
				combobox.name = spawnObject.name;
				combobox.combination = combination?.value;
				combobox.promptMessage = promptMessage?.value;
				combobox.on('pointerdown', () => {
					const answer = window.prompt(combobox.promptMessage);
					if (answer === combobox.combination) {
						combobox.play('combolock-open');
					}
				});
				comboboxes.push(combobox);
			}
		});
		this.anims.create({
			key: 'combolock-open',
			frames: this.anims.generateFrameNumbers('combolock', { frames: [13] }),
			frameRate: 4
		});
		return comboboxes;
	}

	createDoor(objectsLayer) {
		const doorSpawnPoint = objectsLayer.objects.find((spawnObject) => {
			return spawnObject.type === 'door';
		});
		const door = this.add.sprite(doorSpawnPoint.x, doorSpawnPoint.y, 'door', 10);
		const locked = doorSpawnPoint.properties.find((property) => property.name === 'locked');
		const lockedMessage = doorSpawnPoint.properties.find((property) => property.name === 'lockedMessage');
		door.setInteractive();
		door.setScale(2);
		door.name = doorSpawnPoint.name;
		door.locked = locked?.value;
		door.lockedMessage = lockedMessage?.value;
		door.on('pointerdown', () => {
			if (door.locked) {
				this.showDialog(door.lockedMessage);
			} else {
				door.play('door-open');
			}
		});
		this.anims.create({
			key: 'door-open',
			frames: this.anims.generateFrameNumbers('door', { frames: [5, 0] }),
			frameRate: 4
		});
		return door;
	}

	createChests(objectsLayer) {
		const chests = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === 'chest') {
				const chest = this.add.sprite(spawnObject.x, spawnObject.y, 'chest');
				const locked = spawnObject.properties.find((property) => property.name === 'locked');
				const lockedMessage = spawnObject.properties.find((property) => property.name === 'lockedMessage');
				chest.name = spawnObject.name;
				chest.locked = locked?.value;
				chest.lockedMessage = lockedMessage?.value;
				chest.setInteractive();
				chest.on('pointerdown', () => {
					if (chest.locked) {
						this.showDialog(chest.lockedMessage);
					} else {
						chest.play('chest-open');
					}
				});
				chests.push(chest);
			}
		});
		this.anims.create({
			key: 'chest-open',
			frames: this.anims.generateFrameNumbers('chest', { frames: [1] }),
			frameRate: 8,
			repeat: -1
		});
		return chests;
	}

	createDialogs(objectsLayer) {
		const dialogs = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === 'dialog') {
				const dialog = this.add.image(spawnObject.x, spawnObject.y);
				const text = spawnObject.properties.find((property) => property.name === 'text');
				const scrambled = spawnObject.properties.find((property) => property.name === 'scrambled');
				const scrambledText = spawnObject.properties.find((property) => property.name === 'scrambledText');
				const visible = spawnObject.properties.find((property) => property.name === 'visible');
				dialog.setOrigin(0, 0);
				dialog.setInteractive();
				dialog.name = spawnObject.name;
				dialog.text = text?.value;
				dialog.visible = visible?.value;
				dialog.scrambled = scrambled?.value;
				dialog.scrambledText = scrambledText?.value;
				dialog.on('pointerdown', () => {
					if (dialog.visible) {
						if (dialog.scrambled) {
							this.showDialog(dialog.scrambledText);
						} else {
							this.showDialog(dialog.text);
						}
					}
				});
				dialogs.push(dialog);
			}
		});
		return dialogs;
	}

	unscrambleDialogs(dialogs) {
		dialogs.forEach((dialog) => (dialog.scrambled = false));
	}

	showDialog(text) {
		const dialog = this.add.nineslice(400, 250, 'brassy-frame', null, 300, 550);
		const dialogText = this.add.text(400, 250, text, {
			fontFamily: 'Verdana',
			fontSize: '12px'
		});
		dialogText.setOrigin(0.5, 0.5);
		dialogText.setWordWrapWidth(250);
		const closeButton = this.add.sprite(535, 195, 'ui', 2);
		closeButton.setInteractive();
		closeButton.on('pointerdown', () => {
			dialog.destroy();
			closeButton.destroy();
			dialogText.destroy();
		});
	}

	getDialog(dialogs, name) {
		return dialogs.find((dialog) => dialog.name == name);
	}

	update() {
		const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

		// Rounds down to nearest tile
		const pointerTileX = this.tilemap.worldToTileX(worldPoint.x);
		const pointerTileY = this.tilemap.worldToTileY(worldPoint.y);

		if (this.input.manager.activePointer.isDown) {
			const tile = this.tilemap.getTileAt(pointerTileX, pointerTileY, false, 'foreground');

			if (tile?.index === CLOSE_WINDOW_TILE) {
				this.tilemap.putTileAt(OPEN_WINDOW_TILE, pointerTileX, pointerTileY, false);
				const closedWindows = this.tilemap.filterTiles((tile) => tile.index === CLOSE_WINDOW_TILE);
				if (closedWindows.length === 0) {
					const coffinTiles = this.tilemap.filterTiles((tile) => {
						return COFFIN_TILES.includes(tile.index);
					});
					this.tilemap.removeTile(coffinTiles);
				}
			}

			// move chair when clicked on it
			if (CHAIR_TILES.includes(tile?.index)) {
				this.tilemap.putTileAt(TOP_CHAIR_TILE, 22, 4);
				this.tilemap.putTileAt(MIDDLE_CHAIR_TILE, 22, 5);
				this.tilemap.putTileAt(BOTTOM_CHAIR_TILE, 22, 6);
				this.tilemap.removeTileAt(21, 4);
				this.tilemap.removeTileAt(21, 5);
				this.tilemap.removeTileAt(21, 6);
				this.unscrambleDialogs(this.dialogs);
				this.chests[0].locked = false;
				this.door.locked = false;
			}

			// if tile if knight
			if (KNIGHT_TILES.includes(tile?.index)) {
				const hiddenDialog = this.getDialog(this.dialogs, 'hidden-dialog');
				console.dir(hiddenDialog);
				hiddenDialog.visible = true;
				this.tilemap.putTileAt(SIGN_TILE, 22, 13);
				this.tilemap.putTileAt(DESTROYED_KNIGHT_TILE, 22, 14);
			}

			if (tile?.x === SECRET_TILE_X && tile?.y === SECRET_TILE_Y) {
				this.tilemap.putTileAt(HOLE_IN_WALL_TILE, pointerTileX, pointerTileY);
			}

			if (tile?.index === TOP_PILLAR_TILE) {
				this.tilemap.removeTileAt(pointerTileX, pointerTileY);
			}

			// if tile is gargoyle
			if (GARGOYLE_TILES.includes(tile?.index)) {
				if ([2, 3].includes(tile?.x)) {
					this.tilemap.putTileAt(232, 1, 13);
					this.tilemap.putTileAt(233, 2, 13);
					this.tilemap.putTileAt(256, 1, 14);
					this.tilemap.putTileAt(257, 2, 14);
					this.tilemap.removeTileAt(3, 13);
					this.tilemap.removeTileAt(3, 14);
				} else {
					this.tilemap.putTileAt(232, 8, 13);
					this.tilemap.putTileAt(233, 9, 13);
					this.tilemap.putTileAt(256, 8, 14);
					this.tilemap.putTileAt(257, 9, 14);
					this.tilemap.removeTileAt(7, 13);
					this.tilemap.putTileAt(SMALL_PENTAGRAM_TILE, 7, 14);
				}
			}

			if (tile?.index === SMALL_PENTAGRAM_TILE) {
				this.tilemap.putTileAt(SMALL_ACTIVE_PENTAGRAM_TILE, 7, 14);
			}
		}
	}
}
