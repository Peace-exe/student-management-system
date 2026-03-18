# 🎓 Student Management System

A modern, responsive web application for university and college administrators to manage student records efficiently.

---

## ✨ Features

- **Dashboard** — At-a-glance overview of enrollment stats and key metrics
- **Student Records** — Full CRUD: add, view, edit, and delete student entries
- **Authentication** — Secure login system for admin access

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Frontend framework & build tool |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [TanStack Query](https://tanstack.com/query) | Server state management & API caching |
| [shadcn/ui](https://ui.shadcn.com/) | UI component library |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |

---

## 📁 Project Structure

```
web/
├── src/
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route-level components
│   ├── lib/             # Utilities & helpers
│   └── main.tsx         # App entry point
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- Backend API running (Node/Express) — see the backend repo

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd student-management/web

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the `web/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🔗 Backend

This frontend connects to a **Node.js / Express** REST API. Make sure the backend server is running before using the app.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is for internal/academic use.