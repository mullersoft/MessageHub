"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, "Message text is required"],
        trim: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
const Message = (0, mongoose_1.model)("Message", messageSchema);
exports.default = Message;
