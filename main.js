console.log("Wizard Company loaded");

// ---------------- GAME STATE ----------------
let gameState = {
  magic: 0,
  clickPower: 1,
  lastSave: Date.now(), // Track last save for offline progress

  upgrades: {
    strongerSpells: {
      bought: false,
      cost: 25,
      clickMultiplier: 2
    },
    creatureTraining: {
      bought: false,
      cost: 100,
      productionMultiplier: 2
    }
  },

  creatures: {
    niffler: {
      owned: 0,
      baseCost: 10,
      production: 1
    },
    mooncalf: {
      owned: 0,
      baseCost: 50,
      production: 5
    }
  }
};

// ---------------- TAB SYSTEM ----------------
function openTab(id) {
  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(id).style.display = "block";
}

// ---------------- CLICK MAGIC ----------------
function clickMagic() {
  gameState.magic += gameState.clickPower;
  updateUI();
}

// ---------------- COST SCALING ----------------
function getCost(type) {
  const c = gameState.creatures[type];
  return Math.floor(c.baseCost * Math.pow(1.15, c.owned));
}

// ---------------- BUY CREATURE ----------------
function buyCreature(type) {
  const cost = getCost(type);
  if (gameState.magic >= cost) {
    gameState.magic -= cost;
    gameState.creatures[type].owned++;
    updateUI();
  }
}

// ---------------- BUY UPGRADE ----------------
function buyUpgrade(name) {
  const upgrade = gameState.upgrades[name];
  if (upgrade.bought) return;

  if (gameState.magic >= upgrade.cost) {
    gameState.magic -= upgrade.cost;
    upgrade.bought = true;

    if (upgrade.clickMultiplier) {
      gameState.clickPower *= upgrade.clickMultiplier;
    }

    updateUI();
  }
}

// ---------------- UPDATE UI ----------------
function updateUI() {
  document.getElementById("magic").textContent =
    Math.floor(gameState.magic);

  document.getElementById("nifflerOwned").textContent =
    gameState.creatures.niffler.owned;
  document.getElementById("nifflerCost").textContent =
    getCost("niffler");

  document.getElementById("mooncalfOwned").textContent =
    gameState.creatures.mooncalf.owned;
  document.getElementById("mooncalfCost").textContent =
    getCost("mooncalf");

  document.getElementById("strongerSpellsStatus").textContent =
    gameState.upgrades.strongerSpells.bought ? "Bought" : "Not bought";

  document.getElementById("creatureTrainingStatus").textContent =
    gameState.upgrades.creatureTraining.bought ? "Bought" : "Not bought";
}

// ---------------- GAME LOOP ----------------
setInterval(() => {
  let production = 0;

  let multiplier = gameState.upgrades.creatureTraining.bought
    ? gameState.upgrades.creatureTraining.productionMultiplier
    : 1;

  for (let type in gameState.creatures) {
    const c = gameState.creatures[type];
    production += c.owned * c.production * multiplier;
  }

  gameState.magic += production;
  updateUI();
}, 1000);

// ---------------- AUTOSAVE ----------------
function saveGame() {
  gameState.lastSave = Date.now();
  localStorage.setItem("wizardCompanySave", JSON.stringify(gameState));
  console.log("Game saved!");
}

// ---------------- LOAD GAME ----------------
function loadGame() {
  const saved = localStorage.getItem("wizardCompanySave");
  if (!saved) return;

  const loaded = JSON.parse(saved);

  gameState.magic = loaded.magic || 0;
  gameState.clickPower = loaded.clickPower || 1;
  gameState.upgrades = loaded.upgrades || gameState.upgrades;
  gameState.creatures = loaded.creatures || gameState.creatures;

  const last = loaded.lastSave || Date.now();
  const now = Date.now();
  const secondsOffline = Math.floor((now - last) / 1000);

  let production = 0;
  let multiplier = gameState.upgrades.creatureTraining?.bought ? 
                   gameState.upgrades.creatureTraining.productionMultiplier : 1;

  for (let type in gameState.creatures) {
    const c = gameState.creatures[type];
    production += c.owned * c.production * multiplier;
  }

  const offlineMagic = production * secondsOffline;
  gameState.magic += offlineMagic;

  if (offlineMagic > 0) {
    alert(`Welcome back! Your creatures produced ${Math.floor(offlineMagic)} magic while you were away!`);
  }
}

// ---------------- START GAME ----------------
loadGame();
openTab("creatures");
updateUI();

// ---------------- AUTOSAVE INTERVAL ----------------
setInterval(saveGame, 60000); // every 60 seconds
