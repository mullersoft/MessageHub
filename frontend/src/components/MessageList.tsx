/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchMessagesRequest } from '../store/slices/messageSlice'; // Ensure this import matches your actual slice
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';

const MessageList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { messages, loading, error } = useSelector((state: RootState) => state.messages);
  const { categoryId } = useParams<{ categoryId?: string }>();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchMessagesRequest(categoryId)); // Pass categoryId directly
    } else {
      dispatch(fetchMessagesRequest('')); // Pass an empty string or handle according to your logic
    }
  }, [dispatch, categoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div css={messageContainer}>
      {messages.map((message) => (
        <div key={message._id} css={messageCard}>
          <p css={messageText}>{message.text}</p>
          <small css={messageAuthor}>Author: {message.author ? message.author : "Unknown"}</small>
          <p css={messageLikes}>Likes: {message.likes}</p>
        </div>
      ))}
    </div>
  );
};

// Styles using Emotion
const messageContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

const messageCard = css`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const messageText = css`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const messageAuthor = css`
  font-size: 0.9rem;
  color: #555;
`;

const messageLikes = css`
  font-size: 0.9rem;
  font-weight: bold;
  color: #007BFF;
`;

export default MessageList;
