const API_BASE = "https://compre-smart-backend-1.onrender.com";

// =============================
// ADD XP
// =============================
async function addExp(amount) {
  try {
    await fetch(`${API_BASE}/xp/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: window.USER,
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
    const res = await fetch(`${API_BASE}/xp?username=${window.USER}`);
    const data = await res.json();

    const xp = data.xp || 0;
    const level = data.level || 1;
    const progress = xp % 100;

    const xpValue = document.getElementById("xpValue");
    const xpText = document.getElementById("xpText");
    const xpLevel = document.getElementById("xpLevel");
    const xpBar = document.getElementById("xpBar");

    if (xpValue) xpValue.textContent = xp;
    if (xpText) xpText.textContent = `${progress} / 100 XP`;
    if (xpLevel) xpLevel.textContent = `Level ${level}`;
    if (xpBar) xpBar.style.width = `${progress}%`;

  } catch (err) {
    console.error("Load XP error:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("xpBar")) {
    loadXP();
  }
});
