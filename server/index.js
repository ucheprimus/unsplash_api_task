require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Correct: mount likes+comments under /api/images
const likesRoutes = require('./routes/likes');
app.use('/api/images', likesRoutes);

// ✅ Test route (optional)
app.get('/', (req, res) => {
  res.send('✅ API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
