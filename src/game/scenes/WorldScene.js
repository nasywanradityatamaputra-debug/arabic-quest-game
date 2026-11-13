import Phaser from "phaser";
import { gameState, saveState } from "../state.js";

export class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
    this.battleActive = false;
    this.enemySprites = new Map();
  }

  create() {
    this.battleActive = false;
    this.enemySprites.clear();
    this.worldWidth = 1600;
    this.worldHeight = 1120;

    this.add.tileSprite(0, 0, this.worldWidth, this.worldHeight, "grass")
      .setOrigin(0).setDepth(0);

    this.drawPathsAndPond();
    this.createObstacles();
    this.createCoins();
    this.createEnemies();
    this.createPlayer();
    this.createNPC();
    this.createHud();

    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W,A,S,D,SHIFT");

    this.physics.add.collider(this.player, this.obstacles);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, undefined, this);
    this.physics.add.overlap(this.player, this.slimes, this.touchSlime, undefined, this);

    this.game.events.on("battle-ended", this.onBattleEnded, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.game.events.off("battle-ended", this.onBattleEnded, this);
    });

    this.add.text(480, 514, "WASD / ARROW: MOVE     SHIFT: RUN     WALK INTO SLIME TO BATTLE", {
      fontFamily: "monospace", fontSize: "10px", color: "#f1f4d9",
      backgroundColor: "#193323cc", padding: { x: 9, y: 6 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1000);
  }

  drawPathsAndPond() {
    const g = this.add.graphics().setDepth(1);
    g.lineStyle(62, 0x987447, 1);
    g.beginPath();
    g.moveTo(45, 850);
    g.lineTo(340, 690);
    g.lineTo(520, 510);
    g.lineTo(770, 435);
    g.lineTo(1030, 280);
    g.lineTo(1480, 170);
    g.strokePath();

    g.lineStyle(48, 0xb18b56, 1);
    g.beginPath();
    g.moveTo(45, 850);
    g.lineTo(340, 690);
    g.lineTo(520, 510);
    g.lineTo(770, 435);
    g.lineTo(1030, 280);
    g.lineTo(1480, 170);
    g.strokePath();

    g.fillStyle(0x397e9a, 1);
    g.fillEllipse(1280, 810, 270, 165);
    g.lineStyle(5, 0x8bc5c2, 0.8);
    g.strokeEllipse(1280, 810, 270, 165);
    g.fillStyle(0x9cbd72, 1);
    g.fillEllipse(1275, 810, 215, 115);
    g.destroy();

    this.add.text(180, 70, "GREEN FOREST", {
      fontFamily: "monospace", fontSize: "14px", color: "#f5e3a5",
      backgroundColor: "#274b31", padding: { x: 8, y: 5 }
    }).setDepth(2);
  }

  createObstacles() {
    this.obstacles = this.physics.add.staticGroup();
    const positions = [
      [80, 90], [390, 110], [520, 110], [760, 100], [940, 90], [1150, 100], [1450, 100],
      [90, 350], [260, 330], [430, 290], [650, 260], [880, 310], [1110, 350], [1480, 390],
      [120, 590], [300, 540], [600, 650], [800, 610], [1000, 590], [1450, 650],
      [120, 960], [380, 900], [650, 970], [900, 920], [1120, 990], [1480, 950],
      [500, 760], [720, 760], [950, 760], [1060, 760]
    ];

    positions.forEach(([x, y]) => {
      this.add.image(x, y, "tree").setOrigin(0.5, 0.88).setDepth(y);
      const collider = this.physics.add.staticImage(x, y + 10, "coin");
      collider.setVisible(false);
      collider.body.setSize(25, 13);
      this.obstacles.add(collider);
    });
  }

  createCoins() {
    this.coins = this.physics.add.staticGroup();
    const positions = [[220, 170], [350, 620], [560, 390], [710, 540], [910, 460], [1080, 210], [1300, 560], [1390, 880]];
    positions.forEach(([x, y]) => {
      const coin = this.coins.create(x, y, "coin");
      coin.setDepth(y + 2);
      this.tweens.add({ targets: coin, y: y - 5, duration: 650, yoyo: true, repeat: -1 });
    });
  }

  createEnemies() {
    this.slimes = this.physics.add.staticGroup();
    const enemies = [
      { id: "slime-01", x: 470, y: 420 },
      { id: "slime-02", x: 850, y: 190 },
      { id: "slime-03", x: 1120, y: 520 },
      { id: "slime-04", x: 1330, y: 900 }
    ];

    enemies.forEach((enemy) => {
      const slime = this.slimes.create(enemy.x, enemy.y, "slime");
      slime.setData("enemyId", enemy.id);
      slime.setDepth(enemy.y + 3);
      this.enemySprites.set(enemy.id, slime);
      this.tweens.add({ targets: slime, y: enemy.y - 5, duration: 520, yoyo: true, repeat: -1 });
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(gameState.playerX, gameState.playerY, "hero");
    this.player.setDepth(this.player.y + 10);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(11, 12);
    this.player.body.setOffset(4, 10);
  }

  createNPC() {
    this.add.image(220, 250, "npc").setDepth(260);
    this.add.text(220, 220, "ELDER", {
      fontFamily: "monospace", fontSize: "9px", color: "#fff0bb",
      backgroundColor: "#314c35", padding: { x: 4, y: 3 }
    }).setOrigin(0.5).setDepth(261);
    this.add.text(240, 270, "!", {
      fontFamily: "monospace", fontSize: "17px", color: "#ffdf72", fontStyle: "bold"
    }).setDepth(262);
  }

  createHud() {
    this.hud = this.add.text(15, 14, "", {
      fontFamily: "monospace", fontSize: "11px", color: "#ffffff",
      backgroundColor: "#193323e8", padding: { x: 9, y: 7 }
    }).setScrollFactor(0).setDepth(1000);

    this.questHud = this.add.text(945, 14, "", {
      fontFamily: "monospace", fontSize: "10px", color: "#fff0b8",
      backgroundColor: "#193323e8", padding: { x: 9, y: 7 }, align: "right"
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(1000);

    this.updateHud();
  }

  updateHud() {
    this.hud?.setText(`HP ${gameState.hp}/${gameState.maxHp}   XP ${gameState.xp}   GOLD ${gameState.gold}   POTION ${gameState.potions}`);
    this.questHud?.setText(`GREEN FOREST\\nKoin: ${gameState.coins}/8\\nSlime: ${gameState.defeatedSlimes}`);
  }

  collectCoin(_player, coin) {
    if (!coin.active) return;
    const x = coin.x;
    const y = coin.y;
    coin.destroy();
    gameState.coins += 1;
    gameState.gold += 5;
    saveState();
    this.updateHud();
    this.showFloatingText(x, y - 16, "+5 GOLD", "#ffe18a");
  }

  touchSlime(_player, slime) {
    if (this.battleActive || !slime.active) return;
    this.battleActive = true;
    gameState.playerX = this.player.x;
    gameState.playerY = this.player.y;
    saveState();

    const enemyId = slime.getData("enemyId");
    this.physics.pause();
    this.scene.launch("BattleScene", { enemyId, enemyName: "Forest Slime" });
    this.scene.pause();
  }

  onBattleEnded(result) {
    this.battleActive = false;
    if (result.won) {
      const enemy = this.enemySprites.get(result.enemyId);
      if (enemy) {
        enemy.destroy();
        this.enemySprites.delete(result.enemyId);
      }
      gameState.defeatedSlimes += 1;
      this.showFloatingText(this.player.x, this.player.y - 35, "VICTORY!", "#ffe18a");
    } else {
      this.player.setPosition(160, 170);
      gameState.playerX = 160;
      gameState.playerY = 170;
    }
    saveState();
    this.physics.resume();
    this.updateHud();
  }

  showFloatingText(x, y, message, color) {
    const label = this.add.text(x, y, message, {
      fontFamily: "monospace", fontSize: "12px", color,
      stroke: "#1b2d20", strokeThickness: 3
    }).setOrigin(0.5).setDepth(2000);
    this.tweens.add({
      targets: label, y: y - 34, alpha: 0, duration: 950,
      onComplete: () => label.destroy()
    });
  }

  update() {
    if (!this.player?.active || this.battleActive) return;

    const speed = this.keys.SHIFT.isDown ? 185 : 125;
    let vx = 0;
    let vy = 0;
    if (this.cursors.left.isDown || this.keys.A.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.keys.D.isDown) vx += 1;
    if (this.cursors.up.isDown || this.keys.W.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.keys.S.isDown) vy += 1;

    const movement = new Phaser.Math.Vector2(vx, vy);
    if (movement.length() > 0) {
      movement.normalize().scale(speed);
      this.player.setVelocity(movement.x, movement.y);
    } else {
      this.player.setVelocity(0, 0);
    }
    this.player.setDepth(this.player.y + 10);
    gameState.playerX = this.player.x;
    gameState.playerY = this.player.y;
  }
}
