const supabase = require('../config/supabase.cjs');

const getAllPosts = async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          email,
          department
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }

    res.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts', message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert([{
        content,
        user_id: req.user.id
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create post' });
    }

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post', message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: post, error } = await supabase
      .from('posts')
      .select('likes_count')
      .eq('id', id)
      .single();

    if (error || !post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { error: updateError } = await supabase
      .from('posts')
      .update({ likes_count: post.likes_count + 1 })
      .eq('id', id);

    if (updateError) {
      return res.status(500).json({ error: 'Failed to like post' });
    }

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Failed to like post', message: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  likePost
};
