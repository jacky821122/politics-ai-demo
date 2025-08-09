const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Error: Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ reply: 'Error: Message is required' });
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ reply: 'Error: OpenAI API key not configured' });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that guides political discussion in a neutral and structured way. Provide balanced viewpoints and ask follow-up questions. Keep responses concise but informative, and encourage thoughtful dialogue.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'Error: No response from AI';

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(500).json({ reply: 'Error: API quota exceeded' });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(500).json({ reply: 'Error: Invalid API key' });
    }

    return res.status(500).json({ 
      reply: 'Error: Failed to get AI response. Please try again later.' 
    });
  }
};
