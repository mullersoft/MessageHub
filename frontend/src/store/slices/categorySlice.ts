import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../types";

interface CategoryState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Fetch all categories
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

    // Fetch a category by ID
    fetchCategoryByIdRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchCategoryByIdSuccess(state, action: PayloadAction<ICategory>) {
      const categoryIndex = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      if (categoryIndex >= 0) {
        state.categories[categoryIndex] = action.payload;
      } else {
        state.categories.push(action.payload);
      }
      state.loading = false;
      state.error = null;
    },
    fetchCategoryByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Create a new category
    createCategoryRequest(state, action: PayloadAction<{ name: string }>) {
      state.loading = true;
    },
    createCategorySuccess(state, action: PayloadAction<ICategory>) {
      state.categories.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update an existing category
    updateCategoryRequest(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      state.loading = true;
    },
    updateCategorySuccess(state, action: PayloadAction<ICategory>) {
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      if (index >= 0) {
        state.categories[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete a category
    deleteCategoryRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    deleteCategorySuccess(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteCategoryFailure(state, action: PayloadAction<string>) {
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
  fetchCategoryByIdFailure,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
