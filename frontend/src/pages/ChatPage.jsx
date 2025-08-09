import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 0.5rem;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background-color: ${props => props.isUser ? '#3498db' : '#ecf0f1'};
  color: ${props => props.isUser ? 'white' : '#2c3e50'};
  word-wrap: break-word;
  white-space: pre-wrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #ecf0f1;
  background-color: white;
`;

const InputForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const InputField = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 0.5rem;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: #3498db;
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  color: #7f8c8d;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  background-color: #e74c3c;
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin: 0.5rem 1rem;
  text-align: center;
`;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setError('');
    
    // Add user message
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.reply || 'Failed to get response');
      }

      // Add AI response
      setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
    } catch (err) {
      setError(err.message || 'An error occurred while sending the message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <ChatContainer>
      <Header>
        Political Discussion AI
      </Header>
      
      <MessageList ref={messageListRef}>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            <MessageBubble isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          </Message>
        ))}
        
        {isLoading && (
          <LoadingIndicator>
            AI is thinking...
          </LoadingIndicator>
        )}
        
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}
      </MessageList>
      
      <InputContainer>
        <InputForm onSubmit={handleSubmit}>
          <InputField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            rows={1}
            disabled={isLoading}
          />
          <SendButton type="submit" disabled={isLoading || !inputValue.trim()}>
            Send
          </SendButton>
        </InputForm>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPage;
