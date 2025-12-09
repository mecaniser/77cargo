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
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
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
│   ├── index.html       # Homepage
│   ├── careers.html     # Careers page with application form
│   ├── about.html       # About page
│   ├── contact.html     # Contact page
│   ├── admin.html       # Admin dashboard
│   ├── css/
│   │   ├── input.css    # Tailwind input file
│   │   └── styles.css   # Compiled CSS
│   └── js/
│       ├── main.js      # Shared JavaScript
│       └── careers.js   # Careers form logic
├── package.json         # npm configuration
├── tailwind.config.js   # Tailwind configuration
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

3. **Install Node dependencies and build CSS**
   ```bash
   cd ..
   npm install
   npm run build:css
   ```

4. **Run the application**

   **Single command for development (recommended):**
   ```bash
   npm run dev
   ```
   
   This will automatically:
   - Watch and rebuild CSS when you make changes
   - Run the backend server with hot reload
   - Display both processes in a single terminal with color-coded output
   
   **Alternative - Manual setup (if needed):**
   ```bash
   # Terminal 1 - CSS Watcher
   npm run watch:css
   
   # Terminal 2 - Backend Server
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Open in browser**
   - Website: http://localhost:8000
   - Admin Dashboard: http://localhost:8000/admin
   - API Docs: http://localhost:8000/docs

### Development

The `npm run dev` command runs both the CSS watcher and backend server together. The CSS will automatically rebuild whenever you:
- Add/remove Tailwind classes in HTML files
- Modify `frontend/css/input.css`
- Change `tailwind.config.js`

**For Windows users:** Use `npm run dev:win` instead of `npm run dev`

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

- For production, add proper authentication to admin routes
- Use environment variables for sensitive configuration
- Enable HTTPS in production
- Implement rate limiting for API endpoints

## 📄 License

© 2024 77 Cargo. All rights reserved.

