# Demo Studio

A minimal, responsive React/Vite appointment management demo in Turkish.

## Features

- Phone/password demo login
- Three-day booking with unavailable time slots
- Daily appointment progress and completion ring
- Completed appointment fees, daily income and total income
- Browser persistence with localStorage
- Separate shared, login, booking and dashboard CSS files
- Keyboard focus states and reduced-motion support

## Development

```sh
npm install
npm run dev
npm run build
npm run lint
```

`src/App.jsx` manages routes, appointment state and persistence. `src/pages/` contains the three page components. `src/styles/` contains shared styles and one stylesheet per page.

This is a frontend learning project. Login uses demonstration values in client code, not production authentication. Records are stored in the current browser. Real customer use requires a backend and server-side authentication.
