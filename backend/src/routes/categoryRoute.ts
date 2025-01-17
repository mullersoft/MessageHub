import express from "express";
import * as authController from "../controllers/authController";
import * as categoryController from "../controllers/categoryController";

const router = express.Router();
// Route to create a new category
router.post("/", 
    // authController.protect,
     categoryController.createCategory);
// Route to get all categories
router.get("/",
    //  authController.protect,
      categoryController.getCategories);
// Route to get a specific category by ID
router.get("/:id",
    //  authController.protect, 
     categoryController.getCategoryById);
// Route to update a category by ID
router.patch("/:id",
  //  authController.protect, 
   categoryController.updateCategory);
// Route to delete a category by ID
router.delete(
  "/:id",
  // authController.protect,
  // authController.restrictedTo("admin"),
  categoryController.deleteCategory
);
export default router;