/*
  # Fix User Registration and Real-time Updates

  1. Drop existing trigger and function
  2. Create new robust trigger function
  3. Ensure proper RLS policies
  4. Add proper error handling
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role text := 'user';
BEGIN
  -- Set admin role for specific email
  IF NEW.email = 'deepakjadon1902@gmail.com' THEN
    user_role := 'admin';
  END IF;

  -- Insert profile with default values if metadata is missing
  INSERT INTO public.profiles (
    id, 
    email, 
    name, 
    phone, 
    address, 
    date_of_birth, 
    role
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', '000-000-0000'),
    COALESCE(NEW.raw_user_meta_data->>'address', 'Not provided'),
    COALESCE(
      (NEW.raw_user_meta_data->>'dateOfBirth')::date, 
      '1990-01-01'::date
    ),
    user_role
  );

  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't prevent user creation
    RAISE LOG 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Ensure proper RLS policies
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow service role to insert profiles (needed for trigger)
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow anon users to insert profiles during registration
CREATE POLICY "Allow profile creation during signup"
  ON profiles FOR INSERT
  TO anon
  WITH CHECK (true);