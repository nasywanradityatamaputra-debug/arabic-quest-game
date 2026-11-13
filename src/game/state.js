const STORAGE_KEY = "arabic-quest-game-save";

const initialState = {
  hp: 100,
  maxHp: 100,
  xp: 0,
  gold: 0,
  coins: 0,
  defeatedSlimes: 0,
  potions: 2,
  playerX: 160,
  playerY: 170
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : { ...initialState };
  } catch {
    return { ...initialState };
  }
}

export const gameState = loadState();

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch {
    // Game tetap dapat dimainkan jika localStorage tidak tersedia.
  }
}

export function resetState() {
  Object.assign(gameState, initialState);
  saveState();
}
