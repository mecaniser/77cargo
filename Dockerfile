# Multi-stage build for Node.js + Python app
FROM node:18-alpine AS node-builder

# Install Python and build tools in Node stage
RUN apk add --no-cache python3 py3-pip

# Set working directory
WORKDIR /app

# Copy package files and configs
COPY package*.json ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Install Node dependencies
RUN npm ci

# Copy frontend source (including src directory for React)
COPY frontend/ ./frontend/

# Copy PostCSS config to frontend directory (Vite root is ./frontend, PostCSS looks for config there)
COPY postcss.config.js ./frontend/

# Build React app
RUN npm run build

# Python runtime stage
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy Python requirements
COPY backend/requirements.txt ./backend/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built React app from node-builder stage
COPY --from=node-builder /app/dist ./dist

# Create directory for SQLite database if needed
RUN mkdir -p /app/backend

# Expose port
EXPOSE 8000

# Set environment variable
ENV PORT=8000

# Run the application
WORKDIR /app/backend

# Use shell form to allow environment variable substitution
# Railway sets PORT env var dynamically
# Add PYTHONUNBUFFERED to see logs immediately
ENV PYTHONUNBUFFERED=1
CMD sh -c "python3 -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"

