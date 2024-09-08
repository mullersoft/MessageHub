import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchCategoryByIdRequest } from '../store/slices/categorySlice'; // Ensure correct import
import { useParams } from 'react-router-dom';

const CategoryDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { category } = useSelector((state: RootState) => state.categories);
  const { categoryId } = useParams<{ categoryId?: string }>();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryByIdRequest(categoryId)); // Pass categoryId directly
    }
  }, [dispatch, categoryId]);

  if (!category) return <p>No category found</p>;

  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryDetail;
