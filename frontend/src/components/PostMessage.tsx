/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { postMessageRequest } from '../store/slices/messageSlice';
import { fetchCategoriesRequest } from '../store/slices/categorySlice';
import { RootState } from '../store'; // Adjust the import path based on your setup

const PostMessage: React.FC = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      dispatch(postMessageRequest({ text, category }));
      setText('');
      setCategory(undefined);
    } else {
      // Handle the case where category is not selected
      console.error('Please select a category');
    }
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
          <select 
            id="category" 
            value={category || ''} 
            onChange={(e) => setCategory(e.target.value)} 
            css={inputStyle}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
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
