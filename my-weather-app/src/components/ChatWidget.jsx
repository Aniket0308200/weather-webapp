import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader } from 'lucide-react';
import aiChatIcon from '../assets/AI-chat-icon.png';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Weather Assistant. Ask me anything about the weather! 🌤️",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call backend API with longer timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 300 seconds = 5 minutes

      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (data.status === 'success') {
        const botMessage = {
          id: messages.length + 2,
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: messages.length + 2,
          text: `Error: ${data.error || 'Failed to get response'}`,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      let errorText = 'Connection error: ';
      
      if (error.name === 'AbortError') {
        errorText += 'Request timed out after 5 minutes. The AI is taking too long. Try asking a simpler weather question.';
      } else {
        errorText += 'Make sure the backend is running on http://localhost:5000';
      }

      const errorMessage = {
        id: messages.length + 2,
        text: errorText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 group">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-15 h-15 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-none text-white cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          title="Chat with AI"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <img src={aiChatIcon} alt="Chat with AI" className="w-10.5 h-10.5 object-contain" />
          )}
        </motion.button>
        <div className="absolute bottom-16 right-0 bg-black/80 text-white px-3 py-2 rounded text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 z-[1000]">
          Chat with AI
        </div>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-64 h-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col z-[998] border border-white/20 sm:w-full sm:h-[70vh] sm:max-h-[500px] sm:bottom-[90px] sm:right-4 sm:w-[calc(100vw-32px)] md:w-96 md:min-h-[600px] md:bottom-24 md:right-6"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-4 rounded-t-2xl flex justify-between items-center shadow-md">
              <div>
                <h3 className="m-0 text-lg font-semibold">Weather Assistant</h3>
                <p className="m-0 mt-1 text-xs opacity-90">Ask me about the weather</p>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 border-none text-white w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-all hover:bg-white/30"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-gradient-to-b from-white/50 to-cyan-500/5 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex flex-col gap-1 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-xl word-wrap break-words leading-relaxed text-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none'
                        : 'bg-black/8 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                  <span className="text-xs text-gray-400 px-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="flex flex-col gap-1 items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/10 text-cyan-600">
                    <Loader size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2 px-3 py-3 border-t border-black/10 bg-white/80 rounded-b-2xl">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about weather..."
                className="flex-1 border border-cyan-500/30 rounded-lg px-3 py-2.5 text-sm outline-none transition-all bg-white/90 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 border-none text-white cursor-pointer flex items-center justify-center transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
