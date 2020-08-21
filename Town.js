class Town extends Phaser.Scene{
	constructor() {
		super({key: "Town"});
	}

	preload() {
		this.load.spritesheet('characters5', 'assets/Actor5.png', { frameWidth: 32, frameHeight: 32});
		this.load.image('outsideA4', 'assets/Outside_A4.png');
		this.load.image('outsideB', 'assets/Outside_B.png');
		this.load.image('outsideC', 'assets/Outside_C.png');
		this.load.tilemapTiledJSON('map', 'assets/Town.json');
	}

	create() {
		
		// set map
		const map = this.make.tilemap({ key: 'map' });
		const tileset1 = map.addTilesetImage('Outside_A4', 'outsideA4');
		const tileset2 = map.addTilesetImage('Outside_B', 'outsideB');
		const tileset3 = map.addTilesetImage('Outside_C', 'outsideC');
		const ground = map.createStaticLayer('Ground', [tileset1, tileset2], 0, 0);
		const level = map.createStaticLayer('Level', [tileset2, tileset3], 0, 0);
		const upper = map.createStaticLayer('Upper', [tileset2, tileset3], 0, 0);
		var spawnPoint = 0;

		// create collision, doors, overlap
		upper.setDepth(10);

		level.setCollisionByProperty({ collides: true });

//		level.setCollisionByProperty({ door: true });
		this.moveGroup = this.physics.add.staticGroup();
		var tileProps;
		level.forEachTile(tile => {
			tileProps = tile.properties;
			if (tileProps['door'] == true) {
				const x = tile.getCenterX();
				const y = tile.getCenterY();
				this.moveGroup.create(x,y,'door');
			}
		})
		this.moveGroup.setVisible(false);

		// determine where we're starting from
		switch(spawn) {
			case 'church':
				//church
				spawnPoint = map.findObject('Objects', obj => obj.name === 'Church');
				break;
			case 'pub':
				//pub
				spawnPoint = map.findObject('Objects', obj => obj.name === 'Pub');
				break;
			case 'shop':
				//shop
				spawnPoint = map.findObject('Objects', obj => obj.name === 'Shop');
				break;
			case 'house':
				//house
				spawnPoint = map.findObject('Objects', obj => obj.name === 'House');
				break;
			default:
				//inn
				spawnPoint = map.findObject('Objects', obj => obj.name === 'Inn');
		}

		// create player
		this.player = new Player(this, spawnPoint.x, spawnPoint.y, hero);
		this.physics.add.collider(this.player.sprite, level);

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
				this.physics.add.collider(this.player.sprite, level);
			};
		}, this);
		this.cameras.main.fadeIn(1000, 0, 0, 0);
	}

	update(){

		if (this.physics.collide(this.player.sprite, this.moveGroup)) {
			this.cameras.main.fadeOut(1000, 0, 0, 0);
			this.scene.start('Pub');
		};

		this.player.update();

	}
}