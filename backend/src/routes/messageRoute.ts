import express from "express";
import * as authController from "../controllers/authController";
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getMessagesByCategory,
} from "../controllers/messageController";
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Route to create a new message
router.post(
  "/",
  // authController.protect,
  createMessage
);
// Route to get all messages
router.get(
  "/",
  // authController.protect,
  getMessages
);
// Route to get a specific message by ID
router.get(
  "/:id",
  //  authController.protect,
  getMessageById
);
// Route to update a message by ID
router.patch(
  "/:id",
  //  authController.protect,
  updateMessage
);
// Route to delete a message by ID
router.delete(
  "/:id",
  // authController.protect,
  // authController.restrictedTo("admin"),
  deleteMessage
);
// Example route in backend
// router.get('/getMessagesByCategory/:categoryId', getMessagesByCategory);
// Route to get messages by category
router.get("/categories/:categoryId/messages", getMessagesByCategory);
export default router;
