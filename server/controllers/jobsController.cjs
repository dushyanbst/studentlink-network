const supabase = require('../config/supabase.cjs');

const getAllJobs = async (req, res) => {
  try {
    const { department, type } = req.query;

    let query = supabase
      .from('jobs')
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (department && department !== 'all') {
      query = query.eq('department', department);
    }

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    const { data: jobs, error } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch jobs' });
    }

    res.json({ jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs', message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, company, location, type, department, description } = req.body;

    if (!title || !company || !location || !type) {
      return res.status(400).json({ error: 'Title, company, location, and type are required' });
    }

    const { data: job, error } = await supabase
      .from('jobs')
      .insert([{
        title,
        company,
        location,
        type,
        department,
        description,
        user_id: req.user.id
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create job' });
    }

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job', message: error.message });
  }
};

module.exports = {
  getAllJobs,
  createJob
};
