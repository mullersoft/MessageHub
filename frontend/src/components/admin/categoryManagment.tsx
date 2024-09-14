/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  fetchCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
} from "../../store/slices/categorySlice";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { ICategory } from "../../types";

const CategoryManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.categories);
  const [categoryName, setCategoryName] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleCreateOrUpdateCategory = () => {
    if (categoryName.trim() === "") {
      alert("Category name cannot be empty");
      return;
    }

    if (editingCategory) {
      dispatch(
        updateCategoryRequest({ id: editingCategory._id, name: categoryName })
      );
      setEditingCategory(null);
    } else {
      dispatch(createCategoryRequest({ name: categoryName }));
    }

    // Reset form state
    setCategoryName("");
  };

  const handleEditCategory = (category: ICategory) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryRequest(categoryId));
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <TextField
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        variant="outlined"
        style={{ marginRight: "10px", width: "300px" }}
      />
      <Button variant="contained" onClick={handleCreateOrUpdateCategory}>
        {editingCategory ? "Update Category" : "Create Category"}
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleEditCategory(category)}
                    sx={{ color: 'blue' }} // Blue color for Edit icon
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteCategory(category._id)}
                    sx={{ color: 'red' }} // Red color for Delete icon
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryManagement;
