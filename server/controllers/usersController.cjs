const supabase = require('../config/supabase.cjs');

const getPendingUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('status', 'pending.cjs')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch pending users' });
    }

    res.json({ users });
  } catch (error) {
    console.error('Get pending users error:', error);
    res.status(500).json({ error: 'Failed to fetch pending users', message: error.message });
  }
};

const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: user, error } = await supabase
      .from('users')
      .update({ status: 'approved', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to approve user' });
    }

    res.json({ message: 'User approved successfully', user });
  } catch (error) {
    console.error('Approve user error:', error);
    res.status(500).json({ error: 'Failed to approve user', message: error.message });
  }
};

const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: user, error } = await supabase
      .from('users')
      .update({ status: 'rejected', updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to reject user' });
    }

    res.json({ message: 'User rejected successfully', user });
  } catch (error) {
    console.error('Reject user error:', error);
    res.status(500).json({ error: 'Failed to reject user', message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile', message: error.message });
  }
};

module.exports = {
  getPendingUsers,
  approveUser,
  rejectUser,
  getUserProfile
};
