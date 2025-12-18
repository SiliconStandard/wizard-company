let gameState = {
  magicPower: 0,
  nifflers: 0
};

// LOAD SAVE
function loadGame() {
  const save = localStorage.getItem("wizardSave");
  if (save) {
    gameState = JSON.parse(save);
  }
}
loadGame();

// SAVE GAME
function saveGame() {
  localStorage.setItem("wizardSave", JSON.stringify(gameState));
}

// UPDATE UI
function updateUI() {
  document.getElementById("magic").textContent = Math.floor(gameState.magicPower);
  document.getElementById("nifflerCount").textContent = gameState.nifflers;
}

// CLICK MAGIC
function clickMagic() {
  gameState.magicPower += 1;
  updateUI();
}

// BUY NIFFLER
function buyNiffler() {
  if (gameState.magicPower >= 10) {
    gameState.magicPower -= 10;
    gameState.nifflers++;
    updateUI();
  }
}

// GAME LOOP (1 SECOND)
setInterval(() => {
  gameState.magicPower += gameState.nifflers;
  updateUI();
}, 1000);

// AUTOSAVE EVERY MINUTE
setInterval(saveGame, 60000);

// FIRST DRAW
updateUI();
