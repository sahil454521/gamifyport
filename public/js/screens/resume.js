// ========================================
// RESUME
// ========================================

function openResume() {

    const overlay =
        document.getElementById(
            "resume-overlay"
        );


    const inner =
        document.getElementById(
            "resume-inner"
        );


    if (!overlay || !inner) {
        return;
    }


    resumeOpen = true;


    inner.innerHTML = `

        <div class="resume-header">

            <div>

                <div class="resume-kicker">
                    PORTFOLIO QUEST
                </div>

                <h1>
                    SAHIL PATHAK
                </h1>

                <p>
                    Computer Science Student
                    & Developer
                </p>

            </div>

        </div>


        <div class="resume-section">

            <h2>
                ABOUT
            </h2>

            <p>
                B.Tech Computer Science student
                interested in AI, Machine Learning,
                software development and creative
                web experiences.
            </p>

        </div>


        <div class="resume-section">

            <h2>
                SKILLS
            </h2>

            <div class="skill-list">

                <span>Python</span>
                <span>JavaScript</span>
                <span>Node.js</span>
                <span>Machine Learning</span>
                <span>AI</span>
                <span>HTML</span>
                <span>CSS</span>
                <span>Git</span>

            </div>

        </div>


        <div class="resume-section">

            <h2>
                EXPERIENCE
            </h2>

            <p>
                Software development,
                machine learning projects,
                research and creative
                technology projects.
            </p>

        </div>


        <div class="resume-section">

            <h2>
                EDUCATION
            </h2>

            <p>
                B.Tech Computer Science
            </p>

        </div>


        <button
            class="resume-close"
            onclick="closeResume()"
        >
            RETURN TO TOWN
        </button>

    `;


    overlay.style.display =
        "flex";

}


// ========================================
// CLOSE RESUME
// ========================================

function closeResume() {

    const overlay =
        document.getElementById(
            "resume-overlay"
        );


    if (overlay) {

        overlay.style.display =
            "none";

    }


    resumeOpen = false;
}