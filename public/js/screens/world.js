// ========================================
// WORLD DOM BUILDER & BUILDING CONTENT
// ========================================

function buildWorld() {
    const worldEl = document.getElementById("world");
    if (!worldEl) return;

    // Clear existing plaques/glows if any
    document.querySelectorAll(".plaque, .hotspot-glow").forEach(el => el.remove());

    // Update HUD
    const hudName = document.getElementById("hud-name");
    if (hudName) {
        const name = (window.CONFIG && window.CONFIG.name) || (window.PORTFOLIO && window.PORTFOLIO.name) || "Sahil Pathak";
        const title = (window.CONFIG && window.CONFIG.title) || (window.PORTFOLIO && window.PORTFOLIO.title) || "Computer Science Student & Developer";
        hudName.innerHTML = `
            <div>${name}</div>
            <strong style="color:var(--gold); font-size:12px;">${title}</strong>
            ${resumeUnlocked ? '<span class="badge" style="color:var(--gold); margin-left:6px;">🏅</span>' : ''}
        `;
    }

    // Build building plaques and glowing door hotspots
    if (Array.isArray(BUILDINGS)) {
        BUILDINGS.forEach((b) => {
            const cx = b.rect.x + b.rect.w / 2;
            const topY = b.rect.y;

            // Plaque above building
            const plaque = document.createElement("div");
            plaque.className = "plaque" + (b.gym ? " gym" : "");
            plaque.style.left = (cx / WORLD_W) * 100 + "%";
            plaque.style.top = Math.max(2, (topY - 4) / WORLD_H * 100) + "%";
            plaque.innerHTML = `${b.icon} ${b.label}<div class="arrow"></div>`;
            worldEl.appendChild(plaque);

            // Glowing entrance hotspot
            if (b.door) {
                const glow = document.createElement("div");
                glow.className = "hotspot-glow";
                glow.style.left = (b.door.x / WORLD_W) * 100 + "%";
                glow.style.top = (b.door.y / WORLD_H) * 100 + "%";
                glow.style.width = (b.door.w / WORLD_W) * 100 + "%";
                glow.style.height = (b.door.h / WORLD_H) * 100 + "%";
                worldEl.appendChild(glow);
            }
        });
    }

    if (typeof showInteractionHint === "function") {
        showInteractionHint("Walk into a building to explore. Challenge the GYM to battle!");
        setTimeout(() => {
            if (typeof hideInteractionHint === "function") hideInteractionHint();
        }, 5000);
    }

    render();
}

// ========================================
// ABOUT ME — POKÉMON CENTER
// ========================================

function showAbout() {
    const paragraphs = (window.CONFIG && window.CONFIG.about) || [
        "Hey there! I'm Sahil Pathak — a B.Tech Computer Science student with a passion for building intelligent applications.",
        "I'm deeply interested in Artificial Intelligence and Machine Learning.",
        "This interactive Pokémon RPG portfolio showcases my work, skills, and projects."
    ];

    let body = `
        <div style="text-align:center; font-size:32px; margin-bottom:8px;">🏥</div>
        <p style="font-family:var(--font-display); font-size:10px; color:var(--red-dark); text-align:center; margin-bottom:12px; letter-spacing:1px;">
            POKÉMON CENTER — TRAINER PROFILE
        </p>
    `;

    body += paragraphs.map((p) => `<p>${p}</p>`).join("");

    body += `
        <div style="margin-top:14px; padding:12px; background:var(--navy); color:#fff; border:3px solid var(--gold); box-shadow:3px 3px 0 #000;">
            <p style="margin:0 0 6px; color:var(--gold); font-family:var(--font-display); font-size:9px; letter-spacing:1px;">
                📜 OFFICIAL TRAINER CARD
            </p>
            <p style="margin:4px 0;"><b>Trainer:</b> Sahil Pathak</p>
            <p style="margin:4px 0;"><b>Class:</b> B.Tech Computer Science Developer</p>
            <p style="margin:4px 0;"><b>Specialty:</b> AI, Machine Learning & Web Architecture</p>
            <p style="margin:4px 0;"><b>Partner Pokémon:</b> 🐸 Ash-Greninja (Lv.50)</p>
            <p style="margin:4px 0;"><b>Badges:</b> 🏅 Python · 🏅 JavaScript · 🏅 ML/AI · 🏅 Full-Stack</p>
        </div>
    `;

    openDialog("ABOUT ME — POKÉMON CENTER", body,
        `<button class="pxl-btn gold" onclick="closeDialog(); openMenu();">🎒 OPEN MENU</button>
         <button class="pxl-btn" onclick="closeDialog()">CLOSE</button>`);
}

// ========================================
// SKILLS — POKÉMART
// ========================================

function showSkills() {
    let body = `
        <div style="text-align:center; font-size:32px; margin-bottom:8px;">🏪</div>
        <p style="font-family:var(--font-display); font-size:10px; color:var(--blue); text-align:center; margin-bottom:12px; letter-spacing:1px;">
            POKÉMART — SKILL INVENTORY
        </p>
    `;

    const skills = (window.CONFIG && window.CONFIG.skills) || {
        "⚔️ Languages": ["Python", "JavaScript", "HTML", "CSS", "SQL"],
        "🛡️ Frameworks & Tools": ["Node.js", "Express.js", "TensorFlow", "Git", "GitHub"]
    };

    Object.keys(skills).forEach((category) => {
        body += `
            <div style="margin-bottom:14px;">
                <p style="margin:0 0 6px; font-weight:bold; color:var(--navy); font-size:20px;">
                    ${category}
                </p>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                    ${skills[category].map((s) => `
                        <span class="tag" style="font-size:16px; background:#1b2440; color:#f4d35e; border:1px solid #f4d35e; padding:3px 8px;">
                            ${s}
                        </span>
                    `).join("")}
                </div>
            </div>
        `;
    });

    body += `
        <div style="margin-top:12px; padding:10px; border:2px dashed var(--gold); text-align:center; background:#fff;">
            <p style="margin:0; font-size:18px; color:var(--navy);">
                💡 <b>Status:</b> Continuously leveling up in Machine Learning, Deep Learning, and Modern Web Tech!
            </p>
        </div>
    `;

    openDialog("SKILLS SHOP — ITEMS ACQUIRED", body,
        `<button class="pxl-btn gold" onclick="closeDialog(); showProjects();">💻 VIEW PROJECTS</button>
         <button class="pxl-btn" onclick="closeDialog()">CLOSE</button>`);
}

// ========================================
// PROJECTS — RESEARCH LAB
// ========================================

function showProjects() {
    const projects = (window.CONFIG && window.CONFIG.projects) || [];

    let body = `
        <div style="text-align:center; font-size:32px; margin-bottom:8px;">🔬</div>
        <p style="font-family:var(--font-display); font-size:10px; color:var(--grass); text-align:center; margin-bottom:12px; letter-spacing:1px;">
            PROFESSOR'S LAB — RESEARCH LOGS
        </p>
    `;

    body += projects.map((p, i) => `
        <div class="proj-card" style="border-left:5px solid ${['var(--blue)', 'var(--red)', 'var(--gold)', 'var(--grass)'][i % 4]}; padding:12px; margin-bottom:12px; background:#fff; box-shadow:2px 2px 0 rgba(0,0,0,0.1);">
            <h4 style="margin:0 0 6px; font-family:var(--font-display); font-size:11px; color:var(--navy);">${p.title}</h4>
            <p style="margin:0 0 8px; font-size:18px; line-height:1.35;">${p.desc}</p>
            <div style="margin-bottom:8px;">
                ${p.tech.map((t) => `<span class="tag" style="font-size:14px;">${t}</span>`).join(" ")}
            </div>
            ${p.link && p.link !== "#"
                ? `<a class="link-btn" href="${p.link}" target="_blank" rel="noopener">VIEW REPO / DEMO →</a>`
                : `<span style="font-size:15px; color:#888; font-weight:bold;">⚡ In Active Development</span>`
            }
        </div>
    `).join("");

    body += `
        <div style="text-align:center; margin-top:10px; font-size:17px; color:var(--navy);">
            🧪 Check out my GitHub for more open-source experiments!
        </div>
    `;

    openDialog("PROJECTS HALL — RESEARCH LAB", body,
        `<button class="pxl-btn red" onclick="closeDialog(); showGymEntrance();">⚔ CHALLENGE GYM</button>
         <button class="pxl-btn" onclick="closeDialog()">CLOSE</button>`);
}

// ========================================
// CONTACT — SIGNPOST
// ========================================

function showContact() {
    const c = (window.CONFIG && window.CONFIG.contact) || {};

    let body = `
        <div style="text-align:center; font-size:32px; margin-bottom:8px;">📮</div>
        <p style="font-family:var(--font-display); font-size:10px; color:var(--gold-dark); text-align:center; margin-bottom:12px; letter-spacing:1px;">
            SIGNPOST — CONNECT WITH SAHIL
        </p>
        <p style="margin-bottom:14px; font-size:19px;">
            Let's talk about AI, software projects, or collaboration opportunities:
        </p>
    `;

    body += `
        <div class="contact-row" style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <b style="min-width:90px; color:var(--navy); font-size:19px;">✉️ Email</b>
            <a class="link-btn" href="mailto:${c.email}">${c.email || "Send Email"}</a>
        </div>
        <div class="contact-row" style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <b style="min-width:90px; color:var(--navy); font-size:19px;">🐙 GitHub</b>
            <a class="link-btn" href="${c.github}" target="_blank" rel="noopener">GitHub Profile →</a>
        </div>
        <div class="contact-row" style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <b style="min-width:90px; color:var(--navy); font-size:19px;">💼 LinkedIn</b>
            <a class="link-btn" href="${c.linkedin}" target="_blank" rel="noopener">LinkedIn Profile →</a>
        </div>
    `;

    body += `
        <div style="margin-top:14px; padding:10px; background:var(--navy); color:#fff; border:2px solid var(--gold); text-align:center;">
            <p style="margin:0; font-size:17px; color:#f4d35e;">
                🎮 <i>"A wild developer appeared! Let's connect!"</i>
            </p>
        </div>
    `;

    openDialog("CONTACT — SIGNPOST", body,
        `<button class="pxl-btn" onclick="closeDialog()">CLOSE</button>`);
}

// ========================================
// GYM ENTRANCE
// ========================================

function showGymEntrance() {
    const body = `
        <div style="text-align:center; font-size:36px; margin-bottom:8px;">🏟️</div>
        <p style="font-family:var(--font-display); font-size:10px; color:var(--red); text-align:center; margin-bottom:12px; letter-spacing:1px;">
            DEVELOPER GYM — ARENA
        </p>
        <p style="font-size:20px; line-height:1.4;">
            The GYM LEADER steps forward with a fearsome
            <b style="color:var(--red);">MEGA CHARIZARD X</b>!
        </p>
        <p style="font-size:19px; line-height:1.35;">
            <i>"Welcome, Sahil! You've traversed the town, but to claim the official <b>Résumé Badge</b>, you must defeat my Mega Charizard X using your <b>Ash-Greninja</b>!"</i>
        </p>
        <div style="margin:12px 0; padding:10px; border:3px solid #383838; background:#1b2440; color:#fff; text-align:center; box-shadow:3px 3px 0 #000;">
            <p style="margin:0 0 4px; color:#f4d35e; font-family:var(--font-display); font-size:9px;">
                ⚔️ GYM MATCHUP
            </p>
            <p style="margin:2px 0; font-size:18px;">
                🔵 <b>ASH-GRENINJA</b> (Water / Dark) <br>
                <span style="font-size:15px; color:#88c8e8;">Water Shuriken · Aerial Ace · Night Slash · Hydro Pump</span>
            </p>
            <div style="margin:6px 0; font-weight:bold; color:var(--red);">⚡ VERSUS ⚡</div>
            <p style="margin:2px 0; font-size:18px;">
                🔥 <b>MEGA CHARIZARD X</b> (Fire / Dragon) <br>
                <span style="font-size:15px; color:#ff9060;">Dragon Claw · Flare Blitz · Thunder Punch · Dragon Dance</span>
            </p>
        </div>
    `;

    openDialog("GYM CHALLENGE", body,
        `<button class="pxl-btn red" onclick="closeDialog(); startBattle();">⚔ BATTLE NOW!</button>
         <button class="pxl-btn gold" onclick="closeDialog(); openResume();">📄 JUST SHOW RÉSUMÉ</button>
         <button class="pxl-btn" onclick="closeDialog()">LEAVE</button>`);
}

console.log("✅ world.js loaded");
