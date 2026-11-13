import Phaser from "phaser";
import { resetState } from "../state.js";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0x142b20);

    const forest = this.add.graphics();
    forest.fillStyle(0x1c3c2a);
    forest.fillRect(0, 340, width, 200);
    for (let i = 0; i < 22; i++) {
      const x = 20 + i * 45;
      forest.fillStyle(i % 2 ? 0x285b38 : 0x326b40);
      forest.fillCircle(x, 370 + (i % 3) * 18, 34 + (i % 2) * 8);
    }

    for (let i = 0; i < 36; i++) {
      this.add.rectangle(
        Phaser.Math.Between(15, width - 15),
        Phaser.Math.Between(15, 290),
        3, 3, i % 2 ? 0x7fae68 : 0xd8bd70, 0.7
      );
    }

    this.add.text(width / 2, 105, "ARABIC QUEST", {
      fontFamily: "monospace", fontSize: "42px", fontStyle: "bold",
      color: "#f2d58b", stroke: "#263d2d", strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(width / 2, 157, "THE LOST KINGDOM", {
      fontFamily: "monospace", fontSize: "15px", color: "#d7ead5"
    }).setOrigin(0.5);

    const hero = this.add.image(width / 2, 255, "hero-side").setScale(3.5);
    this.tweens.add({ targets: hero, y: 247, duration: 700, yoyo: true, repeat: -1 });

    this.add.text(width / 2, 325, "Jelajahi dunia, kalahkan monster, dan pelajari Bahasa Arab!", {
      fontFamily: "Arial", fontSize: "16px", color: "#e1eee0"
    }).setOrigin(0.5);

    const button = this.add.rectangle(width / 2, 405, 240, 54, 0xd6a94d)
      .setStrokeStyle(3, 0xffe7a3)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, 405, "MULAI PETUALANGAN", {
      fontFamily: "monospace", fontSize: "12px", color: "#26351f", fontStyle: "bold"
    }).setOrigin(0.5);

    button.on("pointerover", () => button.setFillStyle(0xf0c86b));
    button.on("pointerout", () => button.setFillStyle(0xd6a94d));
    button.on("pointerdown", () => this.scene.start("WorldScene"));

    const reset = this.add.text(width / 2, 478, "RESET SAVE", {
      fontFamily: "monospace", fontSize: "9px", color: "#c4d6c4"
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    reset.on("pointerdown", () => {
      resetState();
      this.scene.start("WorldScene");
    });
  }
}
