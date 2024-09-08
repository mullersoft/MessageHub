import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchMessageByIdRequest } from '../store/slices/messageSlice'; // Ensure this is a named export
import { useParams } from 'react-router-dom';

const MessageDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { messageId } = useParams<{ messageId?: string }>();
  const message = useSelector((state: RootState) => state.messages.message); // Adjust to match your state structure
  const loading = useSelector((state: RootState) => state.messages.loading);
  const error = useSelector((state: RootState) => state.messages.error);

  useEffect(() => {
    if (messageId) {
      dispatch(fetchMessageByIdRequest(messageId));
    }
  }, [dispatch, messageId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!message) return <p>No message found</p>;

  return (
    <div>
      <h1>{message.text}</h1>
      <p>Author: {message.author}</p>
      <p>Likes: {message.likes}</p>
    </div>
  );
};

export default MessageDetail;
