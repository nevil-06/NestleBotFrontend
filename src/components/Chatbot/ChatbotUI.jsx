// ✅ Updated chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import "./ChatbotUI.css";

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Nestle Assistant. How can I help you today?",
      sender: "bot",
      id: 1,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState("");
  const [fullMessageToType, setFullMessageToType] = useState("");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentTypingMessage]);

  useEffect(() => {
    if (isTyping && currentTypingMessage.length < fullMessageToType.length) {
      const timeoutId = setTimeout(() => {
        setCurrentTypingMessage(
          fullMessageToType.substring(0, currentTypingMessage.length + 1)
        );
      }, 30);
      return () => clearTimeout(timeoutId);
    } else if (
      isTyping &&
      currentTypingMessage.length === fullMessageToType.length
    ) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: fullMessageToType, sender: "bot", id: Date.now() },
      ]);
      setCurrentTypingMessage("");
    }
    scrollToBottom();
  }, [isTyping, currentTypingMessage, fullMessageToType]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user", id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const structuredResponse = await response.json();
      console.log("Structured response from backend:", structuredResponse);

      let fullText = structuredResponse.summary || "Here's what I found:";

      if (structuredResponse.items?.length > 0) {
        fullText +=
          "\n\n" +
          structuredResponse.items
            .map((item, i) => {
              let line = `${i + 1}. ${item.title}\nType: ${item.type}`;
              if (item.category) line += `\nCategory: ${item.category}`;
              if (item.description) line += `\n${item.description}`;
              if (item.prep_time || item.cook_time) {
                line += `\nPrep: ${item.prep_time || "N/A"} | Cook: ${
                  item.cook_time || "N/A"
                }`;
              }
              if (item.top_ingredients?.length)
                line += `\nIngredients: ${item.top_ingredients.join(", ")}`;
              if (item.nutrition) line += `\nNutrition: ${item.nutrition}`;
              if (item.url) line += `\nLink: ${item.url}`;
              return line;
            })
            .join("\n\n");
      }

      if (structuredResponse.followups?.length > 0) {
        fullText +=
          "\n\nYou might also ask:\n" +
          structuredResponse.followups.map((f) => `- ${f}`).join("\n");
      }

      setFullMessageToType(fullText);
      setIsLoading(false);
      setIsTyping(true);
    } catch (error) {
      console.error("Fetch error:", error);
      setIsLoading(false);
      setFullMessageToType("Oops! Something went wrong. Please try again.");
      setIsTyping(true);
    }
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatbotOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isChatbotOpen) {
    return (
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        <div className="chatbot-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" />
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
          <img
            src="/images/nestle-logo.png"
            alt="Nestle Logo"
            className="nestle-logo"
          />
          <h2>Coffee Assistant</h2>
        </div>
        <button className="close-button" onClick={toggleChatbot}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "bot" ? "bot-message" : "user-message"
            }`}
          >
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
          <div key={currentTypingMessage.length} className="bot-message typing">
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
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading || isTyping}
          className="chatbot-input"
        />
        <button
          type="submit"
          disabled={isLoading || isTyping || input.trim() === ""}
          className="send-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatbotUI;
