import Phaser from "phaser";
import { createTextures } from "../utils/textures.js";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    createTextures(this);
    this.scene.start("MenuScene");
  }
}
