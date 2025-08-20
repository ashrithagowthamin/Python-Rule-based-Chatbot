
import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import Message from './Message';

interface ChatWindowProps {
  messages: MessageType[];
  isBotTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isBotTyping }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  return (
    <div className="flex-grow p-6 overflow-y-auto">
      <div className="flex flex-col space-y-4">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isBotTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-lg p-3 max-w-lg flex items-center space-x-2">
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
