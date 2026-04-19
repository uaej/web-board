const express = require('express');
const cors = require('cors');
const postWeb = require('./web/post.web');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Presentation Layer 연동
app.use('/api/posts', postWeb);

app.listen(PORT, () => {
  console.log(`[Backend] Server is running on http://localhost:${PORT}`);
});
