import React, { useState, useEffect } from 'react';
const LLMRequest = () => {
  const [llm_response, setLlmResponse] = useState('');
  const fetchLlmResponse = async () => {
    const TOKEN = '<TOKEN>'; // Replace with your actual OpenAI API token

    // Endpoint URL
    const url = 'https://api.openai.com/v1/chat/completions';
    
    // Request body
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'How old is obama?' }],
      temperature: 0.7
    };

    // Fetch request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(requestBody)
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLlmResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    fetchLlmResponse();
  }, []);
  return (
    <div>
      <textarea />
      <h2>LLM Response:</h2>
      {llm_response && <p>{llm_response}</p>}
    </div>
  );
}
export default LLMRequest;