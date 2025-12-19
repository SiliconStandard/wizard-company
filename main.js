let gameState = {
  magicPower: 0,
  nifflers: 0,
  clickPower: 1,
  currentTab: "creatures"
};

// TAB SYSTEM
function openTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.style.display = "none");
  document.getElementById(tab).style.display = "block";
  gameState.currentTab = tab;
}

// UPDATE UI
function updateUI() {
  document.getElementById("magic").textContent = Math.floor(gameState.magicPower);
  document.getElementById("nifflerCount").textContent = gameState.nifflers;
  document.getElementById("clickPower").textContent = gameState.clickPower;
}

// CLICK MAGIC
function clickMagic() {
  gameState.magicPower += gameState.clickPower;
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

// CLICK UPGRADE
function buyClickUpgrade() {
  if (gameState.magicPower >= 25) {
    gameState.magicPower -= 25;
    gameState.clickPower++;
    updateUI();
  }
}

// GAME LOOP
setInterval(() => {
  gameState.magicPower += gameState.nifflers;
  updateUI();
}, 1000);

// START
openTab("creatures");
updateUI();
