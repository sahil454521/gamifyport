// ========================================
// GAME WORLD CONFIGURATION & GLOBAL STATE
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
// BUILDINGS (Coordinates on 780x340 map)
// ========================================

const BUILDINGS = [
    {
        id: "skills",
        name: "Skills Shop",
        label: "SKILLS SHOP",
        rect: { x: 22, y: 0, w: 135, h: 50 },
        door: { x: 70, y: 50, w: 42, h: 20 },
        icon: "🧰",
        type: "skills"
    },
    {
        id: "about",
        name: "About Me",
        label: "ABOUT ME",
        rect: { x: 108, y: 196, w: 114, h: 84 },
        door: { x: 144, y: 280, w: 44, h: 20 },
        icon: "👋",
        type: "about"
    },
    {
        id: "projects",
        name: "Projects Lab",
        label: "PROJECTS",
        rect: { x: 338, y: 154, w: 128, h: 68 },
        door: { x: 383, y: 222, w: 44, h: 20 },
        icon: "💻",
        type: "projects"
    },
    {
        id: "gym",
        name: "Developer Gym",
        label: "GYM",
        rect: { x: 538, y: 222, w: 242, h: 96 },
        door: { x: 628, y: 318, w: 48, h: 24 },
        icon: "🏆",
        gym: true,
        type: "gym"
    },
    {
        id: "contact",
        name: "Contact Signpost",
        label: "CONTACT",
        rect: { x: 426, y: 236, w: 32, h: 26 },
        door: { x: 420, y: 236, w: 44, h: 28 },
        icon: "✉️",
        noBlock: true,
        small: true,
        type: "contact"
    }
];

// ========================================
// OBSTACLES (Natural terrain boundaries)
// ========================================

const OBSTACLES = [
    { x: 296, y: 0, w: 172, h: 96 },   // lake
    { x: 0, y: 150, w: 113, h: 190 },  // SW mountain
    { x: 452, y: 0, w: 112, h: 54 },   // NE mountain 1
    { x: 706, y: 0, w: 74, h: 44 }     // NE mountain 2
];

console.log("✅ game.js loaded");