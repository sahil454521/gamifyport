# Portfolio Quest

An RPG-style developer portfolio served by Node.js + Express.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `src/server.js` - Express server
- `src/data/portfolio.js` - backend portfolio data
- `src/routes/` - API routes
- `src/controllers/` - API controllers
- `public/index.html` - game UI
- `public/css/` - styles
- `public/js/` - game and screen logic
- `public/assets/images/` - extracted PNG assets
- Put your resume PDF in `public/` and set `resumeFileUrl` in the portfolio data.

## Customize

The main place to edit your portfolio is `src/data/portfolio.js`. The browser loads it through `/api/portfolio`.

Replace:
- name
- title
- about
- skills
- projects
- contact links
- resume
- battle moves

The original prototype's large embedded images were extracted into `public/assets/images/`, so the HTML is much easier to maintain.
