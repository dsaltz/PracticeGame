var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 640,
	physics: {
		default: 'arcade',
	},
	scene: [ Town ]
};

var spawn;

var game = new Phaser.Game(config);