import Phaser from 'phaser';
import Chest from '../entities/Chest';
import Safe from '../entities/Safe';
import Door from '../entities/Door';
import Sign from '../entities/Sign';
import ScrambledSign from '../entities/ScrambledSign';
import { CustomProperty, TilemapLayer, EntityType, LoaderKey, Tile, Item, Animation, Frame } from '../constants';

const SECRET_TILE_X = 6;
const SECRET_TILE_Y = 3;

export default class PlayScene extends Phaser.Scene {
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
		super('play');
	}

	preload() {
		this.load.tilemapTiledJSON(LoaderKey.TILEMAP, 'assets/json/escape-room-map.json');
		this.load.image(LoaderKey.TILESET, 'assets/img/tiles.png');
		this.load.image(LoaderKey.FRAME, 'assets/img/frame.png');
		this.load.spritesheet(LoaderKey.ITEMS, 'assets/img/items.png', { frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet(LoaderKey.UI, 'assets/img/ui.png', { frameWidth: 32, frameHeight: 13 });
		this.load.spritesheet(LoaderKey.CHEST, 'assets/img/chest.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet(LoaderKey.DOOR, 'assets/img/door.png', { frameWidth: 24, frameHeight: 32 });
		this.load.spritesheet(LoaderKey.SAFE, 'assets/img/safe.png', { frameWidth: 32, frameHeight: 40 });
	}

	create() {
		this.tilemap = this.createTilemap(LoaderKey.TILEMAP);
		const tileset = this.createTileset(this.tilemap, 'cavern_ruins', LoaderKey.TILESET);
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
		const text = this.add.text(920, 20, 'Items', { fontSize: '20px', fontFamily: 'Verdana' });
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
		const backgroundLayer = tilemap.createLayer(TilemapLayer.BACKGROUND, tileset);
		const foregroundLayer = tilemap.createLayer(TilemapLayer.FOREGROUND, tileset);
		const objectsLayer = tilemap.getObjectLayer(TilemapLayer.OBJECTS);
		return { backgroundLayer, foregroundLayer, objectsLayer };
	}

	createSafes(objectsLayer) {
		const safes = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === EntityType.SAFE) {
				const safe = new Safe(
					this,
					spawnObject.x,
					spawnObject.y,
					LoaderKey.SAFE,
					12,
					spawnObject.name,
					this.getCustomProperty(spawnObject, CustomProperty.COMBINATION),
					this.getCustomProperty(spawnObject, CustomProperty.PROMPT_MESSAGE),
					this.getCustomProperty(spawnObject, CustomProperty.SPAWN_ITEM_NAME),
					this.getCustomProperty(spawnObject, CustomProperty.SPAWN_ITEM_TEXTURE),
					this.getCustomProperty(spawnObject, CustomProperty.SPAWN_ITEM_FRAME),
					this.getCustomProperty(spawnObject, CustomProperty.SPAWN_ITEM_DESCRIPTION)
				);
				safe.on('pointerdown', () => {
					if (!safe.isOpened()) {
						const answer = window.prompt(safe.getPromptMessage());
						if (answer && answer.toLocaleUpperCase() === safe.getCombination().toLocaleUpperCase()) {
							safe.play(Animation.SAFE_OPEN);
							safe.setOpened(true);
							this.spawnItem(
								safe.x,
								safe.y + safe.height,
								safe.getSpawnItemName(),
								safe.getSpawnItemTexture(),
								safe.getSpawnItemFrame(),
								safe.getSpawnItemDescription()
							);
						}
					}
				});
				safes.push(safe);
			}
		});
		this.createAnimation(Animation.SAFE_OPEN, LoaderKey.SAFE, [13], 4);
		return safes;
	}

	createDoor(objectsLayer) {
		const spawnObject = objectsLayer.objects.find((spawnObject) => {
			return spawnObject.type === EntityType.DOOR;
		});
		const door = new Door(
			this,
			spawnObject.x,
			spawnObject.y,
			LoaderKey.DOOR,
			10,
			spawnObject.name,
			this.getCustomProperty(spawnObject, CustomProperty.LOCKED),
			this.getCustomProperty(spawnObject, CustomProperty.LOCKED_MESSAGE)
		);
		door.on('pointerdown', () => {
			if (door.isLocked()) {
				this.showDialog(door.getLockedMessage());
			} else {
				door.play(Animation.DOOR_OPEN);
				door.setOpened(true);
				this.showDialog('Mouahahah you thought the game was over? Try to find the real escape route now!');
			}
		});
		this.createAnimation(Animation.DOOR_OPEN, LoaderKey.DOOR, [5, 0], 4);
		return door;
	}

	createChests(objectsLayer) {
		const chests = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === EntityType.CHEST) {
				const chest = new Chest(
					this,
					spawnObject.x,
					spawnObject.y,
					LoaderKey.CHEST,
					null,
					spawnObject.name,
					this.getCustomProperty(spawnObject, CustomProperty.LOCKED),
					this.getCustomProperty(spawnObject, CustomProperty.LOCKED_MESSAGE),
					this.getCustomProperty(spawnObject, CustomProperty.SPAWN_ITEM_NAME),
					this.getCustomProperty(spawnObject, CustomProperty.SPAWN_ITEM_TEXTURE),
					this.getCustomProperty(spawnObject, CustomProperty.SPAWN_ITEM_FRAME),
					this.getCustomProperty(spawnObject, CustomProperty.SPAWN_ITEM_DESCRIPTION)
				);
				chest.on('pointerdown', () => {
					if (chest.isLocked()) {
						this.showDialog(chest.lockedMessage);
					} else {
						if (!chest.isOpened()) {
							chest.play(Animation.CHEST_OPEN);
							chest.setOpened(true);
							this.spawnItem(
								chest.x,
								chest.y + chest.height + 5,
								chest.getSpawnItemName(),
								chest.getSpawnItemTexture(),
								chest.getSpawnItemFrame(),
								chest.getSpawnItemDescription()
							);
						}
					}
				});
				chests.push(chest);
			}
		});
		this.createAnimation(Animation.CHEST_OPEN, LoaderKey.CHEST, [1], 8, -1);
		return chests;
	}

	createScrambledSigns(objectsLayer) {
		const signs = [];
		objectsLayer.objects.forEach((spawnObject) => {
			if (spawnObject.type === EntityType.SCRAMBLED_SIGN) {
				const sign = new ScrambledSign(
					this,
					spawnObject.x,
					spawnObject.y,
					spawnObject.name,
					this.getCustomProperty(spawnObject, CustomProperty.TEXT),
					this.getCustomProperty(spawnObject, CustomProperty.VISIBLE),
					this.getCustomProperty(spawnObject, CustomProperty.SCRAMBLED),
					this.getCustomProperty(spawnObject, CustomProperty.SCRAMBLED_TEXT)
				);
				sign.on('pointerdown', () => {
					if (sign.isVisible()) {
						if (sign.isScrambled()) {
							this.showDialog(sign.getScrambledText());
						} else {
							this.showDialog(sign.getText());
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
			if (spawnObject.type === EntityType.SIGN) {
				const sign = new Sign(
					this,
					spawnObject.x,
					spawnObject.y,
					spawnObject.name,
					this.getCustomProperty(spawnObject, CustomProperty.TEXT),
					this.getCustomProperty(spawnObject, CustomProperty.VISIBLE)
				);
				sign.on('pointerdown', () => {
					if (sign.isVisible()) {
						this.showDialog(sign.getText());
					}
				});
				signs.push(sign);
			}
		});
		return signs;
	}

	scrambleDialogs(scrambled) {
		this.scrambledSigns.forEach((dialog) => dialog.setScrambled(scrambled));
	}

	showDialog(text, itemTexture, itemFrame, closeCallback) {
		if (this.dialogGroup) {
			this.dialogGroup.destroy(true, false);
		}
		this.dialogGroup = this.add.group();
		const dialogFrame = this.add.nineslice(450, 350, LoaderKey.FRAME, null, 300, 550);
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
		const closeButton = this.add.image(585, 300, LoaderKey.UI, 2);
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

	createAnimation(key, texture, frames, frameRate, repeat) {
		this.anims.create({
			key,
			frames: this.anims.generateFrameNumbers(texture, { frames }),
			frameRate,
			repeat
		});
	}

	getCustomProperty(spawnObject, name) {
		let property = null;
		if (spawnObject) {
			property = spawnObject.properties.find((property) => property.name === name);
		}
		return property?.value;
	}

	getDialog(dialogs, name) {
		return dialogs.find((dialog) => dialog.name == name);
	}

	isBreakableWindowTile(tile) {
		return tile?.index === Tile.CLOSE_WINDOW;
	}

	breakWindow(x, y) {
		this.tilemap.putTileAt(Tile.OPEN_WINDOW, x, y);
	}

	getBreakableWindowsTiles(tilemap) {
		return tilemap.filterTiles((tile) => tile.index === Tile.CLOSE_WINDOW);
	}

	hasBreakableWindowsTiles() {
		return this.getBreakableWindowsTiles(this.tilemap).length === 0 ? false : true;
	}

	getCoffinTiles(tilemap) {
		return this.tilemap.filterTiles((tile) => Tile.COFFIN.includes(tile.index));
	}

	destroyCoffin() {
		this.tilemap.removeTile(this.getCoffinTiles(this.tilemap));
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
		this.tilemap.putTileAt(Tile.TOP_CHAIR, 22, 4);
		this.tilemap.putTileAt(Tile.MIDDLE_CHAIR, 22, 5);
		this.tilemap.putTileAt(Tile.BOTTOM_CHAIR, 22, 6);
		this.tilemap.putTileAt(Tile.SIGN, 23, 6);
		this.tilemap.removeTileAt(23, 4);
		this.tilemap.removeTileAt(23, 5);
		const sign = this.signs.find((sign) => sign.name === 'chair-sign');
		sign.setVisible(true);
	}

	isKnightTile(tile) {
		return (tile?.x === 22 && tile?.y === 15) || (tile?.x === 22 && tile?.y === 16);
	}

	destroyKnight() {
		const sign = this.signs.find((sign) => sign.name === 'knight-sign');
		sign.setVisible(true);
		this.tilemap.putTileAt(Tile.SIGN, 22, 15);
		this.tilemap.putTileAt(Tile.DESTROYED_KNIGHT, 22, 16);
	}

	isBreakableWallTile(tile) {
		return tile?.x === SECRET_TILE_X && tile?.y === SECRET_TILE_Y;
	}

	breakWall(x, y) {
		this.tilemap.putTileAt(Tile.HOLE_IN_WALL, x, y);
	}

	isLeftGargoyleTile(tile) {
		return (
			(tile?.x === 3 && tile?.y === 15) ||
			(tile?.x === 3 && tile?.y === 16) ||
			(tile?.x === 4 && tile?.y === 15) ||
			(tile?.x === 4 && tile?.y === 16)
		);
	}

	isRightGargoyleTile(tile) {
		return (
			(tile?.x === 8 && tile?.y === 15) ||
			(tile?.x === 8 && tile?.y === 16) ||
			(tile?.x === 9 && tile?.y === 15) ||
			(tile?.x === 9 && tile?.y === 16)
		);
	}

	moveLeftGargoyle(tile) {
		this.tilemap.putTileAt(Tile.TOP_LEFT_GARGOYLE, 2, 15);
		this.tilemap.putTileAt(Tile.TOP_RIGHT_GARGOYLE, 3, 15);
		this.tilemap.putTileAt(Tile.BOTTOM_LEFT_GARGOYLE, 2, 16);
		this.tilemap.putTileAt(Tile.BOTTOM_RIGHT_GARGOYLE, 3, 16);
		this.tilemap.removeTileAt(4, 15);
		this.tilemap.removeTileAt(4, 16);
	}

	moveRightGargoyle(tile) {
		this.tilemap.putTileAt(Tile.TOP_LEFT_GARGOYLE, 9, 15);
		this.tilemap.putTileAt(Tile.TOP_RIGHT_GARGOYLE, 10, 15);
		this.tilemap.putTileAt(Tile.BOTTOM_LEFT_GARGOYLE, 9, 16);
		this.tilemap.putTileAt(Tile.BOTTOM_RIGHT_GARGOYLE, 10, 16);
		this.tilemap.removeTileAt(8, 15);
		this.tilemap.putTileAt(Tile.STAIR, 8, 16);
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
		this.tilemap.putTileAt(Tile.TOP_LEFT_WATER, 12, 18);
		this.tilemap.putTileAt(Tile.TOP_CENTER_WATER, 13, 18);
		this.tilemap.putTileAt(Tile.TOP_RIGHT_WATER, 14, 18);
		this.tilemap.putTileAt(Tile.MIDDLE_LEFT_WATER, 12, 19);
		this.tilemap.putTileAt(Tile.MIDDLE_CENTER_WATER, 13, 19);
		this.tilemap.putTileAt(Tile.MIDDLE_RIGHT_WATER, 14, 19);
		this.tilemap.putTileAt(Tile.BOTTOM_LEFT_WATER, 12, 20);
		this.tilemap.putTileAt(Tile.BOTTOM_CENTER_WATER, 13, 20);
		this.tilemap.putTileAt(Tile.BOTTOM_RIGHT_WATER, 14, 20);
	}

	isSkeletonTile(tile) {
		return tile?.x === 7 && tile?.y === 9;
	}

	isStairTile(tile) {
		return tile?.index === Tile.STAIR;
	}

	digSkeleton() {
		this.tilemap.putTileAt(Tile.DIGGED_HOLE, 7, 9);
	}

	isItemSelected(name) {
		return this.selectedItem?.name === name;
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
			this.timeText = this.add.text(915, 730, `${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`, {
				fontSize: '12px',
				fontFamily: 'Verdana'
			});
		}
	}

	update() {
		this.updateTime();

		if (this.isTimeElapsed) {
			this.scene.start('gameover');
		}

		if (this.isItemSelected(Item.BOOK)) {
			this.scrambleDialogs(false);
		} else {
			this.scrambleDialogs(true);
		}

		if (this.isItemSelected(Item.KEY)) {
			const chest = this.chests.find((chest) => chest.name === 'chest');
			chest.unlock();
		} else {
			const chest = this.chests.find((chest) => chest.name === 'chest');
			chest.lock();
		}

		if (this.isItemSelected(Item.MASTER_KEY)) {
			this.door.unlock();
		} else {
			this.door.lock();
		}

		const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

		// Rounds down to nearest tile
		const pointerTileX = this.tilemap.worldToTileX(worldPoint.x);
		const pointerTileY = this.tilemap.worldToTileY(worldPoint.y);

		if (this.input.manager.activePointer.isDown) {
			const tile = this.tilemap.getTileAt(pointerTileX, pointerTileY, false, TilemapLayer.FOREGROUND);

			if (this.isBreakableWindowTile(tile) && this.isItemSelected(Item.HAMMER)) {
				this.breakWindow(pointerTileX, pointerTileY);
				if (!this.hasBreakableWindowsTiles()) {
					this.destroyCoffin();
					this.spawnItem(530, 205, Item.RING, LoaderKey.ITEMS, Frame.RING, 'You got the power ring');
				}
			}

			// move chair when clicked on it
			if (this.isChairTile(tile)) {
				this.moveChair();
			}

			// if tile if knight
			if (this.isKnightTile(tile) && !this.knightDestroyed && this.isItemSelected(Item.POTION)) {
				this.knightDestroyed = true;
				this.destroyKnight();
			}

			if (this.isBreakableWallTile(tile) && !this.wallDestroyed && this.isItemSelected(Item.PICKAXE)) {
				this.wallDestroyed = true;
				this.breakWall(pointerTileX, pointerTileY);
				this.spawnItem(205, 140, Item.KEY, LoaderKey.ITEMS, Frame.KEY, 'You got the key');
			}

			// if tile is gargoyle
			if (this.isLeftGargoyleTile(tile) && !this.isLeftGargoyleMoved && this.isItemSelected(Item.RING)) {
				this.isLeftGargoyleMoved = true;
				this.moveLeftGargoyle();
				this.spawnItem(145, 525, Item.POTION, LoaderKey.ITEMS, Frame.POTION, 'You got the magic solvent');
			}

			if (this.isRightGargoyleTile(tile) && !this.isRightGargoyleMoved && this.isItemSelected(Item.RING) && this.door.isOpened()) {
				this.isRightGargoyleMoved = true;
				this.moveRightGargoyle();
			}

			if (this.isFireTile(tile) && !this.fireExtinguished && this.isItemSelected(Item.ICE_ROD)) {
				this.fireExtinguished = true;
				this.extinguishFire();
				this.spawnItem(435, 620, Item.PICKAXE, LoaderKey.ITEMS, Frame.PICKAXE, 'You got the pickaxe');
			}

			if (this.isSkeletonTile(tile) && !this.isDigged && this.isItemSelected(Item.SHOVEL)) {
				this.isDigged = true;
				this.digSkeleton();
				this.spawnItem(250, 300, Item.MASTER_KEY, LoaderKey.ITEMS, Frame.MASTER_KEY, 'You got the master key');
			}

			if (this.isStairTile(tile)) {
				this.scene.start('win');
			}
		}
	}
}
