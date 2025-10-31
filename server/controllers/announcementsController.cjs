const supabase = require('../config/supabase.cjs');

const getAllAnnouncements = async (req, res) => {
  try {
    const { data: announcements, error } = await supabase
      .from('announcements')
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch announcements' });
    }

    res.json({ announcements });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ error: 'Failed to fetch announcements', message: error.message });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const { title, content, category, priority } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const { data: announcement, error } = await supabase
      .from('announcements')
      .insert([{
        title,
        content,
        category,
        priority: priority || 'low',
        user_id: req.user.id
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create announcement' });
    }

    res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ error: 'Failed to create announcement', message: error.message });
  }
};

module.exports = {
  getAllAnnouncements,
  createAnnouncement
};
