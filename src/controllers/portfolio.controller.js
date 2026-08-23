const portfolio = require("../data/portfolio");

function getPortfolio(req, res) {
  res.json(portfolio);
}

function getProjects(req, res) {
  res.json(portfolio.projects);
}

function getSkills(req, res) {
  res.json(portfolio.skills);
}

module.exports = {
  getPortfolio,
  getProjects,
  getSkills
};
