import "./style.css";
import Phaser from "phaser";

const PLAYER_ANIMS = {
	idle: "idle",
	walk: "walk",
	run: "run",
	jump: "jump",
	cheer: "cheer",
};

class MainScene extends Phaser.Scene {
	constructor() {
		super("main-scene");

		this.map;
	}

	preload() {
		this.load.atlas("robot", "robot.png", "robot.json");

		this.load.image("marble", "tilesets/marble.png");
		this.load.image("rock", "tilesets/rock.png");
		this.load.image("sand", "tilesets/sand.png");
		this.load.image("stone", "tilesets/stone.png");

		this.load.tilemapTiledJSON("map", "tilesets/mapmapmapmapmapmap2.json");
	}

	create() {
		// const height = this.scale.height;
		// const width = this.scale.width;

		// object destructuring
		const { height, width } = this.scale;

		this.map = this.make.tilemap({key: "map"});

		const marbleTiles = this.map.addTilesetImage("marble", "marble");
		const rockTiles = this.map.addTilesetImage("rock", "rock");
		const sandTiles = this.map.addTilesetImage("sand", "sand");
		const stoneTiles = this.map.addTilesetImage("stone", "stone");

		this.map.createLayer(
			"background layer",
			[marbleTiles, rockTiles, sandTiles, stoneTiles],
			0,
			0
		);


		const platformlayer = this.map.createLayer(
			"Platform",
			[marbleTiles, rockTiles, sandTiles, stoneTiles],
			0,
			0
		);

		let player = this.physics.add.sprite(
			width / 2,
			height / 2,
			"robot",
			"character_robot_idle.png"
		);

		player.setCollideWorldBounds(true);
		player.setBounce(0.5);

		// single frame
		player.anims.create({
			key: PLAYER_ANIMS.idle,
			frames: [{ key: "robot", frame: "character_robot_idle.png" }],
		});

		player.anims.create({
			key: PLAYER_ANIMS.jump,
			frames: [{ key: "robot", frame: "character_robot_jump.png" }],
		});

		// multiple frames
		player.anims.create({
			key: PLAYER_ANIMS.run,
			frames: player.anims.generateFrameNames("robot", {
				start: 0,
				end: 2,
				prefix: "character_robot_run",
				suffix: ".png",
			}),
			frameRate: 10, // frames per second
			repeat: -1, // infinite repeat
		});

		player.anims.create({
			key: PLAYER_ANIMS.walk,
			frames: player.anims.generateFrameNames("robot", {
				start: 0,
				end: 7,
				prefix: "character_robot_walk",
				suffix: ".png",
			}),
			frameRate: 10, // frames per second
			repeat: -1, // infinite repeat
		});


		


		player.anims.create({
			key: PLAYER_ANIMS.cheer,
			frames: player.anims.generateFrameNames("robot", {
				start: 0,
				end: 1,
				prefix: "character_robot_cheer",
				suffix: ".png",
			}),
			frameRate: 5, // frames per second
			repeat: -1, // infinite repeat
		});

		player.play(PLAYER_ANIMS.run);

		this.cursors = this.input.keyboard.addKey({
			left: Phaser.Input.Keyboard
		})
	}

	update() {}
}

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
	type: Phaser.WEBGL,
	width: 40 * 18,
	height: 30 * 18,
	scene: [MainScene],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
		},
	},
};

const game = new Phaser.Game(config);
