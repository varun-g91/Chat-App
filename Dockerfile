# Build frontend
FROM node:23-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Build backend
FROM node:23-slim AS backend
WORKDIR /app
COPY package*.json ./
RUN npm install

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Copy backend files
COPY backend ./backend

# Copy built frontend to backend (optional)
COPY --from=frontend /app/frontend/dist ./backend/public

WORKDIR /app/backend/prisma

RUN npx prisma generate

# Set working dir to backend
WORKDIR /app

# Start backend
CMD ["npm", "start"]

EXPOSE 3000
