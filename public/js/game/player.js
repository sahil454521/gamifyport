// ========================================
// PLAYER STATE & SPRITE RENDERING
// ========================================

const player = {
    x: 240, // Spawn in wide-open central crossroads plaza
    y: 140,
    w: 34,
    h: 40,
    dir: "down",
    moving: false
};

let lastDirState = null;
let lastMovingState = null;

// ========================================
// SPRITE UPDATE (Change-Detector to eliminate shaking)
// ========================================

function updateSprite() {
    const el = document.getElementById("player");
    if (!el) return;

    if (player.dir !== lastDirState || player.moving !== lastMovingState) {
        lastDirState = player.dir;
        lastMovingState = player.moving;

        el.classList.toggle("face-left", player.dir === "left");
        el.classList.toggle("walking", player.moving);
    }
}

// ========================================
// RENDER PLAYER POSITION
// ========================================

function render() {
    const el = document.getElementById("player");
    if (!el) return;

    // Use fixed precision to eliminate subpixel rounding jitter
    const xPct = (player.x / WORLD_W) * 100;
    const yPct = (player.y / WORLD_H) * 100;

    el.style.left = `${xPct.toFixed(2)}%`;
    el.style.top = `${yPct.toFixed(2)}%`;

    updateSprite();
}

console.log("✅ player.js loaded");