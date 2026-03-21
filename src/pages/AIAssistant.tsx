import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/MockAppStore';
import './AIAssistant.css';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const { products, orders, invoices } = useAppStore();
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am InventAI Assistant. I can help you analyze your business data. Ask me about your stock, sales, or pending invoices.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getSmartResponse = (query: string) => {
    const q = query.toLowerCase();
    
    // Simulate AI analyzing data context
    if (q.includes('low stock') || q.includes('restock')) {
      const lowStock = products.filter(p => p.stock_quantity <= p.reorder_threshold);
      if (lowStock.length === 0) return "Great news! All your products are currently well-stocked. Nothing needs restocking right now.";
      return `You have ${lowStock.length} items running low: ${lowStock.map(p => p.name).join(', ')}. I recommend ordering these soon to prevent stockouts.`;
    }
    
    if (q.includes('unpaid') || q.includes('invoice')) {
      const unpaid = invoices.filter(i => i.payment_status === 'Unpaid');
      const totalUnpaid = unpaid.reduce((sum, inv) => sum + inv.total_amount, 0);
      if (unpaid.length === 0) return "All your invoices are currently paid. Great job managing collections!";
      return `You have ${unpaid.length} unpaid invoices totaling ₹${totalUnpaid.toLocaleString('en-IN')}. Would you like me to draft payment reminders for these customers?`;
    }
    
    if (q.includes('sales') || q.includes('selling') || q.includes('top')) {
      return "Based on recent data, 'Premium Wireless Earbuds' has been your top-selling product. Consider running a promotion on related audio accessories to boost average order value.";
    }

    if (q.includes('summary') || q.includes('today')) {
      const todaySales = orders.filter(o => o.status === 'Completed').reduce((acc, o) => acc + o.total_amount, 0);
      return `Today you have generated ₹${todaySales.toLocaleString('en-IN')} in confirmed sales, and you currently hold ${products.length} active SKUs. Is there a specific area you'd like to dive into?`;
    }

    return "I am currently a smart mock assistant. I can show you demo responses for 'low stock', 'unpaid invoices', 'top sales', or 'daily summary'.";
  };

  const handleSend = (e?: React.FormEvent, preset?: string) => {
    if (e) e.preventDefault();
    const text = preset || input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getSmartResponse(text);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedPrompts = [
    "Which products need restocking?",
    "Which invoices are still unpaid?",
    "What are my top-selling products?",
    "Give me a business summary for today."
  ];

  return (
    <div className="page-container ai-page">
      <div className="ai-header-bar">
        <Sparkles className="ai-star-icon" size={24} />
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>InventAI Assistant</h1>
          <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.875rem' }}>Your intelligent SME operations co-pilot.</p>
        </div>
      </div>

      <div className="ai-chat-layout">
        <div className="ai-chat-main card">
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble-container ${msg.sender}`}>
                <div className="chat-avatar">
                  {msg.sender === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble-container ai typing-indicator">
                <div className="chat-avatar"><Bot size={20} /></div>
                <div className="chat-bubble ai">
                  <div className="dots"><span>.</span><span>.</span><span>.</span></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <form onSubmit={handleSend} className="chat-form">
              <input 
                type="text" 
                placeholder="Ask me anything about your inventory, sales, or business..." 
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus
              />
              <button type="submit" disabled={!input.trim() || isTyping}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="ai-sidebar hidden-on-mobile">
          <div className="card">
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Suggested Prompts</h3>
            <div className="suggestions-list">
              {suggestedPrompts.map((prompt, i) => (
                <button 
                  key={i} 
                  className="btn btn-outline suggestion-btn"
                  onClick={() => handleSend(undefined, prompt)}
                  disabled={isTyping}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
          <div className="card" style={{ marginTop: '1.5rem', backgroundColor: 'var(--color-surface-hover)' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>How it works</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', margin: 0, lineHeight: 1.5 }}>
              The AI Assistant analyzes your current stock levels, order history, and pending invoices to provide real-time recommendations and insights for your business operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
