// ========================================
// RÉSUMÉ OVERLAY SCREEN
// ========================================

function openResume() {
    const overlay = document.getElementById("resume-overlay");
    const inner = document.getElementById("resume-inner");

    if (!overlay || !inner) return;

    resumeOpen = true;

    inner.innerHTML = `
        <div class="resume-header" style="text-align:center; margin-bottom:18px;">
            <div class="badge-earned" style="font-size:40px; margin-bottom:6px;">🎖️</div>
            <div class="resume-kicker" style="color:var(--gold); font-family:var(--font-display); font-size:10px; letter-spacing:2px;">
                TRAINER RÉSUMÉ & QUALIFICATIONS
            </div>
            <h1 style="margin:6px 0 2px; font-family:var(--font-display); font-size:22px; color:#fff;">
                SAHIL PATHAK
            </h1>
            <p style="margin:0; font-size:18px; color:#cfd8e6;">
                Computer Science Student & Full-Stack / AI Developer
            </p>
        </div>

        <div class="resume-section" style="margin-bottom:16px; border-top:2px solid rgba(255,255,255,0.15); padding-top:12px;">
            <h2 style="font-family:var(--font-display); font-size:12px; color:var(--gold); margin:0 0 6px;">
                👤 ABOUT ME
            </h2>
            <p style="margin:0; font-size:18px; line-height:1.4;">
                B.Tech Computer Science student specializing in Artificial Intelligence, Machine Learning, and modern web application development. Passionate about solving complex problems through elegant code, intelligent models, and interactive gamified experiences.
            </p>
        </div>

        <div class="resume-section" style="margin-bottom:16px; border-top:2px solid rgba(255,255,255,0.15); padding-top:12px;">
            <h2 style="font-family:var(--font-display); font-size:12px; color:var(--gold); margin:0 0 8px;">
                🧰 TECHNICAL SKILLS
            </h2>
            <div class="skill-list" style="display:flex; flex-wrap:wrap; gap:6px;">
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">Python</span>
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">JavaScript (ES6+)</span>
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">Node.js / Express</span>
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">Machine Learning</span>
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">Artificial Intelligence</span>
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">TensorFlow / Scikit-Learn</span>
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">HTML5 / Canvas API</span>
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">CSS3 / Retro UI</span>
                <span style="background:#1b2440; border:1px solid var(--gold); padding:4px 10px; font-size:16px;">Git & GitHub</span>
            </div>
        </div>

        <div class="resume-section" style="margin-bottom:16px; border-top:2px solid rgba(255,255,255,0.15); padding-top:12px;">
            <h2 style="font-family:var(--font-display); font-size:12px; color:var(--gold); margin:0 0 8px;">
                💻 FEATURED PROJECTS
            </h2>
            <div style="margin-bottom:10px;">
                <b style="font-size:18px; color:var(--gold);">🎮 Pokémon Gamified Developer Portfolio</b>
                <p style="margin:2px 0 0; font-size:16px; color:#d0d8e8;">
                    Interactive RPG portfolio built from scratch with custom 60fps canvas engine, Ash-Greninja vs Mega Charizard X battle system, GBA-styled start menu, and dynamic building dialogues.
                </p>
            </div>
            <div style="margin-bottom:10px;">
                <b style="font-size:18px; color:var(--gold);">🤖 Machine Learning & AI Experiments</b>
                <p style="margin:2px 0 0; font-size:16px; color:#d0d8e8;">
                    Predictive models, neural network experiments, and data pipelines built with Python, TensorFlow, and Pandas.
                </p>
            </div>
        </div>

        <div class="resume-section" style="margin-bottom:18px; border-top:2px solid rgba(255,255,255,0.15); padding-top:12px;">
            <h2 style="font-family:var(--font-display); font-size:12px; color:var(--gold); margin:0 0 6px;">
                🎓 EDUCATION
            </h2>
            <p style="margin:0; font-size:18px;">
                <b>B.Tech in Computer Science & Engineering</b>
            </p>
        </div>

        <div style="text-align:center; margin-top:20px;">
            <button class="resume-close" onclick="closeResume()" style="padding:12px 24px; font-family:var(--font-display); font-size:11px; background:#e0474a; color:#fff; border:2px solid #fff; cursor:pointer; box-shadow:3px 3px 0 #000;">
                RETURN TO TOWN
            </button>
        </div>
    `;

    overlay.style.display = "flex";

    if (typeof blip === "function") blip(750, 0.06);
}

function closeResume() {
    const overlay = document.getElementById("resume-overlay");
    if (overlay) {
        overlay.style.display = "none";
    }
    resumeOpen = false;
    render();
}

console.log("✅ resume.js loaded");