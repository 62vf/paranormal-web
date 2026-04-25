# Paranormal Frontend

Cinematic React frontend integrated with your existing Express backend.

## Backend API inspected

### Auth
- `POST /api/auth/register`
  - body: `{ username, email, password }`
  - response: `{ message, user, token }`
- `POST /api/auth/login`
  - body: `{ email, password }`
  - response: `{ message, token }`
- `POST /api/auth/logout`

### Cases / Stories
- `POST /api/cases/create-case` (auth required via cookie token)
- `POST /api/cases/create-fiction` (auth required via cookie token)
- `GET /api/cases/cases`
- `GET /api/cases/fictions`
- `PUT /api/cases/cases/:id`
- `DELETE /api/cases/cases/:id`
- `PUT /api/cases/fictions/:id`
- `DELETE /api/cases/fictions/:id`

## Frontend implementation summary

- Live API integration with Axios service layer (`VITE_API_URL`)
- Auth flow (register/login/logout) with token + cookie support
- Protected pages: submit report, dashboard, profile
- Dark premium glassmorphism UI with Tailwind + Framer Motion
- Cases archive with search, filters, sorting, pagination
- Case details with related records and share flow
- Admin dashboard for editing/deleting case & fiction records
- Toast notifications and backend error handling

## Folder structure

```text
src/
   api/
      axiosClient.js
      authApi.js
      caseApi.js
      reportApi.js
      systemApi.js
   components/
   context/
   pages/
   utils/
```

## Run frontend

1. Copy `.env.example` to `.env`
2. Set:
   - `VITE_API_URL=http://localhost:4000`
3. Install packages:
   - `npm install`
4. Start dev server:
   - `npm run dev`

## Required npm packages

- `react`
- `react-router-dom`
- `axios`
- `tailwindcss`
- `framer-motion`
- `react-hot-toast`
- `lucide-react`

## Build

- `npm run build`
- `npm run preview`

## Notes

- Uses `withCredentials: true` for cookie auth.
- Stores returned token in localStorage and sends Bearer header as fallback.

## Backend changes recommended (optional)

Current backend works with this frontend as-is. To unlock full advanced UX, consider adding:

- `timestamps: true` on case/story schemas
- case/report fields: `location`, `status`, `category`, `severity`, `evidence[]`, `witnesses[]`
- user profile endpoint (`GET /api/auth/me`)
- role-based admin middleware for dashboard authorization
- dedicated report model/routes (`/api/reports`)
