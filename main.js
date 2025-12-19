console.log("main.js loaded");

let gameState = {
  magicPower: 0
};

// TAB SYSTEM — BULLETPROOF VERSION
function openTab(tabId) {
  console.log("Opening tab:", tabId);

  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }

  const tab = document.getElementById(tabId);
  if (tab) {
    tab.style.display = "block";
  } else {
    console.error("Tab not found:", tabId);
  }
}

// CLICK MAGIC
function clickMagic() {
  gameState.magicPower += 1;
  document.getElementById("magic").textContent = gameState.magicPower;
}

// OPEN DEFAULT TAB ON LOAD
openTab("creatures");
