// ========================================
// POKÉMON RPG FLUID MOVEMENT SYSTEM
// ========================================

const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

const MOVE_SPEED = 115; // logical units per second

// ========================================
// KEY LISTENERS
// ========================================

window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === "w" || key === "arrowup") {
        keys.up = true;
        if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
            event.preventDefault();
        }
    }
    if (key === "s" || key === "arrowdown") {
        keys.down = true;
        if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
            event.preventDefault();
        }
    }
    if (key === "a" || key === "arrowleft") {
        keys.left = true;
        if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
            event.preventDefault();
        }
    }
    if (key === "d" || key === "arrowright") {
        keys.right = true;
        if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
            event.preventDefault();
        }
    }

    if (key === "m") {
        if (typeof toggleMenu === "function") toggleMenu();
    }
    if (key === "escape") {
        if (typeof closeDialog === "function") closeDialog();
        if (typeof closeMenu === "function") closeMenu();
        if (typeof closeResume === "function") closeResume();
    }
});

window.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();

    if (key === "w" || key === "arrowup") keys.up = false;
    if (key === "s" || key === "arrowdown") keys.down = false;
    if (key === "a" || key === "arrowleft") keys.left = false;
    if (key === "d" || key === "arrowright") keys.right = false;
});

// Clear keys when tab/window loses focus
window.addEventListener("blur", () => {
    keys.up = false;
    keys.down = false;
    keys.left = false;
    keys.right = false;
    player.moving = false;
    updateSprite();
});

// ========================================
// MOBILE TOUCH / DPAD BINDINGS
// ========================================

function bindMobileControls() {
    document.querySelectorAll(".dpad-btn[data-dir]").forEach((btn) => {
        const dir = btn.dataset.dir;
        const start = (e) => {
            e.preventDefault();
            keys[dir] = true;
        };
        const end = (e) => {
            e.preventDefault();
            keys[dir] = false;
        };

        btn.addEventListener("touchstart", start, { passive: false });
        btn.addEventListener("touchend", end, { passive: false });
        btn.addEventListener("mousedown", start);
        btn.addEventListener("mouseup", end);
        btn.addEventListener("mouseleave", end);
    });

    const aBtn = document.getElementById("a-btn");
    if (aBtn) {
        aBtn.addEventListener("click", () => {
            if (dialogOpen) {
                if (typeof closeDialog === "function") closeDialog();
            } else {
                const foot = footRect(player.x, player.y);
                if (Array.isArray(BUILDINGS)) {
                    for (const b of BUILDINGS) {
                        const centerX = b.rect.x + b.rect.w / 2;
                        const centerY = b.rect.y + b.rect.h / 2;
                        const dx = player.x - centerX;
                        const dy = player.y - centerY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < INTERACTION_DISTANCE + Math.max(b.rect.w, b.rect.h) / 2) {
                            enterBuilding(b);
                            break;
                        }
                    }
                }
            }
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindMobileControls);
} else {
    bindMobileControls();
}

// ========================================
// MOVEMENT UPDATE (Delta-time based)
// ========================================

function updateMovement(dt) {
    if (dialogOpen || menuOpen || battleOpen || resumeOpen) {
        player.moving = false;
        updateSprite();
        return;
    }

    let dx = 0;
    let dy = 0;

    if (keys.up) dy -= 1;
    if (keys.down) dy += 1;
    if (keys.left) dx -= 1;
    if (keys.right) dx += 1;

    player.moving = dx !== 0 || dy !== 0;

    // Normalize diagonal movement speed
    if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
    }

    // Direction facing
    if (dx > 0) player.dir = "right";
    else if (dx < 0) player.dir = "left";
    else if (dy > 0) player.dir = "down";
    else if (dy < 0) player.dir = "up";

    const moveStep = MOVE_SPEED * dt;
    const nextX = player.x + dx * moveStep;
    const nextY = player.y + dy * moveStep;

    // Independent axis collision checking for smooth wall-sliding
    if (!blockedAt(nextX, player.y)) {
        player.x = nextX;
    }
    if (!blockedAt(player.x, nextY)) {
        player.y = nextY;
    }

    // Check doors and building proximity
    if (typeof tryTriggerDoor === "function") {
        tryTriggerDoor();
    }

    render();
}

// ========================================
// MAIN GAME LOOP
// ========================================

function loop(timestamp) {
    if (lastTime === null) {
        lastTime = timestamp;
    }

    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    updateMovement(dt);

    requestAnimationFrame(loop);
}

console.log("✅ movement.js loaded");