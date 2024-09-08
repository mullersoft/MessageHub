/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
// Import useDispatch from react-redux, but define a static function to simulate message posting
import { useDispatch } from 'react-redux';

const PostMessage: React.FC = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  // Simulate posting a message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we will simulate posting by logging to the console
    console.log('Posting message:', { text, category });
    // Dispatch your action here when it's available
    // dispatch(postMessageRequest({ text, category }));
    setText('');
    setCategory('');
  };

  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>Post a New Message</h2>
      <form onSubmit={handleSubmit} css={formStyle}>
        <div css={formGroupStyle}>
          <label htmlFor="text" css={labelStyle}>Message Text:</label>
          <textarea 
            id="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            css={inputStyle}
            required 
          />
        </div>
        <div css={formGroupStyle}>
          <label htmlFor="category" css={labelStyle}>Category:</label>
          <input 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            css={inputStyle}
            required 
          />
        </div>
        <button type="submit" css={submitButtonStyle}>Submit</button>
      </form>
    </div>
  );
};

// Styles using Emotion
const containerStyle = css`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const titleStyle = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const formGroupStyle = css`
  display: flex;
  flex-direction: column;
`;

const labelStyle = css`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const inputStyle = css`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const submitButtonStyle = css`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

export default PostMessage;
