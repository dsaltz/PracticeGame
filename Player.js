class Player extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, icon) {
		super(scene, x, y, 'player');

		this.scene = scene;
		this.icon = icon;
		this.x = x;
		this.y = y;

		//create the animations
		this.animate(scene);

		//Create physics-based sprite to move
		this.sprite = scene.physics.add.sprite(this.x, this.y, 'characters5', this.icon+face);
		this.sprite.body.collideWorldBounds=true;
		this.sprite.body.setGravityY(0);

		//Get some keys
		this.key_A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key_D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.key_S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.key_W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	}

	update() {

		const speed = 175;
		const prevVelocity = this.sprite.body.velocity.clone();

		// Set character movement speed

		if(this.key_A.isDown) {
			this.sprite.body.setVelocityX(-speed);
		}
		else if(this.key_D.isDown) {
			this.sprite.body.setVelocityX(speed);
		}
		else {
			this.sprite.body.setVelocityX(0);
		}
		
		if(this.key_W.isDown) {
			this.sprite.body.setVelocityY(-speed);
		}
		else if(this.key_S.isDown) {
			this.sprite.body.setVelocityY(speed);
		}
		else {
			this.sprite.body.setVelocityY(0);
		}

		// Run animations depending on direction and set character face for stop sprite

		if(this.key_A.isDown) {
			this.sprite.anims.play('left'+this.icon, true);
			face=12;
		}
		else if(this.key_D.isDown) {
			this.sprite.anims.play('right'+this.icon, true);
			face=24;
		}
		else if(this.key_W.isDown) {
			this.sprite.anims.play('up'+this.icon, true);
			face=36;
		}
		else if(this.key_S.isDown) {
			this.sprite.anims.play('down'+this.icon, true);
			face=0;
		}
		else {
			this.sprite.anims.stop();	
			this.sprite.setTexture('characters5', this.icon+face);
		}		
	}

	destroy() {
		this.sprite.destroy();
	}

	// Create animations

	animate(scene) {
		this.scene = scene;
		var pc = 1;
		var anims = scene.anims;
		do {
			anims.create({
				key: 'left' + pc,
				frames: anims.generateFrameNumbers('characters5', {start: pc+11, end: pc+13}),
				frameRate: 3,
				repeat: -1,
				yoyo: true
			});


			anims.create({
				key: 'down' + pc,
				frames: anims.generateFrameNumbers('characters5', {start: pc-1, end: pc+1}),
				frameRate: 3,
				repeat: -1,
				yoyo: true
			});

			anims.create({
				key: 'up' + pc,
				frames: anims.generateFrameNumbers('characters5', {start: pc+35, end: pc+37}),
				frameRate: 3,
				repeat: -1,
				yoyo: true
			});

			anims.create({
				key: 'right' + pc,
				frames: anims.generateFrameNumbers('characters5', {start: pc+23, end: pc+25}),
				frameRate: 3,
				repeat: -1,
				yoyo: true
			});
			switch (pc) {
				case 10:
					pc = 49;
					break;
				default: 
					pc+=3;
			};
		}
		while (pc <= 58);
	}
}