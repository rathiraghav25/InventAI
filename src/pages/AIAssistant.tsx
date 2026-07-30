import React, { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { sendMessage } from "../api/ai";
import "./AIAssistant.css";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am InventAI Assistant. Ask me anything about your inventory, customers, orders or business analytics.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setIsTyping(true);

    try {
      const response = await sendMessage(text);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: response.response,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: "Unable to reach the AI service.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedPrompts = [
    "Which products need restocking?",
    "Which invoices are still unpaid?",
    "What are my top-selling products?",
    "Give me a business summary for today.",
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

                <div className="chat-avatar">

                  {msg.sender === "ai" ? (
                    <Bot size={20} />
                  ) : (
                    <User size={20} />
                  )}

                </div>

                <div
                  className={`chat-bubble ${msg.sender}`}
                >
                  {msg.text}
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