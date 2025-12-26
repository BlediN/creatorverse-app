# Creatorverse App

A React application for managing content creators, built with Vite, React Router, and Supabase.

## Features

- **List Creators**: View all content creators in a grid layout
- **View Creator**: See detailed information about a specific creator
- **Add Creator**: Create new creator entries
- **Edit Creator**: Update existing creator information
- **Delete Creator**: Remove creators from the database

## Tech Stack

- React 19
- Vite
- React Router DOM
- Supabase
- CSS3

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/BlediN/creatorverse-app.git
cd creatorverse-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. In the SQL Editor, run the following query to create the `creators` table:

```sql
CREATE TABLE creators (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT,
  description TEXT,
  imageURL TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
CREATE POLICY "Allow all operations on creators" ON creators
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. (Optional) Insert sample creators:

```sql
INSERT INTO creators (name, url, description, imageURL) VALUES
  ('Tech Creator', 'https://youtube.com/@techcreator', 'Technology and programming tutorials', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'),
  ('Cooking Master', 'https://youtube.com/@cookingmaster', 'Delicious recipes and cooking tips', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d'),
  ('Fitness Guru', 'https://youtube.com/@fitnessguru', 'Workout routines and health advice', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b'),
  ('Travel Vlogger', 'https://youtube.com/@travelvlogger', 'Adventures around the world', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'),
  ('Music Artist', 'https://youtube.com/@musicartist', 'Original music and covers', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d'),
  ('Art Creator', 'https://youtube.com/@artcreator', 'Digital and traditional art tutorials', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b');
```

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Update the values with your Supabase project credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these values in your Supabase project settings under "API".

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
creatorverse-app/
├── src/
│   ├── api/
│   │   ├── supabase.js       # Supabase client configuration
│   │   └── creators.js       # CRUD operations for creators
│   ├── components/
│   │   ├── Card.jsx          # Creator card component
│   │   └── Card.css          # Card styles
│   ├── pages/
│   │   ├── ShowCreators.jsx  # Home page - list all creators
│   │   ├── ViewCreator.jsx   # View single creator
│   │   ├── AddCreator.jsx    # Add new creator
│   │   ├── EditCreator.jsx   # Edit existing creator
│   │   └── CreatorForm.css   # Shared form styles
│   ├── App.jsx               # Main app with routing
│   ├── App.css
│   ├── index.css
│   └── main.jsx              # Entry point
├── .env                      # Environment variables (not committed)
├── .env.example              # Example environment variables
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database Schema

The `creators` table has the following structure:

| Column      | Type      | Description                    |
|-------------|-----------|--------------------------------|
| id          | BIGSERIAL | Primary key                    |
| name        | TEXT      | Creator's name (required)      |
| url         | TEXT      | Creator's channel URL          |
| description | TEXT      | Description of the creator     |
| imageURL    | TEXT      | URL to creator's image         |
| created_at  | TIMESTAMP | Timestamp of creation          |

## License

This project is for educational purposes.

