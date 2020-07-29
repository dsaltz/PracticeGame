class Player extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, icon) {
		super(scene, x, y, 'player');

		this.scene = scene;

		//create the animations
		const anims = scene.anims;
		anims.create({
			key: 'left',
			frames: anims.generateFrameNumbers('characters5', {start: icon+11, end: icon+13}),
			frameRate: 3,
			repeat: -1,
			yoyo: true
		});


		anims.create({
			key: 'down',
			frames: anims.generateFrameNumbers('characters5', {start: icon-1, end: icon+1}),
			frameRate: 3,
			repeat: -1,
			yoyo: true
		});

		anims.create({
			key: 'up',
			frames: anims.generateFrameNumbers('characters5', {start: icon+35, end: icon+37}),
			frameRate: 3,
			repeat: -1,
			yoyo: true
		});

		anims.create({
			key: 'right',
			frames: anims.generateFrameNumbers('characters5', {start: icon+23, end: icon+25}),
			frameRate: 3,
			repeat: -1,
			yoyo: true
		});

		//Create physics-based sprite to move
		this.sprite = scene.physics.add.sprite(x, y, 'characters5', icon);
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

		//this.player.body.setVelocity(0);

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


		if(this.key_A.isDown) {
			this.sprite.anims.play('left', true);
		}
		else if(this.key_D.isDown) {
			this.sprite.anims.play('right', true);
		}
		else if(this.key_W.isDown) {
			this.sprite.anims.play('up', true);
		}
		else if(this.key_S.isDown) {
			this.sprite.anims.play('down', true);
		}
		else {
			this.sprite.anims.stop();
			console.log('hi');
/*			if (prevVelocity.x < 0) this.sprite.setTexture('characters5', icon+12);
			else if (prevVelocity.x > 0) this.sprite.setTexture('characters5', icon+24);
			else if (prevVelocity.y < 0) this.sprite.setTexture('characters5', icon+36);
			else if (prevVelocity.y > 0) this.sprite.setTexture('characters5', icon);
*/		}		
	}

	destroy() {
		this.sprite.destroy();
	}

}