/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchCategoriesRequest } from "../store/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

const CategoryList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    categories = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesRequest()); // No parameters needed if it's void
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul css={categoryContainer}>
      {Array.isArray(categories) ? (
        categories.map((category) => (
          <li
            key={category._id}
            css={categoryItem}
            onClick={() => navigate(`/categories/${category._id}/messages`)}
          >
            {category.name}
          </li>
        ))
      ) : (
        <p>Invalid data format</p>
      )}
    </ul>
  );
};

// Styles using Emotion
const categoryContainer = css`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const categoryItem = css`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export default CategoryList;
