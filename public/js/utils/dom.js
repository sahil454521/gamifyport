// ========================================
// DOM UTILITIES
// ========================================

window.$ = (selector) => document.querySelector(selector);
window.$$ = (selector) => [...document.querySelectorAll(selector)];

Object.defineProperty(window, "worldEl", {
    get: () => document.getElementById("world"),
    configurable: true
});

Object.defineProperty(window, "playerEl", {
    get: () => document.getElementById("player"),
    configurable: true
});

console.log("✅ dom.js loaded");
