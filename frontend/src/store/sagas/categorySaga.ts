import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from '../slices/categorySlice';
import { ICategory } from '../../types';

// API calls
const fetchCategoriesApi = async (): Promise<ICategory[]> => {
  const response = await axios.get('/api/v1/categories');
  // Adjust to match the backend response format
  return response.data.categories;
};

const fetchCategoryByIdApi = async (id: string): Promise<ICategory> => {
  const response = await axios.get(`/api/v1/categories/${id}`);
  // Adjust to match the backend response format
  return response.data.data.category;
};

const createCategoryApi = async (category: { name: string }): Promise<ICategory> => {
  const response = await axios.post('/api/v1/categories', category);
  // Adjust to match the backend response format
  return response.data.data.category;
};

const updateCategoryApi = async (id: string, category: { name: string }): Promise<ICategory> => {
  const response = await axios.patch(`/api/v1/categories/${id}`, category); // Change PUT to PATCH
  return response.data.data.category;
};


const deleteCategoryApi = async (id: string): Promise<void> => {
  await axios.delete(`/api/v1/categories/${id}`);
};

// Sagas
function* fetchCategoriesSaga() {
  try {
    const categories: ICategory[] = yield call(fetchCategoriesApi);
    yield put(fetchCategoriesSuccess(categories));
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

function* fetchCategoryByIdSaga(action: ReturnType<typeof fetchCategoryByIdRequest>) {
  try {
    const category: ICategory = yield call(fetchCategoryByIdApi, action.payload);
    yield put(fetchCategoryByIdSuccess(category));
  } catch (error: any) {
    yield put(fetchCategoryByIdFailure(error.message));
  }
}

function* createCategorySaga(action: ReturnType<typeof createCategoryRequest>) {
  try {
    const newCategory: ICategory = yield call(createCategoryApi, action.payload);
    yield put(createCategorySuccess(newCategory));
  } catch (error: any) {
    yield put(createCategoryFailure(error.message));
  }
}

function* updateCategorySaga(action: ReturnType<typeof updateCategoryRequest>) {
  try {
    const updatedCategory: ICategory = yield call(updateCategoryApi, action.payload.id, { name: action.payload.name });
    yield put(updateCategorySuccess(updatedCategory));
  } catch (error: any) {
    yield put(updateCategoryFailure(error.message));
  }
}

function* deleteCategorySaga(action: ReturnType<typeof deleteCategoryRequest>) {
  try {
    yield call(deleteCategoryApi, action.payload);
    yield put(deleteCategorySuccess(action.payload));
  } catch (error: any) {
    yield put(deleteCategoryFailure(error.message));
  }
}

// Watchers
export function* watchFetchCategories() {
  yield takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga);
}

export function* watchFetchCategoryById() {
  yield takeLatest(fetchCategoryByIdRequest.type, fetchCategoryByIdSaga);
}

export function* watchCreateCategory() {
  yield takeLatest(createCategoryRequest.type, createCategorySaga);
}

export function* watchUpdateCategory() {
  yield takeLatest(updateCategoryRequest.type, updateCategorySaga);
}

export function* watchDeleteCategory() {
  yield takeLatest(deleteCategoryRequest.type, deleteCategorySaga);
}
