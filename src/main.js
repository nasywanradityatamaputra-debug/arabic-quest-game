import Phaser from "phaser";
import "./style.css";
import { BootScene } from "./game/scenes/BootScene.js";
import { MenuScene } from "./game/scenes/MenuScene.js";
import { WorldScene } from "./game/scenes/WorldScene.js";
import { BattleScene } from "./game/scenes/BattleScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 960,
  height: 540,
  backgroundColor: "#183322",
  pixelArt: true,
  roundPixels: true,
  antialias: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: { debug: false, gravity: { x: 0, y: 0 } }
  },
  scene: [BootScene, MenuScene, WorldScene, BattleScene]
};

new Phaser.Game(config);
