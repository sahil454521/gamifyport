// ========================================
// COLLISION SYSTEM
// ========================================

const PLAYER_TOP_OFFSET = 40 * 0.78;
const PLAYER_BOTTOM_OFFSET = 40 * 0.22;

// ========================================
// RECTANGLE COLLISION HELPER
// ========================================

function rectsOverlap(a, b) {
    if (!a || !b) return false;
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

// ========================================
// PLAYER FOOT RECTANGLE (compact foot bounding box)
// ========================================

function footRect(px, py) {
    return {
        x: px - 8,
        y: py - 2,
        w: 16,
        h: 8
    };
}

// ========================================
// CHECK IF POSITION IS BLOCKED
// ========================================

function blockedAt(px, py) {
    const foot = footRect(px, py);

    // 1. World boundaries
    if (
        px - player.w / 2 < 4 ||
        px + player.w / 2 > WORLD_W - 4 ||
        py - PLAYER_TOP_OFFSET < 2 ||
        py + PLAYER_BOTTOM_OFFSET > WORLD_H - 2
    ) {
        return true;
    }

    // 2. Buildings
    if (Array.isArray(BUILDINGS)) {
        for (const b of BUILDINGS) {
            if (b.noBlock) continue;
            if (b.rect && rectsOverlap(foot, b.rect)) {
                return true;
            }
        }
    }

    // 3. Natural obstacles
    if (Array.isArray(OBSTACLES)) {
        for (const o of OBSTACLES) {
            if (rectsOverlap(foot, o)) {
                return true;
            }
        }
    }

    return false;
}

console.log("✅ collision.js loaded");