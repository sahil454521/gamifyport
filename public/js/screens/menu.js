// ========================================
// START MENU SYSTEM
// ========================================

function openMenu() {
    console.log("🎒 Opening Pokémon Start Menu");
    const menuOverlay = document.getElementById("menu-overlay");
    if (!menuOverlay) return;

    menuOpen = true;
    menuOverlay.style.display = "flex";

    if (typeof blip === "function") {
        blip(580, 0.05);
    }
}

function closeMenu() {
    console.log("🎒 Closing Start Menu");
    const menuOverlay = document.getElementById("menu-overlay");
    if (!menuOverlay) return;

    menuOpen = false;
    menuOverlay.style.display = "none";

    if (typeof blip === "function") {
        blip(380, 0.04);
    }
}

function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
}

// ========================================
// MENU ACTIONS
// ========================================

function handleMenuAction(action) {
    closeMenu();

    setTimeout(() => {
        switch (action) {
            case "about":
                if (typeof showAbout === "function") showAbout();
                break;
            case "projects":
                if (typeof showProjects === "function") showProjects();
                break;
            case "skills":
                if (typeof showSkills === "function") showSkills();
                break;
            case "contact":
                if (typeof showContact === "function") showContact();
                break;
            case "resume":
                if (typeof openResume === "function") openResume();
                break;
            case "gym":
                if (typeof showGymEntrance === "function") showGymEntrance();
                else if (typeof startBattle === "function") startBattle();
                break;
        }
    }, 120);
}

// ========================================
// INITIALIZE MENU EVENT LISTENERS
// ========================================

function initMenu() {
    // Menu toggle buttons in HUD
    const menuBtn1 = document.getElementById("menu-button");
    const menuBtn2 = document.getElementById("menu-btn");
    if (menuBtn1) menuBtn1.onclick = openMenu;
    if (menuBtn2) menuBtn2.onclick = openMenu;

    // Close & return buttons
    const menuClose = document.getElementById("menu-close");
    const menuReturn = document.getElementById("menu-return");
    const menuResume = document.getElementById("menu-resume-button");

    if (menuClose) menuClose.onclick = closeMenu;
    if (menuReturn) menuReturn.onclick = closeMenu;
    if (menuResume) {
        menuResume.onclick = () => {
            closeMenu();
            setTimeout(() => {
                if (typeof openResume === "function") openResume();
            }, 100);
        };
    }

    // Option buttons
    document.querySelectorAll(".menu-option[data-action]").forEach((btn) => {
        btn.onclick = () => {
            const action = btn.dataset.action;
            handleMenuAction(action);
        };
        btn.onmouseenter = () => {
            if (typeof blip === "function") blip(700, 0.02, "sine");
        };
    });

    // Close on click outside panel
    const menuOverlay = document.getElementById("menu-overlay");
    if (menuOverlay) {
        menuOverlay.onclick = (e) => {
            if (e.target === menuOverlay) closeMenu();
        };
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu);
} else {
    initMenu();
}

console.log("✅ menu.js loaded");