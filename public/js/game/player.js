// ========================================
// PLAYER
// ========================================
function updateMovement() {

    if (menuOpen) {

        player.moving = false;

        updateSprite();

        return;
    }}

    // existing movement code...
const player = {

    x: 390,
    y: 150,

    w: 34,
    h: 40,

    dir: "down",

    moving: false
};


// ========================================
// PLAYER ELEMENT
// ========================================

const playerEl =
    document.getElementById("player");


// ========================================
// CHECK PLAYER
// ========================================

if (!playerEl) {

    console.error(
        "❌ Player element #player was not found!"
    );

} else {

    console.log(
        "✅ Player element found"
    );

}


// ========================================
// SPRITE
// ========================================

function updateSprite() {

    if (!playerEl) {
        return;
    }


    playerEl.classList.remove(
        "face-down",
        "face-left",
        "face-right",
        "face-up"
    );


    if (player.dir === "left") {

        playerEl.classList.add(
            "face-left"
        );

    }

    else if (player.dir === "right") {

        playerEl.classList.add(
            "face-right"
        );

    }

    else if (player.dir === "up") {

        playerEl.classList.add(
            "face-up"
        );

    }

    else {

        playerEl.classList.add(
            "face-down"
        );

    }


    playerEl.classList.toggle(
        "walking",
        player.moving
    );
}
// ========================================
// RENDER
// ========================================

function render() {

    if (!playerEl) {
        return;
    }

    const x =
        (player.x / WORLD_W) * 100;

    const y =
        (player.y / WORLD_H) * 100;

    playerEl.style.left =
        `${x}%`;

    playerEl.style.top =
        `${y}%`;

    updateSprite();
}

// ========================================
// GAME LOOP
// ========================================

function loop(timestamp) {

    if (lastTime === null) {
        lastTime = timestamp;
    }

    lastTime = timestamp;


    // Check keyboard
    updateMovement();
    checkBuildingInteraction();


    // Draw player
    render();


    requestAnimationFrame(loop);
}