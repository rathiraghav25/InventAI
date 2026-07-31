import React, { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User, Copy, Check,} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { sendMessage } from "../api/ai";
import type { ChatMessage } from "../api/ai";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  time: string;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am InventAI Assistant. Ask me anything about your inventory, customers, orders or business analytics.",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);


  const clearChat = () => {
  setMessages([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am InventAI Assistant. Ask me anything about your inventory, customers, orders or business analytics.",
      time: new Date().toLocaleTimeString(),
    },
  ]);
};

const handleCopy = async (id: string, text: string) => {
  try {
    await navigator.clipboard.writeText(text);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  } catch (err) {
    console.error("Copy failed:", err);
  }
};

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (
    e?: React.FormEvent,
    preset?: string
  ) => {
    if (e) e.preventDefault();

    const text = preset || input.trim();

    if (!text) return;

    if (isTyping) return;

    const userMessage: Message = {
    id: Date.now().toString(),
    sender: "user",
    text,
    time: new Date().toLocaleTimeString(),
};

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setFollowUpSuggestions([]);

    setIsTyping(true);

    try {
      const history: ChatMessage[] = messages
  .slice(-8)
  .map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.text,
  }));
      const response = await sendMessage(text, history);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: response.response,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setFollowUpSuggestions([
  "📊 Business Summary",
  "📦 Inventory Health",
  "💰 Revenue Analysis",
  "👥 Customer Insights",
]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text:
          "⚠️ Unable to contact the AI service. Please verify your internet connection or Gemini API configuration.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedPrompts = [
    "📊 Give me a complete business summary",
    "📦 Which products need restocking?",
    "💰 Analyze my revenue",
    "📈 Give business improvement suggestions",
    "👥 Analyze my customers",
    "🛒 Which products sell the best?"
];

    return (
    <div className="page-container ai-page">
      <div className="ai-header-bar">
        <Sparkles className="ai-star-icon" size={24} />

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "1.5rem",
              color: "var(--color-primary-dark)",
            }}
          >
            InventAI Assistant
          </h1>

          <button
  className="btn btn-outline"
  onClick={clearChat}
>
  🗑 Clear Chat
</button>

          <p
            style={{
              margin: 0,
              color: "var(--color-text-light)",
              fontSize: "0.875rem",
            }}
          >
            Your intelligent SME operations co-pilot.
          </p>
        </div>
      </div>

      <div className="ai-chat-layout">

        <div className="ai-chat-main card">

          <div className="chat-messages">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`chat-bubble-container ${msg.sender}`}
              >
                <div className="message-time">
    {msg.time}
</div>

                <div className="chat-avatar">

                  {msg.sender === "ai" ? (
                    <Bot size={20} />
                  ) : (
                    <User size={20} />
                  )}

                </div>

                <div className={`chat-bubble ${msg.sender}`}>

  {msg.sender === "ai" ? (
    <>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {msg.text}
      </ReactMarkdown>

      <button
  className="copy-btn"
  title={copiedId === msg.id ? "Copied!" : "Copy response"}
  onClick={() => handleCopy(msg.id, msg.text)}
>
  {copiedId === msg.id ? (
    <Check size={16} />
  ) : (
    <Copy size={16} />
  )}
</button>

    </>
  ) : (
    msg.text
  )}

</div>

              </div>

            ))}

            {isTyping && (

              <div className="chat-bubble-container ai typing-indicator">

                <div className="chat-avatar">
                  <Bot size={20} />
                </div>

                <div className="chat-bubble ai">

                  <div className="dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>

                </div>

              </div>

            )}

            {followUpSuggestions.length > 0 && (
  <div className="follow-up-container">

    <h4>Suggested Follow-up</h4>

    <div className="follow-up-buttons">

      {followUpSuggestions.map((suggestion, index) => (
        <button
          key={index}
          className="btn btn-outline suggestion-btn"
          onClick={() => handleSend(undefined, suggestion)}
          disabled={isTyping}
        >
          {suggestion}
        </button>
      ))}

    </div>

  </div>
)}

<div ref={messagesEndRef} />

          </div>

          <div className="chat-input-area">

            <form
              onSubmit={handleSend}
              className="chat-form"
            >

              <input
                type="text"
                placeholder="Ask me anything about your business..."
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                autoFocus
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
              >
                <Send size={18} />
              </button>

            </form>

          </div>

        </div>
                <div className="ai-sidebar hidden-on-mobile">

          <div className="card">

            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1rem",
              }}
            >
              Suggested Prompts
            </h3>

            <div className="suggestions-list">

              {suggestedPrompts.map((prompt, index) => (

                <button
                  key={index}
                  className="btn btn-outline suggestion-btn"
                  onClick={() =>
                    handleSend(undefined, prompt)
                    
                  }
                  disabled={isTyping}
                >
                  {prompt}
                </button>

              ))}

            </div>

          </div>

          <div
            className="card"
            style={{
              marginTop: "1.5rem",
              backgroundColor:
                "var(--color-surface-hover)",
            }}
          >

            <h3
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              How it works
            </h3>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-light)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              The AI Assistant communicates with the
              FastAPI backend to analyze your inventory,
              orders, customers, invoices and business
              analytics.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};