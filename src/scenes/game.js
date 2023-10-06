import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    
    chest = null;
    door = null;
    selectedItem = null
    items = null;

	constructor() {
		super();
	}

	preload() {
        this.load.spritesheet('chest', 'assets/img/chest.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('door', 'assets/img/door.png', { frameWidth: 24, frameHeight: 32 })
	}

	create() {
		this.createAnimations();
        this.createChest();
        this.createDoor();
    }
    
    createDoor() {
        this.door = this.add.sprite(500, 300, 'door', 10);
        this.door.setInteractive();
        this.door.setScale(4);
    }

	createChest() {
		this.chest = this.add.sprite(100, 100, 'chest');
		this.chest.setInteractive();
		this.chest.setScale(2);
	}

	createAnimations() {
		this.anims.create({
			key: 'chest-open',
			frames: this.anims.generateFrameNumbers('chest', { frames: [1] }),
			frameRate: 8,
			repeat: -1
        });
        this.anims.create({
			key: 'door-open',
			frames: this.anims.generateFrameNumbers('door', { frames: [5, 0] }),
            frameRate: 4
		});
	}

	update() {
		this.chest.on('pointerdown', () => {
			this.chest.play('chest-open');
        });
        this.door.on('pointerdown', () => {
			this.door.play('door-open');
		});
	}
}
