import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.scss';
import avatar from '../../assets/estiam-avatar.png';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Ceci est une réponse automatique du bot.", sender: 'bot' }]);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={styles['chatbox-container']}>
      <div className={styles['chatbox-header']}>
        <img
          src={avatar}
          alt="Avatar ESTIAM"
          className={styles['chatbox-avatar']}
        />
        <div className={styles['chatbox-header-info']}>
          <span className={styles['chatbox-title']}>ESTIAM</span>
          <span className={styles['chatbox-status']}>
            <span className={styles['chatbox-status-dot']} />En ligne
          </span>
        </div>
      </div>
      <div className={styles['chatbox-messages']}>
        {messages.map((msg, idx) => (
          <div key={idx} className={styles['chatbox-message'] + ' ' + styles[msg.sender]}>{msg.text}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles['chatbox-input-area']}>
        <input
          type="text"
          placeholder="Écris ton message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles['chatbox-input']}
        />
        <button onClick={handleSend} className={styles['chatbox-send-btn']}>Envoyer</button>
      </div>
    </div>
  );
};

export default ChatBox; 