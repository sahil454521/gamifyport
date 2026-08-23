// ========================================
// POKEMON STYLE MOVEMENT
// ========================================

const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};


// ========================================
// MOVEMENT SETTINGS
// ========================================

// Distance moved per step
const STEP_SIZE = 32;

// Time for one step
const STEP_TIME = 120;

// Prevent movement from becoming too fast
let movementLocked = false;


// ========================================
// KEY DOWN
// ========================================

window.addEventListener("keydown", (event) => {

    const key = event.key.toLowerCase();

    if (
        key === "w" ||
        key === "arrowup"
    ) {

        keys.up = true;

        event.preventDefault();
    }


    if (
        key === "s" ||
        key === "arrowdown"
    ) {

        keys.down = true;

        event.preventDefault();
    }


    if (
        key === "a" ||
        key === "arrowleft"
    ) {

        keys.left = true;

        event.preventDefault();
    }


    if (
        key === "d" ||
        key === "arrowright"
    ) {

        keys.right = true;

        event.preventDefault();
    }

});


// ========================================
// KEY UP
// ========================================

window.addEventListener("keyup", (event) => {

    const key = event.key.toLowerCase();


    if (
        key === "w" ||
        key === "arrowup"
    ) {

        keys.up = false;
    }


    if (
        key === "s" ||
        key === "arrowdown"
    ) {

        keys.down = false;
    }


    if (
        key === "a" ||
        key === "arrowleft"
    ) {

        keys.left = false;
    }


    if (
        key === "d" ||
        key === "arrowright"
    ) {

        keys.right = false;
    }

});


// ========================================
// CHECK WHICH DIRECTION IS PRESSED
// ========================================

function getDirection() {

    /*
        Only ONE direction at a time.

        This prevents diagonal movement.
    */

    if (keys.up) {
        return "up";
    }

    if (keys.down) {
        return "down";
    }

    if (keys.left) {
        return "left";
    }

    if (keys.right) {
        return "right";
    }

    return null;
}


// ========================================
// MOVE ONE STEP
// ========================================

function moveOneStep(direction) {

    if (movementLocked) {
        return;
    }


    movementLocked = true;


    // ------------------------------------
    // Direction
    // ------------------------------------

    let dx = 0;
    let dy = 0;


    if (direction === "up") {

        dy = -STEP_SIZE;

        player.dir = "up";
    }


    if (direction === "down") {

        dy = STEP_SIZE;

        player.dir = "down";
    }


    if (direction === "left") {

        dx = -STEP_SIZE;

        player.dir = "left";
    }


    if (direction === "right") {

        dx = STEP_SIZE;

        player.dir = "right";
    }


    // ------------------------------------
    // Walking animation
    // ------------------------------------

    player.moving = true;

    updateSprite();


    // ------------------------------------
    // Calculate destination
    // ------------------------------------

    const targetX =
        player.x + dx;

    const targetY =
        player.y + dy;


    // ------------------------------------
    // World boundaries
    // ------------------------------------

    const insideWorld =

        targetX >= 15 &&

        targetX <= WORLD_W - 15 &&

        targetY >= 15 &&

        targetY <= WORLD_H - 15;


    if (!insideWorld) {

        player.moving = false;

        updateSprite();

        movementLocked = false;

        return;
    }


    // ------------------------------------
    // Move smoothly to next tile
    // ------------------------------------

    const startX = player.x;
    const startY = player.y;

    const startTime = performance.now();


    function animateStep(now) {

        const elapsed =
            now - startTime;


        const progress =
            Math.min(
                elapsed / STEP_TIME,
                1
            );


        /*
            Smoothstep gives the movement
            a small RPG-style acceleration.
        */

        const eased =
            progress *
            progress *
            (3 - 2 * progress);


        player.x =
            startX +
            (targetX - startX) *
            eased;


        player.y =
            startY +
            (targetY - startY) *
            eased;


        render();


        if (progress < 1) {

            requestAnimationFrame(
                animateStep
            );

            return;
        }


        // --------------------------------
        // Snap exactly onto tile
        // --------------------------------

        player.x = targetX;
        player.y = targetY;


        player.moving = false;

        updateSprite();

        render();


        movementLocked = false;


        /*
            If the key is STILL being held,
            immediately take another step.
        */

        const nextDirection =
            getDirection();


        if (nextDirection) {

            moveOneStep(
                nextDirection
            );

        }

    }


    requestAnimationFrame(
        animateStep
    );
}


// ========================================
// MOVEMENT LOOP
// ========================================

function updateMovement() {

    if (movementLocked) {
        return;
    }


    const direction =
        getDirection();


    if (!direction) {

        player.moving = false;

        updateSprite();

        return;
    }


    moveOneStep(direction);
}