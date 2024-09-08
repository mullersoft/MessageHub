// Add this to your imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../types';

interface CategoryState {
  categories: ICategory[];
  category: ICategory | null; // Track a single category
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesRequest(state) {
      state.loading = true;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoryByIdRequest(state, action: PayloadAction<string>) { // Update this line
      state.loading = true;
    },
    fetchCategoryByIdSuccess(state, action: PayloadAction<ICategory>) {
      state.category = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCategoryByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchCategoriesRequest, 
  fetchCategoriesSuccess, 
  fetchCategoriesFailure,
  fetchCategoryByIdRequest,
  fetchCategoryByIdSuccess,
  fetchCategoryByIdFailure
} = categorySlice.actions;

export default categorySlice.reducer;
