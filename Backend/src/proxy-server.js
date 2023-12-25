const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json())

app.post('/api/chat/completions', async (req, res) => {
  const apiUrl = 'https://chat.nbox.ai/api/chat/completions';

  try {
    const response = await axios.post(apiUrl, req.body, {
      headers: {
        'Authorization': 'tune-654f6953-6480-45a8-863e-b305bbbd51301703223915',
        'Content-Type': 'application/json',
        'Cookie': 'GCLB=CLibqKTghcKDPA',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
