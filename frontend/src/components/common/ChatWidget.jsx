import { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import io from 'socket.io-client';
import useAuthStore from '../../store/authStore';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && isOpen) {
      const newSocket = io(SOCKET_URL);
      setSocket(newSocket);

      const roomId = `${user.id}_admin`;
      newSocket.emit('join_room', { userId: user.id, adminId: 'admin' });

      newSocket.on('previous_messages', (msgs) => {
        setMessages(msgs);
      });

      newSocket.on('receive_message', (message) => {
        setMessages(prev => [...prev, message]);
      });

      return () => newSocket.close();
    }
  }, [user, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socket) return;

    const roomId = `${user.id}_admin`;
    socket.emit('send_message', {
      roomId,
      sender: user.id,
      receiver: 'admin',
      message: inputMessage,
    });

    setInputMessage('');
  };

  if (!user) return null;

  return (
    <>
      <button 
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h4>Hỗ trợ trực tuyến</h4>
            <button onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`message ${msg.sender === user.id ? 'sent' : 'received'}`}
              >
                <p>{msg.message}</p>
                <span className="time">
                  {new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
            />
            <button type="submit">
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
