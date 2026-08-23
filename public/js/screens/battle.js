// ========================================
// PORTFOLIO GYM BATTLE
// ========================================

let battleState = null;


// ========================================
// START BATTLE
// ========================================

function startBattle() {

    const screen =
        document.getElementById(
            "battle-screen"
        );


    if (!screen) {
        return;
    }


    battleOpen = true;


    battleState = {

        playerHP: 100,

        enemyHP: 100,

        playerMaxHP: 100,

        enemyMaxHP: 100,

        turn: "player",

        enemyName:
            "THE SENIOR DEVELOPER"

    };


    screen.style.display =
        "flex";


    renderBattle();

}


// ========================================
// RENDER
// ========================================

function renderBattle() {

    const screen =
        document.getElementById(
            "battle-screen"
        );


    if (!screen) {
        return;
    }


    screen.innerHTML = `

        <div class="battle-window">


            <div class="battle-title">

                ⚔️ DEVELOPER GYM ⚔️

            </div>


            <div class="battle-opponent">

                <div class="battle-sprite">

                    👨‍💻

                </div>

                <div>

                    <strong>
                        ${battleState.enemyName}
                    </strong>

                    <div class="battle-hp">

                        <div
                            style="
                                width:
                                ${battleState.enemyHP}%;
                            "
                        ></div>

                    </div>

                    <small>
                        HP
                        ${battleState.enemyHP}
                        /
                        ${battleState.enemyMaxHP}
                    </small>

                </div>

            </div>


            <div class="battle-player">

                <div>

                    <strong>
                        SAHIL
                    </strong>

                    <div class="battle-hp">

                        <div
                            style="
                                width:
                                ${battleState.playerHP}%;
                            "
                        ></div>

                    </div>

                    <small>
                        CONFIDENCE
                        ${battleState.playerHP}
                        /
                        ${battleState.playerMaxHP}
                    </small>

                </div>


                <div class="battle-sprite">

                    🧑‍💻

                </div>

            </div>


            <div
                class="battle-message"
                id="battle-message"
            >
                Choose your move!
            </div>


            <div class="battle-actions">

                <button
                    onclick="
                        playerAttack('code')
                    "
                >
                    💻 CODE
                </button>


                <button
                    onclick="
                        playerAttack('ml')
                    "
                >
                    🤖 MACHINE LEARNING
                </button>


                <button
                    onclick="
                        playerAttack('debug')
                    "
                >
                    🐛 DEBUG
                </button>


                <button
                    onclick="
                        playerAttack('deploy')
                    "
                >
                    🚀 DEPLOY
                </button>

            </div>


            <button
                class="battle-run"
                onclick="closeBattle()"
            >
                RUN AWAY
            </button>


        </div>

    `;
}


// ========================================
// PLAYER ATTACK
// ========================================

function playerAttack(
    type
) {

    if (
        !battleState ||
        battleState.turn !==
        "player"
    ) {
        return;
    }


    let damage = 0;

    let message = "";


    switch (type) {

        case "code":

            damage = 20;

            message =
                "You wrote some clean code!";

            break;


        case "ml":

            damage = 25;

            message =
                "Your model predicted weakness!";

            break;


        case "debug":

            damage = 30;

            message =
                "BUG FOUND! Critical hit!";

            break;


        case "deploy":

            damage = 15;

            message =
                "Deployment successful!";

            break;

    }


    battleState.enemyHP =
        Math.max(
            0,
            battleState.enemyHP -
            damage
        );


    if (
        battleState.enemyHP <= 0
    ) {

        renderBattle();

        setTimeout(
            battleVictory,
            700
        );

        return;
    }


    battleState.turn =
        "enemy";


    renderBattle();


    setTimeout(
        enemyAttack,
        700
    );

}


// ========================================
// ENEMY ATTACK
// ========================================

function enemyAttack() {

    const damage =
        Math.floor(
            Math.random() *
            16
        ) + 10;


    battleState.playerHP =
        Math.max(
            0,
            battleState.playerHP -
            damage
        );


    if (
        battleState.playerHP <= 0
    ) {

        battleDefeat();

        return;
    }


    battleState.turn =
        "player";


    renderBattle();

}


// ========================================
// VICTORY
// ========================================

function battleVictory() {

    battleState = null;


    resumeUnlocked = true;


    const screen =
        document.getElementById(
            "battle-screen"
        );


    screen.innerHTML = `

        <div class="battle-window">

            <div class="victory">

                🏆

                <h1>
                    GYM DEFEATED!
                </h1>

                <p>
                    You proved your
                    developer skills.
                </p>

                <p>
                    Your résumé has
                    been unlocked!
                </p>

                <button
                    onclick="closeBattle()"
                >
                    RETURN TO TOWN
                </button>

            </div>

        </div>

    `;

}


// ========================================
// DEFEAT
// ========================================

function battleDefeat() {

    const screen =
        document.getElementById(
            "battle-screen"
        );


    screen.innerHTML = `

        <div class="battle-window">

            <div class="victory">

                💀

                <h1>
                    YOU LOST
                </h1>

                <p>
                    The Gym Leader
                    out-debugged you.
                </p>

                <button
                    onclick="closeBattle()"
                >
                    TRY AGAIN
                </button>

            </div>

        </div>

    `;

}


// ========================================
// CLOSE BATTLE
// ========================================

function closeBattle() {

    const screen =
        document.getElementById(
            "battle-screen"
        );


    if (screen) {

        screen.style.display =
            "none";

    }


    battleOpen = false;

    battleState = null;

    render();
}