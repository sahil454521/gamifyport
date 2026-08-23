// ========================================
// MENU
// ========================================

const menuOverlay =
    document.getElementById(
        "menu-overlay"
    );

const menuClose =
    document.getElementById(
        "menu-close"
    );

const menuReturn =
    document.getElementById(
        "menu-return"
    );

const menuButton =
    document.getElementById(
        "menu-button"
    );


// ========================================
// OPEN
// ========================================

function openMenu() {

    console.log("📖 Opening menu");

    if (!menuOverlay) {

        console.error(
            "❌ menu-overlay not found"
        );

        return;
    }


    menuOpen = true;

    menuOverlay.style.display =
        "flex";
}


// ========================================
// CLOSE
// ========================================

function closeMenu() {

    console.log("📕 Closing menu");

    if (!menuOverlay) {
        return;
    }


    menuOpen = false;

    menuOverlay.style.display =
        "none";
}


// ========================================
// BUTTON
// ========================================

if (menuButton) {

    menuButton.addEventListener(
        "click",
        openMenu
    );

    console.log(
        "✅ MENU button connected"
    );

} else {

    console.error(
        "❌ MENU button not found"
    );

}


// ========================================
// CLOSE
// ========================================

if (menuClose) {

    menuClose.addEventListener(
        "click",
        closeMenu
    );

}


// ========================================
// RETURN
// ========================================

if (menuReturn) {

    menuReturn.addEventListener(
        "click",
        closeMenu
    );

}


// ========================================
// ESC
// ========================================

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            menuOpen
        ) {

            closeMenu();

        }

    }
);


// ========================================
// CLICK OUTSIDE
// ========================================

if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                menuOverlay
            ) {

                closeMenu();

            }

        }
    );

}


console.log(
    "✅ menu.js loaded"
);