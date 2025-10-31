const supabase = require('../config/supabase.cjs');

const getAllDiscussions = async (req, res) => {
  try {
    const { data: discussions, error } = await supabase
      .from('discussions')
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          email
        )
      `)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch discussions' });
    }

    res.json({ discussions });
  } catch (error) {
    console.error('Get discussions error:', error);
    res.status(500).json({ error: 'Failed to fetch discussions', message: error.message });
  }
};

const createDiscussion = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const { data: discussion, error } = await supabase
      .from('discussions')
      .insert([{
        title,
        content,
        category,
        user_id: req.user.id
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create discussion' });
    }

    res.status(201).json({ message: 'Discussion created successfully', discussion });
  } catch (error) {
    console.error('Create discussion error:', error);
    res.status(500).json({ error: 'Failed to create discussion', message: error.message });
  }
};

const getDiscussionById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: discussion, error } = await supabase
      .from('discussions')
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          email
        )
      `)
      .eq('id', id)
      .single();

    if (error || !discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    await supabase
      .from('discussions')
      .update({ views: discussion.views + 1 })
      .eq('id', id);

    const { data: replies } = await supabase
      .from('discussion_replies')
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          email
        )
      `)
      .eq('discussion_id', id)
      .order('created_at', { ascending: true });

    res.json({ discussion, replies: replies || [] });
  } catch (error) {
    console.error('Get discussion error:', error);
    res.status(500).json({ error: 'Failed to fetch discussion', message: error.message });
  }
};

const createReply = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const { data: reply, error } = await supabase
      .from('discussion_replies')
      .insert([{
        discussion_id: discussionId,
        user_id: req.user.id,
        content
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create reply' });
    }

    const { data: discussion } = await supabase
      .from('discussions')
      .select('replies_count')
      .eq('id', discussionId)
      .single();

    await supabase
      .from('discussions')
      .update({ replies_count: (discussion?.replies_count || 0) + 1 })
      .eq('id', discussionId);

    res.status(201).json({ message: 'Reply created successfully', reply });
  } catch (error) {
    console.error('Create reply error:', error);
    res.status(500).json({ error: 'Failed to create reply', message: error.message });
  }
};

module.exports = {
  getAllDiscussions,
  createDiscussion,
  getDiscussionById,
  createReply
};
