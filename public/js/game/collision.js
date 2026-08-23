// ========================================
// COLLISION SYSTEM
// ========================================


// Player collision offsets
const PLAYER_TOP_OFFSET = 40 * 0.78;
const PLAYER_BOTTOM_OFFSET = 40 * 0.22;


// ========================================
// RECTANGLE COLLISION
// ========================================

function rectsOverlap(a, b) {

  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}


// ========================================
// PLAYER FOOT RECTANGLE
// ========================================

function footRect(x, y) {

  return {
    x: x - 10,
    y: y - 4,
    w: 20,
    h: 14
  };
}


// ========================================
// CHECK IF POSITION IS BLOCKED
// ========================================

function blockedAt(x, y) {

  const foot = footRect(x, y);


  // ------------------------------------
  // World boundaries
  // ------------------------------------

  if (
    x - player.w / 2 < 4 ||
    x + player.w / 2 > WORLD_W - 4
  ) {
    return true;
  }


  if (
    y - PLAYER_TOP_OFFSET < 2 ||
    y + PLAYER_BOTTOM_OFFSET > WORLD_H - 2
  ) {
    return true;
  }


  // ------------------------------------
  // Buildings
  // ------------------------------------

  for (const building of BUILDINGS) {

    // Some buildings don't block movement
    if (building.noBlock) {
      continue;
    }

    if (
      rectsOverlap(
        foot,
        building.rect
      )
    ) {
      return true;
    }
  }


  // ------------------------------------
  // Natural obstacles
  // ------------------------------------

  for (const obstacle of OBSTACLES) {

    if (
      rectsOverlap(
        foot,
        obstacle
      )
    ) {
      return true;
    }
  }


  return false;
}