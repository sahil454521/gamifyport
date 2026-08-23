// ========================================
// BUILDING INTERACTION & DOOR SYSTEM
// ========================================

const INTERACTION_DISTANCE = 40;

// ========================================
// DOOR TRIGGER CHECK (Called in movement loop)
// ========================================

function tryTriggerDoor() {
    if (dialogOpen || menuOpen || battleOpen || resumeOpen) return;

    const foot = footRect(player.x, player.y);
    let hit = null;

    if (Array.isArray(BUILDINGS)) {
        for (const b of BUILDINGS) {
            if (b.door && rectsOverlap(foot, b.door)) {
                hit = b;
                break;
            }
        }
    }

    if (hit) {
        if (lastDoor !== hit.id) {
            lastDoor = hit.id;
            enterBuilding(hit);
        }
    } else {
        lastDoor = null;
        checkBuildingProximity();
    }
}

// ========================================
// CHECK PROXIMITY FOR HINT BANNER
// ========================================

function checkBuildingProximity() {
    let nearBuilding = null;

    if (Array.isArray(BUILDINGS)) {
        for (const b of BUILDINGS) {
            const centerX = b.rect.x + b.rect.w / 2;
            const centerY = b.rect.y + b.rect.h / 2;
            const dx = player.x - centerX;
            const dy = player.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < INTERACTION_DISTANCE + Math.max(b.rect.w, b.rect.h) / 2) {
                nearBuilding = b;
                break;
            }
        }
    }

    if (nearBuilding) {
        showInteractionHint(`Press E or walk in to enter ${nearBuilding.label}`);
    } else {
        hideInteractionHint();
    }
}

// ========================================
// ENTER BUILDING ROUTING
// ========================================

function enterBuilding(b) {
    if (!b) return;

    if (typeof blip === "function") {
        blip(700, 0.06);
    }

    console.log("🚪 Entering building:", b.id || b.label);

    const id = b.id || b.type;

    if (id === "about") {
        if (typeof showAbout === "function") showAbout();
    } else if (id === "skills") {
        if (typeof showSkills === "function") showSkills();
    } else if (id === "projects") {
        if (typeof showProjects === "function") showProjects();
    } else if (id === "contact") {
        if (typeof showContact === "function") showContact();
    } else if (id === "gym") {
        if (typeof showGymEntrance === "function") showGymEntrance();
        else if (typeof startBattle === "function") startBattle();
    } else if (id === "resume") {
        if (typeof openResume === "function") openResume();
    }
}

// ========================================
// KEYBOARD INTERACTION ('E', 'Enter', 'Space')
// ========================================

window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === "e" || key === "enter" || (key === " " && !dialogOpen && !battleOpen && !menuOpen)) {
        if (dialogOpen || menuOpen || battleOpen || resumeOpen) return;

        const foot = footRect(player.x, player.y);
        let targetBuilding = null;

        if (Array.isArray(BUILDINGS)) {
            for (const b of BUILDINGS) {
                if (b.door && rectsOverlap(foot, b.door)) {
                    targetBuilding = b;
                    break;
                }

                const centerX = b.rect.x + b.rect.w / 2;
                const centerY = b.rect.y + b.rect.h / 2;
                const dx = player.x - centerX;
                const dy = player.y - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < INTERACTION_DISTANCE + Math.max(b.rect.w, b.rect.h) / 2) {
                    targetBuilding = b;
                    break;
                }
            }
        }

        if (targetBuilding) {
            enterBuilding(targetBuilding);
            event.preventDefault();
        }
    }
});

// ========================================
// HINT BANNER CONTROLS (Cached to avoid DOM thrashing)
// ========================================

let currentHintText = "";

function showInteractionHint(text) {
    if (currentHintText === text) return;
    currentHintText = text;

    const hint = document.getElementById("hint-banner");
    if (!hint) return;

    hint.textContent = text;
    hint.style.display = "block";
    hint.style.opacity = "1";
}

function hideInteractionHint() {
    if (currentHintText === "") return;
    currentHintText = "";

    const hint = document.getElementById("hint-banner");
    if (!hint) return;

    hint.style.display = "none";
    hint.style.opacity = "0";
}

console.log("✅ interaction.js loaded");