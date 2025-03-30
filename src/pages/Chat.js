import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  IconButton, 
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Container
} from '@mui/material';
import { Send, AttachFile, Mic, Image } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// Mock data for chats
const mockChats = [
  {
    id: 'chat1',
    propertyId: '24001',
    messages: [
      {
        id: 'm1',
        text: 'مرحبا أزرقي، عندي استفسار بخصوص العقار # 24001',
        sender: 'user',
        timestamp: new Date('2025-03-23T10:30:00')
      },
      {
        id: 'm2',
        text: 'مرحباً، كيف يمكنني مساعدتك بخصوص هذا العقار؟',
        sender: 'agent',
        timestamp: new Date('2025-03-23T10:32:00')
      }
    ],
    property: {
      id: '24001',
      title: 'شقة فاخرة في القاهرة الجديدة',
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    }
  },
  {
    id: 'chat2',
    propertyId: '24002',
    messages: [
      {
        id: 'm3',
        text: 'مرحبا أزرقي، عندي استفسار بخصوص العقار # 24002',
        sender: 'user',
        timestamp: new Date('2025-03-22T14:15:00')
      }
    ],
    property: {
      id: '24002',
      title: 'مطعم للإيجار في مدينة نصر',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    }
  }
];

const Chat = () => {
  const { t } = useTranslation();
  const { propertyId } = useParams();
  const { currentUser } = useAuth();
  
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState(mockChats);
  
  // If propertyId is provided, load that specific chat
  useEffect(() => {
    if (propertyId) {
      const chat = chats.find(c => c.propertyId === propertyId);
      
      if (chat) {
        setActiveChat(chat);
      } else {
        // Create a new chat for this property
        // In a real app, this would fetch property details from the database
        const property = {
          id: propertyId,
          title: `Property #${propertyId}`,
          image: 'https://via.placeholder.com/150'
        };
        
        const newChat = {
          id: `chat_${new Date().getTime()}`,
          propertyId,
          messages: [
            {
              id: `m_${new Date().getTime()}`,
              text: `مرحبا أزرقي، عندي استفسار بخصوص العقار # ${propertyId}`,
              sender: 'user',
              timestamp: new Date()
            }
          ],
          property
        };
        
        setChats(prev => [...prev, newChat]);
        setActiveChat(newChat);
      }
    }
  }, [propertyId, chats]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    const newMessage = {
      id: `m_${new Date().getTime()}`,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Update the active chat with the new message
    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage]
    };
    
    // Update the chats array
    setChats(prev => prev.map(chat => 
      chat.id === activeChat.id ? updatedChat : chat
    ));
    
    setActiveChat(updatedChat);
    setMessage('');
    
    // In a real app, this would send the message to the server
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // If no propertyId and no chat is active, show the chat list
  if (!propertyId && !activeChat) {
    return (
      <Container maxWidth="md" sx={{ mt: 2, mb: 8 }}>
        <Typography variant="h6" gutterBottom>
          {t('nav.chat')}
        </Typography>
        
        <List sx={{ bgcolor: 'background.paper' }}>
          {chats.map((chat) => (
            <React.Fragment key={chat.id}>
              <ListItem 
                alignItems="flex-start" 
                button
                onClick={() => setActiveChat(chat)}
              >
                <ListItemAvatar>
                  <Avatar alt={chat.property.title} src={chat.property.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={chat.property.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline', mr: 1 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {chat.messages[chat.messages.length - 1].text.substring(0, 30)}
                        {chat.messages[chat.messages.length - 1].text.length > 30 ? '...' : ''}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {formatTime(chat.messages[chat.messages.length - 1].timestamp)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Container>
    );
  }

  // Chat conversation view
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)' }}>
      {/* Chat Header */}
      <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        {activeChat && (
          <>
            <Avatar src={activeChat.property.image} alt={activeChat.property.title} />
            <Box ml={2}>
              <Typography variant="subtitle1">{activeChat.property.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {t('property.id')}: {activeChat.propertyId}
              </Typography>
            </Box>
          </>
        )}
      </Paper>
      
      {/* Messages */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 2, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        bgcolor: '#f5f5f5'
      }}>
        {activeChat && activeChat.messages.map((msg) => (
          <Box 
            key={msg.id}
            sx={{ 
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '70%'
            }}
          >
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                borderRadius: 2,
                bgcolor: msg.sender === 'user' ? '#dcf8c6' : 'white'
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'right' }}>
                {formatTime(msg.timestamp)}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      
      {/* Message Input */}
      <Paper 
        elevation={3}
        component="form"
        sx={{ 
          p: '8px 16px', 
          display: 'flex', 
          alignItems: 'center',
          borderTop: '1px solid #e0e0e0'
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <IconButton color="primary">
          <AttachFile />
        </IconButton>
        <IconButton color="primary">
          <Image />
        </IconButton>
        <TextField
          sx={{ ml: 1, flex: 1 }}
          placeholder={t('chat.typeMessage')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />
        <IconButton color="primary">
          <Mic />
        </IconButton>
        <IconButton 
          color="primary" 
          type="submit"
          disabled={!message.trim()}
        >
          <Send />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Chat;
