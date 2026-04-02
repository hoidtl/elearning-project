import { Server } from 'socket.io';
import Message from '../models/Message.js';

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room
    socket.on('join_room', async (data) => {
      const { userId, adminId } = data;
      const roomId = `${userId}_${adminId}`;
      socket.join(roomId);
      
      // Load previous messages
      const messages = await Message.find({ roomId })
        .populate('sender', 'name avatar')
        .sort('createdAt')
        .limit(50);
      
      socket.emit('previous_messages', messages);
    });

    // Send message
    socket.on('send_message', async (data) => {
      const { roomId, sender, receiver, message } = data;
      
      const newMessage = await Message.create({
        sender,
        receiver,
        message,
        roomId,
      });

      await newMessage.populate('sender', 'name avatar');
      
      io.to(roomId).emit('receive_message', newMessage);
    });

    // Mark as read
    socket.on('mark_read', async (data) => {
      const { messageId } = data;
      await Message.findByIdAndUpdate(messageId, { isRead: true });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
