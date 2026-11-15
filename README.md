# 77 Cargo - Careers Website

A modern, mobile-first careers website for 77 Cargo trucking company built with FastAPI and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with 77 Cargo branding
- **Mobile-First**: Fully responsive design optimized for all devices
- **Multi-Step Application Form**: User-friendly application process with progress indicators
- **Admin Dashboard**: Manage applications and contact messages
- **Real-time Validation**: Form validation with helpful error messages
- **Fast & Lightweight**: Optimized performance with minimal dependencies

## 🛠️ Tech Stack

- **Backend**: Python 3.11+, FastAPI, SQLAlchemy (async)
- **Database**: SQLite (easily swappable to PostgreSQL)
- **Frontend**: React.js, Vite, Tailwind CSS, React Router
- **Fonts**: Playfair Display (headings), Source Sans 3 (body)

## 📁 Project Structure

```
77Cargo/
├── backend/
│   ├── main.py          # FastAPI application
│   ├── database.py      # Database configuration
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── config.py        # Settings management
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── index.html       # React entry point
│   ├── css/
│   │   └── input.css    # Tailwind CSS source
│   └── src/
│       ├── main.jsx     # React entry point
│       ├── App.jsx      # Main React component
│       └── components/  # React components
│           ├── HomePage.jsx
│           ├── AboutPage.jsx
│           ├── ContactPage.jsx
│           ├── CareersPage.jsx
│           ├── AdminPage.jsx
│           └── ...
├── dist/                # Production build (generated)
├── Dockerfile           # Docker configuration for Railway
├── package.json         # npm configuration
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+ (for Tailwind CSS)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd 77Cargo
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Install Node dependencies**
   ```bash
   cd ..
   npm install
   ```

4. **Run the application**

   **Development mode (React + FastAPI):**
   ```bash
   npm run dev:full
   ```
   
   This runs:
   - Vite dev server (React) on http://localhost:3000
   - FastAPI backend on http://localhost:8000
   - Vite proxies `/api` requests to backend
   
   **Alternative - Run separately:**
   ```bash
   # Terminal 1 - React dev server
   npm run dev
   
   # Terminal 2 - Backend server
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Open in browser**
   - React App: http://localhost:3000 (proxies API to backend)
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Production Build

Build the React app for production:
```bash
npm run build
```

The built files will be in `dist/` directory, which FastAPI serves in production.

## 📡 API Endpoints

### Job Applications
- `POST /api/applications` - Submit new application
- `GET /api/applications` - List all applications (admin)
- `GET /api/applications/{id}` - Get application details
- `PATCH /api/applications/{id}/status` - Update application status
- `DELETE /api/applications/{id}` - Delete application

### Contact Messages
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - List all messages (admin)

### Health Check
- `GET /api/health` - API health status

## 🎨 Brand Colors

```css
--cargo-red: #C41E3A      /* Primary brand color */
--cargo-dark: #1A1A1A     /* Dark backgrounds */
--cargo-gray: #4A4A4A     /* Text and accents */
```

## 📝 Application Status Flow

1. **Pending** - New application received
2. **Reviewed** - Application has been reviewed
3. **Interview** - Candidate invited for interview
4. **Hired** - Candidate accepted
5. **Rejected** - Application declined

## 🔒 Security Notes

- Private applicant reads/status changes/deletes and contact reads require a server-verified admin bearer access key. Public application/contact POSTs remain unauthenticated.
- Admin authentication fails closed (503) when `ADMIN_ACCESS_KEY_SHA256` is missing or malformed. There are no default credentials.
- The admin UI keeps its key only in React memory, never browser storage, cookies, URLs or the build. It clears access on sign-out, page exit, revoked access and after 15 minutes.
- The API accepts only explicit Authorization headers, not cookies or URL parameters; all API responses use `Cache-Control: no-store`. Cross-origin access is disabled (Vite's local proxy still works).
- Use environment variables for sensitive configuration
- Enable HTTPS in production
- Implement rate limiting for API endpoints

## 📄 License

© 2024 77 Cargo. All rights reserved.


## Admin access rollout (operator approval required)

**Keep the existing Railway containment block until a separately authorized deployment and verification. This source change does not reopen the service.**

1. Review the draft and run synthetic tests plus the frontend build.
2. With owner approval, generate a random 32-byte hex access key in an approved password manager. Compute SHA-256 of the **64-character lowercase hex text** (not of decoded bytes), with no trailing newline. Configure only the lowercase digest as `ADMIN_ACCESS_KEY_SHA256` on the backend. Do not use a human password, commit a key, or put it in a Vite variable.
3. Deploy with separate authorization, keeping containment. Validate unauthorized rejection and public intake with synthetic data in a staging environment; do not inspect applicant records for verification.
4. Only after protection is verified, obtain approval to remove the temporary Railway block.
5. Provide the original access key to the authorized administrator using an approved secret-sharing channel. Rotating the key means replacing its digest in backend configuration and applying Railway's configuration change. The old key then fails on its next request. Deleting the setting disables admin access without disabling public intake.

This is a minimal single-role shared-key control, not individual accounts, MFA, per-user audit trails or an identity provider. A key holder has full admin access. The UI timeout clears local memory; it does not expire the underlying key server-side. Use HTTPS only and rotate if exposure is suspected. Do not reopen until the operator accepts these limitations or replaces this control with the organization's identity provider.

### Synthetic verification

```bash
python -m venv .venv
.venv/bin/pip install -r backend/requirements-test.txt
.venv/bin/python -m pytest -q backend/tests
npm ci
npm run test:admin
npm run build
```

Tests force a temporary local SQLite database, never the configured production database. They cover every private route without credentials, bad credentials, missing/malformed configuration, correct authentication, rotation, public submissions, status mutation/deletion and CORS/cache behavior.
