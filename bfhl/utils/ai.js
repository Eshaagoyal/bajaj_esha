const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function askAI(question) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Answer the following question using ONLY ONE WORD (no punctuation, no explanation): ${question}`
          }
        ]
      }
    ]
  };

  const response = await axios.post(url, payload);

  const text = response.data.candidates[0].content.parts[0].text;

  // Extra safety: trim & take first word
  return text.trim().split(/\s+/)[0];
}

module.exports = { askAI };
