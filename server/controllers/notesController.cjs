const supabase = require('../config/supabase.cjs');

const getAllNotes = async (req, res) => {
  try {
    const { data: notes, error } = await supabase
      .from('notes')
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
      return res.status(500).json({ error: 'Failed to fetch notes' });
    }

    res.json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to fetch notes', message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, subject, content, semester, fileUrl } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ error: 'Title and subject are required' });
    }

    const { data: note, error } = await supabase
      .from('notes')
      .insert([{
        title,
        subject,
        content,
        semester,
        file_url: fileUrl,
        user_id: req.user.id
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create note' });
    }

    res.status(201).json({ message: 'Note created successfully', note });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Failed to create note', message: error.message });
  }
};

const downloadNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: note, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await supabase
      .from('notes')
      .update({ downloads: note.downloads + 1 })
      .eq('id', id);

    res.json({ message: 'Download count updated', note });
  } catch (error) {
    console.error('Download note error:', error);
    res.status(500).json({ error: 'Failed to download note', message: error.message });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  downloadNote
};
