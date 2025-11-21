// Use the API and USER passed from index.html
const API = window.API_BASE;
const USER = window.USER;

// =============================
// XP needed for next level
// Match backend formula
// =============================
function xpNeededFor(level) {
  return 50 + (level * 25);  // L1→2 = 75, L2→3 = 100, L3→4 = 125
}

// =============================
// ADD XP
// =============================
async function addExp(amount) {
  try {
    if (!USER) {
      console.warn("No USER found. Cannot add XP.");
      return;
    }

    await fetch(`${API}/xp/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: USER,
        amount
      })
    });

    if (typeof loadXP === "function") {
      loadXP();
    }

  } catch (err) {
    console.error("XP error:", err);
  }
}

// =============================
// LOAD XP
// =============================
async function loadXP() {
  try {
    if (!USER) {
      console.warn("No USER found. Cannot load XP.");
      return;
    }

    const res = await fetch(`${API}/xp?username=${USER}`);
    const data = await res.json();

    const xp = data.xp || 0;
    const level = data.level || 1;

    // XP required for current level → next level
    const needed = xpNeededFor(level);

    // Progress percentage
    const progressPercent = Math.min(100, Math.floor((xp / needed) * 100));

    const xpValue = document.getElementById("xpValue");
    const xpText = document.getElementById("xpText");
    const xpLevel = document.getElementById("xpLevel");
    const xpBar = document.getElementById("xpBar");

    if (xpValue) xpValue.textContent = xp;
    if (xpText) xpText.textContent = `${xp} / ${needed} XP`;
    if (xpLevel) xpLevel.textContent = `Level ${level}`;
    if (xpBar) xpBar.style.width = `${progressPercent}%`;

  } catch (err) {
    console.error("Load XP error:", err);
  }
}

// Load automatically when dashboard loaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("xpBar")) {
    loadXP();
  }
});
