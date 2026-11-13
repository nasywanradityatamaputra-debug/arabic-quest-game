function drawTexture(scene, key, width, height, painter) {
  if (scene.textures.exists(key)) return;
  const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
  painter(graphics);
  graphics.generateTexture(key, width, height);
  graphics.destroy();
}

export function createTextures(scene) {
  drawTexture(scene, "grass", 32, 32, (g) => {
    g.fillStyle(0x477b43).fillRect(0, 0, 32, 32);
    g.fillStyle(0x568b4b).fillRect(3, 5, 3, 2).fillRect(19, 9, 2, 3);
    g.fillStyle(0x356b3c).fillRect(12, 23, 3, 2).fillRect(26, 27, 2, 2);
    g.fillStyle(0x6b9953).fillRect(23, 3, 2, 2).fillRect(5, 18, 2, 2);
  });

  drawTexture(scene, "hero", 20, 24, (g) => {
    g.fillStyle(0x29251f).fillRect(5, 1, 10, 5);
    g.fillStyle(0x6a402b).fillRect(4, 3, 12, 6);
    g.fillStyle(0xf1bd8c).fillRect(6, 7, 9, 7);
    g.fillStyle(0x29251f).fillRect(7, 9, 2, 2).fillRect(12, 9, 2, 2);
    g.fillStyle(0x2f6f9b).fillRect(4, 14, 12, 7);
    g.fillStyle(0xe0b64f).fillRect(9, 14, 2, 7);
    g.fillStyle(0x243c50).fillRect(5, 20, 5, 3).fillRect(12, 20, 5, 3);
  });

  drawTexture(scene, "hero-side", 28, 34, (g) => {
    g.fillStyle(0x29251f).fillRect(7, 1, 13, 6);
    g.fillStyle(0x6a402b).fillRect(6, 3, 14, 7);
    g.fillStyle(0xf1bd8c).fillRect(9, 8, 11, 9);
    g.fillStyle(0x29251f).fillRect(17, 11, 2, 2);
    g.fillStyle(0x2f6f9b).fillRect(7, 17, 14, 10);
    g.fillStyle(0xe0b64f).fillRect(13, 17, 2, 9);
    g.fillStyle(0x243c50).fillRect(8, 26, 6, 7).fillRect(16, 26, 6, 7);
    g.fillStyle(0xb9d8e5).fillRect(22, 14, 3, 12);
    g.fillStyle(0xe6edf0).fillRect(23, 11, 2, 5);
  });

  drawTexture(scene, "slime", 24, 20, (g) => {
    g.fillStyle(0x1f5637).fillRect(4, 11, 16, 8);
    g.fillStyle(0x42b66a).fillRect(2, 7, 20, 11);
    g.fillStyle(0x68d889).fillRect(6, 3, 12, 9);
    g.fillStyle(0xeaffd9).fillRect(7, 10, 3, 4).fillRect(15, 10, 3, 4);
    g.fillStyle(0x193d2b).fillRect(8, 11, 2, 3).fillRect(16, 11, 2, 3);
  });

  drawTexture(scene, "slime-side", 34, 26, (g) => {
    g.fillStyle(0x1f5637).fillRect(4, 15, 26, 9);
    g.fillStyle(0x42b66a).fillRect(2, 9, 30, 13);
    g.fillStyle(0x68d889).fillRect(7, 4, 20, 11);
    g.fillStyle(0xeaffd9).fillRect(9, 12, 4, 5).fillRect(22, 12, 4, 5);
    g.fillStyle(0x193d2b).fillRect(10, 13, 2, 3).fillRect(23, 13, 2, 3);
  });

  drawTexture(scene, "tree", 38, 50, (g) => {
    g.fillStyle(0x63452b).fillRect(15, 28, 9, 21);
    g.fillStyle(0x285a35).fillRect(5, 16, 28, 20);
    g.fillStyle(0x347544).fillRect(2, 9, 34, 21);
    g.fillStyle(0x478c4d).fillRect(8, 2, 22, 19);
    g.fillStyle(0x5c9c55).fillRect(10, 4, 6, 5).fillRect(23, 13, 5, 4);
  });

  drawTexture(scene, "coin", 16, 16, (g) => {
    g.fillStyle(0x8b5a20).fillRect(3, 1, 10, 14);
    g.fillStyle(0xf2bd45).fillRect(2, 2, 12, 12);
    g.fillStyle(0xffe68b).fillRect(4, 3, 6, 10);
    g.fillStyle(0xc98b2b).fillRect(7, 5, 2, 5);
  });

  drawTexture(scene, "npc", 20, 26, (g) => {
    g.fillStyle(0x4b3026).fillRect(5, 1, 11, 6);
    g.fillStyle(0xe9b98b).fillRect(5, 7, 10, 8);
    g.fillStyle(0x2e2924).fillRect(6, 9, 2, 2).fillRect(12, 9, 2, 2);
    g.fillStyle(0xb28bce).fillRect(4, 15, 13, 8);
    g.fillStyle(0x493b60).fillRect(5, 22, 5, 4).fillRect(12, 22, 5, 4);
  });
}
