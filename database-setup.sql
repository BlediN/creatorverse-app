-- Create the creators table
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
-- In a production app, you should configure proper RLS policies
CREATE POLICY "Allow all operations on creators" ON creators
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert sample creators (at least 5 for demonstration)
INSERT INTO creators (name, url, description, imageURL) VALUES
  ('Tech Reviewer Pro', 'https://youtube.com/@techreviewerpro', 'In-depth reviews of the latest technology, gadgets, and software. Helping you make informed decisions about your next tech purchase.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'),
  ('The Cooking Channel', 'https://youtube.com/@thecookingchannel', 'Delicious recipes from around the world, cooking tips, and culinary adventures. From quick weeknight dinners to gourmet creations.', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800'),
  ('Fitness & Wellness Hub', 'https://youtube.com/@fitnesswellnesshub', 'Complete workout routines, nutrition advice, and wellness tips to help you achieve your fitness goals and maintain a healthy lifestyle.', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800'),
  ('World Traveler Diaries', 'https://youtube.com/@worldtravelerdiaries', 'Exploring breathtaking destinations around the globe. Travel guides, culture insights, and adventure stories from every corner of the world.', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'),
  ('Indie Music Studio', 'https://youtube.com/@indiemusicstudio', 'Original indie music, acoustic covers, and behind-the-scenes studio sessions. Sharing the journey of creating and producing independent music.', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800'),
  ('Digital Art Academy', 'https://youtube.com/@digitalartacademy', 'Digital art tutorials, traditional drawing techniques, and creative inspiration. Learn illustration, concept art, and graphic design from scratch.', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800');
