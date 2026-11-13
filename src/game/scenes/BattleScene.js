import Phaser from "phaser";
import { gameState, saveState } from "../state.js";
import { randomQuestion } from "../data/questions.js";

export class BattleScene extends Phaser.Scene {
  constructor() {
    super("BattleScene");
  }

  init(data) {
    this.enemyId = data.enemyId;
    this.enemyName = data.enemyName || "Forest Slime";
    this.enemyHp = 65;
    this.enemyMaxHp = 65;
    this.guardReady = false;
    this.questionActive = false;
    this.questionTime = 12;
    this.finished = false;
    this.menuItems = [];
    this.questionItems = [];
  }

  create() {
    this.drawArena();
    this.createFighters();
    this.createStatusPanel();
    this.status.setText("Seekor Forest Slime menghadang jalanmu!");
    this.time.delayedCall(700, () => this.showMenu());
  }

  drawArena() {
    this.add.rectangle(480, 270, 960, 540, 0x172b35);
    this.add.rectangle(480, 170, 960, 220, 0x244452);
    this.add.rectangle(480, 360, 960, 180, 0x304c3b);
    this.add.rectangle(480, 430, 960, 220, 0x1b3028);

    const scenery = this.add.graphics();
    scenery.fillStyle(0x3d6870).fillTriangle(0, 315, 180, 105, 370, 315);
    scenery.fillStyle(0x31545b).fillTriangle(260, 315, 510, 80, 760, 315);
    scenery.fillStyle(0x426b60).fillTriangle(650, 315, 820, 140, 960, 315);
    scenery.fillStyle(0x6e9957).fillRect(0, 355, 960, 9);
    scenery.destroy();

    this.add.rectangle(480, 407, 820, 28, 0x17291f).setStrokeStyle(3, 0x64804c);
    this.add.rectangle(480, 397, 820, 8, 0x8aaf60);
    this.add.text(480, 20, "GREEN FOREST  /  BATTLE", {
      fontFamily: "monospace", fontSize: "13px", color: "#f3d78d",
      backgroundColor: "#193323", padding: { x: 10, y: 6 }
    }).setOrigin(0.5);
  }

  createFighters() {
    this.hero = this.add.image(245, 390, "hero-side").setOrigin(0.5, 1).setDisplaySize(100, 120);
    this.enemy = this.add.image(700, 390, "slime-side").setOrigin(0.5, 1).setDisplaySize(125, 95);
    this.add.ellipse(245, 394, 125, 22, 0x0b1710, 0.35);
    this.add.ellipse(700, 394, 135, 22, 0x0b1710, 0.35);

    this.tweens.add({ targets: this.enemy, y: 382, duration: 550, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    this.add.text(245, 265, "HERO", { fontFamily: "monospace", fontSize: "11px", color: "#f7e9b4" }).setOrigin(0.5);
    this.add.text(700, 285, this.enemyName.toUpperCase(), { fontFamily: "monospace", fontSize: "11px", color: "#d6f4bd" }).setOrigin(0.5);
  }

  createStatusPanel() {
    this.add.text(38, 58, "HERO", { fontFamily: "monospace", fontSize: "12px", color: "#f5e6b4" });
    this.add.rectangle(125, 88, 180, 14, 0x101c19).setOrigin(0, 0.5);
    this.heroBar = this.add.rectangle(125, 88, 180, 10, 0x57c66c).setOrigin(0, 0.5);
    this.heroLabel = this.add.text(125, 105, "", { fontFamily: "monospace", fontSize: "10px", color: "#eaf5e8" });

    this.add.text(742, 58, this.enemyName.toUpperCase(), { fontFamily: "monospace", fontSize: "12px", color: "#d6f4bd" });
    this.add.rectangle(742, 88, 180, 14, 0x101c19).setOrigin(0, 0.5);
    this.enemyBar = this.add.rectangle(742, 88, 180, 10, 0xd75d55).setOrigin(0, 0.5);
    this.enemyLabel = this.add.text(742, 105, "", { fontFamily: "monospace", fontSize: "10px", color: "#eaf5e8" });

    this.status = this.add.text(480, 425, "", {
      fontFamily: "Arial", fontSize: "15px", color: "#fff3c8",
      backgroundColor: "#16281fe8", padding: { x: 12, y: 7 }, align: "center"
    }).setOrigin(0.5);
    this.updateBars();
  }

  updateBars() {
    const heroRatio = Phaser.Math.Clamp(gameState.hp / gameState.maxHp, 0, 1);
    const enemyRatio = Phaser.Math.Clamp(this.enemyHp / this.enemyMaxHp, 0, 1);
    this.heroBar.setDisplaySize(180 * heroRatio, 10);
    this.enemyBar.setDisplaySize(180 * enemyRatio, 10);
    this.heroLabel.setText(`HP ${gameState.hp}/${gameState.maxHp}`);
    this.enemyLabel.setText(`HP ${this.enemyHp}/${this.enemyMaxHp}`);
  }

  showMenu() {
    if (this.finished) return;
    this.clearMenu();
    this.clearQuestion();
    this.status.setText("Giliranmu! Pilih tindakan.");
    const actions = [
      { x: 330, label: "ATTACK", color: 0x9c613d, run: () => this.askQuestion("attack") },
      { x: 480, label: "DEFEND", color: 0x426e8c, run: () => this.defend() },
      { x: 630, label: "SKILL", color: 0x71579b, run: () => this.askQuestion("skill") },
      { x: 780, label: `POTION (${gameState.potions})`, color: 0x527d55, run: () => this.usePotion() }
    ];

    actions.forEach((item) => {
      const button = this.add.rectangle(item.x, 485, 136, 42, item.color)
        .setStrokeStyle(2, 0xe4d5a5).setInteractive({ useHandCursor: true });
      const label = this.add.text(item.x, 485, item.label, {
        fontFamily: "monospace", fontSize: "11px", color: "#fff8df", fontStyle: "bold"
      }).setOrigin(0.5);
      button.on("pointerover", () => button.setStrokeStyle(3, 0xffe69b));
      button.on("pointerout", () => button.setStrokeStyle(2, 0xe4d5a5));
      button.on("pointerdown", item.run);
      this.menuItems.push(button, label);
    });
  }

  defend() {
    this.guardReady = true;
    this.status.setText("Kamu bersiap memasang pertahanan!");
    this.clearMenu();
    this.time.delayedCall(600, () => this.monsterTurn());
  }

  usePotion() {
    if (gameState.potions <= 0) {
      this.status.setText("Potion habis! Pilih tindakan lain.");
      return;
    }
    if (gameState.hp >= gameState.maxHp) {
      this.status.setText("HP masih penuh. Simpan potion-mu!");
      return;
    }
    gameState.potions -= 1;
    gameState.hp = Math.min(gameState.maxHp, gameState.hp + 30);
    saveState();
    this.updateBars();
    this.status.setText("Potion digunakan! HP +30.");
    this.clearMenu();
    this.time.delayedCall(700, () => this.monsterTurn());
  }

  askQuestion(phase) {
    this.clearMenu();
    this.showQuestion(randomQuestion(), phase);
  }

  monsterTurn() {
    if (this.finished) return;
    this.status.setText("Monster bersiap menyerang! Jawab soal untuk menghindar.");
    this.tweens.add({ targets: this.enemy, x: 670, duration: 170, yoyo: true, repeat: 2 });
    this.time.delayedCall(650, () => {
      if (!this.finished) this.showQuestion(randomQuestion(), "defense");
    });
  }

  showQuestion(question, phase) {
    this.clearQuestion();
    this.questionActive = true;
    this.questionTime = 12;

    const panel = this.add.rectangle(480, 300, 850, 245, 0x12271f, 0.98).setStrokeStyle(3, 0xe0bd69);
    const heading = this.add.text(480, 200, phase === "defense" ? "DEFENSE QUIZ" : "ARABIC CHALLENGE", {
      fontFamily: "monospace", fontSize: "14px", color: "#f2d58b"
    }).setOrigin(0.5);
    const prompt = this.add.text(480, 242, question.arabic, {
      fontFamily: "Tahoma, Arial, sans-serif", fontSize: "27px",
      color: "#ffffff", fontStyle: "bold", align: "center"
    }).setOrigin(0.5);
    const meaning = this.add.text(480, 274, `${question.meaning} (${question.transliteration})`, {
      fontFamily: "Arial", fontSize: "13px", color: "#b9d4bd"
    }).setOrigin(0.5);
    this.timerLabel = this.add.text(480, 305, "WAKTU: 12", {
      fontFamily: "monospace", fontSize: "12px", color: "#ffdf87"
    }).setOrigin(0.5);

    this.questionItems.push(panel, heading, prompt, meaning, this.timerLabel);
    const places = [{ x: 285, y: 355 }, { x: 675, y: 355 }, { x: 285, y: 410 }, { x: 675, y: 410 }];

    question.options.forEach((option, index) => {
      const { x, y } = places[index];
      const button = this.add.rectangle(x, y, 350, 42, 0x315b43)
        .setStrokeStyle(2, 0x8da978).setInteractive({ useHandCursor: true });
      const label = this.add.text(x, y, `${String.fromCharCode(65 + index)}. ${option}`, {
        fontFamily: "Arial", fontSize: "15px", color: "#ffffff", fontStyle: "bold"
      }).setOrigin(0.5);
      button.on("pointerover", () => button.setFillStyle(0x477d59));
      button.on("pointerout", () => button.setFillStyle(0x315b43));
      button.on("pointerdown", () => {
        if (this.questionActive) this.resolveAnswer(index === question.answer, phase);
      });
      this.questionItems.push(button, label);
    });

    this.questionTimer = this.time.addEvent({
      delay: 1000,
      repeat: 11,
      callback: () => {
        if (!this.questionActive) return;
        this.questionTime -= 1;
        this.timerLabel?.setText(`WAKTU: ${this.questionTime}`);
        if (this.questionTime <= 0) this.resolveAnswer(false, phase);
      }
    });
  }

  resolveAnswer(correct, phase) {
    if (!this.questionActive) return;
    this.questionActive = false;
    this.questionTimer?.remove(false);
    this.clearQuestion();

    if (phase === "attack" || phase === "skill") {
      if (correct) {
        const bonus = this.questionTime >= 8 ? 8 : 0;
        const damage = (phase === "skill" ? 32 : 20) + bonus;
        this.enemyHp = Math.max(0, this.enemyHp - damage);
        this.status.setText(bonus ? `CRITICAL HIT! Monster kehilangan ${damage} HP.` : `Benar! Monster kehilangan ${damage} HP.`);
        this.animateAttack();
        this.updateBars();
      } else {
        this.status.setText("Jawaban salah atau waktu habis. Serangan gagal!");
        this.tweens.add({ targets: this.hero, angle: -10, duration: 100, yoyo: true, repeat: 1 });
      }

      if (this.enemyHp <= 0) {
        this.time.delayedCall(850, () => this.showVictory());
      } else {
        this.time.delayedCall(950, () => this.monsterTurn());
      }
      return;
    }

    if (correct) {
      this.status.setText("PERFECT DODGE! Kamu berhasil menghindar.");
      this.tweens.add({ targets: this.hero, x: 205, duration: 130, yoyo: true, repeat: 1 });
    } else {
      const damage = this.guardReady ? 7 : 17;
      gameState.hp = Math.max(0, gameState.hp - damage);
      this.status.setText(this.guardReady
        ? `Pertahanan mengurangi damage! Kehilangan ${damage} HP.`
        : `Kamu terkena serangan! Kehilangan ${damage} HP.`);
      this.tweens.add({ targets: this.hero, alpha: 0.25, duration: 100, yoyo: true, repeat: 3 });
      this.updateBars();
    }

    this.guardReady = false;
    saveState();
    if (gameState.hp <= 0) {
      this.time.delayedCall(800, () => this.showDefeat());
    } else {
      this.time.delayedCall(1000, () => this.showMenu());
    }
  }

  animateAttack() {
    this.tweens.add({
      targets: this.hero, x: 390, duration: 170, yoyo: true,
      onYoyo: () => this.tweens.add({ targets: this.enemy, x: 730, duration: 90, yoyo: true, repeat: 1 })
    });
  }

  showVictory() {
    if (this.finished) return;
    this.finished = true;
    this.clearMenu();
    this.clearQuestion();
    gameState.xp += 50;
    gameState.gold += 25;
    gameState.hp = Math.min(gameState.maxHp, gameState.hp + 10);
    saveState();

    this.add.rectangle(480, 270, 960, 540, 0x07140e, 0.8);
    this.add.text(480, 190, "VICTORY!", {
      fontFamily: "monospace", fontSize: "42px", color: "#f5d77e",
      stroke: "#49371e", strokeThickness: 7
    }).setOrigin(0.5);
    this.add.text(480, 250, "Forest Slime berhasil dikalahkan!", {
      fontFamily: "Arial", fontSize: "18px", color: "#ffffff"
    }).setOrigin(0.5);
    this.add.text(480, 295, "+50 XP     +25 GOLD     +10 HP", {
      fontFamily: "monospace", fontSize: "14px", color: "#bce7a7"
    }).setOrigin(0.5);
    this.makeReturnButton();
  }

  showDefeat() {
    if (this.finished) return;
    this.finished = true;
    this.clearMenu();
    this.clearQuestion();
    this.add.rectangle(480, 270, 960, 540, 0x07140e, 0.83);
    this.add.text(480, 195, "DEFEATED", {
      fontFamily: "monospace", fontSize: "38px", color: "#ed8b7c",
      stroke: "#43221f", strokeThickness: 7
    }).setOrigin(0.5);
    this.add.text(480, 255, "Berlatih lagi dan coba sekali lagi!", {
      fontFamily: "Arial", fontSize: "17px", color: "#ffffff"
    }).setOrigin(0.5);
    this.makeReturnButton();
  }

  makeReturnButton() {
    const button = this.add.rectangle(480, 365, 270, 52, 0xd6a94d)
      .setStrokeStyle(3, 0xffe7a3).setInteractive({ useHandCursor: true });
    this.add.text(480, 365, "KEMBALI KE HUTAN", {
      fontFamily: "monospace", fontSize: "12px", color: "#26351f", fontStyle: "bold"
    }).setOrigin(0.5);
    button.on("pointerover", () => button.setFillStyle(0xf0c86b));
    button.on("pointerout", () => button.setFillStyle(0xd6a94d));
    button.on("pointerdown", () => {
      if (gameState.hp <= 0) gameState.hp = 60;
      this.game.events.emit("battle-ended", {
        won: this.enemyHp <= 0,
        enemyId: this.enemyId
      });
      this.scene.stop();
      this.scene.resume("WorldScene");
    });
  }

  clearMenu() {
    this.menuItems.forEach((item) => item.destroy());
    this.menuItems = [];
  }

  clearQuestion() {
    this.questionActive = false;
    this.questionTimer?.remove(false);
    this.questionTimer = undefined;
    this.questionItems.forEach((item) => item.destroy());
    this.questionItems = [];
  }
}
