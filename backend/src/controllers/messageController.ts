import { Request, Response, NextFunction } from "express";
import Message from "../models/messageModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
// Create a new message
const createMessage = catchAsync(async (req: Request, res: Response) => {
  const message = await Message.create(req.body);
  res.status(201).json({
    status: "success",
    data: { message },
  });
});
// Get all messages
const getMessages = catchAsync(async (req: Request, res: Response) => {
  const messages = await Message.find();
  res.status(200).json({
    status: "success",
    results: messages.length,
    data: { data: messages },
  });
});
const getMessageById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
      return next(new AppError("Message ID is required", 400));
    }
    const message = await Message.findById(req.params.id);
    if (!message) {
      return next(new AppError("Message not found", 404));
    }
    res.status(200).json({ status: "success", data: { message } });
  }
);

// Update a message by ID
const updateMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!message) {
      return next(new AppError("Message not found", 404));
    }
    res.status(200).json({ success: true, message });
  }
);
// Delete a message by ID
const deleteMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
  // Assuming you have a message model or 

  const getMessagesByCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
  
    if (!categoryId) {
      return next(new AppError("Category ID is required", 400));
    }
  
    const messages = await Message.find({ category: categoryId });
  
    if (!messages || messages.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No messages found for this category',
      });
    }
  
    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: { messages },
    });
  });
  
  

export {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getMessagesByCategory,
};
