import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../slices/categorySlice";
import { ICategory } from "../../types";
//

const fetchCategoriesApi = async (): Promise<ICategory[]> => {
  const response = await axios.get("/api/v1/categories");
  return response.data.data.categories; // Adjust the path here
};

function* fetchCategoriesSaga() {
  try {
    const categories: ICategory[] = yield call(fetchCategoriesApi);
    yield put(fetchCategoriesSuccess(categories));
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

export function* watchFetchCategories() {
  yield takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga);
}
