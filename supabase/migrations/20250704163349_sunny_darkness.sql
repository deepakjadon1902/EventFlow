/*
  # Feedback System

  1. New Tables
    - `feedback` - Store user feedback submissions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles, nullable for anonymous feedback)
      - `type` (text)
      - `rating` (integer)
      - `subject` (text)
      - `message` (text)
      - `email` (text, nullable)
      - `name` (text, nullable)
      - `status` (text, default 'unread')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on feedback table
    - Allow anyone to insert feedback
    - Only admins can read feedback
*/

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('general', 'bug', 'feature', 'compliment')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  subject text NOT NULL,
  message text NOT NULL,
  email text,
  name text,
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback
CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can read feedback
CREATE POLICY "Admin can read feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Only admins can update feedback (mark as read/replied)
CREATE POLICY "Admin can update feedback"
  ON feedback FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );