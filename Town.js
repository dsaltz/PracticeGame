//import Player from '../Player.js';

class Town extends Phaser.Scene{
	constructor() {
		super({key: "Town"});
	}

	preload() {
		this.load.spritesheet('characters5', 'assets/Actor5.png', { frameWidth: 32, frameHeight: 32});
		this.load.image('tiles1', 'assets/Outside_A4.png');
		this.load.image('tiles2', 'assets/Outside_B.png');
		this.load.image('tiles3', 'assets/Outside_C.png');
		this.load.tilemapTiledJSON('map', 'assets/Town.json');
	}

	create() {
		
		// set map
		const map = this.make.tilemap({ key: 'map' });
		const tileset1 = map.addTilesetImage('Outside_A4', 'tiles1');
		const tileset2 = map.addTilesetImage('Outside_B', 'tiles2');
		const tileset3 = map.addTilesetImage('Outside_C', 'tiles3');
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
		});
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
		var icon = 1;
		this.player = new Player(this, spawnPoint.x, spawnPoint.y, icon);
		this.physics.add.collider(this.player.sprite, level);

		this.input.keyboard.on('keyup', function(e){
			if (e.key=="j"){
				const x = this.player.sprite.body.x;
				const y = this.player.sprite.body.y;
				switch (icon) {
					case 10:
						icon = 49;
						break;
					case 58:
						icon = 1;
						break;
					default: 
						icon+=3;
				};
				this.player.destroy();
				this.player = new Player(this, x, y, icon);
				this.physics.add.collider(this.player.sprite, level);
			};
			if (e.key=="l") {
				console.log(this.player.sprite.body.x);
				console.log(this.player.sprite.body.y);
			};	
		}, this);
	}

	update(){
		this.player.update();
	}
}