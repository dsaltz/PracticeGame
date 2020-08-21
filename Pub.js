class Pub extends Phaser.Scene{
	constructor() {
		super({key: "Pub"});
	}

	preload() {
		this.load.spritesheet('characters5', 'assets/Actor5.png', { frameWidth: 32, frameHeight: 32});
		this.load.image('insideA4', 'assets/Inside_A4.png');
		this.load.image('insideB', 'assets/Inside_B.png');
		this.load.image('insideC', 'assets/Inside_C.png');
		this.load.image('outsideA4', 'assets/Outside_A4.png');
		this.load.tilemapTiledJSON('pub', 'assets/Pub.json');
	}

	create() {
		
		// set map
		const map = this.make.tilemap({ key: 'pub' });
		const tileset1 = map.addTilesetImage('Inside_A4', 'insideA4');
		const tileset2 = map.addTilesetImage('Inside_B', 'insideB');
		const tileset3 = map.addTilesetImage('Inside_C', 'insideC');
		const tileset4 = map.addTilesetImage('Outside_A4', 'outsideA4');
		const ground = map.createStaticLayer('Ground', [tileset4], 0, 0);
		const level = map.createStaticLayer('Level', [tileset1, tileset2, tileset3], 0, 0);
		const upper = map.createStaticLayer('Upper', [tileset3], 0, 0);
		this.cameras.main.setBounds(0, 0, 320, 320).setZoom(2);

		// create collision, doors, overlap

		level.setCollisionByProperty({ collides: true });

		// level.setCollisionByProperty({ door: true });
		this.moveGroup = this.physics.add.staticGroup();
		var tileProps;
		ground.forEachTile(tile => {
			tileProps = tile.properties;
			if (tileProps['door'] == true) {
				console.log('added');
				const x = tile.getCenterX();
				const y = tile.getCenterY();
				this.moveGroup.create(x,y,'door');
			}
			else {
				console.log('not added');
			}
		});

		console.log(this.moveGroup);

		this.moveGroup.setVisible(false);

		// determine where we're starting from
		var spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn');

		// create player
		this.player = new Player(this, spawnPoint.x, spawnPoint.y, hero);
		this.player.sprite.setTexture('characters5', hero+36);
		this.createPlayer(level);

		this.input.keyboard.on('keyup', function(e){
			if (e.key=="j"){
				const x = this.player.sprite.body.x+16;
				const y = this.player.sprite.body.y+16;
				switch (hero) {
					case 10:
						hero = 49;
						break;
					case 58:
						hero = 1;
						break;
					default: 
						hero+=3;
				};
				this.player.destroy();
				this.player = new Player(this, x, y, hero);
				this.player.sprite.setTexture('characters5', this.icon+36)
				this.createPlayer(level);
			};
		}, this);
		this.cameras.main.fadeIn(1000, 0, 0, 0);
	}

	update(){

		if (this.physics.collide(this.player.sprite, this.moveGroup)) {
			spawn = 'pub';
			this.cameras.main.fadeOut(1000, 0, 0, 0);
			this.scene.start('Town');
		};

		this.player.update();

	}
	createPlayer(level) {
		
		// for adding colliders
		this.physics.add.collider(this.player.sprite, level);
		this.player.sprite.body.setCollideWorldBounds = true;

		/*
		this.physics.world.on('worldbounds', function(body) {
			console.log('collision');
			spawn = 'Pub';
			this.cameras.main.fadeOut(1000, 0, 0, 0);
			this.scene.start('Town');
		}, this);
		*/

	}
}