// ========================================
// POKÉMON GBA BATTLE SYSTEM
// Ash-Greninja vs Mega Charizard X
// + "POWER OF THE MAIN CHARACTER" (MC) EVOLUTION
// ========================================

let battleState = null;

// ========================================
// BASE POKÉMON DATA
// ========================================

const GRENINJA_BASE_MOVES = [
    {
        name: "WATER SHURIKEN",
        type: "water",
        power: 20,
        hits: [2, 3, 4, 5],
        accuracy: 100,
        pp: 20,
        maxPP: 20,
        category: "special",
        desc: "Hits 2-5 times"
    },
    {
        name: "AERIAL ACE",
        type: "flying",
        power: 60,
        accuracy: 999,
        pp: 20,
        maxPP: 20,
        category: "physical",
        desc: "Never misses"
    },
    {
        name: "NIGHT SLASH",
        type: "dark",
        power: 70,
        accuracy: 100,
        pp: 15,
        maxPP: 15,
        category: "physical",
        critBoost: true,
        desc: "High crit ratio"
    },
    {
        name: "HYDRO PUMP",
        type: "water",
        power: 110,
        accuracy: 80,
        pp: 5,
        maxPP: 5,
        category: "special",
        desc: "Powerful water blast"
    }
];

// 10x SUPERCHARGED MAIN CHARACTER EVOLUTION MOVES
const GRENINJA_MC_MOVES = [
    {
        name: "🌟 GIANT WATER SHURIKEN",
        type: "water",
        power: 250, // 10x Power with massive blast
        hits: [3, 4, 5],
        accuracy: 100,
        pp: 99,
        maxPP: 99,
        category: "special",
        critBoost: true,
        isMCMove: true,
        desc: "10x Ultimate Bond Shuriken"
    },
    {
        name: "⚡ SONIC AERIAL ACE",
        type: "flying",
        power: 600,
        accuracy: 999,
        pp: 99,
        maxPP: 99,
        category: "physical",
        isMCMove: true,
        desc: "10x Light-speed slash"
    },
    {
        name: "🌌 NIGHT SLASH OMEGA",
        type: "dark",
        power: 700,
        accuracy: 100,
        pp: 99,
        maxPP: 99,
        category: "physical",
        critBoost: true,
        isMCMove: true,
        desc: "10x Dimension slice"
    },
    {
        name: "🌊 TITANIC HYDRO PUMP",
        type: "water",
        power: 1100,
        accuracy: 95,
        pp: 99,
        maxPP: 99,
        category: "special",
        isMCMove: true,
        desc: "10x Continental tsunami"
    }
];

const GRENINJA = {
    name: "ASH-GRENINJA",
    level: 50,
    types: ["Water", "Dark"],
    maxHP: 145,
    hp: 145,
    attack: 140,
    defense: 78,
    speed: 132,
    sprite: "./assets/images/ash-greninja.png",
    moves: JSON.parse(JSON.stringify(GRENINJA_BASE_MOVES))
};

const CHARIZARD_X = {
    name: "MEGA CHARIZARD X",
    level: 50,
    types: ["Fire", "Dragon"],
    maxHP: 160,
    hp: 160,
    attack: 150,
    defense: 111,
    speed: 100,
    atkBoost: 0,
    spdBoost: 0,
    sprite: "./assets/images/mega-charizard-x.png",
    moves: [
        {
            name: "DRAGON CLAW",
            type: "dragon",
            power: 80,
            accuracy: 100,
            category: "physical",
            desc: "Sharp dragon claws"
        },
        {
            name: "FLARE BLITZ",
            type: "fire",
            power: 120,
            accuracy: 100,
            recoil: 0.33,
            category: "physical",
            desc: "Powerful but recoil"
        },
        {
            name: "THUNDER PUNCH",
            type: "electric",
            power: 75,
            accuracy: 100,
            category: "physical",
            desc: "Electric fist"
        },
        {
            name: "DRAGON DANCE",
            type: "dragon",
            power: 0,
            accuracy: 999,
            category: "status",
            desc: "Boosts ATK & SPD"
        }
    ]
};

// ========================================
// TYPE CHART (Simplified Pokémon Multipliers)
// ========================================

const TYPE_CHART = {
    water: { fire: 2, dragon: 0.5, water: 0.5 },
    dark: { dark: 0.5, fire: 1, dragon: 1 },
    flying: { fire: 1, dragon: 1 },
    fire: { water: 0.5, fire: 0.5, dragon: 0.5 },
    dragon: { dragon: 2, fire: 1, water: 1 },
    electric: { water: 2, fire: 1, dragon: 0.5 }
};

// ========================================
// DAMAGE CALCULATION
// ========================================

function calcDamage(attacker, defender, move, atkBoost = 0, multiplier = 1) {
    if (move.category === "status") return { damage: 0, effectiveness: 1, critical: false, hits: 1 };

    let atk = attacker.attack;
    let def = defender.defense;

    if (atkBoost > 0) {
        atk = Math.floor(atk * (1 + atkBoost * 0.5));
    }

    let damage = Math.floor(
        ((2 * attacker.level / 5 + 2) * move.power * atk / def / 50) + 2
    );

    // Apply MC 10x multiplier if active
    damage = Math.floor(damage * multiplier);

    // Type effectiveness
    let effectiveness = 1;
    const moveType = move.type;
    if (TYPE_CHART[moveType]) {
        for (const defType of defender.types) {
            const lower = defType.toLowerCase();
            if (TYPE_CHART[moveType][lower]) {
                effectiveness *= TYPE_CHART[moveType][lower];
            }
        }
    }
    damage = Math.floor(damage * effectiveness);

    // STAB
    const attackerTypes = attacker.types.map(t => t.toLowerCase());
    if (attackerTypes.includes(moveType)) {
        damage = Math.floor(damage * 1.5);
    }

    // Random variance
    const rand = (Math.random() * 16 + 85) / 100;
    damage = Math.floor(damage * rand);

    // Critical hit
    let critical = false;
    const critChance = move.critBoost ? 8 : 16;
    if (Math.random() < 1 / critChance || move.isMCMove) {
        damage = Math.floor(damage * 1.5);
        critical = true;
    }

    // Multi-hit
    let hits = 1;
    if (move.hits) {
        hits = move.hits[Math.floor(Math.random() * move.hits.length)];
        damage = damage * hits;
    }

    damage = Math.max(1, damage);

    return { damage, effectiveness, critical, hits };
}

// ========================================
// START BATTLE
// ========================================

function startBattle() {
    const screen = document.getElementById("battle-screen");
    if (!screen) return;

    battleOpen = true;

    // Reset Pokémon stats
    GRENINJA.name = "ASH-GRENINJA";
    GRENINJA.level = 50;
    GRENINJA.maxHP = 145;
    GRENINJA.hp = 145;
    GRENINJA.attack = 140;
    GRENINJA.moves = JSON.parse(JSON.stringify(GRENINJA_BASE_MOVES));

    CHARIZARD_X.hp = CHARIZARD_X.maxHP;
    CHARIZARD_X.atkBoost = 0;
    CHARIZARD_X.spdBoost = 0;

    battleState = {
        turn: "intro",
        animating: false,
        playerPokemon: GRENINJA,
        enemyPokemon: CHARIZARD_X,
        mcPowerTriggered: false,
        mcMultiplier: 1
    };

    // Build battle screen HTML with user-uploaded sprites
    screen.innerHTML = buildBattleHTML();
    screen.classList.add("active");
    screen.style.display = "flex";

    playIntro();
}

// ========================================
// BUILD BATTLE HTML
// ========================================

function buildBattleHTML() {
    const ply = battleState.playerPokemon;
    const opp = battleState.enemyPokemon;

    return `
        <div id="battle-field">
            <!-- Attack effect overlay -->
            <div id="attack-overlay"></div>

            <!-- Opponent Platform & Sprite -->
            <div id="opp-platform"></div>
            <div class="combatant" id="opp-sprite">
                <img src="${opp.sprite}" alt="${opp.name}" id="opp-img">
            </div>
            <div class="hp-panel" id="opp-hp-panel">
                <div class="hp-name">
                    <span class="pokemon-name" id="opp-display-name">${opp.name}</span>
                    <span class="pokemon-lv" id="opp-display-lv">Lv${opp.level}</span>
                </div>
                <div class="hp-bar-bg">
                    <div class="hp-bar-fill" id="opp-hp-fill" style="width:100%"></div>
                </div>
            </div>

            <!-- Player Platform & Sprite -->
            <div id="ply-platform"></div>
            <div class="combatant" id="ply-sprite">
                <img src="${ply.sprite}" alt="${ply.name}" id="ply-img">
            </div>
            <div class="hp-panel" id="ply-hp-panel">
                <div class="hp-name">
                    <span class="pokemon-name" id="ply-display-name">${ply.name}</span>
                    <span class="pokemon-lv" id="ply-display-lv">Lv${ply.level}</span>
                </div>
                <div class="hp-bar-bg">
                    <div class="hp-bar-fill" id="ply-hp-fill" style="width:100%"></div>
                </div>
                <div class="hp-num" id="ply-hp-num">${ply.hp}/${ply.maxHP}</div>
                <div class="exp-bar-bg"><div class="exp-bar-fill"></div></div>
                <div id="ply-mc-badge-wrap"></div>
            </div>
        </div>

        <!-- GBA Textbox -->
        <div id="battle-textbox">
            <div id="battle-msg">A wild battle is about to begin!</div>
            <div id="battle-actions"></div>
        </div>
    `;
}

// ========================================
// INTRO SEQUENCE
// ========================================

function playIntro() {
    const screen = document.getElementById("battle-screen");
    const oppSprite = document.getElementById("opp-sprite");
    const plySprite = document.getElementById("ply-sprite");
    const oppPanel = document.getElementById("opp-hp-panel");
    const plyPanel = document.getElementById("ply-hp-panel");

    if (oppSprite) oppSprite.style.opacity = "0";
    if (plySprite) plySprite.style.opacity = "0";
    if (oppPanel) oppPanel.style.opacity = "0";
    if (plyPanel) plyPanel.style.opacity = "0";

    screen.classList.add("flash-intro");

    // Show Gym Leader's Mega Charizard X
    setTimeout(() => {
        screen.classList.remove("flash-intro");
        showBattleMessage("GYM LEADER sends out MEGA CHARIZARD X!");

        if (oppSprite) {
            oppSprite.style.opacity = "1";
            oppSprite.classList.add("slide-in-right");
        }
        if (oppPanel) {
            oppPanel.style.opacity = "1";
            oppPanel.classList.add("slide-in-left");
        }

        if (typeof blip === "function") blip(330, 0.08);
    }, 1200);

    // Show Ash-Greninja
    setTimeout(() => {
        showBattleMessage("Go! ASH-GRENINJA!");

        if (plySprite) {
            plySprite.style.opacity = "1";
            plySprite.classList.add("slide-in-left");
        }
        if (plyPanel) {
            plyPanel.style.opacity = "1";
            plyPanel.classList.add("slide-in-right");
        }

        if (typeof blip === "function") blip(520, 0.08);
    }, 2800);

    // Start battle
    setTimeout(() => {
        battleState.turn = "player";
        showMoveSelection();
    }, 4200);
}

// ========================================
// SHOW MOVE SELECTION
// ========================================

function showMoveSelection() {
    const actions = document.getElementById("battle-actions");
    if (!actions) return;

    const ply = battleState.playerPokemon;

    let html = "";
    ply.moves.forEach((move, i) => {
        const disabled = move.pp <= 0 ? "disabled" : "";
        const mcClass = move.isMCMove ? "mc-move" : "";
        html += `
            <button class="move-btn ${mcClass}" data-type="${move.type}"
                onclick="selectMove(${i})" ${disabled}>
                ${move.name}
                <span class="move-type">${move.type.toUpperCase()} • PWR ${move.power}</span>
                <span class="move-pp">PP ${move.pp}/${move.maxPP}</span>
            </button>
        `;
    });

    html += `<button class="battle-run-btn" onclick="closeBattle()">🏃 RUN AWAY</button>`;

    actions.innerHTML = html;

    if (battleState.mcPowerTriggered) {
        showBattleMessage("⚡ MAIN CHARACTER POWER READY! Choose an ultimate move!");
    } else {
        showBattleMessage("What will ASH-GRENINJA do?");
    }
}

// ========================================
// PLAYER MOVE SELECTION
// ========================================

function selectMove(index) {
    if (!battleState || battleState.turn !== "player" || battleState.animating) return;

    const move = battleState.playerPokemon.moves[index];
    if (move.pp <= 0) return;

    move.pp--;
    battleState.animating = true;

    const actions = document.getElementById("battle-actions");
    if (actions) actions.innerHTML = "";

    executePlayerAttack(move);
}

// ========================================
// EXECUTE PLAYER ATTACK
// ========================================

function executePlayerAttack(move) {
    const ply = battleState.playerPokemon;
    const opp = battleState.enemyPokemon;

    showBattleMessage(`ASH-GRENINJA used ${move.name}!`);
    if (typeof blip === "function") blip(move.isMCMove ? 880 : 440, 0.08, "square");

    setTimeout(() => {
        playAttackAnimation(move.name, "player");

        // Use 10x multiplier if MC Power is active
        const multiplier = battleState.mcPowerTriggered ? 10 : 1;
        const result = calcDamage(ply, opp, move, 0, multiplier);

        setTimeout(() => {
            opp.hp = Math.max(0, opp.hp - result.damage);
            updateHP("opp", opp.hp, opp.maxHP);

            const oppSprite = document.getElementById("opp-sprite");
            if (oppSprite) {
                const shakeClass = move.isMCMove ? "extreme-shake" : "shake";
                oppSprite.classList.add(shakeClass, "damage-flash");
                setTimeout(() => {
                    oppSprite.classList.remove(shakeClass, "damage-flash");
                }, 650);
            }

            if (typeof blip === "function") blip(move.isMCMove ? 120 : 200, 0.12, "sawtooth");

            if (result.effectiveness > 1) {
                showEffectivenessText("It's super effective!");
            } else if (result.effectiveness < 1 && result.effectiveness > 0) {
                showEffectivenessText("It's not very effective...");
            }

            if (result.critical) {
                showCriticalText();
            }

            if (move.isMCMove) {
                setTimeout(() => {
                    showBattleMessage(`💥 ANIME CRITICAL IMPACT! -${result.damage} HP!`);
                }, 300);
            } else if (result.hits > 1) {
                setTimeout(() => {
                    showBattleMessage(`Hit ${result.hits} times!`);
                }, 400);
            }

            setTimeout(() => {
                if (opp.hp <= 0) {
                    enemyFainted();
                } else {
                    battleState.turn = "enemy";
                    setTimeout(() => executeEnemyAttack(), 700);
                }
            }, 900);

        }, 600);
    }, 400);
}

// ========================================
// EXECUTE ENEMY ATTACK
// ========================================

function executeEnemyAttack() {
    if (!battleState) return;

    const opp = battleState.enemyPokemon;
    const ply = battleState.playerPokemon;

    // AI: choose move
    let moveIndex;
    if (opp.atkBoost < 2 && Math.random() < 0.3) {
        moveIndex = 3; // Dragon Dance
    } else {
        const damaging = [0, 1, 2];
        moveIndex = damaging[Math.floor(Math.random() * damaging.length)];
    }

    const move = opp.moves[moveIndex];

    showBattleMessage(`${opp.name} used ${move.name}!`);
    if (typeof blip === "function") blip(280, 0.06);

    setTimeout(() => {
        playAttackAnimation(move.name, "enemy");

        if (move.category === "status") {
            opp.atkBoost = Math.min(6, opp.atkBoost + 1);
            opp.spdBoost = Math.min(6, opp.spdBoost + 1);

            setTimeout(() => {
                showBattleMessage(`${opp.name}'s Attack and Speed rose!`);
                showStatBoostArrow("opp");
                if (typeof blip === "function") blip(600, 0.06);

                setTimeout(() => {
                    battleState.turn = "player";
                    battleState.animating = false;
                    showMoveSelection();
                }, 1100);
            }, 700);

            return;
        }

        const result = calcDamage(opp, ply, move, opp.atkBoost);

        setTimeout(() => {
            ply.hp = Math.max(0, ply.hp - result.damage);
            updateHP("ply", ply.hp, ply.maxHP);

            const plySprite = document.getElementById("ply-sprite");
            if (plySprite) {
                plySprite.classList.add("shake", "damage-flash");
                setTimeout(() => {
                    plySprite.classList.remove("shake", "damage-flash");
                }, 600);
            }

            if (typeof blip === "function") blip(160, 0.08);

            if (result.effectiveness > 1) {
                showEffectivenessText("It's super effective!");
            }

            if (result.critical) {
                showCriticalText();
            }

            if (move.recoil) {
                const recoilDmg = Math.floor(result.damage * move.recoil);
                opp.hp = Math.max(0, opp.hp - recoilDmg);
                updateHP("opp", opp.hp, opp.maxHP);
                setTimeout(() => {
                    showBattleMessage(`${opp.name} is damaged by recoil!`);
                }, 500);
            }

            // ========================================
            // CHECK HP ZERO -> TRIGGER POWER OF MC!
            // ========================================
            setTimeout(() => {
                if (ply.hp <= 0) {
                    if (!battleState.mcPowerTriggered) {
                        triggerMCPower();
                    } else {
                        playerFainted();
                    }
                } else {
                    battleState.turn = "player";
                    battleState.animating = false;
                    showMoveSelection();
                }
            }, 1000);

        }, 600);
    }, 400);
}

// ========================================
// ⚡ "POWER OF THE MAIN CHARACTER" (MC) SEQUENCE ⚡
// ========================================

function triggerMCPower() {
    battleState.mcPowerTriggered = true;
    battleState.mcMultiplier = 10;

    const overlay = document.getElementById("attack-overlay");
    const plySprite = document.getElementById("ply-sprite");
    const plyFill = document.getElementById("ply-hp-fill");
    const badgeWrap = document.getElementById("ply-mc-badge-wrap");

    // Phase 1: Drama
    showBattleMessage("ASH-GRENINJA is at its absolute limit...");
    if (typeof blip === "function") blip(150, 0.2, "sawtooth");

    setTimeout(() => {
        showBattleMessage("SAHIL: 'Greninja! We can't give up here... Let's go beyond 100%!'");
        if (typeof blip === "function") blip(400, 0.1, "square");

        setTimeout(() => {
            // Phase 2: MC Power Awakening Flash
            showBattleMessage("💥 THE POWER OF THE MAIN CHARACTER HAS AWAKENED! 💥");
            
            // Audio power-up fanfare
            if (typeof blip === "function") {
                [300, 450, 600, 750, 900, 1100].forEach((freq, idx) => {
                    setTimeout(() => blip(freq, 0.08, "sawtooth"), idx * 100);
                });
            }

            // Transformation visual effects
            if (overlay) {
                const burst = document.createElement("div");
                burst.className = "mc-transformation-burst";
                overlay.appendChild(burst);
                setTimeout(() => burst.remove(), 1000);
            }

            // Attach Giant Spinning Shuriken & Glowing Golden Aura
            if (plySprite) {
                plySprite.classList.add("mc-evolved");
                if (!document.getElementById("mc-back-shuriken")) {
                    const shurikenBack = document.createElement("div");
                    shurikenBack.id = "mc-back-shuriken";
                    shurikenBack.className = "mc-shuriken-back";
                    plySprite.appendChild(shurikenBack);
                }
            }

            // Stat Overcharge & Evolution
            const ply = battleState.playerPokemon;
            ply.name = "ASH-GRENINJA (BOND FORM)";
            ply.level = 100;
            ply.maxHP = 999;
            ply.hp = 999;
            ply.attack = 1400; // 10x Attack Power
            ply.moves = JSON.parse(JSON.stringify(GRENINJA_MC_MOVES));

            // Update UI elements
            const nameEl = document.getElementById("ply-display-name");
            const lvEl = document.getElementById("ply-display-lv");
            if (nameEl) nameEl.textContent = "ASH-GRENINJA ★";
            if (lvEl) lvEl.textContent = "Lv100";

            if (plyFill) {
                plyFill.classList.add("mc-gold");
            }
            updateHP("ply", ply.hp, ply.maxHP);

            if (badgeWrap) {
                badgeWrap.innerHTML = `<span class="mc-power-badge">⚡ MC POWER: 10x BATTLE POWER</span>`;
            }

            setTimeout(() => {
                showBattleMessage("ASH-GRENINJA EVOLVED into BOND CLIMAX FORM! (10x BATTLE POWER ACTIVATED!)");

                setTimeout(() => {
                    showBattleMessage("GYM LEADER: 'N-NANI?! Its power increased by TEN TIMES?!'");

                    setTimeout(() => {
                        battleState.turn = "player";
                        battleState.animating = false;
                        showMoveSelection();
                    }, 2200);
                }, 2200);
            }, 2200);

        }, 2200);
    }, 2000);
}

// ========================================
// ATTACK ANIMATION DISPATCHER
// ========================================

function playAttackAnimation(moveName, side) {
    const overlay = document.getElementById("attack-overlay");
    if (!overlay) return;

    overlay.innerHTML = "";

    switch (moveName) {
        case "WATER SHURIKEN":
            playWaterShuriken(overlay);
            break;
        case "🌟 GIANT WATER SHURIKEN":
            playGiantWaterShuriken(overlay);
            break;
        case "AERIAL ACE":
        case "⚡ SONIC AERIAL ACE":
            playAerialAce(overlay);
            break;
        case "NIGHT SLASH":
        case "🌌 NIGHT SLASH OMEGA":
            playNightSlash(overlay);
            break;
        case "HYDRO PUMP":
        case "🌊 TITANIC HYDRO PUMP":
            playHydroPump(overlay);
            break;
        case "DRAGON CLAW":
            playDragonClaw(overlay);
            break;
        case "FLARE BLITZ":
            playFlareBlitz(overlay);
            break;
        case "THUNDER PUNCH":
            playThunderPunch(overlay);
            break;
        case "DRAGON DANCE":
            playDragonDance(overlay);
            break;
    }

    setTimeout(() => {
        if (overlay) overlay.innerHTML = "";
    }, 1100);
}

function playWaterShuriken(overlay) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const star = document.createElement("div");
            star.className = "fx-water-shuriken";
            overlay.appendChild(star);
            if (typeof blip === "function") blip(750 + i * 120, 0.04, "sine");
            setTimeout(() => star.remove(), 550);
        }, i * 130);
    }
}

// 💥 GIANT 10X WATER SHURIKEN EXPLOSION
function playGiantWaterShuriken(overlay) {
    const giantStar = document.createElement("div");
    giantStar.className = "fx-giant-water-shuriken";
    overlay.appendChild(giantStar);

    if (typeof blip === "function") {
        blip(500, 0.1, "sawtooth");
        setTimeout(() => blip(800, 0.15, "square"), 250);
        setTimeout(() => blip(1200, 0.25, "sawtooth"), 500);
    }

    setTimeout(() => giantStar.remove(), 850);
}

function playAerialAce(overlay) {
    const fx = document.createElement("div");
    fx.className = "fx-aerial-ace";
    overlay.appendChild(fx);
    if (typeof blip === "function") blip(880, 0.06, "sawtooth");
    setTimeout(() => fx.remove(), 450);
}

function playNightSlash(overlay) {
    const dimmer = document.createElement("div");
    dimmer.className = "fx-night-slash-overlay";
    overlay.appendChild(dimmer);

    const slash = document.createElement("div");
    slash.className = "fx-night-slash";
    overlay.appendChild(slash);

    if (typeof blip === "function") blip(220, 0.08, "sawtooth");
    setTimeout(() => { dimmer.remove(); slash.remove(); }, 700);
}

function playHydroPump(overlay) {
    const beam = document.createElement("div");
    beam.className = "fx-hydro-pump";
    overlay.appendChild(beam);
    if (typeof blip === "function") blip(160, 0.1, "sawtooth");
    setTimeout(() => beam.remove(), 700);
}

function playDragonClaw(overlay) {
    const claw = document.createElement("div");
    claw.className = "fx-dragon-claw";
    overlay.appendChild(claw);
    if (typeof blip === "function") blip(340, 0.07, "square");
    setTimeout(() => claw.remove(), 550);
}

function playFlareBlitz(overlay) {
    const fire = document.createElement("div");
    fire.className = "fx-flare-blitz";
    overlay.appendChild(fire);
    if (typeof blip === "function") blip(180, 0.1, "sawtooth");
    setTimeout(() => fire.remove(), 650);
}

function playThunderPunch(overlay) {
    const flash = document.createElement("div");
    flash.className = "fx-thunder-punch";
    overlay.appendChild(flash);

    const bolt = document.createElement("div");
    bolt.className = "fx-thunder-bolt";
    overlay.appendChild(bolt);

    if (typeof blip === "function") blip(100, 0.1, "square");
    setTimeout(() => { flash.remove(); bolt.remove(); }, 550);
}

function playDragonDance(overlay) {
    const container = document.createElement("div");
    container.className = "fx-dragon-dance";

    const ring1 = document.createElement("div");
    ring1.className = "fx-dragon-dance-ring";
    const ring2 = document.createElement("div");
    ring2.className = "fx-dragon-dance-ring";

    container.appendChild(ring1);
    container.appendChild(ring2);
    overlay.appendChild(container);

    if (typeof blip === "function") {
        blip(520, 0.04, "sine");
        setTimeout(() => blip(620, 0.04, "sine"), 180);
        setTimeout(() => blip(740, 0.04, "sine"), 360);
    }

    setTimeout(() => container.remove(), 900);
}

// ========================================
// UI HELPERS
// ========================================

function showBattleMessage(text) {
    const msg = document.getElementById("battle-msg");
    if (!msg) return;

    msg.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            msg.textContent += text[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 18);
}

function updateHP(who, currentHP, maxHP) {
    const fill = document.getElementById(`${who}-hp-fill`);
    const pct = Math.max(0, (currentHP / maxHP) * 100);

    if (fill) {
        fill.style.width = pct + "%";
        fill.classList.remove("yellow", "red");
        if (!fill.classList.contains("mc-gold")) {
            if (pct <= 20) fill.classList.add("red");
            else if (pct <= 50) fill.classList.add("yellow");
        }
    }

    if (who === "ply") {
        const num = document.getElementById("ply-hp-num");
        if (num) num.textContent = `${Math.max(0, currentHP)}/${maxHP}`;
    }
}

function showEffectivenessText(text) {
    const overlay = document.getElementById("attack-overlay");
    if (!overlay) return;

    const el = document.createElement("div");
    el.className = "fx-effectiveness";
    el.textContent = text;
    overlay.appendChild(el);
    setTimeout(() => el.remove(), 1100);
}

function showCriticalText() {
    const overlay = document.getElementById("attack-overlay");
    if (!overlay) return;

    const el = document.createElement("div");
    el.className = "fx-critical";
    el.textContent = "A critical hit!";
    overlay.appendChild(el);
    setTimeout(() => el.remove(), 750);
}

function showStatBoostArrow(who) {
    const sprite = document.getElementById(`${who}-sprite`);
    if (!sprite) return;

    const arrow = document.createElement("div");
    arrow.className = "fx-stat-boost";
    arrow.textContent = "▲▲";
    arrow.style.position = "absolute";
    arrow.style.top = "-16px";
    arrow.style.left = "50%";
    arrow.style.transform = "translateX(-50%)";
    sprite.appendChild(arrow);
    setTimeout(() => arrow.remove(), 900);
}

// ========================================
// ENEMY FAINTED & VICTORY
// ========================================

function enemyFainted() {
    showBattleMessage("Foe MEGA CHARIZARD X fainted!");
    if (typeof blip === "function") blip(200, 0.15, "sawtooth");

    const oppSprite = document.getElementById("opp-sprite");
    if (oppSprite) oppSprite.classList.add("faint");

    setTimeout(() => {
        showBattleMessage("SAHIL defeated GYM LEADER with the POWER OF MC!");
        if (typeof blip === "function") blip(520, 0.06);

        setTimeout(() => {
            battleVictory();
        }, 1400);
    }, 1400);
}

// ========================================
// PLAYER FAINTED & DEFEAT
// ========================================

function playerFainted() {
    showBattleMessage("ASH-GRENINJA fainted!");
    if (typeof blip === "function") blip(120, 0.15, "sawtooth");

    const plySprite = document.getElementById("ply-sprite");
    if (plySprite) plySprite.classList.add("faint");

    setTimeout(() => {
        battleDefeat();
    }, 1400);
}

// ========================================
// VICTORY MODAL
// ========================================

function battleVictory() {
    resumeUnlocked = true;

    const field = document.getElementById("battle-field");
    if (!field) return;

    const resultOverlay = document.createElement("div");
    resultOverlay.id = "battle-result-overlay";
    resultOverlay.innerHTML = `
        <div class="result-trophy">🏆</div>
        <div class="result-title">GYM LEADER DEFEATED!</div>
        <div class="result-subtitle">
            ASH-GRENINJA UNLEASHED THE POWER OF THE MC!
        </div>
        <div class="result-badge">
            🎖️ RÉSUMÉ BADGE UNLOCKED!
        </div>
        <button class="result-btn" onclick="closeBattle()">
            RETURN TO TOWN
        </button>
    `;

    field.appendChild(resultOverlay);

    if (typeof blip === "function") {
        [520, 660, 780, 880].forEach((freq, i) => {
            setTimeout(() => blip(freq, 0.1, "square"), i * 140);
        });
    }
}

// ========================================
// DEFEAT MODAL
// ========================================

function battleDefeat() {
    const field = document.getElementById("battle-field");
    if (!field) return;

    const resultOverlay = document.createElement("div");
    resultOverlay.id = "battle-result-overlay";
    resultOverlay.innerHTML = `
        <div class="result-trophy">💀</div>
        <div class="result-title">YOU LOST!</div>
        <div class="result-subtitle">
            MEGA CHARIZARD X was too powerful...
        </div>
        <div class="result-badge">
            Train your Pokémon and challenge again!
        </div>
        <button class="result-btn" onclick="closeBattle()">
            TRY AGAIN
        </button>
    `;

    field.appendChild(resultOverlay);

    if (typeof blip === "function") {
        [400, 300, 200].forEach((freq, i) => {
            setTimeout(() => blip(freq, 0.1, "sawtooth"), i * 180);
        });
    }
}

// ========================================
// CLOSE BATTLE
// ========================================

function closeBattle() {
    const screen = document.getElementById("battle-screen");
    if (screen) {
        screen.classList.remove("active");
        screen.style.display = "none";
        screen.innerHTML = "";
    }

    battleOpen = false;
    battleState = null;
    render();
}

console.log("✅ Pokémon battle.js loaded with Power of MC evolution");