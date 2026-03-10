# CLAUDE.md

## Project Overview
A React learning project using Vite, Tailwind CSS, Firebase, and Google Generative AI.

## Tech Stack
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **Backend/Auth**: Firebase v12
- **AI**: Google Generative AI SDK
- **Routing**: React Router DOM v7

## Project Structure
```
src/
  App.jsx        - Root app component with routing
  main.jsx       - Entry point
  auth.js        - Authentication logic
  firebase.js    - Firebase config/init
  index.css      - Global styles
  pages/         - Page-level components
  services/      - API/service layer
```

## Common Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Development Notes
- Use functional components with hooks
- Keep Firebase config in `src/firebase.js`
- Auth logic lives in `src/auth.js`
- Page components go in `src/pages/`
- Service/API calls go in `src/services/`
