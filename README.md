# The Interactive Gallery

This is a full-stack web application that allows users to browse images from Unsplash, like them, and add comments.

## 🛠 Tech Stack
- Frontend: React
- Backend: Node.js with Express
- Database: PostgreSQL
- API: Unsplash

## 🚀 Local Setup

1. Clone this repo:
   ```bash
   git clone https://github.com/ucheprimus/unsplash_api_task.git
   cd your-repo-name
   ```

2. Install backend:
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in `server`:
   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/your_db_name
   UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_KEY
   ```

4. Start backend:
   ```bash
   npm run dev
   ```

5. Install frontend:
   ```bash
   cd ../client
   npm install
   ```

6. Start frontend:
   ```bash
   npm start
   ```

## 📖 Database Schema

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  image_id TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);
