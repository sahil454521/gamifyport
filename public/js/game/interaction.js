// ========================================
// BUILDING INTERACTION
// ========================================

const INTERACTION_DISTANCE = 35;


// ========================================
// CHECK PLAYER NEAR BUILDING
// ========================================

function isNearBuilding(building) {

    const centerX =
        building.x +
        building.width / 2;

    const centerY =
        building.y +
        building.height / 2;


    const dx =
        player.x - centerX;

    const dy =
        player.y - centerY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    return distance <
        INTERACTION_DISTANCE +
        Math.max(
            building.width,
            building.height
        ) / 2;
}


// ========================================
// INTERACTION
// ========================================

function checkBuildingInteraction() {

    for (
        const key in BUILDINGS
    ) {

        const building =
            BUILDINGS[key];


        if (
            !isNearBuilding(
                building
            )
        ) {
            continue;
        }


        if (
            building.type ===
            "resume"
        ) {

            showInteractionHint(
                "Press E to view Resume"
            );

        }


        if (
            building.type ===
            "gym"
        ) {

            showInteractionHint(
                "Press E to challenge the Gym"
            );

        }


        if (
            building.type ===
            "projects"
        ) {

            showInteractionHint(
                "Press E to view Projects"
            );

        }


        if (
            building.type ===
            "contact"
        ) {

            showInteractionHint(
                "Press E to open Contact"
            );

        }

    }

}


// ========================================
// INTERACTION KEY
// ========================================

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase()
            !== "e"
        ) {
            return;
        }


        for (
            const key in BUILDINGS
        ) {

            const building =
                BUILDINGS[key];


            if (
                !isNearBuilding(
                    building
                )
            ) {
                continue;
            }


            enterBuilding(
                building
            );


            break;
        }

    }
);


// ========================================
// ENTER BUILDING
// ========================================

function enterBuilding(building) {

    console.log(
        "Entering:",
        building.name
    );


    switch (
        building.type
    ) {

        case "resume":

            openResume();

            break;


        case "gym":

            startBattle();

            break;


        case "projects":

            openProjects();

            break;


        case "contact":

            openContact();

            break;

    }

}


// ========================================
// HINT
// ========================================

function showInteractionHint(
    text
) {

    const hint =
        document.getElementById(
            "hint-banner"
        );


    if (!hint) {
        return;
    }


    hint.textContent = text;

    hint.style.display =
        "block";

}


// ========================================
// HIDE HINT
// ========================================

function hideInteractionHint() {

    const hint =
        document.getElementById(
            "hint-banner"
        );


    if (!hint) {
        return;
    }


    hint.style.display =
        "none";

}