const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase.cjs');
const { generateToken } = require('../utils/jwt.cjs');
const { generateOTP, sendOTPViaEmail } = require('../utils/otp.cjs');

const signup = async (req, res) => {
  try {
    const { email, password, fullName, department, year, phone } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required' });
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        email,
        password: hashedPassword,
        full_name: fullName,
        department,
        year,
        phone,
        role: 'student',
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create user', details: error.message });
    }

    res.status(201).json({
      message: 'Signup successful! Your account is pending approval.',
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.full_name,
        status: newUser.status
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed', message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status === 'pending') {
      return res.status(403).json({ error: 'Your account is pending approval' });
    }

    if (user.status === 'rejected') {
      return res.status(403).json({ error: 'Your account has been rejected' });
    }

    const token = generateToken(user.id, user.email, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        department: user.department,
        year: user.year
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
};

const adminSendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('role', 'admin.cjs')
      .single();

    if (!user) {
      return res.status(404).json({ error: 'Admin account not found' });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await supabase
      .from('admin_otp')
      .delete()
      .eq('email', email);

    const { error } = await supabase
      .from('admin_otp')
      .insert([{
        email,
        otp,
        expires_at: expiresAt.toISOString()
      }]);

    if (error) {
      return res.status(500).json({ error: 'Failed to generate OTP' });
    }

    await sendOTPViaEmail(email, otp);

    res.json({
      message: 'OTP sent to your email',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    console.error('OTP send error:', error);
    res.status(500).json({ error: 'Failed to send OTP', message: error.message });
  }
};

const adminVerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const { data: otpRecord, error } = await supabase
      .from('admin_otp')
      .select('*')
      .eq('email', email)
      .eq('otp', otp)
      .single();

    if (error || !otpRecord) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    if (new Date(otpRecord.expires_at) < new Date()) {
      await supabase.from('admin_otp').delete().eq('id', otpRecord.id);
      return res.status(401).json({ error: 'OTP expired' });
    }

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('role', 'admin.cjs')
      .single();

    if (!user) {
      return res.status(404).json({ error: 'Admin account not found' });
    }

    await supabase.from('admin_otp').delete().eq('id', otpRecord.id);

    const token = generateToken(user.id, user.email, user.role);

    res.json({
      message: 'Admin login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('OTP verify error:', error);
    res.status(500).json({ error: 'OTP verification failed', message: error.message });
  }
};

module.exports = {
  signup,
  login,
  adminSendOTP,
  adminVerifyOTP
};
