import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.scss';
import avatar from '../../assets/estiam-avatar.png';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mcp/sessions/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setSessionId(data.session_id);
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };
    initializeSession();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || !sessionId || isLoading) return;
    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { text: '', sender: 'bot', isTyping: true }]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mcp/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          query: input,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessages(prev => prev.filter(msg => !msg.isTyping));
      const reader = response.body?.getReader();
      if (!reader) return;

      let botMessage = { text: '', sender: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
      const messageIndex = messages.length + 1;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const data = JSON.parse(line.substring(5));
              if (data.chunk) {
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[messageIndex] = {
                    ...newMessages[messageIndex],
                    text: newMessages[messageIndex].text + data.chunk,
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev.filter(msg => !msg.isTyping),
        { text: 'Désolé, une erreur est survenue. Veuillez réessayer.', sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
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
            <span className={styles['chatbox-status-dot']}></span>
            En ligne
          </span>
        </div>
      </div>

      <div className={styles['chatbox-messages']}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles['chatbox-message']} ${styles[msg.sender]}`}
          >
            {msg.isTyping ? (
              <div className={styles['typing-indicator']}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              msg.text
            )}
          </div>
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
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          className={styles['chatbox-send-btn']}
          disabled={isLoading || !sessionId}
        >
          {isLoading ? '...' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
