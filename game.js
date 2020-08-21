var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 640,
	physics: {
		default: 'arcade',
	},
	scene: [ Town, Pub ]
};

var spawn;

var face = 0;

var hero = 1;

var game = new Phaser.Game(config);