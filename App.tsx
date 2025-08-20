
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message as MessageType } from './types';
import { getBotResponse } from './services/chatbotService';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  useEffect(() => {
    // Initial greeting from the bot
    setMessages([
      {
        id: Date.now(),
        text: "Hello! I'm a chatbot who knows a little about Python. Ask me about variables, lists, loops, or functions!",
        sender: 'bot'
      }
    ]);
  }, []);

  const handleSendMessage = useCallback((userMessage: string) => {
    if (!userMessage.trim()) return;

    const newUserMessage: MessageType = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsBotTyping(true);

    setTimeout(() => {
      const botResponseText = getBotResponse(userMessage);
      const newBotMessage: MessageType = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsBotTyping(false);
    }, 1000 + Math.random() * 500); // Simulate network delay and thinking time
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 shadow-md p-4 flex items-center justify-center border-b border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-100">Python Rule-Based Chatbot</h1>
      </header>
      <ChatWindow messages={messages} isBotTyping={isBotTyping} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isBotTyping} />
    </div>
  );
};

export default App;
