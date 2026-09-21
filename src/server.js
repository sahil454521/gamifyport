const express = require("express");
const path = require("path");
const portfolioRoutes = require("./routes/portfolio.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything inside /public
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", portfolioRoutes);

// Open index.html at /
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/index.html")
  );
});

app.listen(PORT, () => {
  console.log(`🎮 Portfolio Quest running at http://localhost:${PORT}`);
});