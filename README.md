# Tech Support Service

A technical support and digital storefront platform: a public landing for customers, an admin panel for managing content, users, and support requests, plus backends for both parts.

The project covers: showcasing services and products on the landing page, user registration and authentication, purchases and subscriptions, product and key management, support requests, news and posts publishing, and a role-based access system for staff.

## Technologies

**Frontend (landing — `frontend-lending`)**
- React 18, TypeScript
- React Router, Axios, Zustand
- React Toastify, Fuse.js, Swiper, react-helmet-async
- SASS, Create React App

**Frontend (admin panel — `admin-panel/frontend`)**
- React 18, TypeScript
- React Router, Axios
- React Quill, TipTap, Editor.js (content editors)
- Joi (validation), classnames, lodash.debounce
- SASS, Create React App

**Backend (landing — `backend-lending`)**
- Node.js, Express 5, TypeScript
- Prisma, Knex, Objection.js, PostgreSQL
- JWT, bcrypt, cookie-parser
- node-cron (background jobs), express-rate-limit, CSRF protection

**Backend (admin panel — `admin-panel/backend`)**
- Node.js, Express 5, TypeScript
- Prisma, Knex, Objection.js, PostgreSQL
- JWT, bcrypt, multer
- express-rate-limit, Joi, node-cron

**Repository root**
- TanStack React Query (shared dependency)

## Main features

- **Monorepo**: landing, admin panel, and both backends in one repo with shared conventions and code style.
- **Role-based access**: admin panel uses feature flags for sections (products, keys, posts, promocodes, users, staff, news, etc.).
- **Shared encryption**: one encryption key (`ENCRYPTION_KEY` / `CRYPTO_SECRET`) for both backends so user data stays in sync between landing and admin.
- **Security**: rate limiting, validation (Joi), optional CSRF on landing API, JWT in httpOnly cookies or headers.
- **Background jobs**: product reservation, order expiration, alias deactivation, counter updates (backend-lending).
- **Content editors**: posts and news in the admin via React Quill, TipTap, Editor.js.

## Installation and run

### Requirements

- Node.js (LTS recommended)
- PostgreSQL
- npm or yarn

### 1. Clone the repository

```bash
git clone <repo-url> tech_support_service
cd tech_support_service
```

### 2. Database

Create a PostgreSQL database. You can use one database or separate ones for **backend-lending** and **admin-panel/backend** depending on your Prisma/Knex setup.

### 3. Landing backend (store and auth API)

```bash
cd backend-lending
cp .env.example .env
# Fill .env: DATABASE_URL, JWT_SECRET, ENCRYPTION_KEY (at least 32 chars), and optionally PORT, FRONTEND_URL
npm install
npx prisma generate
npm run dev
```

Server runs at `http://localhost:4000` by default (or the `PORT` from `.env`).

### 4. Admin panel backend

```bash
cd admin-panel/backend
cp .env.example .env
# Fill DATABASE_URL, JWT_SECRET, CRYPTO_SECRET (must match ENCRYPTION_KEY in backend-lending), FRONTEND_URL (e.g. http://localhost:3001)
npm install
npx prisma generate
npm start
```

Server runs at `http://localhost:4001` by default.

To create an initial admin user:

```bash
npm run seed:admin
```

### 5. Landing frontend

```bash
cd frontend-lending
npm install
npm start
```

App runs at `http://localhost:3000`. Configure the landing API URL in `.env` or in code (e.g. `http://localhost:4000`).

### 6. Admin panel frontend

```bash
cd admin-panel/frontend
npm install
npm start
```

App runs at `http://localhost:3001` by default. Ensure `FRONTEND_URL` in `admin-panel/backend/.env` matches this URL.

### Default ports

| Service               | Port |
|-----------------------|------|
| frontend-lending      | 3000 |
| admin-panel frontend  | 3001 |
| backend-lending       | 4000 |
| admin-panel backend   | 4001 |

## Usage examples

**Admin API health check:**

```bash
curl http://localhost:4001/health
```

**Admin login:** open `http://localhost:3001`, go to `/login`, and sign in with credentials from `seed:admin` or from the Register flow if enabled.

**Landing purchase:** open `http://localhost:3000`, register or log in, pick a product or subscription, and complete the flow implemented in frontend-lending and backend-lending.

For more setup and API examples see [admin-panel/backend/SETUP.md](admin-panel/backend/SETUP.md).

## License

No dedicated license file is present in the repository root. Third-party packages (React, Prisma, etc.) use their own licenses (e.g. MIT). For use and distribution of this project, check with the rights holder or add a `LICENSE` file to the repo.
