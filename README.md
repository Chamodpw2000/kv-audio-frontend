# KV-Audio Frontend

This is the frontend for KV-Audio, a MERN stack application. It provides a user interface for customers and admins to interact with the platform, including authentication, booking, feedback, gallery management, and more.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Overview](#folder-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- User authentication (email/password & Google OAuth)
- Role-based navigation (admin/customer)
- Email verification
- Gallery and item management
- Booking system
- Feedback and reviews
- Admin dashboard with charts and analytics

## Tech Stack
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- @react-oauth/google

## Project Structure
```
components.json
eslint.config.js
index.html
jsconfig.json
package.json
postcss.config.js
README.md
src/
  App.jsx
  main.jsx
  assets/
    register/
    ...
  components/
    adminDashboard/
    ui/
    ...
  lib/
  login/
  pages/
    admin/
    home/
    verifyEmail/
  utils/
public/
  ...images
```

## Getting Started
1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Set environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   VITE_BACKEND_URL=<your-backend-url>
   ```
3. **Run the development server:**
   ```powershell
   npm run dev
   ```
4. **Open in browser:**
   Visit `http://localhost:5173` (default Vite port).

## Environment Variables
- `VITE_BACKEND_URL`: The base URL for the backend API.

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Folder Overview
- `src/components/` — Reusable UI and feature components
- `src/pages/` — Page-level components for routing
- `src/login/` — Login page and styles
- `src/assets/` — Static assets
- `src/utils/` — Utility functions and helpers
- `public/` — Public assets (images, logo, etc.)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.
