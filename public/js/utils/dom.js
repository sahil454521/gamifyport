window.$ = (selector) => document.querySelector(selector);
window.$$ = (selector) => [...document.querySelectorAll(selector)];
window.worldEl = document.querySelector("#world");
window.playerEl = document.querySelector("#player");
