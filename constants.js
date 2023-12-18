export const TILE_SIZE = 18;
export const WIDTH = 88 * TILE_SIZE;
export const HEIGHT = 40 * TILE_SIZE;

export const events = new Phaser.Events.EventEmitter();
export const COIN_COLLECTED_EVENT = "coin-collected";

export const restartDialog = document.getElementById("restart-dialog");
export const restartButton = document.getElementById("restart-button");
export const scoreSpan = document.getElementById("score-span");

export const marbleTiles = this.map.addTilesetImage("marble", "marble");
export const rockTiles = this.map.addTilesetImage("rock", "rock");
export const sandTiles = this.map.addTilesetImage("sand", "sand");
export const stoneTiles = this.map.addTilesetImage("stone", "stone");