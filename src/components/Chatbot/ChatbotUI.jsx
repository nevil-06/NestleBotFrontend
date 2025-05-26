import React, { useState, useEffect, useRef } from 'react';
import './ChatbotUI.css';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([{ text: "Hi! I'm Nestle Assistant. How can I help you today?", sender: 'bot', id: 1 }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');
  const [fullMessageToType, setFullMessageToType] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentTypingMessage]);

  useEffect(() => {
    if (isTyping && currentTypingMessage.length < fullMessageToType.length) {
      const timeoutId = setTimeout(() => {
        setCurrentTypingMessage(fullMessageToType.substring(0, currentTypingMessage.length + 1));
      }, 30); // Speed of typing
      return () => clearTimeout(timeoutId);
    } else if (isTyping && currentTypingMessage.length === fullMessageToType.length) {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: fullMessageToType, sender: 'bot', id: Date.now() }]);
      setCurrentTypingMessage('');
    }
  }, [isTyping, currentTypingMessage, fullMessageToType]);

  // const handleSendMessage = async e => {
  //   e.preventDefault();
  //   if (input.trim() === '') return;

  //   const userMessage = { text: input, sender: 'user', id: Date.now() };
  //   setMessages(prev => [...prev, userMessage]);
  //   setInput('');
  //   setIsLoading(true);

  //   // Simulate API call delay
  //   setTimeout(async () => {
  //     setIsLoading(false);

  //     // Start typing animation with the response
  //     // const botResponse = getBotResponse(input);
  //     const response = await fetch("http://localhost:8000/ask", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ query: input })
  //     });
      
  //     const data = await response.json();
  //     const botResponse = data.answer || "Sorry, I couldn't process that.";
  //     setFullMessageToType(botResponse);
  //     setIsTyping(true);
  //   }, 3000);
  // };
  const handleSendMessage = async e => {
    e.preventDefault();
    if (input.trim() === '') return;
  
    const userMessage = { text: input, sender: 'user', id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input })
      });
  
      const data = await response.json();
      const botResponse = data.answer || "Sorry, I couldn't process that.";
  
      // Start typing animation with the response
      setIsLoading(false);
      setFullMessageToType(botResponse);
      setIsTyping(true);
    } catch (error) {
      setIsLoading(false);
      setFullMessageToType("Oops! Something went wrong. Please try again.");
      setIsTyping(true);
    }
  };
  
  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  // const getBotResponse = userInput => {
  //   // Dummy responses based on user input
  //   const userInputLower = userInput.toLowerCase();

  //   if (userInputLower.includes('hello') || userInputLower.includes('hi')) {
  //     return 'Hello! How can I assist you with Nestle coffee products today?';
  //   } else if (userInputLower.includes('product')) {
  //     return 'Nestle offers a wide range of coffee products including Nescafé, Nespresso, and Coffee-Mate. Which coffee would you like to explore?';
  //   } else if (userInputLower.includes('coffee')) {
  //     return 'Our coffee selection includes premium blends from around the world. We have espresso, cappuccino, and signature blends. Would you like recommendations?';
  //   } else if (userInputLower.includes('chocolate')) {
  //     return 'Our chocolatey coffee options include mocha, chocolate-infused espresso, and our signature Chocolate Cloud blend. Which sounds appealing?';
  //   } else if (userInputLower.includes('thanks') || userInputLower.includes('thank you')) {
  //     return "You're welcome! Enjoy your coffee experience. Is there anything else I can help you with?";
  //   } else {
  //     return "Thank you for your interest in our coffee products. Could you please provide more details about what you're looking for?";
  //   }
  // };

  if (!isChatbotOpen) {
    return (
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        <div className="chatbot-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 12.5C16 12.78 15.78 13 15.5 13H12.5C12.22 13 12 12.78 12 12.5V8.5C12 8.22 12.22 8 12.5 8H13.5C13.78 8 14 8.22 14 8.5V11H15.5C15.78 11 16 11.22 16 11.5V12.5ZM13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15C12.55 15 13 15.45 13 16Z" />
          </svg>
        </div>
        <span>Chat with us</span>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <img src="/images/nestle-logo.png" alt="Nestle Logo" className="nestle-logo" />
          <h2>Coffee Assistant</h2>
        </div>
        <button className="close-button" onClick={toggleChatbot}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
            {message.text}
          </div>
        ))}

        {isLoading && (
          <div className="thinking-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}

        {isTyping && (
          <div className="message bot-message typing">
            {currentTypingMessage}
            <span className="cursor"></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chatbot-input-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading || isTyping}
          className="chatbot-input"
        />
        <button type="submit" disabled={isLoading || isTyping || input.trim() === ''} className="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatbotUI;
