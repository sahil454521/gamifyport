const portfolio = {
  name: "Your Name",
  title: "Software Developer",
  about: [
    "Replace this with your introduction.",
    "Tell visitors what you build, what you care about, and what you are looking for."
  ],
  skills: {
    Languages: ["JavaScript", "TypeScript", "Python", "SQL"],
    Frameworks: ["React", "Node.js", "Next.js", "Tailwind"],
    Tools: ["Git", "Docker", "Figma", "AWS"]
  },
  projects: [
    {
      title: "Project One",
      desc: "A short description of what this project does and the problem it solves.",
      tech: ["React", "Node.js", "Postgres"],
      link: "#"
    },
    {
      title: "Project Two",
      desc: "Another project. Describe what you built, your role, and the impact.",
      tech: ["Python", "Flask", "Docker"],
      link: "#"
    }
  ],
  contact: {
    email: "you@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    website: "https://yourwebsite.com"
  },
  resumeFileUrl: "",
  resume: {
    summary: "Your professional summary goes here.",
    experience: [],
    education: []
  },
  gymLeaderName: "RECRUITER ROADBLOCK",
  battleMoves: [
    { name: "REACT RUSH", desc: "Frontend combo", power: 26 },
    { name: "PYTHON PUNCH", desc: "Backend strike", power: 24 },
    { name: "SQL SLAM", desc: "Database takedown", power: 22 },
    { name: "CLOUD CRASH", desc: "Deploy finisher", power: 30 }
  ]
};

module.exports = portfolio;
