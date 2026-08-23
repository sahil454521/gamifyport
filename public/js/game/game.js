// ========================================
// GAME WORLD
// ========================================

const WORLD_W = 780;
const WORLD_H = 340;


// ========================================
// GAME STATE
// ========================================

let dialogOpen = false;
let menuOpen = false;
let battleOpen = false;
let resumeOpen = false;

let resumeUnlocked = false;

let lastDoor = null;
let lastTime = null;


// ========================================
// BUILDINGS
// ========================================

const BUILDINGS = {

    resume: {
        name: "Resume House",

        x: 100,
        y: 220,

        width: 130,
        height: 100,

        type: "resume"
    },


    projects: {
        name: "Projects",

        x: 390,
        y: 150,

        width: 130,
        height: 100,

        type: "projects"
    },


    gym: {
        name: "Developer Gym",

        x: 620,
        y: 220,

        width: 120,
        height: 100,

        type: "gym"
    },


    contact: {
        name: "Contact",

        x: 390,
        y: 260,

        width: 100,
        height: 70,

        type: "contact"
    }

};


// ========================================
// OBSTACLES
// ========================================

const OBSTACLES = [];


// ========================================
// BUILD WORLD
// ========================================

function buildWorld() {

    const world =
        document.getElementById("world");


    if (!world) {

        console.error(
            "❌ #world not found"
        );

        return;
    }


    console.log(
        "🌍 World initialized"
    );
}


// ========================================
// GAME INITIALIZATION
// ========================================

function initGame() {

    buildWorld();

    render();

}


// ========================================
// DEBUG
// ========================================

console.log(
    "✅ game.js loaded"
);