const express = require('express');
const pool = require('../db');

const router = express.Router();

// ✅ GET likes count
router.get('/:id/likes', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT likes FROM images WHERE id = $1', [id]);
    const count = result.rows[0] ? result.rows[0].likes : 0;

    res.json({ hasLiked: false, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching likes' });
  }
});

// ✅ POST toggle like
router.post('/:id/likes', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT likes FROM images WHERE id = $1', [id]);
    let count = result.rows[0] ? result.rows[0].likes : 0;

    count += 1;

    await pool.query(
      'INSERT INTO images (id, likes) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET likes = $2',
      [id, count]
    );

    res.json({ hasLiked: true, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error toggling like' });
  }
});

// ✅ ✅ ADD COMMENTS ROUTES BELOW

// POST a new comment
router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || text.trim().length < 2) {
    return res.status(400).json({ error: 'Comment text is too short.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO comments (image_id, text) VALUES ($1, $2) RETURNING *',
      [id, text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting comment:', err);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// GET all comments for an image
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM comments WHERE image_id = $1 ORDER BY created_at DESC',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;
