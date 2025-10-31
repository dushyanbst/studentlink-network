const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth.cjs');
const notesRoutes = require('./routes/notes.cjs');
const jobsRoutes = require('./routes/jobs.cjs');
const discussionsRoutes = require('./routes/discussions.cjs');
const announcementsRoutes = require('./routes/announcements.cjs');
const postsRoutes = require('./routes/posts.cjs');
const usersRoutes = require('./routes/users.cjs');

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/discussions', discussionsRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Campus Link API is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
