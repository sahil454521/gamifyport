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
let lastFrameIndex = null;

// ========================================
// SPRITE SHEET LAYOUT (image.png — 4x4 grid, 68x72px per frame)
// Row 0 = down, Row 1 = left, Row 2 = right, Row 3 = up
// Column 0 = standing/idle, columns 1-3 = walk cycle
// ========================================

const FRAME_W = 68;
const FRAME_H = 72;
const FRAME_DURATION_MS = 120; // lower = faster walk animation

const SPRITE_ROWS = {
    down: 0,
    left: 1,
    right: 2,
    up: 3
};

// ========================================
// SPRITE UPDATE (Change-Detector to eliminate shaking)
// ========================================

function updateSprite() {
    const img = document.getElementById("player-img");
    const el = document.getElementById("player");
    if (!img || !el) return;

    const row = SPRITE_ROWS[player.dir] ?? SPRITE_ROWS.down;
    const col = player.moving
        ? Math.floor(performance.now() / FRAME_DURATION_MS) % 4
        : 0; // snap to standing frame when idle

    if (
        player.dir !== lastDirState ||
        player.moving !== lastMovingState ||
        col !== lastFrameIndex
    ) {
        lastDirState = player.dir;
        lastMovingState = player.moving;
        lastFrameIndex = col;

        img.style.transform = `translate(${-col * FRAME_W}px, ${-row * FRAME_H}px)`;
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