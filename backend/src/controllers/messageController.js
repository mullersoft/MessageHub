"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByCategory = exports.deleteMessage = exports.updateMessage = exports.getMessageById = exports.getMessages = exports.createMessage = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const createMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request Body:", req.body);
    const message = yield messageModel_1.default.create(req.body);
    console.log("Created Message:", message);
    res.status(201).json({
        status: "success",
        data: { message },
    });
}));
exports.createMessage = createMessage;
const getMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messageModel_1.default.find().populate("category");
    res.status(200).json({
        status: "success",
        results: messages.length,
        data: { data: messages },
    });
}));
exports.getMessages = getMessages;
const getMessageById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return next(new appError_1.default("Message ID is required", 400));
    }
    const message = yield messageModel_1.default.findById(req.params.id);
    if (!message) {
        return next(new appError_1.default("Message not found", 404));
    }
    res.status(200).json({ status: "success", data: { message } });
}));
exports.getMessageById = getMessageById;
const updateMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!message) {
        return next(new appError_1.default("Message not found", 404));
    }
    res.status(200).json({ success: true, message });
}));
exports.updateMessage = updateMessage;
const deleteMessage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageModel_1.default.findByIdAndDelete(req.params.id);
    if (!message) {
        return next(new appError_1.default("No document found with that ID", 404));
    }
    res.status(204).json({ status: "success", data: null });
}));
exports.deleteMessage = deleteMessage;
const getMessagesByCategory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    if (!categoryId) {
        return next(new appError_1.default("Category ID is required", 400));
    }
    const messages = yield messageModel_1.default.find({ category: categoryId });
    if (!messages || messages.length === 0) {
        return res.status(404).json({
            status: "fail",
            message: "No messages found for this category",
        });
    }
    res.status(200).json({
        status: "success",
        results: messages.length,
        data: { messages },
    });
}));
exports.getMessagesByCategory = getMessagesByCategory;
