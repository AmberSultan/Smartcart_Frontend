// src/components/Chatbot.js
import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = ({ selectedDish }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const formatResponse = (text) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  
    const lines = formattedText.split('\n');
    let isStepsSection = false;
    let stepCounter = 1;

    // Process lines to handle numbering and asterisks
    const formattedLines = lines.map((line) => {
      // Detect if we're entering the Steps section
      if (line.includes('<strong>Steps:</strong>')) {
        isStepsSection = true;
        return line;
      }
      // Detect if we're exiting the Steps section (e.g., empty line or new section)
      if (line.trim() === '' && isStepsSection) {
        isStepsSection = false;
        stepCounter = 1; // Reset counter for next Steps section
        return line;
      }

      if (isStepsSection) {
        // In Steps section: keep numbering, remove original numbering, and add manual numbering
        if (line.match(/^\d+\.\s/)) {
          const stepText = line.replace(/^\d+\.\s/, '');
          return `${stepCounter}. ${stepText}`; // Add manual numbering
        }
        stepCounter++;
        return line;
      } else {
        // In Ingredients section: remove asterisks
        if (line.match(/^\*\s/)) {
          return line.replace(/^\*\s/, '');
        }
        return line;
      }
    });

    // Join lines back with <br> for HTML rendering
    return formattedLines.join('<br>');
  };

  const fetchRecipe = async (dishName) => {
    setIsLoading(true); // Show loading
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'user',
              content: `Provide a step-by-step cooking method and ingredients for ${dishName}. Format it as: **Ingredients:** [list] **Steps:** [numbered list]`,
            },
          ],
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Groq API error: ${response.status} - ${errorData.error.message}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;
      const formattedResponse = formatResponse(botResponse);
      setMessages((prev) => [...prev, { text: formattedResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, I couldn’t fetch that recipe!', sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false); // Hide loading
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    fetchRecipe(input);
    setInput('');
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  useEffect(() => {
    if (selectedDish) {
      setMessages([]);
      fetchRecipe(selectedDish);
    }
  }, [selectedDish]);

  return (
    <div className="smartcart-fullpage-chatbot">
      <div className="smartcart-chatbot-header d-flex justify-content-between align-items-center">
      <button className="smartcart-chatbot-new-chat" onClick={handleNewChat}>
          New Chat
        </button>
        <h1>ChefBot</h1>
        <h1 className='colou'>ChefBot</h1>
      </div>
      <div className="smartcart-chatbot-messages">
        {messages.length === 0 && !isLoading ? (
          <div className="smartcart-chatbot-welcome">
            <p>Ask me how to cook any dish! Start by typing a dish name below.</p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`smartcart-chatbot-message smartcart-chatbot-${msg.sender}`}
              >
                <span className="smartcart-chatbot-sender">
                  {/* {msg.sender === 'user' ? 'You' : 'ChefBot'} */}
                </span>
                <div
                  className="smartcart-chatbot-text"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            {isLoading && (
              <div className="smartcart-chatbot-loading">
                <span>Loading...</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="smartcart-chatbot-input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a dish name (e.g., Pancakes)..."
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          className="smartcart-chatbot-input"
        />
        <button className="smartcart-chatbot-send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;