// ========================================
// PORTFOLIO DATA
// ========================================

const PORTFOLIO = {

    name: "Sahil Pathak",

    title:
        "Computer Science Student & Developer",

    bio:
        "B.Tech Computer Science student interested in AI, Machine Learning, software development and creative technology.",


    skills: [
        "Python",
        "JavaScript",
        "Node.js",
        "HTML",
        "CSS",
        "Machine Learning",
        "Artificial Intelligence",
        "Git",
        "GitHub"
    ],


    projects: [],


    contact: {

        github:
            "https://github.com/",

        linkedin:
            "https://linkedin.com/",

        email:
            ""

    }

};


// ========================================
// EXTENDED CONFIG FOR BUILDINGS
// ========================================

window.CONFIG = {

    // ---- ABOUT ME (Pokémon Center) ----
    about: [
        "Hey there! I'm Sahil Pathak — a B.Tech Computer Science student with a passion for building things that matter.",
        "I'm deeply interested in Artificial Intelligence and Machine Learning, and I love exploring how these technologies can solve real-world problems.",
        "When I'm not coding, you'll find me exploring creative tech, playing Pokémon games, or diving into new frameworks and tools.",
        "My goal? To become a full-stack developer who can bridge the gap between intelligent systems and beautiful user experiences.",
        "Fun fact: This entire portfolio is a Pokémon-style RPG built from scratch with vanilla HTML, CSS, and JavaScript! 🎮"
    ],

    // ---- SKILLS (PokéMart) ----
    skills: {
        "⚔️ Languages": [
            "Python", "JavaScript", "HTML", "CSS", "SQL"
        ],
        "🛡️ Frameworks & Libraries": [
            "Node.js", "Express.js", "React",
            "TensorFlow", "scikit-learn"
        ],
        "🎒 Tools & Platforms": [
            "Git", "GitHub", "VS Code",
            "Linux", "Docker"
        ],
        "🧠 AI & Data": [
            "Machine Learning", "Deep Learning",
            "Natural Language Processing",
            "Data Analysis", "Computer Vision"
        ]
    },

    // ---- PROJECTS (Research Lab) ----
    projects: [
        {
            title: "🎮 Gamify Portfolio",
            desc: "This very portfolio! A Pokémon-style RPG where visitors explore a town, battle the gym leader, and discover my skills and resume.",
            tech: ["JavaScript", "HTML", "CSS", "Node.js", "Canvas API"],
            link: "#"
        },
        {
            title: "🤖 ML Model Playground",
            desc: "An interactive web app for experimenting with machine learning models — train, visualize, and compare results in real-time.",
            tech: ["Python", "TensorFlow", "Flask", "JavaScript"],
            link: "#"
        },
        {
            title: "📊 Data Dashboard",
            desc: "A responsive data visualization dashboard that turns complex datasets into beautiful, interactive charts and insights.",
            tech: ["JavaScript", "D3.js", "Node.js", "Express"],
            link: "#"
        },
        {
            title: "🌐 Creative Web Experiments",
            desc: "A collection of creative coding projects exploring generative art, animations, and interactive web experiences.",
            tech: ["JavaScript", "Canvas", "WebGL", "CSS"],
            link: "#"
        }
    ],

    // ---- CONTACT (Signpost) ----
    contact: {
        email: "sahil@example.com",
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
        website: "#"
    }
};


console.log(
    "✅ Portfolio data loaded"
);