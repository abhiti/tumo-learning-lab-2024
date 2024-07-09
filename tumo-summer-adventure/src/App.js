import React, { useState, useEffect } from 'react';
import './App.css';
const LLMRequest = () => {
  const [llm_prompt, setLlmPrompt] = useState('');
  const [llm_response, setLlmResponse] = useState('');
  const [tab, setTab] = useState('init');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [travelers, setTravelers] = useState('');
  const [current_time, setCurrentTime] = useState('');
  const [llama_response, setLlamaResponse] = useState('');
  const fetchLlmResponse = async (content) => {
    const TOKEN = '<TOKEN>'; // Replace with your actual OpenAI API token

    // Endpoint URL
    const url = 'https://api.openai.com/v1/chat/completions';
    
    // Request body
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: content }],
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
  function handleLocationTextareaChange(e) {
    setLocation(e.target.value);
  }

  function handleDurationTextareaChange(e) {
    setDuration(e.target.value);
  }

  function handleTravelersTextareaChange(e) {
    setTravelers(e.target.value);
  }

  // fetch('https://worldtimeapi.org/api/timezone/Asia/Yerevan')
  // .then(res => res.json())
  // .then(console.log)

  //sample GET
  const fetchTime = async () => {

    // Endpoint URL
    const url = 'https://worldtimeapi.org/api/timezone/Asia/Yerevan';
    
    // // Request body
    // const requestBody = {
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: content }],
    //   temperature: 0.7
    // };

    // Fetch request options
    const requestOptions = {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${TOKEN}`
      // },
      // body: JSON.stringify(requestBody)
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCurrentTime(data.datetime);
      console.log("current_time: "+current_time);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const fetchHello = async () => {

    // Endpoint URL
    const url = 'http://localhost:11434/api/generate';
    
    // // Request body
    // const requestBody = {
    //   model: 'llama3',
    //   prompt: "respond with just 'hello'"
    // };

    // Fetch request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: "respond with just 'hello'"
      })
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("data: "+data);
      setLlamaResponse(data.response);
      console.log("llama_response: "+llama_response);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleLocationTextareaChange(e) {
    setLocation(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTab('itinerary');
    console.log('location: '+location)
    console.log('duration: '+duration)
    console.log('travelers: '+travelers)
    // setLlmPrompt('Design a holiday itinerary for '+travelers+' going to '+location+' for the duration of '+duration);
    await fetchLlmResponse('Design a holiday itinerary for '+travelers+' going to '+location+' for the duration of '+duration);
  }

  async function handleSubmitPackingList(e) {
    e.preventDefault();
    setTab('packing_list');
    console.log('location: '+location)
    console.log('duration: '+duration)
    console.log('travelers: '+travelers)
    // setLlmPrompt('Design a holiday itinerary for '+travelers+' going to '+location+' for the duration of '+duration);
    await fetchLlmResponse('Provide a packing list for a holiday itinerary for '+travelers+' going to '+location+' for the duration of '+duration);
  }

  // useEffect(() => {
  //   fetchLlmResponse();
  // }, []);

 useEffect(() => {
    fetchTime();
    fetchHello();
  }, []);

  return (
    <div className='Top-Container'>
      <div className='Header'>
        <div className='Title'>
          <h2>Holid.AI</h2>
          <i>your AI-enabled holiday planner!</i>
        </div>
        <div className='Questionnaire'>
          <div className='Entry'>
            <b>I want to go to...</b>
            <textarea id="location" value={location} onChange={handleLocationTextareaChange}/>
          </div>
          <div className='Entry'>
            <b>For...</b>
            <textarea id="duration" value={duration} onChange={handleDurationTextareaChange}/>
          </div>
          <div className='Entry'>
            <b>With...</b>
            <textarea id="travelers" value={travelers} onChange={handleTravelersTextareaChange}/>
          </div>
        </div>
      </div>
      <div className='Content'>
        <b>Generate:</b>
        <div className='Button-Container'>
          <button id="itinerary" disabled={location === '' || duration === '' || travelers === ''} onClick={handleSubmit}>Itinerary</button>
          <button id="packing list" disabled={location === '' || duration === '' || travelers === ''} onClick={handleSubmitPackingList}>Packing List</button>
        </div>
        {/* {llm_response.length > 50 ? <div>{llm_response}</div> : <p>wait</p>} */}
        {<div>{llm_response}</div>}
        {<div>{current_time}</div>}
        {<div>{llama_response}</div>}
      </div>
    </div>
  );
}
export default LLMRequest;

