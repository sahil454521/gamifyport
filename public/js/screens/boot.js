// ========================================
// BOOT SCREEN
// ========================================

const bootScreen = document.getElementById("boot-screen");
const gameScreen = document.getElementById("game-screen");

let gameStarted = false;


// ========================================
// START GAME
// ========================================

function beginGame() {

  // Prevent starting twice
  if (gameStarted) {
    return;
  }

  gameStarted = true;

  console.log("🎮 Starting Portfolio Quest...");


  // ------------------------------------
  // Hide boot screen
  // ------------------------------------

  bootScreen.style.display = "none";


  // ------------------------------------
  // Show game screen
  // ------------------------------------

  gameScreen.style.display = "flex";


  // ------------------------------------
  // Build world
  // ------------------------------------

  if (typeof buildWorld === "function") {
    buildWorld();
  }


  // ------------------------------------
  // Render player
  // ------------------------------------

  if (typeof render === "function") {
    render();
  }


  // ------------------------------------
  // Start game loop
  // ------------------------------------

  if (typeof loop === "function") {
    requestAnimationFrame(loop);
  }

}


// ========================================
// CLICK ANYWHERE ON BOOT SCREEN
// ========================================

bootScreen.addEventListener("click", () => {

  beginGame();

});


// ========================================
// KEYBOARD
// ========================================

window.addEventListener("keydown", (event) => {

  if (!gameStarted) {

    beginGame();

  }

});