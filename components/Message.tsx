
import React from 'react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre className="bg-gray-800 text-green-300 font-mono text-sm p-3 my-2 rounded-md overflow-x-auto">
    <code>{code}</code>
  </pre>
);

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  // Split message by $$$ delimiter to handle inline code snippets
  const messageParts = message.text.split('$$$');

  const content = messageParts.map((part, index) => {
    if (index % 2 === 1) { // Odd parts are code snippets
      return <CodeBlock key={index} code={part} />;
    }
    return <span key={index}>{part}</span>; // Even parts are regular text
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-xl p-3 max-w-lg lg:max-w-xl shadow-md ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-200 rounded-bl-none'
        }`}
      >
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
};

export default Message;
