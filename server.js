const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// LM Studio Configuration
const LM_STUDIO_URL = process.env.LM_STUDIO_URL || 'http://localhost:1234';
const LM_STUDIO_API_KEY = process.env.LM_STUDIO_API_KEY;
const LM_STUDIO_MODEL = process.env.LM_STUDIO_MODEL || 'qwen/qwen3.5-9b';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Chat endpoint - dit is de belangrijkste!
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Invalid request: messages array is required'
      });
    }

    console.log('📨 Incoming request with messages:', messages);

    // Call LM Studio API
    const response = await axios.post(
      `${LM_STUDIO_URL}/api/v1/chat`,
      {
        model: LM_STUDIO_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.95
      },
      {
        headers: {
          'Authorization': `Bearer ${LM_STUDIO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    console.log('✅ LM Studio responded successfully');
    console.log('Response:', response.data);

    // Stuur de AI response terug naar de frontend
    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('❌ Error:', error.message);

    // Error handling
    if (error.response) {
      console.error('LM Studio error:', error.response.data);
      return res.status(error.response.status).json({
        error: error.response.data?.error?.message || 'LM Studio error'
      });
    }

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: 'Cannot connect to LM Studio. Is it running on ' + LM_STUDIO_URL + '?'
      });
    }

    res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server started on http://localhost:${PORT}`);
  console.log(`📡 Connected to LM Studio at ${LM_STUDIO_URL}`);
  console.log(`🤖 Using model: ${LM_STUDIO_MODEL}\n`);
});
