/*
  # Campus Link Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password` (text)
      - `full_name` (text)
      - `role` (text: 'student' | 'admin')
      - `status` (text: 'pending' | 'approved' | 'rejected')
      - `department` (text)
      - `year` (text)
      - `phone` (text)
      - `bio` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `notes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subject` (text)
      - `content` (text)
      - `file_url` (text)
      - `semester` (text)
      - `user_id` (uuid, foreign key)
      - `downloads` (integer)
      - `created_at` (timestamptz)

    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `location` (text)
      - `type` (text: 'internship' | 'part-time' | 'full-time')
      - `department` (text)
      - `description` (text)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamptz)

    - `discussions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `user_id` (uuid, foreign key)
      - `replies_count` (integer)
      - `views` (integer)
      - `is_pinned` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `discussion_replies`
      - `id` (uuid, primary key)
      - `discussion_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `content` (text)
      - `created_at` (timestamptz)

    - `announcements`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `priority` (text: 'low' | 'medium' | 'high')
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamptz)

    - `posts`
      - `id` (uuid, primary key)
      - `content` (text)
      - `user_id` (uuid, foreign key)
      - `likes_count` (integer)
      - `comments_count` (integer)
      - `created_at` (timestamptz)

    - `admin_otp`
      - `id` (uuid, primary key)
      - `email` (text)
      - `otp` (text)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  department text,
  year text,
  phone text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view approved users"
  ON users FOR SELECT
  TO authenticated
  USING (status = 'approved' OR id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  content text,
  file_url text,
  semester text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  downloads integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view notes"
  ON notes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('internship', 'part-time', 'full-time')),
  department text,
  description text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Discussions table
CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  replies_count integer DEFAULT 0,
  views integer DEFAULT 0,
  is_pinned boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view discussions"
  ON discussions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create discussions"
  ON discussions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own discussions"
  ON discussions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Discussion replies table
CREATE TABLE IF NOT EXISTS discussion_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES discussions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view replies"
  ON discussion_replies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create replies"
  ON discussion_replies FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text,
  priority text DEFAULT 'low' CHECK (priority IN ('low', 'medium', 'high')),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view announcements"
  ON announcements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create announcements"
  ON announcements FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Admin OTP table
CREATE TABLE IF NOT EXISTS admin_otp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  otp text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_otp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage OTP"
  ON admin_otp FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);