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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const createCategory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryModel_1.default.create(req.body);
    res.status(201).json({
        status: "success",
        data: { category }
    });
}));
exports.createCategory = createCategory;
const getCategories = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryModel_1.default.find();
    res.status(200).json({
        result: categories.length,
        status: "success",
        categories
    });
}));
exports.getCategories = getCategories;
const getCategoryById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryModel_1.default.findById(req.params.id);
    if (!category) {
        return next(new appError_1.default('Category not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: { category }
    });
}));
exports.getCategoryById = getCategoryById;
const updateCategory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
        return next(new appError_1.default('Category not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: { category }
    });
}));
exports.updateCategory = updateCategory;
const deleteCategory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryModel_1.default.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(new appError_1.default('Category not found', 404));
    }
    res.status(204).json({ message: "success", data: null });
}));
exports.deleteCategory = deleteCategory;
