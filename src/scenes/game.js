import Phaser from 'phaser';

const SIGN_TILE = 144;
const CLOSE_WINDOW_TILE = 258;
const OPEN_WINDOW_TILE = 235;
const COFFIN_TILES = [71, 95];
const DESTROYED_KNIGHT_TILE = 96;

const TOP_CHAIR_TILE = 312;
const MIDDLE_CHAIR_TILE = 336;
const BOTTOM_CHAIR_TILE = 360;

const SECRET_TILE_X = 6;
const SECRET_TILE_Y = 3;
const HOLE_IN_WALL_TILE = 249;

export default class GameScene extends Phaser.Scene {
	signs = null;
	door = null;
	chests = null;
	tilemap = null;
	safes = null;
	items = [];
	selectedItem = null;
	selectedRectangle = null;
	dialogGroup = null;

	constructor() {
		super();
	}

	preload() {
		this.load.tilemapTiledJSON('tilemap', 'assets/json/escape-room-map.json');
		this.load.image('tiles', 'assets/img/tiles.png');
		this.load.image('frame', 'assets/img/frame.png');
		this.load.spritesheet('items', 'assets/img/items.png', { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('ui', 'assets/img/ui.png', { frameWidth: 32, frameHeight: 13 });
		this.load.spritesheet('chest', 'assets/img/chest.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('door', 'assets/img/door.png', { frameWidth: 24, frameHeight: 32 });
		this.load.spritesheet('safe', 'assets/img/combolock.png', { frameWidth: 32, frameHeight: 40 });
	}

	create() {
		this.tilemap = this.createTilemap('tilemap');
		const tileset = this.createTileset(this.tilemap, 'cavern_ruins', 'tiles');
		const { objectsLayer, foregroundLayer } = this.createLayers(this.tilemap, tileset);
		this.chests = this.createChests(objectsLayer);
		this.door = this.createDoor(objectsLayer);
		this.safes = this.createSafes(objectsLayer);
		this.scrambledSigns = this.createScrambledSigns(objectsLayer);
		this.signs = this.createSigns(objectsLayer);
		this.createHud();
		this.startTimer(1);
	}

	createHud() {
		this.add.text(920, 30, 'Items', { fontSize: '18px' });
	}

	updateHud() {
		for (let i = 0; i < this.items.length; i++) {
			const image = this.add.image(950, i * 50 + 80, this.items[i].texture, this.items[i].frame);
			image.setScale(2);
			image.setInteractive();
			image.on('pointerdown', () => {
				if (this.selectedRectangle) {
					this.selectedRectangle.destroy();
				}
				this.selectedItem = this.items[i];
				this.selectedRectangle = this.add.rectangle(image.x, image.y, 50, 50);
				this.selectedRectangle.setStrokeStyle(3, 0xffffff);
			});
		}
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

	createSafes(objectsLayer) {
		const safes = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === 'safe') {
				const safe = this.add.sprite(spawnObject.x, spawnObject.y, 'safe', 12);
				const combination = spawnObject.properties.find((property) => property.name === 'combination');
				const promptMessage = spawnObject.properties.find((property) => property.name === 'promptMessage');
				const spawnItem = spawnObject.properties.find((property) => property.name === 'spawnItem');
				const spawnItemTexture = spawnObject.properties.find((property) => property.name === 'spawnItemTexture');
				const spawnItemFrame = spawnObject.properties.find((property) => property.name === 'spawnItemFrame');
				const spawnItemDescription = spawnObject.properties.find((property) => property.name === 'spawnItemDescription');
				const spawnItemX = spawnObject.properties.find((property) => property.name === 'spawnItemX');
				const spawnItemY = spawnObject.properties.find((property) => property.name === 'spawnItemY');

				safe.setInteractive();
				safe.name = spawnObject.name;
				safe.combination = combination?.value;
				safe.promptMessage = promptMessage?.value;
				safe.opened = false;
				safe.on('pointerdown', () => {
					if (!safe.opened) {
						const answer = window.prompt(safe.promptMessage);
						if (answer === safe.combination) {
							safe.play('safe-open');
							safe.opened = true;
							this.spawnItem(
								spawnItemX?.value,
								spawnItemY?.value,
								spawnItem?.value,
								spawnItemTexture?.value,
								spawnItemFrame?.value,
								spawnItemDescription?.value
							);
						}
					}
				});
				safes.push(safe);
			}
		});
		this.anims.create({
			key: 'safe-open',
			frames: this.anims.generateFrameNumbers('safe', { frames: [13] }),
			frameRate: 4
		});
		return safes;
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
				const spawnItem = spawnObject.properties.find((property) => property.name === 'spawnItem');
				const spawnItemTexture = spawnObject.properties.find((property) => property.name === 'spawnItemTexture');
				const spawnItemFrame = spawnObject.properties.find((property) => property.name === 'spawnItemFrame');
				const spawnItemDescription = spawnObject.properties.find((property) => property.name === 'spawnItemDescription');
				const spawnItemX = spawnObject.properties.find((property) => property.name === 'spawnItemX');
				const spawnItemY = spawnObject.properties.find((property) => property.name === 'spawnItemY');
				chest.name = spawnObject.name;
				chest.locked = locked?.value;
				chest.lockedMessage = lockedMessage?.value;
				chest.setInteractive();
				chest.on('pointerdown', () => {
					if (chest.locked) {
						this.showDialog(chest.lockedMessage);
					} else {
						chest.play('chest-open');
						this.spawnItem(
							spawnItemX?.value,
							spawnItemY?.value,
							spawnItem?.value,
							spawnItemTexture?.value,
							spawnItemFrame?.value,
							spawnItemDescription?.value
						);
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

	createScrambledSigns(objectsLayer) {
		const signs = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === 'scrambled-sign') {
				let sign = this.add.image(spawnObject.x, spawnObject.y);
				const text = spawnObject.properties.find((property) => property.name === 'text');
				const scrambled = spawnObject.properties.find((property) => property.name === 'scrambled');
				const scrambledText = spawnObject.properties.find((property) => property.name === 'scrambledText');
				const visible = spawnObject.properties.find((property) => property.name === 'visible');
				sign.setOrigin(0, 0);
				sign.setInteractive();
				sign.name = spawnObject.name;
				sign.text = text?.value;
				sign.visible = visible?.value;
				sign.scrambled = scrambled?.value;
				sign.scrambledText = scrambledText?.value;
				sign.on('pointerdown', () => {
					if (sign.visible) {
						if (sign.scrambled) {
							this.showDialog(sign.scrambledText);
						} else {
							this.showDialog(sign.text);
						}
					}
				});
				signs.push(sign);
			}
		});
		return signs;
	}

	createSigns(objectsLayer) {
		const signs = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === 'sign') {
				let sign = this.add.image(spawnObject.x, spawnObject.y);
				const text = spawnObject.properties.find((property) => property.name === 'text');
				const visible = spawnObject.properties.find((property) => property.name === 'visible');
				sign.setOrigin(0, 0);
				sign.setInteractive();
				sign.name = spawnObject.name;
				sign.text = text?.value;
				sign.visible = visible?.value;
				sign.on('pointerdown', () => {
					if (sign.visible) {
						this.showDialog(sign.text);
					}
				});
				signs.push(sign);
			}
		});
		return signs;
	}

	scrambleDialogs(scrambled) {
		this.scrambledSigns.forEach((dialog) => (dialog.scrambled = scrambled));
	}

	showDialog(text, itemTexture, itemFrame, closeCallback) {
		if (this.dialogGroup) {
			this.dialogGroup.destroy(true, false);
		}
		this.dialogGroup = this.add.group();
		const dialogFrame = this.add.nineslice(450, 350, 'frame', null, 300, 550);
		let textY = 350;
		if (itemTexture) {
			textY = 330;
			const dialogImage = this.add.image(450, 360, itemTexture, itemFrame);
			dialogImage.setScale(2);
			dialogImage.setOrigin(0.5, 0.5);
			this.dialogGroup.add(dialogImage);
		}
		const dialogText = this.add.text(450, textY, text, {
			fontFamily: 'Verdana',
			fontSize: '12px'
		});
		dialogText.setOrigin(0.5, 0.5);
		dialogText.setWordWrapWidth(250);
		const closeButton = this.add.image(585, 300, 'ui', 2);
		closeButton.setInteractive();

		this.dialogGroup.add(closeButton);
		this.dialogGroup.add(dialogText);
		this.dialogGroup.add(dialogFrame);
		closeButton.on('pointerdown', () => {
			this.dialogGroup.destroy(true, false);
			if (closeCallback) {
				closeCallback();
			}
		});
	}

	getDialog(dialogs, name) {
		return dialogs.find((dialog) => dialog.name == name);
	}

	isBreakableWindowTile(tile) {
		return tile?.index === CLOSE_WINDOW_TILE;
	}

	breakWindow(x, y) {
		this.updateTile(this.tilemap, OPEN_WINDOW_TILE, x, y);
	}

	getBreakableWindowsTiles(tilemap) {
		return tilemap.filterTiles((tile) => tile.index === CLOSE_WINDOW_TILE);
	}

	hasBreakableWindowsTiles() {
		return this.getBreakableWindowsTiles(this.tilemap).length === 0 ? false : true;
	}

	getCoffinTiles(tilemap) {
		return this.tilemap.filterTiles((tile) => COFFIN_TILES.includes(tile.index));
	}

	destroyCoffin() {
		this.tilemap.removeTile(this.getCoffinTiles(this.tilemap));
	}

	updateTile(tilemap, tileIndex, x, y) {
		tilemap.putTileAt(tileIndex, x, y, false);
	}

	spawnItem(x, y, itemName, itemTexture, itemFrame, itemDescription) {
		const item = this.add.image(x, y, itemTexture, itemFrame);
		item.setScale(2);
		item.setInteractive();
		item.on('pointerdown', () => {
			item.destroy();
			this.showDialog(itemDescription, itemTexture, itemFrame, () => {
				this.items.push({
					name: itemName,
					texture: itemTexture,
					frame: itemFrame
				});
				this.updateHud();
			});
		});
	}

	isChairTile(tile) {
		return (tile?.x === 23 && tile?.y === 4) || (tile?.x === 23 && tile?.y === 5) || (tile?.x === 23 && tile?.y === 6);
	}

	moveChair() {
		this.tilemap.putTileAt(TOP_CHAIR_TILE, 22, 4);
		this.tilemap.putTileAt(MIDDLE_CHAIR_TILE, 22, 5);
		this.tilemap.putTileAt(BOTTOM_CHAIR_TILE, 22, 6);
		this.tilemap.putTileAt(SIGN_TILE, 23, 6);
		this.tilemap.removeTileAt(23, 4);
		this.tilemap.removeTileAt(23, 5);
		const sign = this.signs.find((sign) => sign.name === 'chair-sign');
		sign.visible = true;
	}

	isKnightTile(tile) {
		return (tile?.x === 22 && tile?.y === 15) || (tile?.x === 22 && tile?.y === 16);
	}

	destroyKnight() {
		const sign = this.signs.find((sign) => sign.name === 'knight-sign');
		sign.visible = true;
		this.tilemap.putTileAt(SIGN_TILE, 22, 15);
		this.tilemap.putTileAt(DESTROYED_KNIGHT_TILE, 22, 16);
	}

	isBreakableWallTile(tile) {
		return tile?.x === SECRET_TILE_X && tile?.y === SECRET_TILE_Y;
	}

	breakWall(x, y) {
		this.tilemap.putTileAt(HOLE_IN_WALL_TILE, x, y);
	}

	isGargoyleTile(tile) {
		return (
			(tile?.x === 3 && tile?.y === 15) ||
			(tile?.x === 3 && tile?.y === 16) ||
			(tile?.x === 4 && tile?.y === 15) ||
			(tile?.x === 4 && tile?.y === 16)
		);
	}

	moveGargoyle(tile) {
		this.tilemap.putTileAt(232, 2, 15);
		this.tilemap.putTileAt(233, 3, 15);
		this.tilemap.putTileAt(256, 2, 16);
		this.tilemap.putTileAt(257, 3, 16);
		this.tilemap.removeTileAt(4, 15);
		this.tilemap.removeTileAt(4, 16);
	}

	isFireTile(tile) {
		return (
			(tile?.x === 12 && tile?.y === 18) ||
			(tile?.x === 13 && tile?.y === 18) ||
			(tile?.x === 14 && tile?.y === 18) ||
			(tile?.x === 12 && tile?.y === 19) ||
			(tile?.x === 13 && tile?.y === 19) ||
			(tile?.x === 14 && tile?.y === 19) ||
			(tile?.x === 12 && tile?.y === 20) ||
			(tile?.x === 13 && tile?.y === 20) ||
			(tile?.x === 14 && tile?.y === 20)
		);
	}

	extinguishFire() {
		this.tilemap.putTileAt(10, 12, 18);
		this.tilemap.putTileAt(11, 13, 18);
		this.tilemap.putTileAt(12, 14, 18);
		this.tilemap.putTileAt(34, 12, 19);
		this.tilemap.putTileAt(35, 13, 19);
		this.tilemap.putTileAt(36, 14, 19);
		this.tilemap.putTileAt(58, 12, 20);
		this.tilemap.putTileAt(59, 13, 20);
		this.tilemap.putTileAt(60, 14, 20);
	}

	isSkeletonTile(tile) {
		return tile?.x === 7 && tile?.y === 9;
	}

	digSkeleton() {
		this.tilemap.putTileAt(316, 7, 9);
	}

	startTimer(numberOfHours) {
		if (!this.isRunning) {
			const now = new Date().getTime();
			this.countDownDate = new Date(now + numberOfHours * 60 * 60 * 1000).getTime();
			this.isRunning = false;
			this.isTimeElapsed = false;
			this.interval = setInterval(() => {
				this.isRunning = true;
				const now = new Date().getTime();
				this.timeRemaining = this.countDownDate - now;
				if (now >= this.countDownDate) {
					this.isRunning = false;
					this.isTimeElapsed = true;
					clearInterval(this.interval);
				}
			}, 1000);
		}
	}

	updateTime() {
		if (this.timeText) {
			this.timeText.destroy();
		}
		const hoursRemaining = Math.floor((this.timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutesRemaining = Math.floor((this.timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
		const secondsRemaining = Math.floor((this.timeRemaining % (1000 * 60)) / 1000);

		if (this.timeRemaining) {
			this.timeText = this.add.text(920, 700, `${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`, {
				fontSize: '12px'
			});
		}
	}

	update(time, delta) {
		this.updateTime();

		if (this.isTimeElapsed) {

		}

		if (this.selectedItem?.name === 'book') {
			this.scrambleDialogs(false);
		} else {
			this.scrambleDialogs(true);
		}

		if (this.selectedItem?.name == 'key') {
			const chest = this.chests.find((chest) => chest.name === 'chest');
			chest.locked = false;
		} else {
			const chest = this.chests.find((chest) => chest.name === 'chest');
			chest.locked = true;
		}

		if (this.selectedItem?.name == 'master-key') {
			this.door.locked = false;
		} else {
			this.door.locked = true;
		}

		const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

		// Rounds down to nearest tile
		const pointerTileX = this.tilemap.worldToTileX(worldPoint.x);
		const pointerTileY = this.tilemap.worldToTileY(worldPoint.y);

		if (this.input.manager.activePointer.isDown) {
			const tile = this.tilemap.getTileAt(pointerTileX, pointerTileY, false, 'foreground');

			if (this.isBreakableWindowTile(tile) && this.selectedItem?.name === 'hammer') {
				this.breakWindow(pointerTileX, pointerTileY);
				if (!this.hasBreakableWindowsTiles()) {
					this.destroyCoffin();
					this.spawnItem(530, 205, 'ring', 'items', 13, 'You got the power ring');
				}
			}

			// move chair when clicked on it
			if (this.isChairTile(tile)) {
				this.moveChair();
			}

			// if tile if knight
			if (this.isKnightTile(tile) && this.selectedItem?.name === 'potion') {
				this.destroyKnight();
			}

			if (this.isBreakableWallTile(tile) && !this.wallBroken && this.selectedItem?.name === 'pickaxe') {
				this.wallBroken = true;
				this.breakWall(pointerTileX, pointerTileY);
				this.spawnItem(205, 140, 'key', 'items', 50, 'You got the key');
			}

			// if tile is gargoyle
			if (this.isGargoyleTile(tile) && !this.gargoyleMoved && this.selectedItem?.name === 'ring') {
				this.gargoyleMoved = true;
				this.moveGargoyle();
				this.spawnItem(145, 525, 'potion', 'items', 61, 'You got the magic solvent');
			}

			if (this.isFireTile(tile) && !this.fireExtinguish && this.selectedItem?.name === 'ice-rod') {
				this.fireExtinguish = true;
				this.extinguishFire();
				this.spawnItem(435, 620, 'pickaxe', 'items', 83, 'You got the pickaxe');
			}
			if (this.isSkeletonTile(tile) && !this.isDigged && this.selectedItem?.name === 'shovel') {
				this.isDigged = true;
				this.digSkeleton();
				this.spawnItem(250, 300, 'master-key', 'items', 51, 'You got the master key');
			}
		}
	}
}
