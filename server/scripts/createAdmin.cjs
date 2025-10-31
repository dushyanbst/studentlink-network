const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const email = 'admin@university.edu';
  const password = 'admin123';
  const fullName = 'System Administrator';

  try {
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      console.log('Admin user already exists!');
      console.log('Email:', email);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{
        email,
        password: hashedPassword,
        full_name: fullName,
        role: 'admin',
        status: 'approved'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating admin:', error);
      process.exit(1);
    }

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('IMPORTANT: Change this password after first login!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();
